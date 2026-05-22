import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Wallet, Menu, X, Bitcoin, Zap, LayoutDashboard, Store, Users, Coins, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAVIGATION } from '@/src/constants';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-deep-black text-white flex flex-col">
      <header className="sticky top-0 z-50 w-full border-bottom border-white/10 bg-deep-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
            <img src="https://btclnt.com/assets/logo-C1KCn5Im.png" alt="BTCLNT Logo" className="w-8 h-8 object-contain group-hover:scale-105 transition-transform" />
            <div className="flex flex-col leading-none">
                <span className="text-xs font-black tracking-widest text-white/40 italic uppercase">Token</span>
                <span className="tracking-tighter">LIGHTNING NETWORK</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest italic">
            {NAVIGATION.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-white/40 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors">
                <span className="text-sm font-bold italic">English</span>
                <ChevronDown className="w-4 h-4" />
            </div>

            <Button 
                onClick={() => toast.success('Connecting BSC Wallet...')}
                className="bg-white text-black hover:bg-white/90 font-bold rounded-full h-10 px-6 text-sm"
            >
              Connect BSC Wallet
            </Button>
            
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6" />
                  </Button>
                }
              />
              <SheetContent side="right" className="bg-deep-black border-white/10 text-white p-0">
                <nav className="flex flex-col gap-4 p-8 mt-8">
                  {NAVIGATION.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className="text-xl font-medium text-muted hover:text-white border-b border-white/5 pb-4"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-4 bg-bitcoin hover:bg-bitcoin/80 text-black font-bold">
                    Connect Wallet
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-card-black py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <img src="https://btclnt.com/assets/logo-C1KCn5Im.png" alt="BTCLNT Logo" className="w-12 h-12 object-contain" />
              <span>BTCLNT</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Transforming Bitcoin into a High-Performance Layer-2 Ecosystem. Lightning Infrastructure & DePIN Rewards.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-bitcoin">Infrastructure</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/store" className="hover:text-white">Node Store</Link></li>
              <li><Link to="/lightning" className="hover:text-white">Lightning Engine</Link></li>
              <li><Link to="/nodes" className="hover:text-white">Network Stats</Link></li>
              <li><Link to="/docs" className="hover:text-white">Developer API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-lightning">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/token" className="hover:text-white">LNT Token</Link></li>
              <li><Link to="/referral" className="hover:text-white">Referral Hub</Link></li>
              <li><Link to="/community" className="hover:text-white">Ambassadors</Link></li>
              <li><Link to="/staking" className="hover:text-white">Staking Pools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-white">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/faq" className="hover:text-white">Documentation</Link></li>
              <li><Link to="/support" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/verification" className="hover:text-white">KYC Center</Link></li>
              <li><Link to="/scam-warning" className="hover:text-white">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted">
          © 2026 BTCLNT Lightning Network. Powered by Taproot Assets.
        </div>
      </footer>
    </div>
  );
}
