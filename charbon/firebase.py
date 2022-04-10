#DO NOT COMMIT THIS UNTIL YOU HAVE PROPER ENVIRONNEMENT SETUP
from os import environ
from ast import literal_eval
from firebase_admin import credentials, initialize_app

firebase_cert = literal_eval(environ.get("OPEN_PHARMA_FIREBASE_CREDENTIALS"))
firebase_db_url = environ.get("OPEN_PHARMA_DATABASE_URL")


class InitFirebaseConnection():
    def __init__(self):
        print("Initializing connection with Firebase...")
        firebase_creds = credentials.Certificate(firebase_cert)
        database_config = {'databaseURL': firebase_db_url}
        app = initialize_app(firebase_creds, database_config)