from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    '''Application Configuration'''
    MONGO_URI = os.getenv('MONGO_URI')
    SECRET_KEY = os.getenv('SECRET_KEY')
    DEBUG = True
