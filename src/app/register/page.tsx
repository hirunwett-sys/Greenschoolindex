'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Sprout, User, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) { setError('รหัสผ่านไม่ตรงกัน'); return; }
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error); return; }
            router.push('/my-submissions');
            router.refresh();
        } catch {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary/10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                            <Sprout className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-gray-900">สมัครสมาชิก</h1>
                        <p className="font-body text-sm text-gray-500 mt-1">Green School Index</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-body">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">ชื่อ-นามสกุล</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                    placeholder="ชื่อ นามสกุล"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">อีเมล</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                    placeholder="example@email.com"
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

                        <div>
                            <label className="block font-body text-sm font-medium text-gray-700 mb-1.5">ยืนยันรหัสผ่าน</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                                    placeholder="ยืนยันรหัสผ่าน"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
                        </button>
                    </form>

                    <p className="text-center font-body text-sm text-gray-500 mt-6">
                        มีบัญชีอยู่แล้ว?{' '}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            เข้าสู่ระบบ
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
