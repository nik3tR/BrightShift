from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()  # Reads .env file

SUPABASE_URL = os.getenv("SUPABASE_URL")
print(SUPABASE_URL)
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


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

client = genai.Client()

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
    
@app.get("/history/{user_id}")
def get_history(user_id: str):
    res = supabase.table("reframes").select("id, original, reframe").eq("user_id", user_id).order("created_at", desc=True).execute()
    return res.data


class SaveReframe(BaseModel):
    user_id: str | None = None
    original: str
    reframed: str

@app.post("/save_reframe")
def save_reframe(entry: SaveReframe):
    res = supabase.table("reframes").insert({
        "user_id": entry.user_id,
        "original": entry.original,
        "reframe": entry.reframed
    }).execute()
    return {"status": "saved", "data": res.data}

@app.delete("/delete_reframe/{id}")
def delete_reframe(id: str):
    supabase.table("reframes").delete().eq("id", id).execute()
    return {"status": "deleted"}
