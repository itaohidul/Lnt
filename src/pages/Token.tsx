import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Coins, 
  TrendingUp, 
  Flame, 
  BarChart2, 
  PieChart, 
  Shield, 
  Info, 
  ArrowUpRight, 
  ArrowDown, 
  Bitcoin,
  RefreshCcw,
  Lock,
  ArrowRight,
  Zap,
  Sparkles,
  ArrowBigRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip } from 'recharts';
import { toast } from 'sonner';

const TOKENOMICS_DATA = [
  { name: 'Node Mining', value: 40, color: '#F7931A' },
  { name: 'Ecosystem', value: 20, color: '#00D4FF' },
  { name: 'Staking Rewards', value: 15, color: '#ffffff' },
  { name: 'Public Sale', value: 10, color: '#8E9299' },
  { name: 'Team & Advisors', value: 15, color: '#333333' },
];

export default function LNTResale() {
  const [payAmount, setPayAmount] = useState('0.05');
  const LNT_PRICE_BTC = 0.000012;
  const LNT_PRICE_USD = 0.85;

  const calculateReceive = () => {
    return (parseFloat(payAmount) / LNT_PRICE_BTC).toFixed(0);
  };

  const calculateUSD = () => {
    return (parseFloat(calculateReceive()) * LNT_PRICE_USD).toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-deep-black text-white relative overflow-hidden pb-24">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-bitcoin/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lightning/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 py-24 space-y-24">
        {/* 1. Hero & Resale Header */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Badge className="bg-bitcoin/10 text-bitcoin border-bitcoin/20 py-1.5 px-5 uppercase tracking-[0.2em] font-black text-[10px]">
              Protocol Native Asset
            </Badge>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none"
          >
             LNT <span className="text-gradient-bitcoin">RESALE.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed"
          >
             Secure the network engine. Buy and resell native LNT tokens at the protocol-guaranteed floor price.
          </motion.p>
        </section>

        {/* 2. Market Panel & Buy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-card-black border-white/5 border-t-4 border-t-bitcoin shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <TrendingUp className="w-48 h-48 text-bitcoin" />
                </div>
                <CardHeader className="p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-3xl font-black italic uppercase tracking-tighter">Resale Portal</CardTitle>
                            <CardDescription className="text-muted font-bold text-lg uppercase">Instant Bitcoin Marketplace</CardDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black text-muted uppercase tracking-widest">Protocol Floor</div>
                            <div className="text-2xl font-black text-bitcoin italic">$0.85</div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8 relative z-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black uppercase text-muted tracking-widest">You Send (Bitcoin)</label>
                            <span className="text-xs font-black text-bitcoin">~ 0.24 BTC Avail.</span>
                        </div>
                        <div className="relative">
                            <Input 
                                type="number" 
                                value={payAmount}
                                onChange={(e) => setPayAmount(e.target.value)}
                                className="bg-deep-black border-white/10 h-20 font-black text-3xl pl-16 text-bitcoin rounded-2xl" 
                            />
                            <Bitcoin className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-bitcoin" />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-black text-muted">BTC</div>
                        </div>
                    </div>

                    <div className="flex justify-center -my-6 relative z-20">
                        <div className="w-14 h-14 rounded-full bg-bitcoin flex items-center justify-center border-8 border-card-black shadow-[0_0_20px_rgba(247,147,26,0.5)]">
                            <ArrowDown className="w-8 h-8 text-black font-black" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-black uppercase text-muted tracking-widest">You Receive (LNT Tokens)</label>
                            <span className="text-xs font-black text-lightning">EST. VALUE: ${calculateUSD()}</span>
                        </div>
                        <div className="relative">
                            <Input 
                                readOnly
                                value={calculateReceive()}
                                className="bg-deep-black border-white/10 h-20 font-black text-3xl pl-16 text-lightning rounded-2xl" 
                            />
                            <Coins className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-lightning" />
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-black text-muted">LNT</div>
                        </div>
                    </div>

                    <Button 
                        onClick={() => toast.success('Initializing resale smart contract...')}
                        className="w-full h-20 bg-bitcoin text-black font-black uppercase text-2xl italic group hover:scale-[1.01] transition-all shadow-lg"
                    >
                        CONFIRM RESALE PURCHASE
                        <ArrowUpRight className="ml-3 w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Market Cap', val: '$20.8M', icon: BarChart2 },
                    { label: 'Burned', val: '1.2M LNT', icon: Flame },
                    { label: 'Market Buyback', val: 'Active', icon: RefreshCcw },
                    { label: 'Liquidity', val: '$4.5M', icon: Shield },
                ].map((s, i) => (
                    <Card key={i} className="bg-card-black border-white/5 border-b-2 border-b-muted hover:border-b-bitcoin transition-all">
                        <CardContent className="p-6 space-y-2">
                            <s.icon className="w-4 h-4 text-muted" />
                            <div className="text-2xl font-black italic tracking-tighter leading-none">{s.val}</div>
                            <div className="text-[8px] font-black uppercase text-muted tracking-widest">{s.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card-black border-white/5 group overflow-hidden">
                <CardHeader className="p-8">
                    <CardTitle className="text-xl font-black italic uppercase tracking-tighter">Price Analytics</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                    <div className="h-[200px] bg-white/5 rounded-2xl flex items-end p-4 gap-2 border border-white/5">
                        {[40, 60, 45, 75, 55, 90, 85].map((h, i) => (
                            <div key={i} className="flex-grow bg-bitcoin/20 hover:bg-bitcoin/40 transition-all rounded-t-lg" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold text-muted uppercase">
                           <span>Growth Ratio (7D)</span>
                           <span className="text-green-500">+14.2%</span>
                        </div>
                        <Progress value={74} className="h-2 bg-white/5" indicatorClassName="bg-bitcoin" />
                    </div>
                </CardContent>
                <CardFooter className="p-8 pt-0 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center gap-4 py-4 w-full">
                        <div className="w-12 h-12 rounded-full bg-bitcoin/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-bitcoin" />
                        </div>
                        <div className="text-sm font-bold text-muted leading-tight">LNT resale price is adjusted in real-time based on protocol node deployment milestones.</div>
                    </div>
                </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-lightning to-lightning/80 text-black border-0 relative overflow-hidden">
                <Zap className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20" />
                <CardHeader className="p-8">
                    <CardTitle className="text-3xl font-black italic uppercase tracking-tighter leading-none">STAKING <br />PORTAL.</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-4">
                    <p className="font-extrabold text-sm uppercase leading-relaxed opacity-80">
                        Lock your LNT Resale tokens in the protocol vault to earn up to 45% APY on routing fees.
                    </p>
                    <div className="text-5xl font-black italic tracking-tighter">45% <span className="text-xl">APY</span></div>
                    <Button variant="outline" className="w-full h-14 bg-black text-white border-0 font-black uppercase text-lg hover:bg-black/90">
                        DEPOSIT LNT
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>

        {/* 3. Tokenomics Visual */}
        <section className="space-y-12">
            <div className="text-center space-y-2">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">PROTOCOL LOGIC</h2>
                <p className="text-muted font-bold text-lg">Decentralized asset distribution and utility.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card-black border border-white/5 rounded-3xl p-12">
                <div className="h-[400px] border border-white/5 rounded-2xl p-8 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={TOKENOMICS_DATA}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={140}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {TOKENOMICS_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <ReTooltip 
                                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                            />
                        </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Supply</div>
                        <div className="text-4xl font-black italic tracking-tighter">100M</div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        {TOKENOMICS_DATA.map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xl font-black italic tracking-tight uppercase group-hover:text-bitcoin transition-colors">{item.name}</span>
                                </div>
                                <span className="text-2xl font-black tabular-nums">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border-l-4 border-l-bitcoin">
                        <p className="text-muted font-bold text-sm leading-relaxed uppercase">
                            40% of the total supply is dedicated to node mining rewards, ensuring that operators who provide high-quality infrastructure are fairly compensated.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Trust Panels */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Buyback Protocol', desc: 'Node fees fuel a permanent buyback and burn engine to sustain floor value.', icon: Flame },
                { title: 'Liquid Resale', desc: 'Exit positions instantly through the protocol resale portal with 24/7 liquidity.', icon: RefreshCcw },
                { title: 'Asset Security', desc: 'Locked smart contracts audited for high-stakes decentralized node operations.', icon: Lock },
            ].map((f, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4 hover:border-bitcoin transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-bitcoin/10 flex items-center justify-center font-bold">
                        <f.icon className="w-6 h-6 text-bitcoin" />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">{f.title}</h3>
                    <p className="text-muted text-sm font-bold uppercase leading-relaxed opacity-60">{f.desc}</p>
                </div>
            ))}
        </section>

        {/* 5. Support Notice */}
        <div className="flex justify-center flex-col items-center text-center space-y-6 pt-12">
            <div className="text-muted text-[10px] font-black uppercase tracking-[0.4em] italic opacity-30">Protocol Nodes & Token Synergy</div>
            <div className="max-w-xl text-muted font-medium text-sm leading-relaxed">
                Owning a node without LNT is possible, but owning LNT without a node is an investment in the future of Bitcoin’s decentralized routing infrastructure. Combine both for maximum yield.
            </div>
            <Button variant="link" className="text-bitcoin font-black uppercase text-xs">BTCLNT ECONOMY WHITEPAPER V2</Button>
        </div>
      </div>
    </div>
  );
}
