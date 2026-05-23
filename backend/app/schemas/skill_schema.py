from pydantic import BaseModel


class SkillCreate(BaseModel):
    name: str
    category: str


class SkillReorder(BaseModel):
    id: int
    category_order: int