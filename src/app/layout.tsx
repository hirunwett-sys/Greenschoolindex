import type { Metadata } from 'next';
import { Bai_Jamjuree } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ToastProvider } from '@/components/ToastProvider';
import type { ReactNode, JSX } from 'react';
import { MapPin, Phone, Mail, Facebook, MessageCircle } from 'lucide-react';

const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-bai-jamjuree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Green School Index (GSI)',
  description: 'ประเมินและจัดอันดับโรงเรียนด้านความยั่งยืน',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="th" className={baiJamjuree.variable}>
      <body className="font-body antialiased bg-gradient-to-br from-green-50/50 via-white to-teal-50/30 min-h-screen">
        <ToastProvider>
          <Navbar />
          <main>{children}</main>

        <footer className="bg-gradient-to-r from-primary to-secondary text-white py-6 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              {/* Left - Brand with Logos */}
              <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <img src="/images/Logo.png" alt="GSI Logo TH" className="h-12 w-auto" />
            <img src="/images/LogoENG.png" alt="GSI Logo EN" className="h-12 w-auto" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold mb-1">
              GSI : GREEN SCHOOL INDEX
            </h3>
            <p className="text-xs opacity-80">
              Building sustainable schools for a better future
            </p>
          </div>
              </div>

              {/* Right - Contact Info */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-4 h-4" />
            <span>นครปฐม 73000</span>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <Phone className="w-4 h-4" />
            <span>034-109686 ต่อ 209000</span>
          </div>
          
          <div className="flex items-center space-x-1.5">
            <Mail className="w-4 h-4" />
            <a href="mailto:fac-en@silpakorn.edu" className="hover:underline">
              fac-en@silpakorn.edu
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://facebook.com/entechsu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://line.me/R/ti/p/@entech-su"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="LINE"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
              </div>
            </div>

            {/* Bottom Bar - Copyright */}
            <div className="border-t border-white/20 pt-3 text-center">
              <p className="text-xs opacity-80">
          © 2026 Green School Index (GSI). All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        </ToastProvider>
      </body>
    </html>
  );
}