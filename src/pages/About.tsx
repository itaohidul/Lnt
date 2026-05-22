import React from 'react';
import { motion } from 'motion/react';
import { Target, Lightbulb, Map, Users, ChevronRight, CheckCircle2, Bitcoin, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function About() {
  return (
    <div className="w-full">
      {/* Vision Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#F7931A11,transparent_50%)]" />
        <div className="container mx-auto px-4 relative space-y-12">
            <div className="max-w-3xl space-y-6">
                <Badge className="bg-bitcoin/10 text-bitcoin border-bitcoin/20 uppercase tracking-widest px-4 py-1">Our Mission</Badge>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
                    Scaling <span className="text-bitcoin">Freedom</span> Through Lightning.
                </h1>
                <p className="text-xl text-muted font-medium leading-relaxed">
                    BTCLNT is more than a node provider. We are building the foundational infrastructure for the hyper-bitcoinized world. By combining DePIN hardware with the Lightning Network, we enable anyone to participate in the security and scalability of global Bitcoin payments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                {[
                    { title: 'Bitcoin Layer-2 Narrative', desc: 'We believe the future of Bitcoin is tiered. Layer 1 for settlement, Layer 2 for global commerce. BTCLNT is the gateway to L2.' },
                    { title: 'Lightning + Taproot', desc: 'Utilizing the latest Bitcoin upgrades to enable complex assets and instant payments on the most secure network in existence.' },
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4 hover:border-bitcoin/30 transition-colors">
                        <div className="w-12 h-12 rounded bg-bitcoin/10 flex items-center justify-center">
                            {i === 0 ? <Target className="w-6 h-6 text-bitcoin" /> : <Lightbulb className="w-6 h-6 text-bitcoin" />}
                        </div>
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">{item.title}</h3>
                        <p className="text-muted leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card-black/50 border-y border-white/5">
        <div className="container mx-auto px-4 space-y-12">
            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">The Architects</h2>
                <p className="text-muted max-w-xl mx-auto">A global team of cypherpunks, hardware engineers, and Bitcoin maximalists.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { name: 'Satoshi Jr.', role: 'Lead Architect', icon: Bitcoin },
                    { name: 'Zilla', role: 'Hardware Engineering', icon: Shield },
                    { name: 'Nakamoto X', role: 'Protocol Strategy', icon: Zap },
                    { name: 'LNT Alpha', role: 'Community Lead', icon: Globe },
                ].map((member, i) => (
                    <div key={i} className="text-center space-y-3 p-6 rounded-2xl bg-deep-black border border-white/5 hover:cyber-glow transition-all">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                            <member.icon className="w-8 h-8 text-bitcoin" />
                        </div>
                        <div className="font-black italic text-xl uppercase tracking-tight">{member.name}</div>
                        <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{member.role}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 container mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">Expansion Plan</h2>
            <div className="w-24 h-1 bg-bitcoin mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-0.5 before:bg-white/5">
            {[
                { phase: 'Phase 1', title: 'Network Inception', desc: 'Launch of Node Marketplace and LNT Token. Initial deployment of 5,000 nodes.', date: 'Q1 2026', done: true },
                { phase: 'Phase 2', title: 'Liquidity Surge', desc: 'Taproot Asset support, automated liquidity rebalancing, and flexible staking launch.', date: 'Q2 2026', done: false },
                { phase: 'Phase 3', title: 'Global Mesh', desc: 'DePIN hardware expansion to Africa and LatAm. Lightning API for merchants.', date: 'Q3 2026', done: false },
                { phase: 'Phase 4', title: 'Institutional Gateway', desc: 'Governance DAO activation and institutional custody solutions.', date: 'Q4 2026', done: false },
            ].map((p, i) => (
                <div key={i} className="relative pl-12">
                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 bg-deep-black z-10 flex items-center justify-center ${p.done ? 'border-bitcoin' : 'border-white/10'}`}>
                        {p.done ? <CheckCircle2 className="w-6 h-6 text-bitcoin" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                    </div>
                    <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-center">
                            <Badge variant="outline" className={`${p.done ? 'border-bitcoin text-bitcoin' : 'border-white/20 text-muted'} uppercase text-[10px]`}>{p.phase}</Badge>
                            <span className="text-[10px] font-bold text-muted">{p.date}</span>
                        </div>
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">{p.title}</h3>
                        <p className="text-muted leading-relaxed">{p.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card-black border-t border-white/5">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Frequently <br /> Questioned.</h2>
                <p className="text-muted">Can't find the answer you're looking for? Reach out to our support corps.</p>
                <Button className="bg-bitcoin text-black font-black uppercase italic h-12 px-8">KNOWLEDGE BASE</Button>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {[
                    { q: "How do I start earning?", a: "Once your node is live, it automatically joins our routing pool. You earn fees from every Bitcoin transaction routed through your node, plus LNT tokens as node uptime rewards." },
                    { q: "Is KYC required?", a: "To use basic node features, no. However, to withdraw large amounts of USD conversion or participate in institutional staking, KYC level 1 is required." },
                    { q: "Can I sell my node?", a: "Yes. Every node license is bound to an NFT Identity layer, which can be traded on our built-in marketplace once the feature launches in Phase 3." },
                    { q: "What is Taproot Assets?", a: "Taproot Assets allows for the issuance of stablecoins and custom tokens on the Bitcoin network, routed via the Lightning Network. BTCLNT Pro nodes are optimized for these assets." },
                ].map((faq, i) => (
                    <div key={i} className="p-6 rounded-xl bg-deep-black border border-white/5 space-y-2">
                        <h4 className="font-bold text-lg tracking-tight flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-bitcoin" />
                            {faq.q}
                        </h4>
                        <p className="text-muted text-sm leading-relaxed pl-6">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
