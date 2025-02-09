from . import *


load_dotenv()
shortener_router = APIRouter()
url_pattern = re.compile(r'^http(s?):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$')  

@shortener_router.get("/")
async def root():
    
    return {"status": "success", "msg": "woe rek", "version": os.getenv("VERSION")}

@shortener_router.post("/getall")
async def get_all_links(req: PayloadGetAllLinks, request: Request, session: Session = Depends(get_session)):
    
    if (req.cred == os.getenv("CRED_GET_ALL_DATA")):
        return {"status":"success", "msg": "Yahahaha", "base_url":str(request.base_url), "data": session.exec(select(Link)).all()}
    return {"status": "err", "msg": "YHAHAAHAHHAAHAHAHAHAAHAHAHAHAAHAHHAHHHAHAHAHAHAHHAHAHAHHAHAHAHA JMBLO"}


@shortener_router.post("/memendek")
async def generate_short_link(req: PayloadAddData, request: Request, session:Session = Depends(get_session)):
      
    if not url_pattern.match(req.original_link):
        return {"status":"err", "msg": "invalid link"}
    
    link = session.exec(select(Link).where(Link.original == req.original_link)).first() 

    if (link):
        return {"status":"err", "msg": f"{req.original_link} dh ad", "short_link": str(request.base_url) + str(link.short)}
        
    new_link:Link = Link(id=random_string(length=5), original=req.original_link, short=random_string())
    shortened_link = str(request.base_url) + new_link.short
    session.add(new_link)
    session.commit()
    session.refresh(new_link)
    return {"status": "success", "msg": f"telah memendek menjadi {shortened_link}", "original": req.original_link, "shortened": shortened_link}


@shortener_router.get("/{short_link}")
async def redirect_original(short_link:str, session:Session = Depends(get_session)):
    
    link:Link = session.exec(
        select(Link).where(Link.short == short_link)
    ).first()    
    
    if not link:
        return {"status":"err", "msg": "link nguawor rek"}
        # raise HTTPException(status_code=404, detail="Link nguawor rek")
    
    return RedirectResponse(url=link.original)


@shortener_router.put("/mengubah")
async def update_link(req: PayloadUpdateOriginalLink, request: Request, session:Session = Depends(get_session)):
    
    if not url_pattern.match(req.new_original_link):
        return {"status":"err", "msg": "invalid link"}
    
    link:Link = session.exec(
        select(Link).where(Link.short == req.link_code)
    ).first()
    
    if not link:
        return {"status":"err", "msg": "shortened link code nguawor rek"}
        # raise HTTPException(status_code=404, detail="Link nguawor rek")
    
    link.original = req.new_original_link
    session.add(link)
    session.commit()
    session.refresh(link)

    return {"status": "success", "msg":"Kebaharuan tautan", "short_link": str(request.base_url)+link.short, "original": link.original}


@shortener_router.delete("/penghapus")
async def delete_link(req: PayloadDeleteData, session:Session = Depends(get_session)):
    
    link:Link = session.exec(
        select(Link).where(Link.short == req.link_code)
    ).first()
    
    if not link:
        return {"status":"err", "msg": "shortened link nguawor rek"}
    
    session.delete(link)
    session.commit()
    return {"status":"success", "msg": "link dihilangkan 🤐"}