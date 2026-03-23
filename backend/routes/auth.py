from fastapi import APIRouter
from models import User
from database import users_collection
from auth_utils import hash_password, verify_password

router = APIRouter()

@router.post("/register")
def register(user: User):
    if users_collection.find_one({"username": user.username}):
        return {"error": "Usuario ya existe"}

    users_collection.insert_one({
        "username": user.username,
        "password": hash_password(user.password)
    })

    return {"msg": "Usuario creado"}

@router.post("/login")
def login(user: User):
    db_user = users_collection.find_one({"username": user.username})

    if not db_user:
        return {"error": "Usuario no existe"}

    if not verify_password(user.password, db_user["password"]):
        return {"error": "Contraseña incorrecta"}

    return {"msg": "Login correcto", "username": user.username}