import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Timer, TrendingUp, ShieldCheck, ArrowRight, Zap, Coins, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState('1000');
  const [lockPeriod, setLockPeriod] = useState('12'); // months
  const [isStaking, setIsStaking] = useState(false);

  const calculateRewards = () => {
    const amount = parseFloat(stakeAmount) || 0;
    const apy = lockPeriod === '12' ? 45 : lockPeriod === '6' ? 25 : 12;
    const rewards = (amount * apy) / 100;
    return rewards.toFixed(2);
  };

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
      toast.success(`Successfully staked ${stakeAmount} LNT for ${lockPeriod} months!`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge className="bg-lightning/10 text-lightning border-lightning/20 uppercase tracking-widest px-4 py-1">Capital Rewards</Badge>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            PROOF OF <br /><span className="text-bitcoin">LIQUIDITY.</span>
        </h1>
        <p className="text-muted text-xl font-medium">
            Lock your $LNT to secure the network routing table and earn protocol-wide rewards.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staking Controls */}
        <Card className="lg:col-span-2 bg-card-black border-white/5 border-l-4 border-l-bitcoin overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-black italic tracking-tighter uppercase">Stake $LNT</CardTitle>
            <CardDescription>Configure your lock-up parameters for maximum yield</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted">Amount to Stake</label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={stakeAmount} 
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="bg-deep-black border-white/10 h-16 text-3xl font-black text-bitcoin pl-12"
                />
                <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-bitcoin opacity-50" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-white/10" onClick={() => setStakeAmount('5000')}>MAX</Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-muted">Lock-up Period (Months)</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '3', apy: '12%', label: 'Flexible' },
                  { val: '6', apy: '25%', label: 'Standard' },
                  { val: '12', apy: '45%', label: 'Max Yield' },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setLockPeriod(p.val)}
                    className={`p-6 rounded-xl border-2 transition-all text-left space-y-1 ${
                      lockPeriod === p.val 
                        ? 'border-bitcoin bg-bitcoin/5 ring-1 ring-bitcoin' 
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-2xl font-black italic tracking-tight">{p.val}M</div>
                    <div className="text-xs font-bold text-muted uppercase tracking-widest">{p.label}</div>
                    <div className="text-bitcoin font-black text-lg">{p.apy} APY</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-widest text-muted">Estimated Rewards</div>
                <div className="text-3xl font-black tracking-tighter text-white">{calculateRewards()} LNT</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-widest text-muted">Unlock Date</div>
                <div className="text-xl font-bold text-white uppercase tracking-tight">May 22, 2027</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-bitcoin/5 p-8 border-t border-white/5">
            <Button 
              onClick={handleStake}
              disabled={isStaking}
              className="w-full h-16 bg-bitcoin text-black hover:bg-bitcoin/90 font-black text-xl uppercase italic group"
            >
              {isStaking ? 'INITIALIZING PROTOCOL...' : 'EXECUTE STAKE'}
              {!isStaking && <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </CardFooter>
        </Card>

        {/* Info & Stats */}
        <div className="space-y-8">
          <Card className="bg-card-black border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest">Protocol Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: 'Total Value Locked', val: '$12.4M', icon: Lock },
                { label: 'Avg. APY', val: '28.4%', icon: TrendingUp },
                { label: 'Stakers Online', val: '1,420', icon: ShieldCheck },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-bitcoin" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{s.label}</div>
                    <div className="text-xl font-black italic">{s.val}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-lightning text-black border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Zap className="w-24 h-24" />
            </div>
            <CardContent className="p-8 space-y-4 relative">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Why Stake?</h3>
              <ul className="space-y-3">
                {[
                  'Earn Protocol Routing Fees',
                  'Governance Voting Weight',
                  'Priority Node Allocation',
                  'Exclusive NFT Airdrops',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold text-sm">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card-black border-white/5">
             <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest">Reward Calculator</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-bold uppercase">
                      <span className="text-muted text-[10px]">Staking Ratio</span>
                      <span>42%</span>
                   </div>
                   <Progress value={42} className="h-1 bg-white/5" indicatorClassName="bg-bitcoin" />
                </div>
                <p className="text-[10px] text-muted leading-relaxed font-bold uppercase">
                  Rewards are distributed per block. APY is dynamic based on total protocol liquidity.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
