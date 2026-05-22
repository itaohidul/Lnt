import React from 'react';
import { motion } from 'motion/react';
import { Zap, Bitcoin, Globe, Shield, Rocket, ArrowRight, BarChart3, Users, Network, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#F7931A33,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,#00D4FF22,transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bitcoin/10 border border-bitcoin/20 text-bitcoin text-xs font-bold uppercase tracking-widest">
              <Zap className="w-4 h-4 fill-current" />
              Next Gen Bitcoin Layer-2
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight leading-[0.9] animate-lightning px-2">
              OWN THE <span className="text-gradient-bitcoin">LIGHTNING</span> <br />
              INFRASTRUCTURE
            </h1>
            
            <p className="text-muted text-base md:text-xl max-w-2xl mx-auto font-medium animate-float px-4">
              Join the world's most advanced Bitcoin L2 node marketplace. 
              Deploy Lightning nodes, earn routing rewards, and fuel the DePIN economy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/store" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 bg-bitcoin hover:bg-bitcoin/90 text-black font-extrabold text-lg gap-2 w-full">
                  <Rocket className="w-5 h-5" />
                  BUY NODE NOW
                </Button>
              </Link>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/10 hover:bg-white/5 font-bold text-lg gap-2 w-full text-white">
                  EXPLORE ECOSYSTEM
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-card-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Nodes', value: '14,289', icon: Network, color: 'text-bitcoin' },
              { label: 'LNT Staked', value: '45.2M', icon: Bitcoin, color: 'text-lightning' },
              { label: 'Network Uptime', value: '99.99%', icon: Shield, color: 'text-green-500' },
              { label: 'Global Users', value: '250K+', icon: Users, color: 'text-white' },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className={`flex justify-center mb-2 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tighter">{stat.value}</div>
                <div className="text-muted text-xs uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LNT Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Why Choose BTCLNT?</h2>
            <div className="w-24 h-1 bg-lightning mx-auto" />
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { 
              title: "Lightning Scale", 
              desc: "Native integration with the Lightning Network for near-instant, zero-fee Bitcoin transactions at global scale.",
              icon: Zap,
              color: "from-bitcoin/20 to-transparent"
            },
            { 
              title: "DePIN Infrastructure", 
              desc: "You own the hardware or license. Your node becomes a vital piece of the global Bitcoin infrastructure.",
              icon: Globe,
              color: "from-lightning/20 to-transparent"
            },
            { 
              title: "Token Rewards", 
              desc: "Earn LNT tokens for routing traffic, securing the network, and participating in the ecosystem governance.",
              icon: Coins,
              color: "from-white/10 to-transparent"
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="bg-card-black border-white/5 h-full group hover:border-bitcoin/50 transition-all duration-500 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="p-8 space-y-4 relative">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-bitcoin" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Milestones Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Protocol Milestones</h2>
            <div className="w-24 h-1 bg-bitcoin mx-auto" />
            <p className="text-muted max-w-xl mx-auto">The roadmap to hyper-bitcoinization via the LNT Network infrastructure.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-0.5 before:bg-white/5">
            {[
                { date: 'September 2026', title: 'Global Exchange Listing', desc: 'LNT listed on major exchanges.' },
                { date: 'June 2026', title: '10k Node Deployment', desc: 'LNT global node deployment reaches 10,000 units, completes final testing and launches lightning node incentive mechanism.' },
                { date: 'February 2026', title: '5k Node Deployment', desc: 'LNT global node deployment reaches 5,000 units, completes second phase of software and hardware testing.' },
                { date: 'November 2025', title: '2k Node Deployment', desc: 'LNT global node deployment reaches 2,000 units, completes first phase of software and hardware testing.' },
                { date: 'Jun 2025', title: 'Taproot Assets v0.6 & LNT Launch', desc: 'LNT official launch following the stabilization of the protocol v0.6.' },
                { date: 'Jan 2025', title: 'USDT via Taproot Assets', desc: 'USDT returns to Bitcoin via Taproot Assets.' },
                { date: 'Jul 2024', title: 'Lightning Network v0.4', desc: 'Deep integration of the Lightning Network protocol v0.4.' },
                { date: 'Oct 2023', title: 'Mainnet Alpha (v0.3)', desc: 'Taproot Assets Mainnet v0.3 release.' },
                { date: 'Jan 2022', title: 'Protocol Proposal', desc: 'Taproot Assets Protocol originally proposed to the Bitcoin community.' },
            ].map((milestone, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative pl-12"
                >
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full border-2 border-bitcoin bg-deep-black z-10 flex items-center justify-center p-2">
                        <Zap className="w-full h-full text-bitcoin" />
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-bitcoin/30 transition-all group">
                        <div className="text-bitcoin font-black text-sm uppercase tracking-widest mb-1">{milestone.date}</div>
                        <h3 className="text-2xl font-black italic tracking-tight uppercase group-hover:text-bitcoin transition-colors">{milestone.title}</h3>
                        <p className="text-muted mt-2 leading-relaxed">{milestone.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* CTA section with visual anchor */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-bitcoin" />
        <div className="container mx-auto px-4 relative text-black flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none">START YOUR <br /> BITCOIN LEGACY.</h2>
                <p className="text-base sm:text-lg font-bold opacity-80 uppercase tracking-tighter">Become a node operator in seconds and start mining routing rewards.</p>
            </div>
            <Link to="/store" className="w-full sm:w-auto">
                <Button size="lg" className="h-20 px-12 bg-black text-white hover:bg-black/80 font-black text-2xl rounded-none border-4 border-black transition-transform hover:scale-105">
                    JOIN THE NETWORK
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
