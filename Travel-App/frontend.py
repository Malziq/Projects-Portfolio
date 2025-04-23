"""
Programmer: Mazen Alziq
Front end (GUI) for the travel destinations web bot.
"""

import tkinter as tk
import sqlite3 as sql


class MainWindow(tk.Tk):
    """ Main window of the GUI, displays search options for month, name, and rank"""
    def __init__(self):
        super().__init__()
        self.title("Travel")

        # main title
        title_label = tk.Label(self, text="Best Travel Destinations", font=("", 18, "bold"))
        title_label.grid(row=0,column=2, sticky="NSEW")

        search_label = tk.Label(self, text="Search by: ")
        search_label.grid(row=1, column=0)

        # buttons for search criteria
        self.button = tk.Button(self, text="Name", command= lambda : self.create_dialog(1))
        self.button.grid(row=1, column=1, padx=5, pady=5)

        self.button = tk.Button(self, text="Month", command= lambda : self.create_dialog(2))
        self.button.grid(row=1, column=2, padx=5, pady=5)

        self.button = tk.Button(self, text="Rank", command= lambda : self.create_dialog(3))
        self.button.grid(row=1, column=3, padx=5, pady=5)

    def create_dialog(self, num):
        """ create the dialog window when a button is clicked in main window"""
        self.withdraw()  # temporarily close main window
        dialog = DialogWindow(self, num)
        self.wait_window(dialog)  # wait for dialog window to close
        self.deiconify()  # show main window again

    def show_results(self, criteria, value):
        """
        When a radio button is selected, a result window object is created.
        We use the selected value to decide what to display to the user next
        """
        self.withdraw()
        result_window = ResultWindow(self, criteria, value)
        self.wait_window(result_window)
        self.deiconify()

class DialogWindow(tk.Toplevel):
    """
    Displays a group of radio buttons associated with the button selected in main window
    NOTE: We only use one cursor for the entire class cycle. No opening and reclosing
    """
    def __init__(self, master, num):
        super().__init__(master)
        self.master = master
        self.num = num  # used to determine which button the user choice
        self.title("Dialog")
        self.geometry("300x300")
        self.controlVar = tk.StringVar()

        # connect to our database
        self.conn = sql.connect('travel.db')
        self.cursor = self.conn.cursor()

        # call the appropriate method depending on user selection
        if num == 1:
            self.display_names()
        elif num == 2:
            self.display_months()
        elif num == 3:
            self.display_ranks()

    def display_months(self):
        """ Display radio buttons for all the months """
        self.cursor.execute("SELECT month FROM Months")
        months = self.cursor.fetchall()

        for i, month in enumerate(months):
            rb = tk.Radiobutton(self, text=month[0], variable=self.controlVar, value=month[0],
                                command=self.select_radio_button)
            rb.grid(row=i, column=0, padx=20, pady=5, sticky='w')  # use sticky for proper alignment
        self.controlVar.set(months[0][0])

    def display_ranks(self):
        """ Display radio buttons for the rank of each travel destination"""
        self.cursor.execute("SELECT DISTINCT rank FROM Places")
        ranks = [row[0] for row in self.cursor.fetchall()]

        for i, rank in enumerate(ranks):
            rb = tk.Radiobutton(self, text=rank, variable=self.controlVar, value=rank, command=self.select_radio_button)
            rb.grid(row=i, column=0, padx=20, pady=5, sticky='w')  # use sticky for proper alignment
        self.controlVar.set(ranks[0])

    def display_names(self):
        """
        Display radio buttons with the first letter of each travel destination
        IMPORTANT: There is only one button for each letter, no duplicates
        """
        self.cursor.execute("Select name FROM Places")
        names = self.cursor.fetchall()
        unique_letters = set()
        first_letters = []

        # Extract the first letter of each name
        for name in names:
            first_letter = name[0][0]
            if first_letter not in unique_letters:
                first_letters.append(first_letter)
                unique_letters.add(first_letter)
        first_letters = sorted(first_letters)

        # create buttons for each name
        for i, letter in enumerate(first_letters):
            rb = tk.Radiobutton(self, text=letter, variable=self.controlVar, value=letter,
                                command=self.select_radio_button)
            rb.grid(row=i, column=0, padx=20, pady=5, sticky='w')  # use sticky for proper alignment
        self.controlVar.set(first_letters[0])  # set default to the first button

    def select_radio_button(self):
        """
        When a radio button is selected, we call the appropriate method
        in result window based on the input
        """
        selected_value = self.controlVar.get()
        self.master.show_results(self.num, selected_value)  # call our method in main window to decide what to do next
        self.destroy()

    def close(self):
        """ Close the window """
        self.conn.close()
        self.destroy()

