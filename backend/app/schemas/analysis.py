from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AnalysisResponse(BaseModel):
    id: int
    resume_id: int
    filename: str
    ats_score: float
    skills_found: list[str]
    missing_skills: list[str]
    analyzed_at: datetime

    model_config = ConfigDict(from_attributes=True)

