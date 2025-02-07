from fastapi import (
    APIRouter, Depends, HTTPException, Request
)

from sqlmodel import Session, select
from app.models.link import Link
from app.db import get_session
from app.utils.generator import random_string
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv

from app.payloads.shortener_payload import (
    PayloadAddData, PayloadDeleteData, PayloadUpdateOriginalLink, PayloadGetAllLinks
)

import os