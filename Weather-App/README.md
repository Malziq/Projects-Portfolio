# 🌤️ Bay Area Weather App

A Python GUI app that retrieves and displays 5-day weather forecasts for 10 Bay Area cities using the [Open-Meteo API](https://open-meteo.com/). The app uses **multiprocessing** to speed up data retrieval and supports saving weather reports to a local file.

One of the main goals of this project was to explore the use of multithreading vs multiprocessing to speed up API requests.

---

## 📌 Features

- GUI built with `tkinter`
- Fast weather and geocoding lookups using `multiprocessing` and `threading`
- Supports multiple city selection
- Saves results to a local `.txt` file
- Performance comparison: serial vs multithreading vs multiprocessing

---

## 🏙️ Supported Cities

- Napa  
- Sonoma  
- Santa Cruz  
- Monterey  
- Berkeley  
- Livermore  
- San Francisco  
- San Mateo  
- San Jose  
- Los Gatos  

---

## 📦 Requirements

- Python 3.7+
- Modules:
  - `requests`
  - `tkinter` *(standard with Python)*
  - `multiprocessing`
  - `datetime`
  - `os`, `json`, `time`

Install required packages:

```bash
pip install requests
