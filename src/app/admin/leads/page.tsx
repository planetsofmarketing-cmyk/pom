'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  serviceInterestedIn: string;
  monthlyBudgetINR: string;
  mission: string;
  createdAt: string;
  updatedAt?: string;
  status: 'new' | 'contacted' | 'converted' | 'rejected';
  source: string;
}

type StatusType = 'new' | 'contacted' | 'converted' | 'rejected';

const statusColors: Record<StatusType, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'New' },
  contacted: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Contacted' },
  converted: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Converted' },
  rejected: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Rejected' },
};

const statusOptions: StatusType[] = ['new', 'contacted', 'converted', 'rejected'];

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'Invalid credentials');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
    } catch {
      setLoginError('Server error. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLeads([]);
    setFilteredLeads([]);
  };

  const fetchLeads = useCallback(async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': `Basic ${token}`,
        },
      });
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        return;
      }
      
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setLeads(data.leads || []);
    } catch {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated, fetchLeads]);

  // Filter and search leads
  useEffect(() => {
    let result = [...leads];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          (lead.companyName && lead.companyName.toLowerCase().includes(query))
      );
    }

    if (dateFrom) {
      result = result.filter((lead) => new Date(lead.createdAt) >= new Date(dateFrom));
    }
    if (dateTo) {
      result = result.filter((lead) => new Date(lead.createdAt) <= new Date(dateTo + 'T23:59:59'));
    }

    setFilteredLeads(result);
  }, [leads, searchQuery, dateFrom, dateTo]);

  // Calculate stats
  useEffect(() => {
    setStats({
      total: leads.length,
      new: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      converted: leads.filter((l) => l.status === 'converted').length,
    });
  }, [leads]);

  const updateStatus = async (id: string, status: StatusType) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead._id === id ? { ...lead, status } : lead))
        );
      }
    } catch {
      setError('Failed to update status');
    }
  };

  const deleteLead = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${token}`,
        },
      });
      if (response.ok) {
        setLeads((prev) => prev.filter((lead) => lead._id !== id));
      }
    } catch {
      setError('Failed to delete lead');
    }
    setDeleteConfirm(null);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Mission', 'Date', 'Status'];
    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone || '',
      lead.companyName || '',
      lead.serviceInterestedIn,
      lead.monthlyBudgetINR || '',
      (lead.mission || '').replace(/"/g, '""'),
      new Date(lead.createdAt).toLocaleDateString(),
      lead.status,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0D1A] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Planet decoration */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute rounded-full border border-purple-500/20 top-1/2 left-1/2 animate-spin" style={{ width: 200, height: 200, transform: 'translate(-50%, -50%) rotate(0deg)', animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
              </div>
              <div className="absolute rounded-full border border-orange-500/20 top-1/2 left-1/2 animate-spin" style={{ width: 140, height: 140, transform: 'translate(-50%, -50%) rotate(0deg)', animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
              </div>
              <div
                className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #FED7AA, #F97316, #7C2D12)',
                  boxShadow: '0 0 30px rgba(249,115,22,0.5), 0 0 60px rgba(249,115,22,0.2)',
                }}
              />
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-8" style={{ border: '1px solid rgba(124,58,237,0.3)' }}>
            <h1 className="text-2xl font-extrabold text-foreground text-center mb-2">Admin Login</h1>
            <p className="text-muted-foreground text-sm text-center mb-6">
              Enter your credentials to access the lead management dashboard.
            </p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#12152A] border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#12152A] border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {loginError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  {loginError}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 rounded-lg font-bold text-foreground transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #A855F7, #F97316)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                }}
              >
                {loginLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-[#0B0D1A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </a>
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">Lead Management</h1>
              <p className="text-muted-foreground mt-1">Manage and track your incoming leads</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              disabled={filteredLeads.length === 0}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Leads</div>
            <div className="text-3xl font-bold text-foreground">{stats.total}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">New</div>
            <div className="text-3xl font-bold text-blue-400">{stats.new}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Contacted</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.contacted}</div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Converted</div>
            <div className="text-3xl font-bold text-green-400">{stats.converted}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12152A] border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground/40 focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-[#12152A] border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-[#12152A] border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Name</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Email</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Phone</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Company</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Service</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Budget</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Mission</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Date</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Status</th>
                  <th className="text-left text-xs uppercase tracking-wider text-muted-foreground p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-muted-foreground">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id} className="border-b border-border/50 hover:bg-white/5">
                      <td className="p-4 text-foreground font-medium">{lead.name}</td>
                      <td className="p-4 text-foreground">{lead.email}</td>
                      <td className="p-4 text-muted-foreground">{lead.phone || '—'}</td>
                      <td className="p-4 text-muted-foreground">{lead.companyName || '—'}</td>
                      <td className="p-4 text-foreground text-sm">{lead.serviceInterestedIn}</td>
                      <td className="p-4 text-muted-foreground text-sm">{lead.monthlyBudgetINR || '—'}</td>
                      <td className="p-4 text-muted-foreground text-sm max-w-xs truncate">{lead.mission || '—'}</td>
                      <td className="p-4 text-muted-foreground text-sm">{formatDate(lead.createdAt)}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value as StatusType)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status].bg} ${statusColors[lead.status].text}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {statusColors[status].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        {deleteConfirm === lead._id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => deleteLead(lead._id)}
                              className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-xs hover:bg-gray-500/30"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(lead._id)}
                            className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-muted-foreground text-sm">
          Showing {filteredLeads.length} of {leads.length} leads
        </div>
      </div>
    </div>
  );
}