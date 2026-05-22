import React from 'react';
import { motion } from 'motion/react';
import { Share2, QrCode, Copy, Users, Trophy, TrendingUp, Gift, ArrowRight, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function Referral() {
  const referralLink = "https://btclnt.com/ref/xander2026";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Referral link copied!");
  };

  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      {/* Header */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Build Your <br /><span className="text-lightning">Empire.</span>
        </h1>
        <p className="text-muted text-xl font-medium">
          The Bitcoin network grows through connections. Invite others to join the LNT ecosystem and earn lifetime commissions on their node activity.
        </p>
      </section>

      {/* Referral Link & QR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card-black border-white/5 border-l-4 border-l-bitcoin">
          <CardHeader>
            <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Your Arsenal</CardTitle>
            <CardDescription>Share your unique entry point to the network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-muted tracking-widest">Global Referral Link</label>
              <div className="flex gap-2">
                <Input 
                  readOnly 
                  value={referralLink} 
                  className="bg-deep-black border-white/10 font-bold"
                />
                <Button onClick={() => copyToClipboard(referralLink)} variant="outline" className="border-white/10 shrink-0">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded flex items-center justify-center overflow-hidden">
                        <QrCode className="w-12 h-12 text-black" />
                    </div>
                    <div>
                        <div className="font-black tracking-tight leading-none text-lg">SCAN & JOIN</div>
                        <div className="text-[10px] font-bold text-muted uppercase mt-1">Download QR Code</div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted hover:text-white">
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button className="bg-bitcoin text-black font-black uppercase tracking-widest text-xs h-12">Share on X</Button>
                <Button className="bg-[#0088cc] text-white font-black uppercase tracking-widest text-xs h-12">Telegram</Button>
            </div>
          </CardContent>
        </Card>

        {/* Milestone Tracker */}
        <Card className="bg-card-black border-white/5 border-l-4 border-l-lightning">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Reward Milestones</CardTitle>
                    <CardDescription>Climb the ranks to unlock higher tier bonuses</CardDescription>
                </div>
                <Trophy className="w-8 h-8 text-lightning opacity-20" />
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <div className="text-xs font-black uppercase tracking-widest text-lightning">Current Rank</div>
                            <div className="text-3xl font-black italic tracking-tighter">BETA AMBASSADOR</div>
                        </div>
                        <div className="text-right">
                             <div className="text-[10px] font-bold text-muted uppercase">Next Rank</div>
                             <div className="font-black">NODE ALPHA</div>
                        </div>
                    </div>
                    <Progress value={65} className="h-3 bg-white/5" indicatorClassName="bg-lightning" />
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted">
                        <span>12 / 20 ACTIVE NODES</span>
                        <span>8 NODES TO GO</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-bitcoin">Upcoming Benefits</div>
                    {[
                        { perk: '7% Direct Commission', status: 'UNLOCKED', active: true },
                        { perk: 'Level 3 Indirect Rewards', status: 'LOCKED', active: false },
                        { perk: 'Ambassador NFT Badge', status: 'LOCKED', active: false },
                    ].map((p, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 rounded border ${p.active ? 'border-bitcoin/20 bg-bitcoin/5' : 'border-white/5 opacity-50'}`}>
                            <span className="text-sm font-bold">{p.perk}</span>
                            <span className="text-[8px] font-black tracking-widest">{p.status}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Leadership & Earnings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 bg-card-black border-white/5">
            <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {[
                    { label: 'Direct Referrals', val: '12', icon: Users },
                    { label: 'Total Commission', val: '4,500 LNT', icon: Gift },
                    { label: 'Avg. Conversion', val: '18.5%', icon: TrendingUp },
                ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center">
                            <s.icon className="w-5 h-5 text-bitcoin" />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{s.label}</div>
                            <div className="text-xl font-black italic tracking-tighter">{s.val}</div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-card-black border-white/5">
            <CardHeader>
                <CardTitle className="text-xl font-black italic tracking-tight uppercase text-lightning">Tier Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {[
                    { tier: 'Tier 1 (Direct)', count: '12', earn: '3,200 LNT', rate: '7%', color: 'bg-bitcoin' },
                    { tier: 'Tier 2 (Indirect)', count: '45', earn: '1,200 LNT', rate: '3%', color: 'bg-lightning' },
                    { tier: 'Tier 3 (Indirect)', count: '0', earn: '0 LNT', rate: '1%', color: 'bg-muted' },
                ].map((tier, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold uppercase tracking-tight">{tier.tier}</span>
                            <span className="text-xs font-black text-muted uppercase">{tier.earn} • {tier.rate} COMM</span>
                        </div>
                        <div className="relative h-2 rounded bg-white/5 overflow-hidden">
                            <div className={`absolute top-0 left-0 h-full ${tier.color}`} style={{ width: tier.count !== '0' ? '100%' : '0%' }} />
                        </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Leaderboard CTA */}
      <section className="bg-bitcoin p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-black">
              <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">JOIN THE TOP 10%</h3>
              <p className="font-bold opacity-80">Refer 50 active nodes to join the Elite Leadership Council.</p>
          </div>
          <Button className="bg-black text-white h-16 px-12 font-black text-lg hover:bg-black/80">
              VIEW LEADERBOARD <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
      </section>
    </div>
  );
}
