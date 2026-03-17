"use client";

import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  name: string;
  ward: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch('/api/messages')
      .then((r) => r.json())
      .then((data) => { setMessages(data.messages || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      {/* Header */}
      <div className="bg-[var(--midnight-green)] text-white px-4 pt-8 pb-6">
        <div className="h-1 w-full flex mb-6 rounded-full overflow-hidden">
          <div className="flex-1 bg-[var(--midnight-green)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold serif-font">Constituent Inbox</h1>
            <p className="text-blue-200 text-sm mt-1">{messages.length} petition{messages.length !== 1 ? 's' : ''} received</p>
          </div>
          {unread > 0 && (
            <span className="badge-urgent">{unread} new</span>
          )}
        </div>
      </div>

      {/* Message detail overlay */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-lg serif-font text-[var(--obsidian)]">{selected.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)]">{selected.ward}</p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
            <p className="text-[9px] text-gray-300 mt-4">{new Date(selected.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-4xl block mb-3">inbox</span>
            <p className="text-sm">No constituency petitions yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((m) => (
              <button key={m.id} onClick={() => setSelected(m)} className={`w-full text-left bg-white rounded-xl border p-4 flex items-start gap-3 transition-all hover:shadow-sm ${!m.read ? 'border-[var(--sunlight-yellow)]/30' : 'border-gray-100'}`}>
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${!m.read ? 'bg-[var(--sunlight-yellow)]' : 'bg-transparent border border-gray-200'}`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-bold text-sm text-[var(--obsidian)] truncate">{m.name}</p>
                    <p className="text-[9px] text-gray-300 flex-shrink-0">{new Date(m.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] mb-1">{m.ward}</p>
                  <p className="text-xs text-gray-400 truncate">{m.message}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
