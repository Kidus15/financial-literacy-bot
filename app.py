# ==================== FILE: app.py ====================


import os, random
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import requests
import yfinance as yf

load_dotenv()
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY", "")
NVIDIA_BASE_URL = os.getenv("NVIDIA_BASE_URL", "")
NVIDIA_MODEL = os.getenv("NVIDIA_MODEL", "meta/llama-3.1-8b-instruct")

app = Flask(__name__)

# --- simple rotating tips (no DB) ---
TIPS = [
    ("50/30/20 Rule", "50% needs • 30% wants • 20% savings"),
    ("Emergency Fund", "Aim for 3–6 months of expenses"),
    ("Track Spending", "Review where money goes each month"),
    ("Automate Savings", "Pay yourself first with auto-transfers"),
]

@app.route("/")
def index():
    tips = random.sample(TIPS, k=min(3, len(TIPS)))
    return render_template("index.html", tips=tips)

@app.post("/api/chat")
def api_chat():
    user_msg = request.json.get("message", "").strip()
    if not user_msg:
        return jsonify({"error": "empty message"}), 400
    try:
        r = requests.post(
            f"{NVIDIA_BASE_URL}/chat/completions",
            headers={"Authorization": f"Bearer {NVIDIA_API_KEY}"},
            json={
                "model": NVIDIA_MODEL,
                "messages": [
                    {"role": "system", "content": "You are a helpful financial literacy assistant. Use simple, clear language."},
                    {"role": "user", "content": user_msg}
                ],
                "max_tokens": 350,
                "temperature": 0.4
            },
            timeout=20
        )
        data = r.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/stock")
def api_stock():
    ticker = (request.args.get("t") or "AAPL").upper()
    try:
        info = yf.Ticker(ticker).fast_info
        price = info.get("last_price")
        change = info.get("regular_market_change_percent")
        return jsonify({"ticker": ticker, "price": price, "change_pct": change})
    except Exception as e:
        return jsonify({"ticker": ticker, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
