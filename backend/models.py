from pydantic import BaseModel

# ================= USER =================
class User(BaseModel):
    username: str
    password: str

# ================= POST =================
class Post(BaseModel):
    titulo: str
    contenido: str
    autor: str
    imagen: str = ""

# ================= COMMENT =================
class Comment(BaseModel):
    post_id: str
    texto: str