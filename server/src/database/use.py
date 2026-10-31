from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("URI_DATABASE"))

database = client.get_database(name="gel_tolist")

users_collection = database.get_collection(name="users")

users_notes_collection = database.get_collection(name="notes")