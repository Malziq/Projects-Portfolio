
import os
import json
import requests
import tkinter as tk
from tkinter import filedialog, messagebox
import multiprocessing as mp
from datetime import date
import time

"""
Programmer: Mazen Alziq
Project: Gather weather data for 10 Bay Area cities from an API, and create a GUI to display the data

Use of multiprocessing to preform the API requests
"""


def mp_geocode(city):
    """ Global function to get geocode from an API request initiated in WebBot class"""
    url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=10&language=en&format=json"
    page = requests.get(url)
    city_info = page.json()

    # results is the only key in the dict, which is a list of dictionaries (city info)
    results = city_info['results']

    for data in results:
        if data['admin1'] == "California":
            return city, {'latitude': data['latitude'], 'longitude': data['longitude']}
    return city, None


def mp_weather(args):
    """ Global function to get weather data from an API request initiated in WebBot class """
    city_info, city, start_date, end_date = args
    lat = city_info[city]['latitude']
    long = city_info[city]['longitude']

    url = (f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={long}"
           f"&daily=temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max&"
           f"temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles&"
           f"start_date={start_date}&end_date={end_date}")

    page = requests.get(url)
    weather = page.json()

    city_dict = {
        'Date': weather['daily']['time'],
        'High': weather['daily']['temperature_2m_max'],
        'Low': weather['daily']['temperature_2m_min'],
        'Wind': weather['daily']['wind_speed_10m_max'],
        'UV': weather['daily']['uv_index_max']
    }
    return city, city_dict

class WebBot:
    """ Class designed to retrieve data from a weather API. Primarily for JSON files """
    def __init__(self):
        self.cities = ['Napa', 'Sonoma', 'Santa Cruz', 'Monterey', 'Berkeley', 'Livermore',
                       'San Francisco', 'San Mateo', 'San Jose', 'Los Gatos']
        self.city_dict = {}

    def search_geocode(self):
        """ Performs API requests to find geocodes for each city (latitude and longitude) """
        start_time = time.time()
        with mp.Pool(processes=mp.cpu_count()) as pool:
            results = pool.map(mp_geocode, self.cities)

        for city, coords in results:
            if coords:
                self.city_dict[city] = coords

        with open('cities.json', 'w') as fh:
            json.dump(self.city_dict, fh, indent=3)
        print(f"Time to retrieve geocodes: {time.time() - start_time:.2f}s")
        print("Data added successfully!")

    def search_weather(self, cities):
        """ Performs API requests to get weather data using geocodes """
        start_date, end_date = self.get_dates()
        weather_dict = {}

        with open('cities.json', 'r') as fh:
            city_info = json.load(fh)

        start_time = time.time()
        with mp.Pool(processes=mp.cpu_count()) as pool:
            results = pool.map(mp_weather, [(city_info, city, start_date, end_date) for city in cities])

        for city, weather in results:
            weather_dict[city] = weather

        print(f"Time to retrieve weather data: {time.time() - start_time:.2f}s")

        return weather_dict

    def get_dates(self):
        """
        Gets a date range from day of use to 5 days after
        Techniques not covered in class, uses datetime module
        """
        # Get today's date
        start_date = date.today()

        # Get data 5 days from now
        year = start_date.year
        month = start_date.month
        day = start_date.day + 4  # manually adjust by adding 5
        end_date = date(year, month, day)

        return start_date, end_date

class MainWindow(tk.Tk):
    """ Main window class for the GUI. Displays listbox for 10 Bay Area cities"""

    def __init__(self):
        super().__init__()
        self.web = WebBot()  # web scraper that can be used in all methods
        self.title("Travel Weather App")
        self.geometry("300x300")
        self.grid_columnconfigure(0, weight=1)
        self.protocol("WM_DELETE_WINDOW", self.on_closing)

        title_label = tk.Label(self, text="Lookup Weather at your Destination", font=("", 18, ""))
        title_label.grid(row=0, column=0, padx=1, pady=1)
        box_label = tk.Label(self, text="Select Destinations then Click Submit", font=("", 14, ""))
        box_label.grid(row=1, column=0, padx=1, pady=1)
        self.LB = tk.Listbox(master=self, height=10, selectmode=tk.MULTIPLE)
        self.LB.grid(row=2, column=0)
        self.listbox_names()
        submit_label = tk.Button(self, text="Submit", command=self.select_cities)
        submit_label.grid(row=3, column=0)
        self.search_results = {}

    def listbox_names(self):
        """ Fills the listbox with names of cities """

        if not os.path.exists("cities.json"):
            print("No cities.json file found")
            self.web.search_geocode()  # creates cities.json if it does not exist

        areas = ['North Bay', 'The Coast', 'East Bay', 'Peninsula', 'South Bay']
        cities = ['Napa', 'Sonoma', 'Santa Cruz', 'Monterey', 'Berkeley', 'Livermore',
                  'San Francisco', 'San Mateo', 'San Jose', 'Los Gatos']

        for i in range(0, 5):
            self.LB.insert(tk.END, f"{areas[i]}: {cities[i * 2]}")
            self.LB.insert(tk.END, f"{areas[i]}: {cities[i * 2 + 1]}")


    def select_cities(self):
        """ When user clicks the submit button, data will be displayed for the cities they highlighted """
        start = time.time()  # keeps track of time to display windows

        selected = self.LB.curselection()
        selected_cities = [self.LB.get(i) for i in selected]
        cities = [city.split(':')[1].lstrip() for city in selected_cities]
        weather_dict = self.request_api(cities)

        for city in cities:
            DisplayWindow(self, city, weather_dict[city])
            self.search_results[city] = weather_dict[city]

        print(f"Time to display windows: {time.time() - start:.2f}s")

        self.LB.selection_clear(0, tk.END)
        self.focus_set()

    def request_api(self, cities):
        """ Request data from the API, save it into a dictionary"""
        weather_dict = self.web.search_weather(cities)  # retrieve weather data using geocodes
        return weather_dict

    def on_closing(self):
        """
        When user closes the main window, ask if they would like
        to save their city selections & data into a file
        """
        if self.search_results:
            if tk.messagebox.askokcancel("Save Results", "Do you want to save your search results?"):
                self.save_results()
            else:
                self.destroy()
        else:
            self.destroy()

    def save_results(self):
        """ Save user city selection & data into a file """
        directory = tk.filedialog.askdirectory(initialdir=os.getcwd())
        if directory:
            self.write_to_file(directory)
        self.destroy()

    def write_to_file(self, directory):
        """ Called by save_results, writes the appropriate data to a file """
        filepath = os.path.join(directory, "weather.txt")
        unique_results = {}

        for city, data in self.search_results.items():
            if city not in unique_results:
                unique_results[city] = data

        with open(filepath, 'w') as file:
            for city, data in unique_results.items():
                file.write(f"{city}:\n")
                file.write(', '.join(data['Date']) + '\n')
                file.write(', '.join(map(str, data['High'])) + '\n')
                file.write(', '.join(map(str, data['Low'])) + '\n')
                file.write(', '.join(map(str, data['Wind'])) + '\n')
                file.write(', '.join(map(str, data['UV'])) + '\n\n')

        tk.messagebox.showinfo("Saved", f"Weather data saved to {filepath}")

