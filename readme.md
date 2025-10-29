💰 Financial Literacy AI Bot

An interactive web app that helps students and young adults understand money, manage budgets, and explore stock data — powered by NVIDIA NIM and Yahoo Finance.

🚀 Overview

The Financial Literacy AI Bot combines AI-driven explanations with live market insights.
Ask finance questions in plain English, check stock prices, track a mock portfolio, and learn key financial concepts — all from one place.

🧠 Features

AI chat powered by Meta Llama 3.1 8B Instruct (via NVIDIA NIM)

Live stock data and charts using Yahoo Finance (yfinance)

Budget & savings goal tools

Simple local portfolio tracker (no database)

Clean Flask + Tailwind CSS interface

<img width="1518" height="678" alt="image" src="https://github.com/user-attachments/assets/a21d5c9a-2686-486d-9d84-e9df9ecd2f39" />


⚙️ Tech Stack
Component	Technology
Backend	Flask (Python)
AI	NVIDIA NIM – Meta Llama 3.1 8B Instruct
Data	Yahoo Finance API (yfinance)
Frontend	HTML, Tailwind CSS, JavaScript
Charts	Chart.js
🧩 Setup
git clone https://github.com/yourusername/finance-bot.git
cd finance-bot
pip install -r requirements.txt


Create a .env file:

NVIDIA_API_KEY=your_nvidia_api_key
NIM_BASE_URL=https://integrate.api.nvidia.com/v1
NIM_MODEL=meta/llama-3.1-8b-instruct


Run the app:

flask run


Then visit http://127.0.0.1:5000

📚 Example Prompts

“Explain compound interest with an example.”

“What does a credit score mean?”

“Show Tesla stock data for the past year.”

“Make me a simple college student budget.”

🛡️ Notes

Educational use only — not financial advice.

Data provided by Yahoo Finance for demonstration purposes.
