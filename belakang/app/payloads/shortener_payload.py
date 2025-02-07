from pydantic import BaseModel


class PayloadAddData(BaseModel):
    original_link: str 
    
class PayloadUpdateOriginalLink(BaseModel):
    link_code: str 
    new_original_link: str
    
class PayloadDeleteData(BaseModel):
    link_code: str
    
class PayloadGetAllLinks(BaseModel):
    cred: str