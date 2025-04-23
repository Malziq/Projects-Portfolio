"""
Programmer: Mazen Alziq
Backend code for  a web bot that scrapes data from a travel website, and saves data into a database.
"""

import requests
import json
import sqlite3 as sql
from bs4 import BeautifulSoup

""" Part A, web scrape and save data to a JSON file """


class WebBot:
    """ Web scraper for our given website. Save data into a dictionary, then to a JSON file"""

    def __init__(self):
        self.url = "https://www.timeout.com/things-to-do/best-places-to-travel"
        self.root_url = self.get_root_url()
        self.page = requests.get(self.url)
        self.soup = BeautifulSoup(self.page.content, "lxml")
        self.travel_dict = {}  # dictionary to store travel data
        self.travel_list = []
        self.month_links()
        self.travel_list.append(self.travel_dict)
        self.save_to_json(self.travel_list)

    def get_root_url(self):
        """ Extract the root url"""
        temp_url = self.url.split('/')
        root_url = f"{temp_url[0]}//{temp_url[2]}"
        return root_url

    def month_links(self):
        """ Get the ending part of the url for each month, then append it to root url"""
        unique_links = set()  # used to avoid duplicate links
        months = self.soup.find('div', class_="_zoneItems_8z2or_5 zoneItems")
        for link in months.find_all('a', href=True):
            link = link['href']
            if link not in unique_links:
                unique_links.add(link)
                month_url = f"{self.root_url}{link}"
                self.parse_months(month_url)

    def parse_months(self, month_url):
        """ Visit the url for each month and scrape it's associated data"""
        page = requests.get(month_url)
        soup = BeautifulSoup(page.content, "lxml")
        my_div = soup.find('div', class_="_zoneItems_882m9_1 zoneItems")
        '''
        tbody = soup.find_all('tbody')
        L = []
        for t in tbody:
            L.append(t.text)
        '''

        if not my_div:
            print(f"No places div found on page: {month_url}")
            return

        temp_month = month_url.split('-')
        month = temp_month[-1].title()

        month_dict = {}
        self.travel_dict[month] = month_dict
        print(month)
        print()

        for div in my_div.find_all('article', class_="tile _article_kc5qn_1"):
            place_dict = {}

            # find ranking
            rank = div.find('h3', class_="_h3_cuogz_1")
            ranking = rank.find('span').text.strip('.')
            place_dict['rank'] = ranking

            # find travel destination name
            place = rank.text.replace('\xa0', ' ').split(' ')  # \xa0 doesn't allow strings to be split
            if len(place) < 3:
                place_dict['place'] = place[1]
            else:
                place_dict['place'] = " ".join(place[-2:])

            # find text description of travel destination
            summary = div.find('div', class_="_summary_kc5qn_21")
            paragraph = summary.find('p').text
            place_dict['summary'] = paragraph

            month_dict[ranking] = place_dict

    def save_to_json(self, my_dict):
        """ Save our dictionary as a JSON file"""
        with open('data.json', 'w', encoding='utf-8') as fh:
            json.dump(my_dict, fh, ensure_ascii=False, indent=3)
            # I was stuck as to why the text was displaying weird characters,
            # then I found this thing online, 'ensure_ascii' that made sure all
            # the encoding is in utf-8


class DataBase:
    """ Create a database using data from our JSON file"""

    def __init__(self):
        # read from the json file
        with open('data.json', 'r') as fh:
            self.data = json.load(fh)
            print("JSON data loaded successfully.")
            print(self.data)

        # connect to database
        self.conn = sql.connect('travel.db')
        self.cur = self.conn.cursor()
        self.create_tables()
        self.insert_data()

    def create_tables(self):
        """ Create 2 tables: Months and Places"""
        self.cur.execute("DROP TABLE IF EXISTS Months")
        self.cur.execute('''CREATE TABLE Months (
                                id INTEGER NOT NULL PRIMARY KEY,
                                month TEXT NOT NULL)''')
        self.cur.execute("DROP TABLE IF EXISTS Places")
        self.cur.execute(''' CREATE TABLE Places (
                                name TEXT NOT NULL,
                                rank INTEGER,
                                month INTEGER,
                                description TEXT,
                                FOREIGN KEY (month) REFERENCES Months(id))''')

    def insert_data(self):
        """ Populate our tables using the JSON file"""
        try:
            for month_dict in self.data:
                for month, destinations in month_dict.items():
                    print(f"Inserting month: {month}")
                    self.cur.execute('''INSERT INTO Months (month) VALUES (?)''', (month,))
                    self.cur.execute('''SELECT id FROM Months WHERE month = ?''', (month,))
                    month_id = self.cur.fetchone()[0]
                    print(f"Month ID for {month}: {month_id}")
                    for ranking, place_data in destinations.items():
                        print(f"Inserting place: {place_data['place']} with rank {place_data['rank']} "
                              f"for month ID {month_id}")
                        self.cur.execute('''INSERT INTO Places (name, rank, month, description) 
                                            VALUES (?, ?, ?, ?)''',
                                         (place_data['place'], place_data['rank'], month_id,
                                          place_data['summary']))
            self.conn.commit()
            print("Data inserted successfully.")
        # used for debugging purposes. I was having a really hard time with this, and it turned out I just mispelled
        # a column name :(
        except sql.Error as e:
            print(f"Error inserting data: {e}")


def main():
    """ main is mainly for debugging purposes also"""
    print("Welcome to Travel Destinations")
    data = DataBase()
    web = WebBot()


if __name__ == "__main__":
    main()
