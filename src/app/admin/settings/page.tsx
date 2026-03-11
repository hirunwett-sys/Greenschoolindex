'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';
import {
    Users, Plus, Trash2, ArrowLeft,
    Eye, EyeOff, Lock, User, Loader2, Sprout, Shield,
    UserPlus, ChevronRight,
} from 'lucide-react';

interface Admin {
    id: string;
    username: string;
    createdAt: string;
}

interface UserRecord {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    submissionCount: number;
}

type Tab = 'users' | 'admins' | 'add';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function AdminSettingsPage() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>('users');

    // Admins state
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [adminsLoading, setAdminsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Users state
    const [users, setUsers] = useState<UserRecord[]>([]);
    const [usersLoading, setUsersLoading] = useState(false);

    // Add-admin form state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { showToast } = useToast();

    const fetchAdmins = async () => {
        setAdminsLoading(true);
        const res = await fetch('/api/admin/admins');
        if (res.status === 401 || res.status === 403) { router.push('/admin/login'); return; }
        if (res.ok) setAdmins(await res.json());
        setAdminsLoading(false);
        setIsLoading(false);
    };

    const fetchUsers = async () => {
        setUsersLoading(true);
        const res = await fetch('/api/admin/users');
        if (res.ok) setUsers(await res.json());
        setUsersLoading(false);
    };

    useEffect(() => {
        fetchAdmins();
        fetchUsers();
    }, []);

    const handleAddAdmin = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/admin/admins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) { showToast(data.error || 'เกิดข้อผิดพลาด', 'error'); return; }
            showToast(`เพิ่มแอดมิน "${data.username}" สำเร็จ`);
            setUsername('');
            setPassword('');
            fetchAdmins();
        } catch {
            showToast('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`ลบแอดมิน "${name}" ใช่หรือไม่?`)) return;
        setDeletingId(id);
        try {
            const res = await fetch('/api/admin/admins', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (!res.ok) { showToast(data.error || 'เกิดข้อผิดพลาด', 'error'); return; }
            showToast(`ลบแอดมิน "${name}" เรียบร้อยแล้ว`);
            fetchAdmins();
        } catch {
            showToast('เกิดข้อผิดพลาด', 'error');
        } finally {
            setDeletingId(null);
        }
    };

    const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
        { key: 'users', label: 'รายชื่อผู้ใช้', icon: Users },
        { key: 'admins', label: 'รายชื่อแอดมิน', icon: Shield },
        { key: 'add', label: 'เพิ่มแอดมิน', icon: UserPlus },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin" className="p-2 text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-white hover:shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-display text-2xl font-bold text-gray-900">ตั้งค่าแอดมิน</h1>
                            <p className="font-body text-sm text-gray-500">จัดการผู้ใช้และผู้ดูแลระบบ</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
                    {tabs.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => { setTab(key); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-body text-sm font-medium transition-all ${
                                tab === key
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Tab: Users ─────────────────────────────────────── */}
                {tab === 'users' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Users className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-lg font-semibold text-gray-900">ผู้ใช้ทั้งหมด</h2>
                            <span className="ml-auto text-xs font-body text-gray-400">{users.length} คน</span>
                        </div>
                        {usersLoading ? (
                            <div className="p-10 flex justify-center">
                                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-10 text-center font-body text-gray-400">ยังไม่มีผู้ใช้</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-6 py-3 font-body font-semibold text-gray-600 text-sm">ชื่อ</th>
                                            <th className="text-left px-4 py-3 font-body font-semibold text-gray-600 text-sm">อีเมล</th>
                                            <th className="text-center px-4 py-3 font-body font-semibold text-gray-600 text-sm">จำนวนการส่ง</th>
                                            <th className="text-right px-6 py-3 font-body font-semibold text-gray-600 text-sm">วันที่สมัคร</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <User className="w-4 h-4 text-blue-600" />
                                                        </div>
                                                        <span className="font-body font-medium text-gray-800 text-sm">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 font-body text-sm text-gray-500">{user.email}</td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-body font-semibold text-sm">
                                                        {user.submissionCount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-body text-xs text-gray-400">{formatDate(user.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Admins ─────────────────────────────────────── */}
                {tab === 'admins' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-lg font-semibold text-gray-900">ผู้ดูแลระบบทั้งหมด</h2>
                            <span className="ml-auto text-xs font-body text-gray-400">{admins.length} คน</span>
                        </div>
                        {adminsLoading || isLoading ? (
                            <div className="p-10 flex justify-center">
                                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {admins.map((admin) => (
                                    <div key={admin.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Shield className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-body font-semibold text-gray-800">{admin.username}</p>
                                                <p className="font-body text-xs text-gray-400">เพิ่มเมื่อ {formatDate(admin.createdAt)}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(admin.id, admin.username)}
                                            disabled={admins.length <= 1 || deletingId === admin.id}
                                            className="flex items-center gap-1.5 text-xs font-body text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                            title={admins.length <= 1 ? 'ไม่สามารถลบแอดมินคนสุดท้าย' : 'ลบแอดมิน'}
                                        >
                                            {deletingId === admin.id
                                                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                : <Trash2 className="w-3.5 h-3.5" />}
                                            ปลดแอดมิน
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50">
                            <button
                                onClick={() => setTab('add')}
                                className="flex items-center gap-2 text-sm font-body text-primary hover:underline"
                            >
                                <UserPlus className="w-4 h-4" />
                                เพิ่มแอดมินใหม่
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Tab: Add Admin ─────────────────────────────────── */}
                {tab === 'add' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-primary" />
                            <h2 className="font-display text-lg font-semibold text-gray-900">เพิ่มแอดมินใหม่</h2>
                        </div>
                        <form onSubmit={handleAddAdmin} className="p-6 space-y-4">
                            <div>
                                <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">ชื่อผู้ใช้แอดมิน</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                        placeholder="ชื่อผู้ใช้สำหรับเข้าสู่ระบบแอดมิน"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">รหัสผ่าน</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                        placeholder="อย่างน้อย 6 ตัวอักษร"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" />กำลังเพิ่ม...</>
                                    : <><Plus className="w-4 h-4" />เพิ่มแอดมิน</>}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
