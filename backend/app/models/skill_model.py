from sqlalchemy import Column, Integer, String
from app.config.db import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255))

    category = Column(String(255))

    category_order = Column(Integer)