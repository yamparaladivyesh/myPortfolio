from app.models.project_model import Project
from app.config.db import SessionLocal


def get_projects():
    db = SessionLocal()

    projects = db.query(Project).order_by(Project.order).all()

    db.close()

    return projects


def add_project(project_data):
    db = SessionLocal()

    existing_project = db.query(Project).filter(
        Project.title.ilike(project_data.title)
    ).first()

    if existing_project:
        db.close()

        return {
            "message": "Project already exists"
        }

    max_order_project = db.query(Project).order_by(
        Project.order.desc()
    ).first()

    next_order = 1

    if max_order_project:
        next_order = max_order_project.order + 1

    new_project = Project(
        title=project_data.title,
        technologies=project_data.technologies,
        description=project_data.description,
        features=project_data.features,
        githubLink=project_data.githubLink,
        liveLink=project_data.liveLink,
        order=next_order
    )

    db.add(new_project)

    db.commit()

    db.close()

    return {
        "message": "Project added successfully"
    }


def delete_project(project_id):
    db = SessionLocal()

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        db.close()

        return {
            "message": "Project not found"
        }

    db.delete(project)

    db.commit()

    remaining_projects = db.query(Project).order_by(
        Project.order
    ).all()

    for index, project in enumerate(remaining_projects, start=1):
        project.order = index

    db.commit()

    db.close()

    return {
        "message": "Project deleted successfully"
    }


def reorder_projects(projects_data):
    db = SessionLocal()

    for item in projects_data:

        project = db.query(Project).filter(
            Project.id == item.id
        ).first()

        if project:
            project.order = item.order

    db.commit()

    db.close()

    return {
        "message": "Projects reordered successfully"
    }


def update_project(project_id, project_data):
    db = SessionLocal()

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        db.close()

        return {
            "message": "Project not found"
        }

    duplicate_project = db.query(Project).filter(
        Project.title.ilike(project_data.title),
        Project.id != project_id
    ).first()

    if duplicate_project:
        db.close()

        return {
            "message": "Project title already exists"
        }

    project.title = project_data.title
    project.technologies = project_data.technologies
    project.description = project_data.description
    project.features = project_data.features
    project.githubLink = project_data.githubLink
    project.liveLink = project_data.liveLink

    db.commit()

    db.close()

    return {
        "message": "Project updated successfully"
    }