import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Wallet, 
  Zap, 
  TrendingUp, 
  Users, 
  Network, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft,
  Clock,
  ExternalLink,
  Settings,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';

const CHART_DATA = [
  { name: 'Mon', earnings: 400, routing: 240 },
  { name: 'Tue', earnings: 300, routing: 139 },
  { name: 'Wed', earnings: 200, routing: 980 },
  { name: 'Thu', earnings: 278, routing: 390 },
  { name: 'Fri', earnings: 189, routing: 480 },
  { name: 'Sat', earnings: 239, routing: 380 },
  { name: 'Sun', earnings: 349, routing: 430 },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Upper Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Commander Dashboard</h1>
          <p className="text-muted text-sm font-medium">Welcome back, Xander. Your infrastructure is healthy.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-white/10">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="border-white/10">
            <Settings className="w-5 h-5" />
          </Button>
          <Button 
            onClick={() => toast.success('Calculating protocol rewards for claim...')}
            className="bg-bitcoin hover:bg-bitcoin/90 text-black font-black"
          >
            CLAIM REWARDS
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Total LNT Balance', value: '12,450.00', sub: '≈ $1,245.00', icon: Wallet, color: 'text-bitcoin' },
          { title: 'Node Earnings', value: '0.428 BTC', sub: '+12% this week', icon: Zap, color: 'text-lightning' },
          { title: 'Referral Comm.', value: '850.50', sub: '24 Active Referrals', icon: Users, color: 'text-white' },
          { title: 'Liquidity Score', value: '98/100', sub: 'Optimal Health', icon: ShieldCheck, color: 'text-green-500' },
        ].map((stat, i) => (
          <Card key={i} className="bg-card-black border-white/5">
            <CardContent className="p-6 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.title}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-3xl font-black tracking-tighter">{stat.value}</div>
              <div className="text-xs font-bold text-muted">{stat.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 bg-card-black border-white/5 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black italic tracking-tight uppercase">Performance Analytics</CardTitle>
              <CardDescription>Network routing vs mining rewards</CardDescription>
            </div>
            <Tabs defaultValue="7d" className="w-[200px]">
              <TabsList className="bg-deep-black border border-white/5 h-8">
                <TabsTrigger value="7d" className="text-[10px] uppercase font-bold">7 Days</TabsTrigger>
                <TabsTrigger value="30d" className="text-[10px] uppercase font-bold">30 Days</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7931A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F7931A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#8E9299" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#8E9299" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#F7931A" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right Sidebar: Active Nodes */}
        <div className="space-y-4">
          <Card className="bg-card-black border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Active Infrastructure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'NODE-X921', type: 'Pro', status: 'Online', uptime: 99.8, earnings: '0.12 BTC' },
                { id: 'NODE-L882', type: 'Lite', status: 'Offline', uptime: 45.2, earnings: '0.01 BTC' },
              ].map((node, i) => (
                <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-black italic text-lg tracking-tighter">{node.id}</div>
                    <Badge variant={node.status === 'Online' ? 'default' : 'destructive'} className="text-[8px] uppercase font-black tracking-widest h-5">
                        {node.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-muted uppercase tracking-widest">
                    <span>{node.type} Tier</span>
                    <span>{node.earnings} Earned</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                        <span>Uptime</span>
                        <span>{node.uptime}%</span>
                    </div>
                    <Progress value={node.uptime} className="h-1 bg-white/5" indicatorClassName={node.status === 'Online' ? 'bg-bitcoin' : 'bg-destructive'} />
                  </div>
                </div>
              ))}
              <Button 
                variant="ghost" 
                onClick={() => toast.info('Loading complete infrastructure registry...')}
                className="w-full text-xs font-bold text-muted hover:text-white uppercase tracking-widest"
              >
                View All Nodes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-bitcoin text-black border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <TrendingUp className="w-24 h-24" />
            </div>
            <CardContent className="p-6 space-y-3 relative">
                <div className="text-xs font-black uppercase tracking-widest">Vesting Progress</div>
                <div className="text-4xl font-black tracking-tighter">75%</div>
                <Progress value={75} className="h-2 bg-black/10" indicatorClassName="bg-black" />
                <p className="text-[10px] font-bold uppercase">Next unlock in 14 days, 12 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <Card className="bg-card-black border-white/5">
        <CardHeader>
           <CardTitle className="text-xl font-black italic tracking-tight uppercase">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
              {[
                { type: 'Routing Reward', amount: '+0.00042 BTC', date: '2 min ago', id: 'TX-8821...', status: 'Completed' },
                { type: 'Commission Claim', amount: '+250.00 LNT', date: '5 hours ago', id: 'TX-1102...', status: 'Completed' },
                { type: 'Node Purchase', amount: '-499.00 USDT', date: '1 day ago', id: 'TX-9901...', status: 'Completed' },
                { type: 'Staking Yield', amount: '+12.40 LNT', date: '2 days ago', id: 'TX-7721...', status: 'Pending' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                        {tx.amount.startsWith('+') ? <ArrowDownLeft className="w-5 h-5 text-green-500" /> : <ArrowUpRight className="w-5 h-5 text-bitcoin" />}
                    </div>
                    <div>
                        <div className="font-bold text-sm tracking-tight">{tx.type}</div>
                        <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{tx.id} • {tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-black ${tx.amount.startsWith('+') ? 'text-white' : 'text-muted'}`}>{tx.amount}</div>
                    <div className={`text-[8px] font-black uppercase inline-block px-2 py-0.5 rounded ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-bitcoin/10 text-bitcoin'}`}>
                        {tx.status}
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
