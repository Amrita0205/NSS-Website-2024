import os
class Config:
    '''Application Configuration'''
    MONGO_URI=os.getenv
    SECRET_KEY=os.getenv
    DEBUG=True