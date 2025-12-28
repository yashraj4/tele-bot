
export const BACKEND_CODE = `
import hmac
import hashlib
import secrets
from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# --- DATABASE SETUP ---
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/telegram_bot_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- MODELS ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    telegram_id = Column(String, unique=True, index=True)
    username = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)  # In real app, use bcrypt
    created_at = Column(DateTime, default=datetime.utcnow)

class SessionToken(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    token = Column(String, unique=True, index=True)
    expires_at = Column(DateTime)

class ReplyTemplate(Base):
    __tablename__ = "reply_templates"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    content = Column(Text, nullable=False)

Base.metadata.create_all(bind=engine)

# --- SCHEMAS ---
class UserCreate(BaseModel):
    telegram_id: str
    username: Optional[str] = None
    password: str

class TokenResponse(BaseModel):
    token: str

# --- API ---
app = FastAPI(title="Telegram Bot Backend")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=TokenResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.telegram_id == user.telegram_id).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    
    # Hash password in production!
    new_user = User(
        telegram_id=user.telegram_id,
        username=user.username,
        password_hash=user.password 
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = secrets.token_urlsafe(32)
    session = SessionToken(user_id=new_user.id, token=token, expires_at=datetime.utcnow() + timedelta(days=7))
    db.add(session)
    db.commit()
    
    return {"token": token}

@app.get("/check-auth/{telegram_id}")
def check_auth(telegram_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.telegram_id == telegram_id).first()
    if not user:
        return {"authenticated": False}
    return {"authenticated": True, "username": user.username}

@app.get("/templates/{key}")
def get_template(key: str, db: Session = Depends(get_db)):
    template = db.query(ReplyTemplate).filter(ReplyTemplate.key == key).first()
    if not template:
        return {"content": "I'm sorry, I don't have a template for that."}
    return {"content": template.content}
`;

export const BOT_CODE = `
import asyncio
import logging
import aiohttp
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

# Configuration
API_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'
BACKEND_URL = 'http://localhost:8000'

# Logging
logging.basicConfig(level=logging.INFO)

# Initialization
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# States
class AuthStates(StatesGroup):
    waiting_for_password = State()

# --- HELPERS ---
async def get_backend_data(endpoint: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{BACKEND_URL}/{endpoint}") as response:
            return await response.json()

async def post_backend_data(endpoint: str, data: dict):
    async with aiohttp.ClientSession() as session:
        async with session.post(f"{BACKEND_URL}/{endpoint}", json=data) as response:
            return await response.json()

# --- HANDLERS ---
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    auth_status = await get_backend_data(f"check-auth/{message.from_user.id}")
    
    if auth_status.get("authenticated"):
        template = await get_backend_data("templates/welcome_back")
        await message.answer(template.get("content").format(username=message.from_user.first_name))
    else:
        template = await get_backend_data("templates/greeting")
        await message.answer(template.get("content"))
        await message.answer("Please use /register to create an account.")

@dp.message(Command("register"))
async def cmd_register(message: types.Message, state: FSMContext):
    await message.answer("Please enter a password for your new account:")
    await state.set_state(AuthStates.waiting_for_password)

@dp.message(AuthStates.waiting_for_password)
async def process_password(message: types.Message, state: FSMContext):
    password = message.text
    registration_data = {
        "telegram_id": str(message.from_user.id),
        "username": message.from_user.username,
        "password": password
    }
    
    result = await post_backend_data("register", registration_data)
    if "token" in result:
        await message.answer("Registration successful! You are now logged in.")
        await state.clear()
    else:
        await message.answer("Registration failed. Please try again with /register.")

@dp.message()
async def auto_faq(message: types.Message):
    # Basic keyword matching or NLP can be integrated here
    text = message.text.lower()
    
    if "help" in text:
        key = "help_info"
    elif "contact" in text:
        key = "contact_info"
    elif "hours" in text:
        key = "working_hours"
    else:
        key = "unknown_query"
        
    template = await get_backend_data(f"templates/{key}")
    await message.answer(template.get("content"))

async def main():
    await dp.start_polling(bot)

if __name__ == '__main__':
    asyncio.run(main())
`;

export const SQL_SCHEMA = `
-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(100),
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Sessions Table
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- Create Reply Templates Table
CREATE TABLE reply_templates (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    content TEXT NOT NULL
);

-- Seed Initial Templates
INSERT INTO reply_templates (key, content) VALUES
('greeting', 'Hello! Welcome to our automated Telegram assistant. To get started, you need to register.'),
('welcome_back', 'Welcome back, {username}! How can I help you today?'),
('help_info', 'You can use this bot to check our services. Available keywords: help, contact, hours.'),
('contact_info', 'You can reach us at support@example.com or call +123456789.'),
('working_hours', 'We are open Monday to Friday, 9:00 AM - 6:00 PM.'),
('unknown_query', 'I am sorry, I did not understand that. Try typing "help".');
`;

export const README_TEXT = `
# Telegram Bot & FastAPI Backend

A complete ecosystem for an authenticated Telegram bot with a persistent template system.

## Features
- **Authentication**: Users must register via Telegram before accessing full features.
- **Dynamic Templates**: Common replies are stored in SQL for easy management without code changes.
- **REST Backend**: FastAPI manages users, sessions, and template retrieval.
- **Async Bot**: Built with Aiogram 3.x for high performance.

## Prerequisites
- Python 3.9+
- PostgreSQL
- Telegram Bot Token (from @BotFather)

## Quick Start

1. **Setup Database**:
   - Run the provided SQL schema in your PostgreSQL instance.
   - Update the connection string in \`main.py\`.

2. **Run Backend**:
   \`\`\`bash
   pip install fastapi uvicorn sqlalchemy psycopg2-binary
   uvicorn main:app --reload
   \`\`\`

3. **Run Bot**:
   - Install dependencies: \`pip install aiogram aiohttp\`
   - Update \`API_TOKEN\` and \`BACKEND_URL\` in \`bot.py\`.
   \`\`\`bash
   python bot.py
   \`\`\`

4. **Initialize Templates**:
   The SQL schema includes seed data. You can add more via direct SQL or by adding a POST endpoint to the FastAPI app.

## Webhook Deployment (Optional)
To use webhooks instead of polling:
1. Use \`bot.set_webhook(url)\` in \`bot.py\`.
2. Ensure your FastAPI server has a public HTTPS URL (use ngrok for local testing).
`;
