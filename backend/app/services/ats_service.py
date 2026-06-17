import re


SKILLS = [
    "Python",
    "Java",
    "SQL",
    "FastAPI",
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Docker",
    "MongoDB",
    "PostgreSQL",
]


def analyze_resume_text(text: str) -> tuple[float, list[str], list[str]]:
    found = [skill for skill in SKILLS if _skill_exists(text, skill)]
    missing = [skill for skill in SKILLS if skill not in found]
    score = round((len(found) / len(SKILLS)) * 100, 2)
    return score, found, missing


def _skill_exists(text: str, skill: str) -> bool:
    escaped = re.escape(skill.lower()).replace(r"\ ", r"\s+")
    pattern = rf"(?<![a-z0-9+#.-]){escaped}(?![a-z0-9+#.-])"
    return re.search(pattern, text) is not None

