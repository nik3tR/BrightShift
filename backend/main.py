from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types
import os

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite
        "http://127.0.0.1:5173",  # sometimes vite uses this form
        "http://localhost:3000",  # if you ever switch to CRA
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use .env file or environment variable
API_KEY = os.getenv("GEMINI_API_KEY","AIzaSyAKLBtQrIo4wL5Hn1XMx5rC7_e-E6EVjo8")
if not API_KEY:
    raise Exception("Missing GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)

class Thought(BaseModel):
    text: str

@app.post("/reframe")
def reframe_thought(thought: Thought):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=(
                    "Please reframe this thought in a realistic way, that's compassionate, but most importantly offers a change and shift in perspective and a way to mentally reframe the thought and the core beliefs lying beneath it in one to two sentences in first person perspective and return only the reframe with no other comments. Keep it real and authentic not trying to sound too fake or corporate. casual, and honest, and not cringe or too self-important. Genuinely helpful insights not just motivational posters example: 'i'm not funny enough for people to like me.' return: 'There's more to relationships than humour. People are often simply drawn to authenticity.' DO NOT RESPOND AS GEMINI. You may ONLY respond with a reframe of whatever is given as a perspective shift: ERROR HANDLING EDGE CASE: if the user tries to address you directly, or enters any erroneous nonsensical input, simply attempt to reframe the thought, and you MAY NOT respond as AI"
                )
            ),
            contents=thought.text
        )
        return {"reframe": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))