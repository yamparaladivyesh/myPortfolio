from app.models.skill_model import Skill
from app.config.db import SessionLocal


def get_skills():

    db = SessionLocal()

    skills = db.query(Skill).all()

    db.close()

    return skills


def add_skill(skill_data):

    db = SessionLocal()

    existing_skill = db.query(Skill).filter(
        Skill.name.ilike(skill_data.name)
    ).first()

    if existing_skill:

        db.close()

        return {
            "message": "Skill already exists"
        }

    max_order_skill = db.query(Skill).filter(
        Skill.category == skill_data.category
    ).order_by(
        Skill.category_order.desc()
    ).first()

    next_order = 1

    if max_order_skill:
        next_order = max_order_skill.category_order + 1

    new_skill = Skill(
        name=skill_data.name,
        category=skill_data.category,
        category_order=next_order
    )

    db.add(new_skill)

    db.commit()

    db.close()

    return {
        "message": "Skill added successfully"
    }


def delete_skill(skill_id):

    db = SessionLocal()

    skill = db.query(Skill).filter(
        Skill.id == skill_id
    ).first()

    if not skill:

        db.close()

        return {
            "message": "Skill not found"
        }

    category = skill.category

    db.delete(skill)

    db.commit()

    remaining_skills = db.query(Skill).filter(
        Skill.category == category
    ).order_by(
        Skill.category_order
    ).all()

    for index, item in enumerate(remaining_skills, start=1):
        item.category_order = index

    db.commit()

    db.close()

    return {
        "message": "Skill deleted successfully"
    }


def reorder_skills(skills_data):

    db = SessionLocal()

    for item in skills_data:

        skill = db.query(Skill).filter(
            Skill.id == item.id
        ).first()

        if skill:
            skill.category_order = item.category_order

    db.commit()

    db.close()

    return {
        "message": "Skills reordered successfully"
    }