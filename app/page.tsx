"use client";
import React, { useState } from 'react';

export default function Home() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex h-screen bg-[#F7F6F2] text-[#1A1916] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[220px] bg-white border-r border-[#E2E0D8] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#E2E0D8] flex items-center gap-2">
          <div className="w-7 h-7 bg-[#1B4FD8] rounded-lg flex items-center justify-center text-white font-bold text-xs">IT</div>
          <span className="font-bold text-lg">Invo<span className="text-[#1B4FD8]">Track</span></span>
        </div>

        <nav className="p-3 flex-1 space-y-1">
          <div className="text-[10px] font-bold uppercase text-[#A09E98] px-2 py-2">Overview</div>
          <button
            onClick={() => setActivePage('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activePage === 'dashboard' ? 'bg-[#EEF2FD] text-[#1B4FD8] font-medium' : 'text-[#6B6860] hover:bg-[#F0EFE9]'}`}
          >
            Dashboard
          </button>

          <div className="text-[10px] font-bold uppercase text-[#A09E98] px-2 py-2 mt-4">Finance</div>
          <button
            onClick={() => setActivePage('invoices')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activePage === 'invoices' ? 'bg-[#EEF2FD] text-[#1B4FD8] font-medium' : 'text-[#6B6860] hover:bg-[#F0EFE9]'}`}
          >
            Invoices
          </button>
        </nav>

        <div className="p-4 border-t border-[#E2E0D8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B4FD8] text-white flex items-center justify-center text-xs font-bold">AK</div>
            <div className="text-xs">
              <div className="font-medium text-black">Alex Khan</div>
              <div className="text-[#A09E98]">Admin · Pro</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {activePage === 'dashboard' && (
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-black">Dashboard</h1>
              <p className="text-sm text-[#6B6860]">Welcome back. Here is your financial summary.</p>
            </header>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: '$24,850', change: '↑ 12%', color: 'text-green-600' },
                { label: 'Outstanding', value: '$7,200', change: '3 unpaid', color: 'text-amber-600' },
                { label: 'Expenses', value: '$8,340', change: '↑ 4%', color: 'text-red-600' },
                { label: 'Net Profit', value: '$16,510', change: '↑ 18%', color: 'text-green-600' }
              ].map((m, i) => (
                <div key={i} className="bg-white p-5 border border-[#E2E0D8] rounded-xl shadow-sm">
                  <div className="text-[11px] font-bold uppercase text-[#A09E98] mb-2">{m.label}</div>
                  <div className="text-2xl font-bold font-mono tracking-tighter text-black">{m.value}</div>
                  <div className={`text-xs mt-1 ${m.color}`}>{m.change}</div>
                </div>
              ))}
            </div>

            {/* THE INVOICE TABLE (This is the part you wanted to add) */}
            <div className="bg-white border border-[#E2E0D8] rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#E2E0D8] flex justify-between items-center">
                <span className="font-bold text-sm text-black">Recent Invoices</span>
                <button className="text-[#1B4FD8] text-xs font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-[#F7F6F2] text-[#A09E98] uppercase text-[10px] font-bold">
                      <th className="px-6 py-3">Invoice #</th>
                      <th className="px-6 py-3">Client</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E0D8]">
                    {[
                      { id: 'INV-041', client: 'Acme Corp', amount: '$3,200', status: 'Pending', sColor: 'bg-orange-100 text-orange-600' },
                      { id: 'INV-040', client: 'Brightwave', amount: '$1,800', status: 'Overdue', sColor: 'bg-red-100 text-red-600' },
                      { id: 'INV-039', client: 'NovaTech', amount: '$5,750', status: 'Paid', sColor: 'bg-green-100 text-green-600' },
                    ].map((inv, idx) => (
                      <tr key={idx} className="hover:bg-[#F7F6F2] transition-colors text-black">
                        <td className="px-6 py-4 font-mono text-xs">{inv.id}</td>
                        <td className="px-6 py-4 font-medium">{inv.client}</td>
                        <td className="px-6 py-4 font-mono">{inv.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${inv.sColor}`}>
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activePage === 'invoices' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-black">Invoices Page</h1>
            <p className="text-[#A09E98]">This is where you will manage all your billing details.</p>
          </div>
        )}
      </main>
    </div>
  );
}