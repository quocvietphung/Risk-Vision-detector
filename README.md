# 🛡️ Fraud Detector – Kreditkartenbetrugserkennung

## 📌 Projektüberblick

Dieses Projekt ist ein intelligentes System zur Erkennung von Kreditkartenbetrug mithilfe von Machine Learning, pandas und Visualisierungstools wie Matplotlib und Plotly. Die Benutzeroberfläche basiert auf React + Material UI, während der Backend-Server auf Flask mit SQLite-Datenbank läuft.

## 🎯 Features

- CSV-Upload und automatische Analyse
- Anzeige von Statistiken (Anzahl Transaktionen, Betrugsrate, Gesamtbetrag)
- Vorschau von verdächtigen Transaktionen
- Training eines Random Forest-Modells zur Vorhersage betrügerischer Aktivitäten
- Responsives Dashboard mit professionellem UI

## 🧠 Technischer Stack

- Python 3.12, Flask, pandas, NumPy, scikit-learn
- Matplotlib, Seaborn, Plotly
- SQLite als Datenbank
- Frontend mit React, Material UI (MUI), Vite

## 🧱 Projektstruktur

```
Abschlussprojekt/
│
├── app.py                  # Flask-Backend mit API-Endpunkten
├── db/                     # SQLite-Datenbank
├── model/                  # Modellklassen & Modelltraining
├── notebooks/              # Jupyter Notebooks für EDA & Modelltraining
├── fraud-detection/        # Frontend-Quellcode (React + MUI)
├── requirements.txt        # Abhängigkeiten
└── README.md               # Diese Datei
```

## 🧪 Beispiel-Screenshots

![Übersicht](screenshots/app_overview.png)
![Upload](screenshots/upload_success.png)
![Analyse](screenshots/analysis_results.png)

## ⚙️ Installation

```bash
# Backend
pip install -r requirements.txt
python init_db.py
python app.py

# Frontend
cd fraud-detection
npm install
npm run dev
```

## 🚀 Anwendung

1. Starte das Backend unter http://127.0.0.1:5000
2. Starte das Frontend unter http://localhost:5173
3. Lade eine CSV-Datei hoch und beginne die Analyse

## 👤 Autor

Quoc Viet Phung – Python Developer & AI Enthusiast

## 📄 Lizenz

MIT License