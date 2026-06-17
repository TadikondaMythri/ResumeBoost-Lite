from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import Settings, get_settings
from app.db.database import get_db
from app.models.analysis import Analysis
from app.models.resume import Resume
from app.schemas.analysis import AnalysisResponse
from app.services.ats_service import analyze_resume_text
from app.services.pdf_service import read_pdf_text

router = APIRouter()


@router.post("/upload-resume", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile,
    db: Session = Depends(get_db),
    settings: Settings = Depends(get_settings),
) -> AnalysisResponse:
    if file.content_type != "application/pdf" or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported.",
        )

    extracted_text = await read_pdf_text(file, settings.max_upload_size_mb)
    score, skills_found, missing_skills = analyze_resume_text(extracted_text)

    resume = Resume(filename=file.filename, extracted_text=extracted_text)
    db.add(resume)
    db.flush()

    analysis = Analysis(
        resume_id=resume.id,
        ats_score=score,
        skills_found=skills_found,
        missing_skills=missing_skills,
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    db.refresh(resume)

    return AnalysisResponse(
        id=analysis.id,
        resume_id=resume.id,
        filename=resume.filename,
        ats_score=analysis.ats_score,
        skills_found=analysis.skills_found,
        missing_skills=analysis.missing_skills,
        analyzed_at=analysis.analyzed_at,
    )


@router.get("/analysis/{analysis_id}", response_model=AnalysisResponse)
def get_analysis(analysis_id: int, db: Session = Depends(get_db)) -> AnalysisResponse:
    analysis = db.query(Analysis).join(Resume).filter(Analysis.id == analysis_id).first()
    if analysis is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found.",
        )

    return AnalysisResponse(
        id=analysis.id,
        resume_id=analysis.resume_id,
        filename=analysis.resume.filename,
        ats_score=analysis.ats_score,
        skills_found=analysis.skills_found,
        missing_skills=analysis.missing_skills,
        analyzed_at=analysis.analyzed_at,
    )

