from io import BytesIO
import re

from fastapi import HTTPException, UploadFile, status
from pypdf import PdfReader
from pypdf.errors import PdfReadError


async def read_pdf_text(file: UploadFile, max_upload_size_mb: int) -> str:
    content = await file.read()
    max_size = max_upload_size_mb * 1024 * 1024

    if len(content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"PDF must be {max_upload_size_mb}MB or smaller.",
        )

    try:
        reader = PdfReader(BytesIO(content))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    except PdfReadError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded PDF could not be read.",
        ) from exc

    normalized = normalize_text(text)
    if not normalized:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="The uploaded PDF does not contain extractable text.",
        )

    return normalized


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower()).strip()

