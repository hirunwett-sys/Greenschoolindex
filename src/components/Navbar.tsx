'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { JSX } from 'react';
import {
  Home, ClipboardList, PenTool, BarChart3, Sprout, LogIn,
  LogOut, History, User, ChevronDown, Shield, Settings, LayoutDashboard,
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface SessionInfo {
  type: 'user' | 'admin';
  name: string;
  userId?: string;
  email?: string;
  adminId?: string;
  username?: string;
}

const navLinks = [
  { href: '/', label: 'หน้าแรก', icon: Home },
  { href: '/criteria', label: 'เกณฑ์การประเมิน', icon: ClipboardList },
  { href: '/evaluate', label: 'ประเมิน', icon: PenTool },
  { href: '/summary', label: 'สรุปผล', icon: BarChart3 },
];

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeMenu = (): void => setIsOpen(false);
  const isAdmin = session?.type === 'admin';
  const onAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    setSession(null);
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) { setSession({ type: 'user', name: data.name, userId: data.userId, email: data.email }); return null; }
        return fetch('/api/admin/me').then((r) => (r.ok ? r.json() : null));
      })
      .then((data) => {
        if (data) setSession({ type: 'admin', name: data.username, adminId: data.adminId, username: data.username });
      })
      .catch(() => setSession(null));
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    if (session?.type === 'admin') {
      await fetch('/api/admin/logout', { method: 'POST' });
    } else {
      await fetch('/api/auth/logout', { method: 'POST' });
    }
    setSession(null);
    setDropdownOpen(false);
    closeMenu();
    router.push('/');
    router.refresh();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ─── Main Navbar ─────────────────────────────────────────── */}
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-colors ${
        onAdminPage && isAdmin
          ? 'border-primary/20 shadow-sm'
          : 'border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16 gap-4">

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-primary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>

            {/* Logo — absolute center on mobile, static on desktop */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:left-auto md:translate-x-0 flex items-center flex-shrink-0">
              <img src="/images/Logo.png" alt="GSI" className="h-10 w-auto max-w-[130px] object-contain" />
              <span className="hidden sm:block font-display text-lg font-bold text-primary ml-2">GSI</span>
            </Link>

            {/* Admin context label (desktop) */}
            {isAdmin && onAdminPage && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-lg ml-1">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="font-body text-xs font-semibold text-primary tracking-wide">ADMIN</span>
              </div>
            )}

            {/* Nav Links (desktop) */}
            <div className="hidden md:flex items-center gap-1 ml-4 flex-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg font-body text-sm transition-all duration-200 ${
                    isActive(href)
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right section (desktop only — mobile uses sidebar) */}
            <div className="ml-auto hidden md:flex items-center gap-2">
              {session ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                      isAdmin
                        ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-secondary">
                      {isAdmin
                        ? <Shield className="w-3.5 h-3.5 text-white" />
                        : <User className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="hidden sm:block font-body text-sm font-medium max-w-[100px] truncate">
                      {session.name}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      {/* User info header */}
                      <div className={`px-4 py-3 ${isAdmin ? 'bg-primary/5 border-b border-primary/10' : 'border-b border-gray-100'}`}>
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isAdmin ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-gradient-to-br from-primary to-secondary'
                          }`}>
                            {isAdmin ? <Shield className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-body text-sm font-semibold text-gray-900 truncate">{session.name}</p>
                            <p className="font-body text-xs text-gray-400">{isAdmin ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Admin quick links */}
                      {isAdmin && (
                        <>
                          <Link
                            href="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 font-body text-sm transition-colors ${
                              pathname === '/admin' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <LayoutDashboard className="w-4 h-4 text-primary flex-shrink-0" />
                            แดชบอร์ด
                          </Link>
                          <Link
                            href="/admin/settings"
                            onClick={() => setDropdownOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 font-body text-sm transition-colors ${
                              pathname === '/admin/settings' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <Settings className="w-4 h-4 text-primary flex-shrink-0" />
                            ตั้งค่าแอดมิน
                          </Link>
                          <div className="mx-4 border-t border-gray-100 my-0.5" />
                        </>
                      )}

                      {/* History - for everyone */}
                      <Link
                        href="/my-submissions"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 font-body text-sm transition-colors ${
                          pathname === '/my-submissions' ? 'bg-primary/5 text-primary' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <History className="w-4 h-4 text-primary flex-shrink-0" />
                        ประวัติการส่งประเมิน
                      </Link>

                      <div className="mx-4 border-t border-gray-100 my-0.5" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 font-body text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 flex-shrink-0" />
                        ออกจากระบบ
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 font-body text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:shadow-md hover:scale-[1.02] px-4 py-2 rounded-xl transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  เข้าสู่ระบบ
                </Link>
              )}
            </div>


          </div>
        </div>


      </nav>

      {/* ─── Mobile overlay ─────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* ─── Mobile sidebar ─────────────────────────────────────────── */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <img src="/images/Logo.png" alt="GSI" className="h-9 w-auto object-contain" />
          {isAdmin && (
            <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold font-body px-2 py-1 rounded-lg">
              <Shield className="w-3 h-3" />ADMIN
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-0.5">
          {/* Public links */}
          <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">เมนูหลัก</p>
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                isActive(href)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive(href) ? 'text-primary' : 'text-gray-400'}`} />
              {label}
            </Link>
          ))}

          {/* Profile section */}
          {session ? (
            <>
              <div className="pt-3 pb-1">
                <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pb-2">บัญชีของฉัน</p>

                {/* Identity card */}
                <div className={`mx-0 px-3 py-2.5 rounded-xl mb-1 flex items-center gap-3 ${
                  isAdmin ? 'bg-primary/10' : 'bg-blue-50'
                }`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isAdmin ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-gradient-to-br from-primary to-secondary'
                  }`}>
                    {isAdmin ? <Shield className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-body text-sm font-semibold text-gray-800 truncate">{session.name}</p>
                    <p className="font-body text-xs text-gray-400">{isAdmin ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}</p>
                  </div>
                </div>

                {/* Admin links */}
                {isAdmin && (
                  <>
                    <Link href="/admin" onClick={closeMenu}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                        pathname === '/admin' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}>
                      <LayoutDashboard className="w-4 h-4 flex-shrink-0 text-primary" />
                      แดชบอร์ดแอดมิน
                    </Link>
                    <Link href="/admin/settings" onClick={closeMenu}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                        pathname === '/admin/settings' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}>
                      <Settings className="w-4 h-4 flex-shrink-0 text-primary" />
                      ตั้งค่าแอดมิน
                    </Link>
                  </>
                )}

                {/* History - everyone */}
                <Link href="/my-submissions" onClick={closeMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all ${
                    pathname === '/my-submissions' ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}>
                  <History className="w-4 h-4 flex-shrink-0 text-primary" />
                  ประวัติการส่งประเมิน
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm text-red-500 hover:bg-red-50 transition-all w-full text-left mt-0.5"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  ออกจากระบบ
                </button>
              </div>
            </>
          ) : (
            <div className="pt-3">
              <p className="font-body text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pb-2">บัญชี</p>
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all"
              >
                <LogIn className="w-4 h-4 flex-shrink-0" />
                เข้าสู่ระบบ
              </Link>
            </div>
          )}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Sprout className="w-4 h-4 text-primary" />
            <p className="font-body text-xs">สร้างโรงเรียนที่ยั่งยืน</p>
          </div>
        </div>
      </div>
    </>
  );
}
