from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv('DB_URL')
connect_args = {"check_same_thread": False}
engine = create_engine(DB_URL, connect_args=connect_args, echo=True)


def get_session():
    with Session(engine) as session:
        yield session
        
        
def init_db():
    SQLModel.metadata.create_all(engine)


def close_db():
    engine.dispose(True)