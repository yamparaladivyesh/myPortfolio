from sqlalchemy import Column, Integer, String, Text
from app.config.db import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255))

    technologies = Column(Text)

    description = Column(Text)

    features = Column(Text)

    githubLink = Column(Text)

    liveLink = Column(Text)

    order = Column(Integer)