from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    name: str
    email: EmailStr
    age: int


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: int


class UserList(BaseModel):
    users: list[UserPublic]


class Message(BaseModel):
    message: str
