
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <i className={`fa-solid ${language === 'python' ? 'fa-brands fa-python text-yellow-500' : 'fa-solid fa-database text-blue-400'}`}></i>
          <span className="text-sm font-mono text-slate-300">{filename}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
        >
          <i className={`fa-solid ${copied ? 'fa-check text-green-500' : 'fa-copy'}`}></i>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="font-mono text-sm text-slate-300 whitespace-pre">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
