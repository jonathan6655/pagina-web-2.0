from fastapi import APIRouter
from models import Post, Comment
from database import posts_collection
from bson import ObjectId

router = APIRouter()

# ================= CREAR POST =================
@router.post("/")
def crear_post(post: Post):
    data = post.dict()
    data["likes"] = 0
    posts_collection.insert_one(data)
    return {"msg": "Post creado"}

# ================= OBTENER POSTS =================
@router.get("/")
def obtener_posts():
    posts = []
    for p in posts_collection.find():
        p["_id"] = str(p["_id"])
        posts.append(p)
    return posts

# ================= MIS POSTS =================
@router.get("/user/{username}")
def posts_usuario(username: str):
    posts = []
    for p in posts_collection.find({"autor": username}):
        p["_id"] = str(p["_id"])
        posts.append(p)
    return posts

# ================= LIKE =================
@router.post("/like/{post_id}")
def like(post_id: str):
    posts_collection.update_one(
        {"_id": ObjectId(post_id)},
        {"$inc": {"likes": 1}}
    )
    return {"msg": "like"}

# ================= COMENTAR =================
@router.post("/comment")
def comentar(c: Comment):
    posts_collection.update_one(
        {"_id": ObjectId(c.post_id)},
        {"$push": {"comentarios": c.texto}}
    )
    return {"msg": "comentado"}