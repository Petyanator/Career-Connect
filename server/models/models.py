from app import db

class Search_info(db.Model):
    __tablename__ = "final_project_objects"

    search_id = db.Column(db.Integer, primary_key = True)
    job_type = db.Column(db.String(255), nullable = False)

    def to_json(self):
        return {
            "id": self.search_id,
            "job_type": self.job_type
        }