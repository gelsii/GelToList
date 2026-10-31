from uvicorn import run
from dotenv import load_dotenv
import os

load_dotenv()

def main() -> None:
    print("Hello from server!")
    run(app="app:app", host=os.getenv("HOST"), port=int(os.getenv("PORT")), reload=True)