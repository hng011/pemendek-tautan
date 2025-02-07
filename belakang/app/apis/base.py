from . import *


load_dotenv()
base_router = APIRouter()


@base_router.get("/")
async def root():
    
    return {"status": "success", "msg": "woe rek", "version": os.getenv("VERSION")}