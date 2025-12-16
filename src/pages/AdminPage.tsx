import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersApi, leadsApi } from '../services/api';
import type { Lead } from '../services/api';
import type { User } from '../types/auth';
import { UserStatus, UserRole } from '../types/auth';
import { 
  Users, FileText, LogOut, CheckCircle, XCircle, 
  Mail, Building, Clock, AlertTriangle, Filter,
  ChevronLeft, ChevronRight, Search, Shield
} from 'lucide-react';

type Tab = 'users' | 'leads';

const priorityColors: Record<number, string> = {
  0: 'bg-zinc-500', // Standard
  1: 'bg-blue-500', // Medium
  2: 'bg-amber-500', // High
  3: 'bg-red-500', // Critical
};

const priorityLabels: Record<number, string> = {
  0: 'Standard',
  1: 'Medium',
  2: 'High',
  3: 'Critical',
};

const statusLabels: Record<number, string> = {
  0: 'New',
  1: 'Contacted',
  2: 'Qualified',
  3: 'Converted',
  4: 'Closed',
};

export function AdminPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, [activeTab, statusFilter]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'users') {
        const response = await usersApi.getUsers({ status: statusFilter, search: searchTerm });
        setUsers(response.data);
        const pendingResponse = await usersApi.getPendingCount();
        setPendingCount(pendingResponse.pendingCount);
      } else {
        const response = await leadsApi.getLeads({ status: statusFilter, search: searchTerm });
        setLeads(response.data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await usersApi.approveUser(userId);
      loadData();
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await usersApi.rejectUser(userId);
      loadData();
    } catch (error) {
      console.error('Failed to reject user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-zinc-100 uppercase tracking-tight">
              Altan<span className="text-cyan-400">.</span>Dynamics
            </Link>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-400 text-sm">
              <span className="text-zinc-100">{user?.fullName}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title & Stats */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-1">Manage users, leads, and platform content</p>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">{pendingCount} pending approval{pendingCount > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-cyan-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Users className="w-4 h-4" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'leads'
                ? 'bg-cyan-500 text-zinc-950'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Lead Management
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-500" />
            <select
              value={statusFilter ?? ''}
              onChange={(e) => setStatusFilter(e.target.value ? Number(e.target.value) : undefined)}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Status</option>
              {activeTab === 'users' ? (
                <>
                  <option value="0">Pending</option>
                  <option value="1">Approved</option>
                  <option value="2">Rejected</option>
                </>
              ) : (
                <>
                  <option value="0">New</option>
                  <option value="1">Contacted</option>
                  <option value="2">Qualified</option>
                  <option value="3">Converted</option>
                  <option value="4">Closed</option>
                </>
              )}
            </select>
          </div>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-zinc-400 mt-4">Loading...</p>
            </div>
          ) : activeTab === 'users' ? (
            <UserTable users={users} onApprove={handleApprove} onReject={handleReject} />
          ) : (
            <LeadTable leads={leads} />
          )}
        </div>
      </div>
    </div>
  );
}

function UserTable({ 
  users, 
  onApprove, 
  onReject 
}: { 
  users: User[]; 
  onApprove: (id: string) => void; 
  onReject: (id: string) => void; 
}) {
  if (users.length === 0) {
    return (
      <div className="p-12 text-center">
        <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400">No users found</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-800 bg-zinc-800/50">
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">User</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Organization</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Registered</th>
          <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400 font-medium">{u.fullName?.charAt(0) || '?'}</span>
                </div>
                <div>
                  <p className="text-zinc-100 font-medium">{u.fullName}</p>
                  <p className="text-zinc-500 text-sm">{u.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <p className="text-zinc-300">{u.organization || '-'}</p>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                u.status === UserStatus.Pending ? 'bg-amber-500/20 text-amber-400' :
                u.status === UserStatus.Approved ? 'bg-green-500/20 text-green-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {u.status === UserStatus.Pending ? <Clock className="w-3 h-3" /> :
                 u.status === UserStatus.Approved ? <CheckCircle className="w-3 h-3" /> :
                 <XCircle className="w-3 h-3" />}
                {u.status === UserStatus.Pending ? 'Pending' :
                 u.status === UserStatus.Approved ? 'Approved' : 'Rejected'}
              </span>
            </td>
            <td className="px-6 py-4">
              <p className="text-zinc-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</p>
            </td>
            <td className="px-6 py-4 text-right">
              {u.status === UserStatus.Pending && (
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onApprove(u.id)}
                    className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(u.id)}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LeadTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="p-12 text-center">
        <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400">No leads found</p>
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-zinc-800 bg-zinc-800/50">
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Contact</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Organization</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Priority</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Status</th>
          <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">Created</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${priorityColors[lead.priority]}`}></div>
                <div>
                  <p className="text-zinc-100 font-medium">{lead.fullName}</p>
                  <p className="text-zinc-500 text-sm">{lead.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <p className="text-zinc-300">{lead.organization}</p>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${priorityColors[lead.priority]}`}>
                {priorityLabels[lead.priority]}
              </span>
            </td>
            <td className="px-6 py-4">
              <p className="text-zinc-300">{statusLabels[lead.status]}</p>
            </td>
            <td className="px-6 py-4">
              <p className="text-zinc-400 text-sm">{new Date(lead.createdAt).toLocaleDateString()}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