class DisplayWindow(tk.Toplevel):
    """ Displays a window for each selected city with its corresponding data """
    def __init__(self, master, city, weather):
        super().__init__(master)
        self.title(f"Weather for {city}")

        # Create the title label for each city
        title_label = tk.Label(self, text=f"Weather for {city}", font=("Helvetica", 16))
        title_label.pack(pady=10)

        # Create frames for each column
        frame_date = tk.Frame(self)
        frame_high = tk.Frame(self)
        frame_low = tk.Frame(self)
        frame_wind = tk.Frame(self)
        frame_uv = tk.Frame(self)

        frame_date.pack(side=tk.LEFT, padx=5)
        frame_high.pack(side=tk.LEFT, padx=5)
        frame_low.pack(side=tk.LEFT, padx=5)
        frame_wind.pack(side=tk.LEFT, padx=5)
        frame_uv.pack(side=tk.LEFT, padx=5)

        # Create headers for each column
        header_date = tk.Label(frame_date, text="Date", font=("Helvetica", 12))
        header_high = tk.Label(frame_high, text="High", font=("Helvetica", 12))
        header_low = tk.Label(frame_low, text="Low", font=("Helvetica", 12))
        header_wind = tk.Label(frame_wind, text="Wind", font=("Helvetica", 12))
        header_uv = tk.Label(frame_uv, text="UV", font=("Helvetica", 12))

        header_date.pack()
        header_high.pack()
        header_low.pack()
        header_wind.pack()
        header_uv.pack()

        # Create listboxes for each column
        listbox_date = tk.Listbox(frame_date, height=10, width=10)
        listbox_high = tk.Listbox(frame_high, height=10, width=10)
        listbox_low = tk.Listbox(frame_low, height=10, width=10)
        listbox_wind = tk.Listbox(frame_wind, height=10, width=10)
        listbox_uv = tk.Listbox(frame_uv, height=10, width=10)

        listbox_date.pack()
        listbox_high.pack()
        listbox_low.pack()
        listbox_wind.pack()
        listbox_uv.pack()

        # Populate the listboxes with data
        for item in weather['Date']:
            listbox_date.insert(tk.END, item)
        for item in weather['High']:
            listbox_high.insert(tk.END, item)
        for item in weather['Low']:
            listbox_low.insert(tk.END, item)
        for item in weather['Wind']:
            listbox_wind.insert(tk.END, item)
        for item in weather['UV']:
            listbox_uv.insert(tk.END, item)


if __name__ == "__main__":
    app = MainWindow()
    app.mainloop()


"""
** times for weather data were for all 10 cities (10 requests) **

                    serial      multithreading      multiprocessing
geocoding data       6.13           1.28                 1.38
weather data         5.92           1.36                 1.24

Ranked:

3. Serial
- Each API request is completed after the previous one has been completed, making it the slowest
since the execution time is the sum of all 10 requests. There is no concurrency.

2. Multithreading
- Multiple threads are used to make requests, reducing total execution time since multiple requests
can happen simultaneously. We dont have true concurrency however for CPU tasks because of the GIL,
all threads share the same memory, but is still very effective for I/O tasks like the API request

1. Multiprocessing
- Very similar to multithreading since API requests are an I/O bound task, not CPU. Nonetheless, not being 
limited by the GIL and having multiple processors with their own memory speeds up execution time.


*** multithreading is faster
*** having to send data back in multiprocessing is time consuming
*** less work to create threads vs processes
- 

"""