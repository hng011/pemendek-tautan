from sqlmodel import SQLModel, Field


class Link(SQLModel, table=True):
    id: str = Field(primary_key=True, unique=True)
    original: str
    short: str = Field(unique=True)