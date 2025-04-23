# San Francisco Rainfall Data Analysis and GUI

**Programmers:** Faisal Rahman, Mazen Alziq

## Project Overview
This project analyzes historical rainfall data for San Francisco, CA, spanning from 1850 to 2023. It utilizes NumPy for data analysis and Matplotlib for visualizations. The analyzed data is interactively presented through a graphical user interface (GUI) built with Python's Tkinter library.

---

## Features

### Data Analysis
- Loads and processes rainfall data from a CSV file.
- Computes statistics such as maximum, minimum, and median yearly rainfall.
- Determines rainfall averages and distributions.

### GUI
- Interactive GUI built with Tkinter.
- Visualizes data through:
  - Monthly average rainfall.
  - Distribution of monthly rainfall amounts.
  - Yearly rainfall range for selected periods.
- Provides clear statistical summaries including maximum, minimum, and median rainfall years.

---

## Technologies Used
- Python
- NumPy
- Matplotlib
- Tkinter

---

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/Malziq/Projects-Portfolio/edit/main/Rainfall-Analysis
cd Rainfall-Analysis
```

2. Install dependencies:

```bash
pip install numpy matplotlib
```

(Tkinter is included in Python's standard library.)

---

## Running the Application

Run the main Python script to launch the GUI:

```bash
python frontend.py
```

An interactive window will appear, enabling exploration of rainfall data.

---

## GUI Interaction
- **Monthly Average:** View average rainfall by month.
- **Monthly Range:** Explore the distribution of monthly rainfall.
- **Yearly Total:** Input custom year ranges to visualize annual rainfall totals.

---

## Project Structure

```
project/
├── frontend.py
├── analysis.py
├── sf_rainfall.csv
└── README.md
```

---

## Notes
- Ensure `sf_rainfall.csv` is located in the project directory.
- Confirm proper installation of required packages for optimal functionality.

---

## Authors
**Faisal Rahman, Mazen Alziq**

---

