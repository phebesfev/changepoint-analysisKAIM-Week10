# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def load_timeseries():
    # Expect columns: date, price, log_return (export from Task 1 if you want)
    try:
        df = pd.read_csv("data/BrentOilPrices_processed.csv", parse_dates=["date"])
    except Exception:
        df = pd.DataFrame({"date": [], "price": [], "log_return": []})
    return df

def load_change_points():
    # Read the results from Task 2 export
    try:
        df = pd.read_csv("data/change_points_summary.csv")
        return df.to_dict(orient="records")
    except Exception:
        return []

def load_events():
    try:
        df = pd.read_csv("data/events_brent.csv", parse_dates=["date"])
        return df.to_dict(orient="records")
    except Exception:
        return []

@app.route("/api/timeseries")
def timeseries():
    return jsonify(load_timeseries().to_dict(orient="records"))

@app.route("/api/change_points")
def change_points():
    return jsonify(load_change_points())

@app.route("/api/events")
def events():
    return jsonify(load_events())

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
