import { useEffect, useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, Users, Mail, Shield, ShieldCheck,
  ShieldAlert, Eye, UserPlus, Clock, MoreVertical, X, Loader2,
  CheckCircle, XCircle, Key, LogOut, UserCog
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';

// ─── Types ────────────────────────────────────────────────────────────────────

type UserRole = 'admin' | 'editor' | 'viewer';
type UserStatus = 'active' | 'invited' | 'disabled';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  last_login: string | null;
  created_at: string;
  two_factor: boolean;
}

const emptyUser: UserItem = {
  id: '', name: '', email: '', role: 'viewer', status: 'invited',
  avatar: '', last_login: null, created_at: new Date().toISOString(),
  two_factor: false,
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USERS: UserItem[] = [
  {
    id: '1', name: 'Mohammed Al-Rashid', email: 'mo@travi.world', role: 'admin',
    status: 'active', avatar: '', last_login: '2025-01-23T14:30:00Z',
    created_at: '2024-06-01T10:00:00Z', two_factor: true,
  },
  {
    id: '2', name: 'Kimi Design', email: 'kimi@travi.world', role: 'editor',
    status: 'active', avatar: '', last_login: '2025-01-22T09:15:00Z',
    created_at: '2024-08-15T12:00:00Z', two_factor: false,
  },
  {
    id: '3', name: 'Sarah Chen', email: 'sarah.chen@travi.world', role: 'editor',
    status: 'active', avatar: '', last_login: '2025-01-20T18:45:00Z',
    created_at: '2024-09-01T08:00:00Z', two_factor: true,
  },
  {
    id: '4', name: 'Alex Rodriguez', email: 'alex@travi.world', role: 'viewer',
    status: 'active', avatar: '', last_login: '2025-01-15T11:20:00Z',
    created_at: '2024-10-20T14:00:00Z', two_factor: false,
  },
  {
    id: '5', name: 'Yuki Tanaka', email: 'yuki@travi.world', role: 'editor',
    status: 'invited', avatar: '', last_login: null,
    created_at: '2025-01-20T16:00:00Z', two_factor: false,
  },
  {
    id: '6', name: 'Omar Farouk', email: 'omar@travi.world', role: 'viewer',
    status: 'disabled', avatar: '', last_login: '2024-12-01T10:00:00Z',
    created_at: '2024-07-10T09:00:00Z', two_factor: false,
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: UserRole }) {
  const config: Record<UserRole, { icon: typeof Shield; color: string; bg: string }> = {
    admin: { icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/20' },
    editor: { icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    viewer: { icon: Eye, color: 'text-gray-400', bg: 'bg-gray-500/20' },
  };
  const c = config[role];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${c.bg} ${c.color}`}>
      <Icon className="w-3 h-3" /> {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const config: Record<UserStatus, { color: string; bg: string; label: string }> = {
    active: { color: 'text-green-400', bg: 'bg-green-500/20', label: 'Active' },
    invited: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', label: 'Invited' },
    disabled: { color: 'text-gray-400', bg: 'bg-gray-500/20', label: 'Disabled' },
  };
  const c = config[status];
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.bg} ${c.color}`}>
      {c.label}
    </span>
  );
}

function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = [
    'bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600',
    'bg-cyan-600', 'bg-violet-600', 'bg-pink-600', 'bg-teal-600',
  ];
  const color = colors[name.length % colors.length];
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };

  return (
    <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold`}>
      {initials}
    </div>
  );
}

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'invite' | 'edit'>('invite');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Filtering
  const filtered = users.filter((u) => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !filterRole || u.role === filterRole;
    const matchStatus = !filterStatus || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  // CRUD
  const openInvite = () => {
    setEditing({ ...emptyUser, id: Date.now().toString() });
    setModalMode('invite');
    setModalOpen(true);
  };
  const openEdit = (user: UserItem) => {
    setEditing({ ...user });
    setModalMode('edit');
    setModalOpen(true);
  };
  const saveUser = () => {
    if (!editing || !editing.email.trim()) return;
    setUsers((prev) => {
      const idx = prev.findIndex((u) => u.id === editing.id);
      if (idx >= 0) { const c = [...prev]; c[idx] = editing; return c; }
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };
  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  };
  const toggleStatus = (user: UserItem) => {
    const newStatus: UserStatus = user.status === 'active' ? 'disabled' : 'active';
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: newStatus } : u));
    setActionMenu(null);
  };
  const resendInvite = (user: UserItem) => {
    alert(`Invitation resent to ${user.email}`);
    setActionMenu(null);
  };

  // Stats
  const byRole = { admin: 0, editor: 0, viewer: 0 };
  users.forEach((u) => { byRole[u.role]++; });

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div>
        <TopBar title="Users" />
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading users...
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Users">
        <button onClick={openInvite} className="btn-primary">
          <UserPlus className="w-4 h-4" /> Invite User
        </button>
      </TopBar>

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Users</p>
            <p className="text-2xl font-bold mt-1">{users.length}</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <p className="text-xs text-gray-500 uppercase tracking-wide">Admins</p>
            </div>
            <p className="text-2xl font-bold mt-1">{byRole.admin}</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-gray-500 uppercase tracking-wide">Editors</p>
            </div>
            <p className="text-2xl font-bold mt-1">{byRole.editor}</p>
          </div>
          <div className="card">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-500 uppercase tracking-wide">Viewers</p>
            </div>
            <p className="text-2xl font-bold mt-1">{byRole.viewer}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input className="input pl-10" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="input w-auto min-w-[130px]" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <select className="input w-auto min-w-[130px]" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="invited">Invited</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <p className="text-sm text-gray-500">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</p>

        {/* Users Table */}
        <div className="card overflow-hidden !p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Role</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Last Login</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">2FA</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 md:hidden truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                      <Mail className="w-3.5 h-3.5 text-gray-500" /> {user.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Clock className="w-3.5 h-3.5" /> {timeAgo(user.last_login)}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {user.two_factor ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-600" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                        className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {actionMenu === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActionMenu(null)} />
                          <div className="absolute right-0 top-full mt-1 z-20 bg-gray-700 border border-gray-600 rounded-lg shadow-xl py-1 min-w-[160px]">
                            <button onClick={() => { openEdit(user); setActionMenu(null); }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 flex items-center gap-2">
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => toggleStatus(user)}
                              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 flex items-center gap-2">
                              {user.status === 'active' ? (
                                <><XCircle className="w-3.5 h-3.5" /> Disable</>
                              ) : (
                                <><CheckCircle className="w-3.5 h-3.5" /> Enable</>
                              )}
                            </button>
                            {user.status === 'invited' && (
                              <button onClick={() => resendInvite(user)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" /> Resend Invite
                              </button>
                            )}
                            <button onClick={() => { setActionMenu(null); alert(`Password reset sent to ${user.email}`); }}
                              className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 flex items-center gap-2">
                              <Key className="w-3.5 h-3.5" /> Reset Password
                            </button>
                            <hr className="border-gray-600 my-1" />
                            <button onClick={() => { setActionMenu(null); setDeleteConfirm(user.id); }}
                              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2">
                              <Trash2 className="w-3.5 h-3.5" /> Remove User
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    <Users className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Role Permissions Info */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <UserCog className="w-4 h-4 text-indigo-400" /> Role Permissions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium">Admin</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Full content management</li>
                <li>• User management</li>
                <li>• Site settings</li>
                <li>• API access</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">Editor</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Create & edit content</li>
                <li>• Manage media</li>
                <li>• Publish articles</li>
                <li>• View analytics</li>
              </ul>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">Viewer</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• View all content</li>
                <li>• View analytics</li>
                <li>• No edit permissions</li>
                <li>• No publish access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Remove User</h3>
            <p className="text-sm text-gray-400 mb-4">
              This will permanently remove this user's access. Are you sure?
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => deleteUser(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite / Edit Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}
        title={modalMode === 'invite' ? 'Invite User' : 'Edit User'}>
        {editing && (
          <div className="space-y-4">
            <div>
              <label className="label">Full Name {modalMode === 'invite' && '*'}</label>
              <input className="input" placeholder="John Doe" value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Email Address *</label>
              <input type="email" className="input" placeholder="user@travi.world" value={editing.email}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                disabled={modalMode === 'edit'} />
              {modalMode === 'edit' && (
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed after creation</p>
              )}
            </div>
            <div>
              <label className="label">Role *</label>
              <div className="space-y-2 mt-1">
                {(['admin', 'editor', 'viewer'] as UserRole[]).map((role) => (
                  <label key={role} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    editing.role === role
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}>
                    <input type="radio" name="role" value={role} checked={editing.role === role}
                      onChange={() => setEditing({ ...editing, role })} className="sr-only" />
                    <RoleBadge role={role} />
                    <span className="text-sm text-gray-300 capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>
            {modalMode === 'edit' && (
              <div>
                <label className="label">Status</label>
                <select className="input" value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as UserStatus })}>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
            )}

            {modalMode === 'invite' && (
              <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3">
                <p className="text-xs text-indigo-300">
                  <Mail className="w-3.5 h-3.5 inline mr-1" />
                  An invitation email will be sent with a link to set their password.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button onClick={() => { setModalOpen(false); setEditing(null); }} className="btn-secondary">Cancel</button>
              <button onClick={saveUser} disabled={!editing.email.trim()}
                className="btn-primary disabled:opacity-50">
                {modalMode === 'invite' ? (
                  <><UserPlus className="w-4 h-4" /> Send Invite</>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
