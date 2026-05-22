import React from 'react';
import { motion } from 'motion/react';
import { Users, Send, Twitter, MessageCircle, Github, Globe, Trophy, Gift, ArrowRight, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-24 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <Badge className="bg-lightning/10 text-lightning border-lightning/20 uppercase tracking-widest px-4 py-1">Global Alliance</Badge>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            JOIN THE <br /><span className="text-bitcoin">REVOLUTION.</span>
        </h1>
        <p className="text-muted text-xl font-medium">
            Bitcoin is decentralized, but its growth is communal. Join 250,000+ commanders building the future of L2 infrastructure.
        </p>
      </section>

      {/* Social Hub */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { name: 'X / Twitter', handle: '@BTCLNT_Network', icon: Twitter, color: 'hover:border-white' },
              { name: 'Telegram', handle: 'BTCLNT Global', icon: Send, color: 'hover:border-[#0088cc]' },
              { name: 'Discord', handle: 'LNT Forge', icon: MessageCircle, color: 'hover:border-[#5865F2]' },
              { name: 'GitHub', handle: 'btclnt-core', icon: Github, color: 'hover:border-white' },
          ].map((social, i) => (
              <Card key={i} className={`bg-card-black border-white/5 transition-all cursor-pointer ${social.color}`}>
                  <CardContent className="p-6 text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded bg-white/5 flex items-center justify-center">
                            <social.icon className="w-6 h-6" />
                        </div>
                        <div className="font-black italic tracking-tighter">{social.name}</div>
                        <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{social.handle}</div>
                  </CardContent>
              </Card>
          ))}
      </div>

      {/* Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card-black border-white/5 border-t-4 border-t-bitcoin">
              <CardHeader>
                  <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Zealy Campaigns</CardTitle>
                  <CardDescription>Complete quests, climb the leaderboard, and earn rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-8 text-center space-y-4 border border-white/5">
                        <Trophy className="w-16 h-16 text-bitcoin mx-auto" />
                        <h3 className="text-2xl font-black italic tracking-tight">SEASON 3: SURGE</h3>
                        <p className="text-muted text-sm">Join 15,000+ participants in the largest quest season yet. $100k in LNT rewards plus exclusive node badges.</p>
                        <Button className="bg-bitcoin text-black font-black uppercase italic w-full h-14 text-lg">ENTER ZEALY PORTAL</Button>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted">
                        <span>Ends in 12 days</span>
                        <span>Total XP Awarded: 4.5M</span>
                    </div>
              </CardContent>
          </Card>

          <Card className="bg-card-black border-white/5 border-t-4 border-t-lightning">
              <CardHeader>
                  <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Ambassador Program</CardTitle>
                  <CardDescription>Represent the Lightning Network in your region</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {[
                            { title: 'Local Communities', desc: 'Lead BTCLNT meetups and workshops in your city.' },
                            { title: 'Content Creation', desc: 'Create deep dives, tutorials, and ecosystem news.' },
                            { title: 'Technical Support', desc: 'Help new commanders set up their infrastructure.' },
                        ].map((p, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded bg-lightning/10 flex items-center justify-center shrink-0">
                                    <Target className="w-5 h-5 text-lightning" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-sm tracking-tight">{p.title}</h4>
                                    <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full h-14 border-lightning/30 text-lightning font-black uppercase text-lg hover:bg-lightning/10">
                        APPLY TO PROGRAM
                    </Button>
              </CardContent>
          </Card>
      </div>

      {/* Events */}
      <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 space-y-6">
                <Badge className="bg-bitcoin/10 text-bitcoin border-bitcoin/20 uppercase tracking-widest">Live Events</Badge>
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">COMMUNITY <br /> SUMMIT 2026.</h2>
                <p className="text-muted leading-relaxed">
                    Join us in El Salvador for the first-ever BTCLNT Global Summit. Hardware showcases, protocol workshops, and the largest gathering of Lightning node operators in history.
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                        <Zap className="w-4 h-4 text-bitcoin" />
                        <span>OCTOBER 12-14, 2026</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest">
                        <Globe className="w-4 h-4 text-bitcoin" />
                        <span>SAN SALVADOR, EL SALVADOR</span>
                    </div>
                </div>
                <Button className="h-14 px-8 bg-white text-black font-black uppercase italic text-lg hover:bg-bitcoin hover:text-black">GET TICKETS</Button>
            </div>
            <div className="bg-[url('https://images.unsplash.com/photo-1591115765373-520b7a060e2?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000 min-h-[300px]" />
      </section>

      {/* Newsletter */}
      <section className="bg-bitcoin p-12 rounded-2xl flex flex-col items-center text-center space-y-6">
            <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-black leading-none">THE LIGHTNING DIGEST</h3>
            <p className="text-black/80 max-w-xl font-bold uppercase tracking-tighter">Stay ahead of the network. Get the latest node updates, airdrops, and tokenomics news delivered weekly.</p>
            <div className="flex w-full max-w-md gap-2">
                <Input placeholder="ENTER YOUR EMAIL" className="bg-black text-white border-black h-14 font-black placeholder:text-white/30" />
                <Button className="bg-black text-white h-14 px-8 font-black uppercase hover:bg-black/80">SUBSCRIBE</Button>
            </div>
      </section>
    </div>
  );
}