class ResultWindow(tk.Toplevel):
    """ Displays the appropriate data depending on the radiobutton selected in DialogWindow"""
    def __init__(self, master, criteria, value):
        super().__init__(master)
        self.master = master
        self.criteria = criteria
        self.value = value
        self.title("Results")
        self.geometry("400x400")

        # connect to our database
        self.conn = sql.connect('travel.db')
        self.cursor = self.conn.cursor()

        # call the appropriate method based on user selection
        if criteria == 1:
            self.display_results_by_name()
        elif criteria == 2:
            self.display_results_by_month()
        elif criteria == 3:
            self.display_results_by_rank()

    def display_results_by_name(self):
        """ If the user selected a letter, we display all destinations that contain that first letter"""
        self.cursor.execute("SELECT name FROM Places WHERE name LIKE ?", (self.value + '%',))
        results = [row[0] for row in self.cursor.fetchall()]

        description = tk.Label(self, text=f"Destinations starting with '{self.value}':")
        description.pack(padx=10, pady=10)

        # create our list box
        listbox = tk.Listbox(self, height=10, width=50)
        for result in results:
            listbox.insert(tk.END, result)
        listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # create the scroll bar
        scrollbar = tk.Scrollbar(self)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        listbox.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=listbox.yview)

        listbox.bind('<<ListboxSelect>>', self.on_select)

    def display_results_by_month(self):
        """ Display all destinations for a certain month"""
        self.cursor.execute("""
            SELECT Places.rank, Places.name 
            FROM Places 
            JOIN Months ON Places.month = Months.id 
            WHERE Months.month = ?
            ORDER BY Places.rank
        """, (self.value,))
        results = self.cursor.fetchall()

        description = tk.Label(self, text=f"Destinations for the month '{self.value}':")
        description.pack(padx=10, pady=10)

        # create listbox
        listbox = tk.Listbox(self, height=10, width=50)
        for rank, name in results:
            listbox.insert(tk.END, f"{rank}. {name}")
        listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # create scrollbar
        scrollbar = tk.Scrollbar(self)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        listbox.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=listbox.yview)

        listbox.bind('<<ListboxSelect>>', self.on_select)

    def display_results_by_rank(self):
        """
        Display all destinations within a certain rank, including ones from different months
        Ex: a destination from both February and April can have a ranking of 7
        """
        # single SQL command
        self.cursor.execute("""
            SELECT Places.name, Months.month 
            FROM Places 
            JOIN Months ON Places.month = Months.id 
            WHERE Places.rank = ?
            ORDER BY Months.month
        """, (self.value,))
        results = self.cursor.fetchall()

        description = tk.Label(self, text=f"Destinations with rank '{self.value}':")
        description.pack(padx=10, pady=10)

        # create listbox
        listbox = tk.Listbox(self, height=10, width=50)
        for name, month in results:
            listbox.insert(tk.END, f"{name}: {month}")
        listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # create scrollbar
        scrollbar = tk.Scrollbar(self)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        listbox.config(yscrollcommand=scrollbar.set)
        scrollbar.config(command=listbox.yview)

        listbox.bind('<<ListboxSelect>>', self.on_select)

    def on_select(self, event):
        """ Handles events for items selected in the list box"""
        selection = event.widget.curselection() # curselection returns a tuple of the indices matching the selected
                                                # strings in the listbox. Index starts at 0 for first string

        index = selection[0]
        data = event.widget.get(index)
        name = data.split('.')[1].strip() if self.criteria == 2 else data.split(' (')[0]
        self.show_details(name)

    def show_details(self, name):
        """ Displays data of the selected destination """
        self.cursor.execute("SELECT description FROM Places WHERE name = ?", (name,))
        description = self.cursor.fetchone()[0]

        display_window = DisplayWindow(self, name, description)

    def close(self):
        """ Close the result window"""
        self.conn.close()
        self.destroy()


class DisplayWindow(tk.Toplevel):
    """ Display the text description for each destination """
    def __init__(self, master, name, description):
        super().__init__(master)
        self.title(name)
        self.geometry("400x300")

        title_label = tk.Label(self, text=name, font=("", 16, "bold"))
        title_label.pack(padx=10, pady=10)

        description_label = tk.Label(self, text=description, wraplength=380)
        description_label.pack(padx=10, pady=10)

        close_button = tk.Button(self, text="Close", command=self.close)
        close_button.pack(pady=10)

    def close(self):
        """ Close the Display Window """
        self.destroy()

app = MainWindow()
app.mainloop()
