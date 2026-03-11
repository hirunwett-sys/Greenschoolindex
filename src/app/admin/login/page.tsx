'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Sprout, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'เกิดข้อผิดพลาด');
                return;
            }

            router.push('/admin');
            router.refresh();
        } catch {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-teal-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-primary/10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
                            <Sprout className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-gray-900">
                            ระบบผู้ดูแล
                        </h1>
                        <p className="font-body text-sm text-gray-500 mt-1">
                            Green School Index Admin
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-body">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                                ชื่อผู้ใช้
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                    placeholder="กรอกชื่อผู้ใช้"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">
                                รหัสผ่าน
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                    placeholder="กรอกรหัสผ่าน"
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
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
