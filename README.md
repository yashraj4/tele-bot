<div align="center">

# 🤖 Telegram Bot Architect

### A Comprehensive Developer Suite for Full-Stack Bot Development

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Generate, visualize, and simulate a complete Telegram bot ecosystem with FastAPI backend, PostgreSQL database, and AI-powered interaction testing.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-how-to-use) • [Deployment](#-deploying-the-generated-code) • [Troubleshooting](#-troubleshooting)

---

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [How to Use](#-how-to-use)
- [Deploying the Generated Code](#-deploying-the-generated-code)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Features Breakdown](#-features-breakdown)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Telegram Bot Architect** is an all-in-one developer tool that generates production-ready code for a complete Telegram bot ecosystem. It includes:

- 🐍 **FastAPI Backend** with authentication and template management
- 🤖 **Aiogram 3 Bot** with state machine and FAQ system
- 🗄️ **PostgreSQL Schema** with seed data
- 🎮 **Interactive Simulator** powered by Google Gemini AI
- 📝 **Copy-Ready Code** for immediate deployment

No more starting from scratch—get a fully functional bot architecture in minutes!

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🏗️ Code Generation
- Complete FastAPI backend implementation
- Aiogram 3 bot with async architecture
- PostgreSQL schema with relationships
- All code is production-ready

</td>
<td width="50%">

### 🎨 Modern UI
- Sleek, dark-themed interface
- Responsive design for all devices
- Syntax-highlighted code blocks
- One-click copy functionality

</td>
</tr>
<tr>
<td width="50%">

### 🤖 AI-Powered Simulation
- Test bot logic before deployment
- Gemini AI mimics real bot behavior
- Maintains conversation context
- Perfect for rapid prototyping

</td>
<td width="50%">

### 📚 Comprehensive Docs
- Step-by-step deployment guide
- Architecture diagrams
- API endpoint documentation
- Best practices included

</td>
</tr>
</table>

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | Running the React application |
| **npm** | v9+ | Package management |
| **Gemini API Key** | Latest | Powers the bot simulator |

> **Getting a Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your free API key.

---

## 📦 Installation

Follow these steps to get the project up and running:

### 1️⃣ Clone or Download the Project

```bash
# If using git
git clone <your-repo-url>
cd telegram-bot-architect

# Or download and extract the ZIP file
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript and Vite.

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory.

### 4️⃣ Run the Development Server

```bash
npm run dev
```

### 5️⃣ Open Your Browser

Navigate to:
```
http://localhost:3000
```

🎉 **You're all set!** The application should now be running.

---

## 🎯 How to Use

The application features six main tabs, each serving a specific purpose:

### 📊 **1. Overview Tab**

View the high-level architecture and understand how components interact:

- **FastAPI Backend**: Handles authentication, sessions, and templates
- **Aiogram 3 Bot**: Processes user commands and messages
- **PostgreSQL Database**: Stores users, sessions, and reply templates

**Interaction Flow**:
1. ✅ Auth Gatekeeping → Bot verifies user registration
2. 🔍 Template Logic → Keywords trigger database lookups
3. 🔐 FastAPI Middleware → Manages secure tokens

---

### 🖥️ **2. Backend Tab**

Copy the complete **FastAPI backend code** (`main.py`). This includes:

**Features**:
- ✅ Database models (Users, Sessions, Templates)
- ✅ User registration endpoint with token generation
- ✅ Authentication checking endpoint
- ✅ Template retrieval by keyword
- ✅ SQLAlchemy ORM integration
- ✅ Session token expiration logic

**Key Endpoints**:
```python
POST   /register              # Create new user
GET    /check-auth/{telegram_id}  # Verify registration
GET    /templates/{key}       # Fetch reply template
```

---

### 🤖 **3. Bot Logic Tab**

Copy the **Aiogram 3 bot implementation** (`bot.py`). This includes:

**Features**:
- ✅ Command handlers (`/start`, `/register`)
- ✅ FSM (Finite State Machine) for registration flow
- ✅ Async HTTP calls to backend API
- ✅ Keyword-based auto-FAQ system
- ✅ Template-driven responses

**Supported Commands**:
- `/start` - Initiates bot interaction
- `/register` - Begins user registration
- Keywords: `help`, `contact`, `hours` - Trigger FAQ responses

---

### 🗄️ **4. SQL Schema Tab**

Copy the **PostgreSQL database schema** (`schema.sql`). This includes:

**Tables**:
```sql
📁 users          # User accounts with authentication
📁 sessions       # Session tokens with expiration
📁 reply_templates # Dynamic bot responses
```

**Features**:
- ✅ Normalized schema design
- ✅ Foreign key relationships
- ✅ Indexes for performance
- ✅ Seed data for 6 default templates

---

### 🎮 **5. Simulation Tab**

**Test your bot interactively** without deploying anything!

**How it works**:
1. Type messages as if you're chatting with the real bot
2. See responses in real-time

**Try these commands**:
```
/start
/register
help
contact
hours
What are your working hours?
```

The simulator maintains conversation state, so registration flows work correctly!

---

### 📖 **6. Docs Tab**

View the **complete deployment guide** with:
- Prerequisites and dependencies
- Step-by-step setup instructions
- Configuration guidelines
- Architecture explanations

---

## 🚀 Deploying the Generated Code

Once you've copied the code from the tool, follow these steps to deploy it:

### 🐍 Backend Setup (FastAPI)

#### Step 1: Install Python Dependencies

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary
```

#### Step 2: Configure PostgreSQL

1. **Create a database**:
   ```sql
   CREATE DATABASE telegram_bot_db;
   ```

2. **Run the schema script**:
   - Copy the SQL from the "SQL Schema" tab
   - Execute it in your PostgreSQL client (pgAdmin, DBeaver, etc.)

3. **Update connection string** in `main.py`:
   ```python
   SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/telegram_bot_db"
   ```
   Replace `user`, `password`, and `localhost` with your credentials.

#### Step 3: Start the Backend

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

**Test it**:
```bash
curl http://localhost:8000/templates/greeting
```

---

### 🤖 Bot Setup (Aiogram 3)

#### Step 1: Get a Bot Token

1. Open Telegram and message [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow the instructions
3. Copy your bot token (looks like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

#### Step 2: Install Dependencies

```bash
pip install aiogram aiohttp
```

#### Step 3: Configure the Bot

Update these variables in `bot.py`:

```python
API_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'  # From BotFather
BACKEND_URL = 'http://localhost:8000'  # Your FastAPI server
```

#### Step 4: Run the Bot

```bash
python bot.py
```

✅ **Success!** Your bot is now online. Open Telegram and send `/start` to your bot.

---

### 🔄 Complete Flow Test

1. **Start the backend**: `uvicorn main:app --reload`
2. **Start the bot**: `python bot.py`
3. **Open Telegram** and message your bot
4. Try this sequence:
   ```
   /start
   /register
   [enter any password]
   help
   contact
   hours
   ```

---

## 📁 Project Structure

```
telegram-bot-architect/
│
├── 📄 index.html              # Entry HTML with CDN imports
├── 📄 index.tsx               # React application entry point
├── 📄 App.tsx                 # Main application component & routing
├── 📄 vite.config.ts          # Vite build configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 .gitignore              # Git ignore rules
│
├── 📂 components/
│   ├── BotSimulation.tsx      # Interactive chat simulator
│   └── CodeBlock.tsx          # Syntax-highlighted code viewer
│
├── 📄 constants.tsx           # Generated code templates
│                              # (Backend, Bot, SQL, README)
│
└── 📄 types.ts                # TypeScript interfaces
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `App.tsx` | Main component with tab navigation and content rendering |
| `BotSimulation.tsx` | Chat interface with Gemini AI integration |
| `constants.tsx` | Contains all generated code templates |
| `vite.config.ts` | Exposes environment variables to the app |

---

## 🔧 Technologies Used

### Frontend Stack

<table>
<tr>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="React"/>
<br><strong>React 19</strong>
<br><sub>UI Framework</sub>
</td>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript"/>
<br><strong>TypeScript</strong>
<br><sub>Type Safety</sub>
</td>
<td align="center" width="25%">
<img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="48" height="48" alt="Tailwind"/>
<br><strong>Tailwind CSS</strong>
<br><sub>Styling</sub>
</td>
<td align="center" width="25%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" width="48" height="48" alt="Vite"/>
<br><strong>Vite</strong>
<br><sub>Build Tool</sub>
</td>
</tr>
</table>

### Backend Stack (Generated)

<table>
<tr>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" width="48" height="48" alt="FastAPI"/>
<br><strong>FastAPI</strong>
<br><sub>REST API</sub>
</td>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="48" height="48" alt="Python"/>
<br><strong>Python 3.9+</strong>
<br><sub>Backend Language</sub>
</td>
<td align="center" width="33%">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="48" height="48" alt="PostgreSQL"/>
<br><strong>PostgreSQL</strong>
<br><sub>Database</sub>
</td>
</tr>
</table>

### AI & Bot Framework

- **Aiogram 3**: Async Telegram Bot framework
- **SQLAlchemy**: Python ORM for database operations

---

## 🎨 Features Breakdown

### 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Bot
    participant API as Backend
    participant DB as Database

    U->>B: /start
    B->>API: GET /check-auth/{telegram_id}
    API->>DB: Query users table
    DB-->>API: User not found
    API-->>B: authenticated: false
    B->>U: Please /register

    U->>B: /register
    B->>U: Enter password
    U->>B: mypassword123

    B->>API: POST /register
    API->>DB: INSERT INTO users
    API->>DB: INSERT INTO sessions (token)
    DB-->>API: Success
    API-->>B: {token: "xyz..."}
    B->>U: ✅ Registration successful!
```

**Key Points**:
1. Bot checks if `telegram_id` exists in database
2. If not registered, user must complete `/register` flow
3. Backend generates secure session token
4. Bot can now access protected features

---

### 🗂️ Template System

All bot responses are stored in the database, not hardcoded:

```sql
SELECT content FROM reply_templates WHERE key = 'help_info';
```

**Benefits**:
- ✅ Update bot text without redeploying code
- ✅ Support multiple languages by querying different keys
- ✅ A/B test different message variations
- ✅ Use variables like `{username}` for personalization

**Example Templates**:
```
Key: greeting
Content: "Hello! Welcome to our automated Telegram assistant."

Key: working_hours
Content: "We are open Monday to Friday, 9:00 AM - 6:00 PM."
```

---

### 🎮 Bot Simulator

The simulator uses **Gemini AI** to roleplay as your bot:

**System Instruction**:
```
You are simulating a Telegram Bot that:
1. Checks if user is registered
2. Handles /start and /register commands
3. Responds to keywords: help, contact, hours
4. Uses specific template text from the database
```

**Features**:
- Maintains conversation history
- Follows state machine logic
- Perfect for testing before writing any code

---

## 🐛 Troubleshooting

### Issue: Simulation Not Working

**Symptoms**: Bot doesn't respond, or shows "Error communicating with simulated backend"

**Solutions**:
1. ✅ Verify env variables are set correctly in `.env.local`
2. ✅ Restart the dev server: `npm run dev`
3. ✅ Check browser console (F12) for errors
4. ✅ Ensure your API key is valid


---

### Issue: Port Already in Use

**Symptoms**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:
```bash
# Option 1: Kill the process
lsof -ti:3000 | xargs kill -9

# Option 2: Use a different port
# Edit vite.config.ts:
server: {
  port: 3001  // Change this
}
```

---

### Issue: Styling Issues / Blank Page

**Symptoms**: No styles applied, or white screen

**Solutions**:
1. ✅ Clear browser cache (Ctrl+Shift+Delete)
2. ✅ Verify Tailwind CDN is loading:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```
3. ✅ Check browser console for CORS errors
4. ✅ Try incognito/private browsing mode

---

### Issue: Backend Connection Fails

**Symptoms**: Bot shows "Error communicating with backend" in production

**Solutions**:
1. ✅ Ensure backend is running: `curl http://localhost:8000/templates/greeting`
2. ✅ Check `BACKEND_URL` in `bot.py` matches your API
3. ✅ Verify firewall isn't blocking port 8000
4. ✅ Check FastAPI logs for errors

---

### Issue: Database Connection Errors

**Symptoms**: `sqlalchemy.exc.OperationalError: could not connect to server`

**Solutions**:
1. ✅ Verify PostgreSQL is running: `pg_isready`
2. ✅ Check connection string format:
   ```python
   postgresql://username:password@host:port/database
   ```
3. ✅ Ensure database exists: `psql -l`
4. ✅ Test connection: `psql -U username -d telegram_bot_db`

---

## 🤝 Contributing

This is a generated project template designed for customization. You're encouraged to:

- ✨ Add new features (e.g., admin panel, analytics)
- 🎨 Customize the UI theme
- 🤖 Extend bot commands
- 📊 Add more database tables
- 🧪 Improve the simulation logic

**Contribution Ideas**:
- Docker Compose setup for easy deployment
- Admin dashboard for managing templates
- Multi-language support
- Webhook deployment guide
- Unit tests for backend/bot

---

## 📄 License

This project is provided **as-is** for educational and development purposes.

You are free to:
- ✅ Use it for personal projects
- ✅ Modify the code
- ✅ Deploy it commercially
- ✅ Share it with others

**No warranty is provided**. Use at your own risk.

---

## 🙏 Acknowledgments

Built with amazing open-source technologies:
- [React](https://reactjs.org/) - UI Framework
- [FastAPI](https://fastapi.tiangolo.com/) - Backend Framework
- [Aiogram](https://docs.aiogram.dev/) - Telegram Bot Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling Framework

---

## 📞 Support & Resources

### Documentation Links
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Aiogram 3 Docs](https://docs.aiogram.dev/en/latest/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

### Getting Help
- 🐛 **Bug Reports**: Open an issue with detailed steps to reproduce
- 💡 **Feature Requests**: Describe your use case and proposed solution
- 💬 **Questions**: Check existing issues or create a new discussion

---

<div align="center">

### 🌟 If you found this useful, give it a star! ⭐

**Built with ❤️ using React and Vite**

[⬆ Back to Top](#-telegram-bot-architect)

</div>
