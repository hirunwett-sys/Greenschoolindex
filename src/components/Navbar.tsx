'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { JSX } from 'react';
import { Home, ClipboardList, PenTool, BarChart3, Sprout } from 'lucide-react';

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Hamburger - Left Side */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-50"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-primary transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-primary transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-primary transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>

            {/* Logo - Center on mobile, left on desktop */}
            <Link href="/" className="flex items-center space-x-2 group md:ml-0">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GSI
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="font-body text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                หน้าแรก
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/criteria"
                className="font-body text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                เกณฑ์การประเมิน
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/evaluate"
                className="font-body text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                เริ่มทำการประเมิน
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/summary"
                className="font-body text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                แสดงสรุปผล
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Spacer for mobile to center logo */}
            <div className="md:hidden w-10"></div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="font-display text-xl font-bold text-primary">GSI</h2>
                <p className="font-body text-xs text-gray-500">Green School Index</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-body text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span>หน้าแรก</span>
            </Link>
            <Link
              href="/criteria"
              onClick={closeMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-body text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary transition-all duration-200"
            >
              <ClipboardList className="w-5 h-5" />
              <span>เกณฑ์การประเมิน</span>
            </Link>
            <Link
              href="/evaluate"
              onClick={closeMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-body text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary transition-all duration-200"
            >
              <PenTool className="w-5 h-5" />
              <span>เริ่มทำการประเมิน</span>
            </Link>
            <Link
              href="/summary"
              onClick={closeMenu}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg font-body text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary transition-all duration-200"
            >
              <BarChart3 className="w-5 h-5" />
              <span>แสดงสรุปผล</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <p className="font-body text-xs text-center">
                สร้างโรงเรียนที่ยั่งยืน
                <br />
                เพื่ออนาคตที่ดีกว่า
              </p>
              <Sprout className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}