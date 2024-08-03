# config.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

db_config = {
    'user': 'root',
    'password': 'rootpassword',
    'host': 'localhost',
    'database': 'mydatabase'
}

openai_api_key = os.getenv("OPENAI_API_KEY")
