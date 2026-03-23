from pymongo import MongoClient
import os

client = MongoClient("mongodb+srv://admin:Elguapo6655*@wiki.rrcrbcx.mongodb.net/wiki?retryWrites=true&w=majority")
db = client["mi_web"]

posts_collection = db["posts"]
users_collection = db["users"]