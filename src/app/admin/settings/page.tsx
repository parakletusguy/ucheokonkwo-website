"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdcLogo from '@/components/AdcLogo';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  const settingGroups = [
    {
      label: 'Portal',
      items: [
        { icon: 'person', label: 'Administrator', value: 'Hon. Harris Okonkwo', action: null },
        { icon: 'badge', label: 'Role', value: 'Editor & Publisher', action: null },
        { icon: 'language', label: 'Site Languages', value: 'EN, PCM, IG, HA, YO', action: null },
      ],
    },
    {
      label: 'Public Pages',
      items: [
        { icon: 'home', label: 'Homepage', value: '/', action: () => window.open('/', '_blank') },
        { icon: 'person_outline', label: 'About Page', value: '/about', action: () => window.open('/about', '_blank') },
        { icon: 'map', label: 'Constituency', value: '/constituency', action: () => window.open('/constituency', '_blank') },
        { icon: 'newspaper', label: 'Media Hub', value: '/media', action: () => window.open('/media', '_blank') },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      {/* Header */}
      <div className="bg-[var(--midnight-green)] text-white px-4 pt-8 pb-6">
        <div className="h-1 w-full flex mb-6 rounded-full overflow-hidden">
          <div className="flex-1 bg-[var(--midnight-green)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
        </div>
        <h1 className="text-2xl font-bold serif-font">Settings</h1>
        <p className="text-blue-200 text-sm mt-1">Portal configuration</p>
      </div>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        
        {/* ADC Identity Card */}
        <div className="bg-[var(--midnight-green)] rounded-2xl p-5 flex items-center gap-4 shadow-sm">
          <AdcLogo size={52} />
          <div>
            <p className="text-white font-bold text-base">Uche Okonkwo Campaign</p>
            <p className="text-[var(--sunlight-yellow)] text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">
              African Democratic Congress
            </p>
            <p className="text-blue-200 text-xs mt-1">Idemili North & South</p>
          </div>
        </div>

        {/* Settings groups */}
        {settingGroups.map((group) => (
          <div key={group.label}>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">
              {group.label}
            </h2>
            <div className="bg-white rounded-2xl divide-y divide-gray-50 shadow-sm border border-gray-100 overflow-hidden">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action ?? undefined}
                  disabled={!item.action}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors disabled:cursor-default"
                >
                  <span className="material-symbols-outlined text-xl text-[var(--midnight-green)]">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--obsidian)]">{item.label}</p>
                    <p className="text-xs text-gray-400 truncate">{item.value}</p>
                  </div>
                  {item.action && (
                    <span className="material-symbols-outlined text-base text-gray-300">open_in_new</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 px-1">
            Session
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-red-50 transition-colors group"
            >
              <span className="material-symbols-outlined text-xl text-red-400 group-hover:text-red-500">{loggingOut ? 'hourglass_top' : 'logout'}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-500">{loggingOut ? 'Logging out…' : 'Log Out'}</p>
                <p className="text-xs text-gray-400">End your admin session</p>
              </div>
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest pb-4">
          Portal v1.0 · Uche Okonkwo 2025
        </p>
      </div>
    </div>
  );
}
