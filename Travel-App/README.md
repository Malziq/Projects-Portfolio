# Travel Destinations Web Bot and GUI

**Programmer:** Mazen Alziq

## Project Overview
This project consists of a web scraper that collects data from the "[Best Places to Travel](https://www.timeout.com/things-to-do/best-places-to-travel)" page on Time Out's website, saves the extracted information into a JSON file, then stores it in a SQLite database. A graphical user interface (GUI) built with Python's Tkinter library enables users to explore travel destinations by month, rank, or alphabetical order.

---

## Features

### Web Scraping
- Extracts travel destinations, ranks, descriptions, and associated months.
- Data is cleaned, organized, and saved into a structured JSON file.

### Database
- Utilizes SQLite to create and manage relational data.
- Two tables (`Months` and `Places`) store travel data.

### GUI
- Easy-to-use graphical interface built with Tkinter.
- Search functionality by:
  - Month
  - Rank
  - Destination Name (first letter)
- Displays detailed descriptions of each travel destination.

---

## Technology Used
- Python
- Requests
- BeautifulSoup
- SQLite
- Tkinter
- JSON

---

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/Malziq/Projects-Portfolio/edit/main/Travel-App
cd Travel-App
```

2. Install dependencies:

```bash
pip install requests beautifulsoup4
```

(Tkinter and SQLite are usually pre-installed with standard Python distributions.)

---

## Running the Application

### Backend (Data Collection and Database Setup)

Run the main Python script to scrape data and populate the database:

```bash
python backend.py
```

The script will create:
- `data.json`: JSON file containing scraped data.
- `travel.db`: SQLite database storing the structured data.

### Frontend (GUI Application)

After the database has been populated, run the GUI application:

```bash
python frontend.py
```

A Tkinter window will appear, allowing you to explore the destinations interactively.

---

## How to Use the GUI

- **Main Window:** Choose to search by Name, Month, or Rank.
- **Dialog Window:** Select your criteria (specific month, rank, or initial letter).
- **Result Window:** View destinations matching your selection.
- **Detail View:** Click on a destination to see a detailed description.

---

## Project Structure

```
project/
├── frontend.py
├── backend.py
├── data.json
├── travel.db
└── README.md
```

---

## Notes
- Ensure internet connectivity to perform web scraping.
- If GUI encounters any issues, verify the database (`travel.db`) has been created successfully.

---

## Author
**Mazen Alziq**

---

