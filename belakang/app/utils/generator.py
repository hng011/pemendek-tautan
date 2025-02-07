import random
import string
from sqlmodel import Session, select
from app.db import engine
from app.models.link import Link


def random_string(length:int = 6):
    while True:
        r = "".join(random.choices(string.ascii_letters + string.digits, k=length))
        with Session(engine) as s: # Should I use get_session() from db?
            if not s.exec(select(Link).where(Link.short == r)).first():
                return r