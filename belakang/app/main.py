from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db, close_db
from dotenv import load_dotenv

from app.apis.base import base_router 
from app.apis.shortener import shortener_router 

import os

load_dotenv()
app = FastAPI(title="Pemendek Tautan", version=os.getenv("VERSION"))

app.add_middleware(
    CORSMiddleware,
    allow_origins       = os.getenv("ALLOW_ORIGINS"),
    allow_credentials   = os.getenv("ALLOW_CREDENTIALS"),
    allow_methods       = os.getenv("ALLOW_METHODS"),
    allow_headers       = os.getenv("ALLOW_HEADERS"),
)

app.include_router(base_router)
app.include_router(shortener_router)

@app.on_event("startup")
def on_startup():

    init_db() if not os.path.exists("./database.db") else print("DB already exists")
    
    
@app.on_event("shutdown")
def on_shutdown():
    close_db()
    
