# Bay Area Weather Data GUI

**Programmer:** Mazen Alziq

## Project Overview
This project gathers weather data for 10 Bay Area cities using API requests. It features a Python backend that leverages multithreading and multiprocessing for efficient data retrieval. The retrieved weather data is displayed through an interactive graphical user interface (GUI) built with Tkinter, allowing users to select cities and view detailed weather forecasts.

---

## Features

### Data Retrieval
- Geocoding and weather data collected via API requests.
- Multithreading and multiprocessing implementations significantly speed up data retrieval compared to serial requests.

### GUI
- Built with Python's Tkinter library.
- Allows selection of multiple cities from different Bay Area regions:
  - North Bay
  - The Coast
  - East Bay
  - Peninsula
  - South Bay
- Provides detailed forecasts including high/low temperatures, wind speeds, and UV index.

### Data Saving
- Option to save selected cities and associated weather data to a text file.

---

## Technology Used
- Python
- Requests
- Tkinter
- JSON
- Multithreading
- Multiprocessing

---

## Installation and Setup

1. Clone the repository:

```bash
git clone [your-repo-url]
cd [your-project-folder]
```

2. Install dependencies:

```bash
pip install requests
```

(Tkinter and multiprocessing modules are included in Python's standard library.)

---

## Running the Application

Run the main Python script to launch the GUI application:

```bash
python your_script_name.py
```

A Tkinter window will appear, enabling interactive exploration of weather data.

---

## Performance Comparison

| Method          | Geocoding Time (s) | Weather Data Time (s) |
|-----------------|--------------------|-----------------------|
| Serial          | 6.13               | 5.92                  |
| Multithreading  | 1.28               | 1.36                  |
| Multiprocessing | 1.38               | 1.24                  |

### Efficiency Rankings
1. **Multiprocessing:** Fastest method due to parallel API requests without GIL limitations.
2. **Multithreading:** Nearly as fast, very effective for I/O-bound tasks like API requests.
3. **Serial:** Slowest method with no concurrency, each request completes sequentially.

---

## Project Structure

```
project/
├── your_script_name.py
├── cities.json
├── weather.txt (generated upon saving results)
└── README.md
```

---

## Notes
- Ensure internet connectivity to perform API requests.
- Verify the creation of `cities.json` for proper GUI functioning.

---

## Author
**Mazen Alziq**

---

