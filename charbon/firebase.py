#DO NOT COMMIT THIS UNTIL YOU HAVE PROPER ENVIRONNEMENT SETUP
from os import environ
from firebase_admin import credentials, initialize_app

firebase_creds = environ.get("OPEN_PHARMA_FIREBASE_CREDENTIALS")
firebase_db_url = environ.get("OPEN_PHARMA_DATABASE_URL")


class InitFirebaseConnection():
    def __init__(self):
        print("Initializing connection with Firebase...")
        firebase_creds = credentials.Certificate("./test-28c9f-firebase-adminsdk-w2llr-6e997387b0.json")
        database_config = {'databaseURL': firebase_db_url}
        app = initialize_app(firebase_creds, database_config)