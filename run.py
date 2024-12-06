from flask import Flask
from app.utils.extensions import mongo

app = Flask(__name__)
app.config.from_object('app.utils.config.Config')

# Initialize MongoDB
mongo.init_app(app)

@app.route('/')
def home():
    return "Welcome to the NSS Website!"

if __name__ == '__main__':
    app.run(debug=True)
