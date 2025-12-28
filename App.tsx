
import React, { useState } from 'react';
import { Tab } from './types';
import { BACKEND_CODE, BOT_CODE, SQL_SCHEMA, README_TEXT } from './constants';
import CodeBlock from './components/CodeBlock';
import BotSimulation from './components/BotSimulation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.OVERVIEW:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-server text-indigo-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">FastAPI Backend</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Robust Python-based REST API handling user sessions, authentication, and dynamic reply templates stored in SQL.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-brands fa-telegram text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Aiogram 3 Bot</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  High-performance asynchronous Telegram bot with state machine for user registration and keyword-based FAQ.
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <i className="fa-solid fa-database text-emerald-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">PostgreSQL Schema</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Normalized database structure for users, tokens, and templates with initial seeding scripts.
                </p>
              </div>
            </div>

            <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <i className="fa-solid fa-code-branch text-9xl"></i>
               </div>
               <h2 className="text-3xl font-black mb-4">Full Stack Interaction Flow</h2>
               <div className="space-y-4">
                 <div className="flex items-start space-x-4">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                   <div>
                     <h4 className="font-bold text-indigo-300">Auth Gatekeeping</h4>
                     <p className="text-slate-400 text-sm">Bot checks backend for registered <code>telegram_id</code>. Redirects to registration if missing.</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-4">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                   <div>
                     <h4 className="font-bold text-indigo-300">Template Logic</h4>
                     <p className="text-slate-400 text-sm">Keyword detected → Bot fetches corresponding <code>content</code> from <code>reply_templates</code> table.</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-4">
                   <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                   <div>
                     <h4 className="font-bold text-indigo-300">FastAPI Middleware</h4>
                     <p className="text-slate-400 text-sm">Backend manages secure hashing and time-expiring session tokens for the bot state.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        );
      case Tab.BACKEND:
        return <CodeBlock code={BACKEND_CODE} language="python" filename="main.py" />;
      case Tab.BOT:
        return <CodeBlock code={BOT_CODE} language="python" filename="bot.py" />;
      case Tab.DATABASE:
        return <CodeBlock code={SQL_SCHEMA} language="sql" filename="schema.sql" />;
      case Tab.SIMULATION:
        return (
          <div className="h-full flex flex-col">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold">Bot Logic Simulator</h2>
              <p className="text-slate-400 text-sm">Interact with a simulated version of the bot logic powered by Gemini.</p>
            </div>
            <div className="flex-1 min-h-0">
              <BotSimulation />
            </div>
          </div>
        );
      case Tab.README:
        return (
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 custom-scrollbar overflow-auto h-full prose prose-invert prose-indigo max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
              {README_TEXT}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      {/* Sidebar / Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <i className="fa-solid fa-terminal text-white"></i>
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                BOT_ARCHITECT
              </span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {[
                { id: Tab.OVERVIEW, label: 'Overview', icon: 'fa-house' },
                { id: Tab.BACKEND, label: 'Backend', icon: 'fa-server' },
                { id: Tab.BOT, label: 'Bot Logic', icon: 'fa-robot' },
                { id: Tab.DATABASE, label: 'SQL Schema', icon: 'fa-database' },
                { id: Tab.SIMULATION, label: 'Simulation', icon: 'fa-play' },
                { id: Tab.README, label: 'Docs', icon: 'fa-book' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-xs">
          Built with React & Gemini API | Telegram Bot & Backend Architecture Generator
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 grid grid-cols-6 h-16 z-50">
        {[
          { id: Tab.OVERVIEW, icon: 'fa-house' },
          { id: Tab.BACKEND, icon: 'fa-server' },
          { id: Tab.BOT, icon: 'fa-robot' },
          { id: Tab.DATABASE, icon: 'fa-database' },
          { id: Tab.SIMULATION, icon: 'fa-play' },
          { id: Tab.README, icon: 'fa-book' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center justify-center transition-colors ${
              activeTab === item.id ? 'text-indigo-500' : 'text-slate-500'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
