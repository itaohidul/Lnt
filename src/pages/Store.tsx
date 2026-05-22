import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ChevronDown, 
  Plus, 
  Minus, 
  Globe, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Wallet, 
  Save, 
  Download, 
  FileText,
  Clock,
  LayoutGrid,
  TrendingUp,
  CircleDollarSign,
  Package,
  History,
  AlertCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  Search,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock countries for the dropdown
const COUNTRIES = [
  "United States", "China", "Germany", "United Kingdom", "Japan", 
  "Singapore", "South Korea", "Switzerland", "Canada", "Australia"
];

interface PurchaseRecord {
  id: string;
  qty: number;
  amount?: string;
  commission?: string;
  wallet?: string;
  time: string;
  status: 'Complete' | 'Pending';
}

export default function NodeMall() {
  const [activeTab, setActiveTab] = useState('full-node');
  
  // --- Global Constants ---
  const AGENT_ADDRESS = "0x6aAf798BC9F82aBa7e6f4f9Ca157D33e35431d7";

  // --- Full Node State ---
  const [fnQuantity, setFnQuantity] = useState(1);
  const [physicalRequired, setPhysicalRequired] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [fnForm, setFnForm] = useState({
    province: '',
    city: '',
    street: '',
    recipient: '',
    phone: '',
    email: '',
  });
  const [fnRecords, setFnRecords] = useState<PurchaseRecord[]>([]);
  const [isRulesExpanded, setIsRulesExpanded] = useState(true);

  // --- Shared Node State ---
  const [snShares, setSnShares] = useState('2');
  const [snNostr, setSnNostr] = useState('');
  const [snQuantityType, setSnQuantityType] = useState('1share(s)');

  // --- LNT Resale State ---
  const [resaleQty, setResaleQty] = useState('');
  const [resaleNostr, setResaleNostr] = useState('');
  const [resaleRecords, setResaleRecords] = useState<PurchaseRecord[]>([]);

  // --- Commission State ---
  const [commissionTab, setCommissionTab] = useState('sales');
  const referralLink = "https://btclnt.com/ref/0x6aAf798BC9F82aBa7e6f4f9Ca157D33e35431d7";

  // pricing logic
  const FN_PRICE = 1000;
  const FN_SHIPPING = physicalRequired ? 100 : 0;
  const SN_SHARE_PRICE = 100;
  const LNT_UNIT_PRICE = 0.15;

  const fnTotal = (FN_PRICE * fnQuantity) + FN_SHIPPING;
  const snTotal = parseFloat(snShares || '0') * SN_SHARE_PRICE;
  const resaleTotal = parseFloat(resaleQty || '0') * LNT_UNIT_PRICE;

  const handlePay = (type: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Connecting to BSC Wallet...',
        success: () => {
          const timestamp = new Date().toLocaleString();
          if (type === 'full') {
            const newRecord: PurchaseRecord = {
              id: (fnRecords.length + 1).toString().padStart(2, '0'),
              qty: fnQuantity,
              time: timestamp,
              status: 'Complete'
            };
            const updated = [newRecord, ...fnRecords];
            setFnRecords(updated);
            localStorage.setItem('lnt_fn_records', JSON.stringify(updated));
          } else if (type === 'resale' || type === 'shared') {
             // For simplicity, let's track resale in commission logic
             const newRevRecord: PurchaseRecord = {
                id: (resaleRecords.length + 1).toString().padStart(2, '0'),
                wallet: AGENT_ADDRESS.slice(0,6) + '...' + AGENT_ADDRESS.slice(-4),
                qty: type === 'resale' ? parseFloat(resaleQty) : parseFloat(snShares),
                amount: (type === 'resale' ? resaleTotal : snTotal).toFixed(2) + ' USDT',
                commission: ((type === 'resale' ? resaleTotal : snTotal) * 0.05).toFixed(2) + ' USDT',
                time: timestamp,
                status: 'Complete'
             };
             const updated = [newRevRecord, ...resaleRecords];
             setResaleRecords(updated);
             localStorage.setItem('lnt_resale_records', JSON.stringify(updated));
          }
          return 'Transaction successful!';
        },
        error: 'Transaction failed (Low balance).',
      }
    );
  };

  useEffect(() => {
    const savedFn = localStorage.getItem('lnt_fn_records');
    if (savedFn) setFnRecords(JSON.parse(savedFn));
    const savedResale = localStorage.getItem('lnt_resale_records');
    if (savedResale) setResaleRecords(JSON.parse(savedResale));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-24 overflow-x-hidden selection:bg-cyan-500/30">
      <div className="max-w-2xl mx-auto px-4 pt-8 md:pt-12">
        
        {/* Navigation Tabs - Centered & Mobile Optimized */}
        <div className="w-full mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="inline-flex bg-[#111] border border-white/5 rounded-full p-1 h-11 min-w-max">
                {['full-node', 'shared-node', 'lnt-resale', 'commission'].map((tab) => (
                  <TabsTrigger 
                    key={tab} 
                    value={tab} 
                    className="px-5 sm:px-8 rounded-full data-[state=active]:bg-cyan-400 data-[state=active]:text-black font-black text-[9px] sm:text-[10px] uppercase tracking-widest transition-all duration-300 active:scale-95"
                  >
                    {tab.replace('-', ' ')}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* TAB CONTENT: FULL NODE */}
            <TabsContent value="full-node" className="space-y-8 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="p-1">
                    <button 
                        onClick={() => setIsRulesExpanded(!isRulesExpanded)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors rounded-xl"
                    >
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Full Node Purchase Rules:</span>
                        <ChevronDown className={`w-4 h-4 text-white/20 transition-transform duration-300 ${isRulesExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <AnimatePresence>
                      {isRulesExpanded && (
                          <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-5 pb-5 overflow-hidden"
                          >
                              <div className="text-[11px] leading-relaxed text-white/30 space-y-4 pt-4 border-t border-white/5">
                                  <p>1. Global retail price: 1000 USD per unit. International shipping and tariffs are additional (estimated 50-200 USD, varies by country).</p>
                                  <p>2. To avoid long shipping delays affecting node activation and rewards, LNT offers a cloud node transition solution:</p>
                                  <div className="pl-2 space-y-3">
                                      <p>(1) After purchase, users can immediately apply for a cloud node without waiting for hardware delivery;</p>
                                      <p>(2) The cloud node will be automatically located in the user's region, participating in routing and earning LNT rewards without manual activation;</p>
                                      <p>(3) Once the physical node arrives, users may reactivate it (requires a 32,000 satoshi stake).</p>
                                  </div>
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>
              </div>

              <div className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Agent Address</label>
                      <Input readOnly value={AGENT_ADDRESS} className="bg-[#111] border-white/10 h-14 rounded-2xl text-[10px] md:text-xs font-mono text-white/40 px-5 focus:ring-1 focus:ring-cyan-500/30" />
                  </div>

                  <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Order</label>
                      <div className="flex items-center justify-between bg-[#111] border border-white/10 rounded-2xl h-14 px-5">
                        <button onClick={() => setFnQuantity(Math.max(1, fnQuantity - 1))} className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10 active:scale-90">
                            <Minus className="w-5 h-5" />
                        </button>
                        <span className="font-black text-3xl italic tracking-tighter tabular-nums">{fnQuantity}</span>
                        <button onClick={() => setFnQuantity(fnQuantity + 1)} className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10 active:scale-90">
                            <Plus className="w-5 h-5" />
                        </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Price</label>
                          <Input readOnly value={FN_PRICE} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-2xl italic tracking-tighter" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Total</label>
                          <Input readOnly value={fnTotal} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-2xl italic tracking-tighter text-cyan-400" />
                      </div>
                  </div>

                  <div className="space-y-4 py-2">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Physical Node Required</label>
                      <div className="flex gap-10 pl-1">
                          <label onClick={() => setPhysicalRequired(true)} className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${physicalRequired ? 'border-cyan-400 bg-cyan-400/20' : 'border-white/10'}`}>
                                  {physicalRequired && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                              </div>
                              <span className="text-xs font-black italic uppercase tracking-widest">Yes</span>
                          </label>
                          <label onClick={() => setPhysicalRequired(false)} className="flex items-center gap-3 cursor-pointer group">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${!physicalRequired ? 'border-cyan-400 bg-cyan-400/20' : 'border-white/10'}`}>
                                  {!physicalRequired && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                              </div>
                              <span className="text-xs font-black italic uppercase tracking-widest">No</span>
                          </label>
                      </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Country</label>
                        <div className="relative">
                            <select 
                                className="w-full bg-[#111] border border-white/10 h-14 rounded-2xl px-5 text-sm font-black focus:outline-none appearance-none cursor-pointer"
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Shipping & Tariffs</label>
                        <Input readOnly value={`${FN_SHIPPING} USDT`} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-xl italic" />
                    </div>
                  </div>

                  <div className="space-y-4">
                      <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Address Details</label>
                      <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="Province" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 focus:ring-cyan-400/20" value={fnForm.province} onChange={(e) => setFnForm({...fnForm, province: e.target.value})} />
                          <Input placeholder="City" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 focus:ring-cyan-400/20" value={fnForm.city} onChange={(e) => setFnForm({...fnForm, city: e.target.value})} />
                      </div>
                      <Input placeholder="Street" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 focus:ring-cyan-400/20" value={fnForm.street} onChange={(e) => setFnForm({...fnForm, street: e.target.value})} />
                  </div>

                  {['recipient', 'phone', 'email'].map((f) => (
                    <div key={f} className="space-y-2">
                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1 capitalize">{f}</label>
                        <Input 
                            placeholder={`Enter ${f}`} 
                            className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 focus:ring-cyan-400/20" 
                            //@ts-ignore
                            value={fnForm[f]}
                            onChange={(e) => setFnForm({...fnForm, [f]: e.target.value})}
                        />
                    </div>
                  ))}

                  <div className="flex gap-4 pt-4">
                      <Button className="flex-1 h-14 bg-cyan-500 text-black font-black uppercase text-[10px] italic tracking-widest rounded-2xl hover:bg-cyan-400 active:scale-98 transition-transform">Save</Button>
                      <Button variant="outline" className="flex-1 h-14 border-white/10 bg-white text-black font-black uppercase text-[10px] italic tracking-widest rounded-2xl hover:bg-white/90 active:scale-98 transition-transform">Import</Button>
                  </div>

                  <div className="pt-8 text-center space-y-4">
                      <Button onClick={() => handlePay('full')} className="w-full h-16 bg-cyan-400 text-black font-black text-2xl italic uppercase rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-[1.01] transition-all">Pay</Button>
                      <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">BSC Wallet Only</p>
                  </div>
              </div>

              {/* Records Section */}
              <div className="pt-24 space-y-8">
                  <div className="flex flex-col gap-3">
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">Complete machine purchase record</h2>
                      <div className="h-0.5 w-12 bg-cyan-400 rounded-full" />
                  </div>
                  <div className="space-y-2 min-h-[300px]">
                      <div className="grid grid-cols-3 text-cyan-400 text-[10px] font-black uppercase tracking-widest px-4 pb-4 border-b border-white/10">
                          <span>No.</span>
                          <span className="text-center">Qty</span>
                          <span className="text-right">Time</span>
                      </div>
                      {fnRecords.length === 0 ? (
                          <div className="py-24 flex flex-col items-center justify-center opacity-20 grayscale">
                              <LayoutGrid className="w-16 h-16 text-cyan-400 mb-6 stroke-[1]" />
                              <div className="text-[10px] font-black uppercase tracking-[0.6em]">No Data</div>
                          </div>
                      ) : (
                        fnRecords.map(r => (
                          <div key={r.id} className="grid grid-cols-3 text-sm font-bold py-6 px-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors">
                            <span className="text-white/40 font-mono">#{r.id}</span>
                            <span className="text-center font-black italic text-xl tracking-tighter">{r.qty}</span>
                            <span className="text-right text-[10px] text-white/20 uppercase font-mono">{r.time}</span>
                          </div>
                        ))
                      )}
                  </div>
                  <div className="flex justify-end pt-4">
                      <Button variant="outline" className="rounded-full h-11 px-10 border-white/10 text-[10px] font-black uppercase tracking-widest italic bg-[#111] hover:bg-white/5 transition-colors">Add Address</Button>
                  </div>

                  {/* Redundant "No Data" sections seen in screenshot */}
                  <div className="py-24 flex flex-col items-center justify-center opacity-20 grayscale">
                      <LayoutGrid className="w-16 h-16 text-cyan-400 mb-6 stroke-[1]" />
                      <div className="text-[10px] font-black uppercase tracking-[0.6em]">No Data</div>
                  </div>
              </div>
            </TabsContent>

            {/* TAB CONTENT: SHARED NODE */}
            <TabsContent value="shared-node" className="space-y-8 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Shared Node Purchase Rules:</div>
                <p className="text-[11px] leading-relaxed text-white/30 italic">
                  LNT offers shared nodes for smaller investments—each share costs 100 USD, users may buy multiple shares. 
                  10 shares form one full node, operated by LNT with daily rewards distributed to user wallets. 
                  If a node is not fully subscribed within 7 days, LNT will cover the remaining shares to deploy the node. 
                  Rebate policy same as full nodes.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Node ID</label>
                  <Input readOnly value="LXX100" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black italic px-5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Host Country/Region</label>
                  <Input readOnly value="中国" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black italic px-5" />
                  <p className="text-[9px] text-white/20 font-black italic px-1">*Exact hosting address will be notified after launch</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Shares Purchased</label>
                  <Input 
                    type="number" 
                    value={snShares} 
                    onChange={(e) => setSnShares(e.target.value)}
                    className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-2xl italic tracking-tighter px-5" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Agent Address</label>
                  <Input readOnly value={AGENT_ADDRESS} className="bg-[#111] border-white/10 h-14 rounded-2xl text-[10px] font-mono text-white/30 px-5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Quantity</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-[#111] border border-white/10 h-14 rounded-2xl px-5 text-sm font-black italic appearance-none"
                      value={snQuantityType}
                      onChange={(e) => setSnQuantityType(e.target.value)}
                    >
                      <option>1share(s)</option>
                      <option>2share(s)</option>
                      <option>5share(s)</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Total Price</label>
                  <Input readOnly value={`${snTotal} USDT`} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-2xl italic tracking-tighter text-cyan-400 px-5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Nostr Address/Telegram ID</label>
                  <Input value={snNostr} onChange={(e) => setSnNostr(e.target.value)} placeholder="Enter Nostr Address" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 px-5" />
                  <div className="flex flex-col gap-3 pt-3 px-1">
                    <a href="#" className="flex items-center gap-2 text-cyan-400 text-[10px] font-black italic underline uppercase decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">
                      <ExternalLink className="w-3 h-3" />
                      Click to view the video on how to obtain a Nostr address
                    </a>
                    <a href="#" className="flex items-center gap-2 text-cyan-400 text-[10px] font-black italic underline uppercase decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">
                      <ExternalLink className="w-3 h-3" />
                      Click to view the video on how to obtain a Telegram ID
                    </a>
                  </div>
                </div>
                <div className="pt-10">
                  <Button onClick={() => handlePay('shared')} className="w-full h-16 bg-cyan-400 text-black font-black text-2xl italic uppercase rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-[1.01] transition-all">Pay</Button>
                  <p className="text-[10px] text-center text-white/20 font-black uppercase tracking-[0.4em] mt-4">BSC Wallet Only</p>
                </div>
              </div>
            </TabsContent>

            {/* TAB CONTENT: LNT RESALE */}
            <TabsContent value="lnt-resale" className="space-y-8 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Note:</div>
                <p className="text-[11px] leading-relaxed text-white/30 italic">
                  The LNT Tokens sold here come from incentive airdrops obtained by users who participated in the early node testing. 
                  The quantity is limited and the price may fluctuate. Please participate only after fully understanding the value and risks of LNT. 
                  For bulk purchases, please contact the official team.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Referrer Address</label>
                  <Input readOnly value={AGENT_ADDRESS} className="bg-[#111] border-white/10 h-14 rounded-2xl text-[10px] font-mono text-white/30 px-5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Unit Price</label>
                  <Input readOnly value={`${LNT_UNIT_PRICE} USDT`} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black italic px-5" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Quantity</label>
                    <div className="relative">
                      <Input 
                        placeholder="Please enter quantity" 
                        value={resaleQty}
                        onChange={(e) => setResaleQty(e.target.value)}
                        className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-xl italic placeholder:text-white/5 pr-16 px-5" 
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black italic text-white/30">LNT</div>
                    </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Amount</label>
                  <Input readOnly value={`${resaleTotal.toFixed(2)} USDT`} className="bg-[#111] border-white/10 h-14 rounded-2xl font-black text-2xl italic tracking-tighter text-cyan-400 px-5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Nostr Address/Telegram ID</label>
                  <Input value={resaleNostr} onChange={(e) => setResaleNostr(e.target.value)} placeholder="Enter Nostr Address" className="bg-[#111] border-white/10 h-14 rounded-2xl font-black placeholder:text-white/5 px-5" />
                  <div className="flex flex-col gap-3 pt-3 px-1">
                    <a href="#" className="flex items-center gap-2 text-cyan-400 text-[10px] font-black italic underline uppercase decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">
                      <ExternalLink className="w-3 h-3" />
                      Click to view the video on how to obtain a Nostr address
                    </a>
                    <a href="#" className="flex items-center gap-2 text-cyan-400 text-[10px] font-black italic underline uppercase decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">
                      <ExternalLink className="w-3 h-3" />
                      Click to view the video on how to obtain a Telegram ID
                    </a>
                  </div>
                </div>
                <div className="pt-10">
                  <Button onClick={() => handlePay('resale')} className="w-full h-16 bg-cyan-400 text-black font-black text-2xl italic uppercase rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:scale-[1.01] transition-all">Pay</Button>
                  <p className="text-[10px] text-center text-white/20 font-black uppercase tracking-[0.4em] mt-4">BSC Wallet Only</p>
                </div>
              </div>
            </TabsContent>

            {/* TAB CONTENT: COMMISSION */}
            <TabsContent value="commission" className="space-y-12 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="space-y-10 pt-4">
                <div className="space-y-6">
                  <section className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center font-black italic">1</div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">Channels</h3>
                    </div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest pl-11">Social media, crypto media, KOL partnerships</p>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center font-black italic">2</div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">Node rebate policy</h3>
                    </div>
                    <div className="space-y-1 pl-1 pr-1 lg:pl-11">
                      <div className="grid grid-cols-2 text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em] pb-3 border-b border-white/10 px-2">
                        <span>Sales/units</span>
                        <span className="text-right">Commission</span>
                      </div>
                      {[
                        ['1-10', '5%'],
                        ['11-30', '10%'],
                        ['31-50', '15%'],
                        ['51-75', '20%'],
                        ['76-100', '25%'],
                        ['100+', '30%'],
                      ].map(([range, rate], i) => (
                        <div key={i} className="grid grid-cols-2 text-xs font-black italic py-4 px-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-lg">
                          <span className="text-white/50">{range}</span>
                          <span className="text-right text-white tabular-nums">{rate}</span>
                        </div>
                      ))}
                      <p className="text-[10px] font-black italic text-[#FF4D4D] pt-4 pl-2 leading-relaxed uppercase tracking-tight">
                        *Purchasing 10 or more units from a single address qualifies for agency status
                      </p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center font-black italic">3</div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">LNT Token Rebate Policy</h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/30 italic pl-11">
                      Anyone can generate a referral link to become a promoter, with 5% rebate each time. 
                      To increase the rebate ratio, please contact the official team.
                    </p>
                  </section>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-2 gap-3 py-6">
                  {[
                    { label: 'Total Sales', val: '$ 0', icon: TrendingUp },
                    { label: 'Nodes Sold', val: '0', icon: Package },
                    { label: 'Comm. Rate', val: '0%', icon: CircleDollarSign },
                    { label: 'Community', val: '0', icon: Users },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl text-center group hover:border-cyan-400/20 transition-all duration-500 hover:bg-[#111]">
                       <div className="text-3xl font-black italic tracking-tighter mb-1 uppercase text-white tabular-nums">{s.val}</div>
                       <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Referral Link Box */}
                <div className="flex flex-col items-center gap-5 py-8 border-y border-white/5">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Share your code</div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(referralLink);
                        toast.success('Referral link copied to clipboard!');
                      }}
                      className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#111] border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all active:scale-95"
                    >
                      <span className="text-cyan-400 text-xs font-black italic uppercase tracking-widest">Referral Link:</span>
                      <Copy className="w-4 h-4 text-white/30 group-hover:text-cyan-400 group-hover:rotate-12 transition-all" />
                    </button>
                    <p className="text-[9px] font-black text-white/10 uppercase tracking-widest text-center">{referralLink}</p>
                </div>

                {/* Sales Records Section */}
                <div className="space-y-8 pt-8">
                   <div className="flex bg-[#111] p-1.5 rounded-2xl gap-1.5">
                      <button 
                        onClick={() => setCommissionTab('sales')}
                        className={`h-12 flex-1 rounded-xl font-black uppercase text-[10px] italic tracking-widest transition-all ${commissionTab === 'sales' ? 'bg-cyan-400 text-black shadow-lg' : 'text-white/30 hover:bg-white/5'}`}
                      >
                        Sales Record
                      </button>
                      <button 
                        onClick={() => setCommissionTab('resale')}
                        className={`h-12 flex-1 rounded-xl font-black uppercase text-[10px] italic tracking-widest transition-all ${commissionTab === 'resale' ? 'bg-cyan-400 text-black shadow-lg' : 'text-white/30 hover:bg-white/5'}`}
                      >
                        LNT Resale Records
                      </button>
                   </div>

                   <div className="space-y-4 px-1">
                      <div className="grid grid-cols-5 text-cyan-400 text-[8px] font-black uppercase tracking-tighter pb-4 border-b border-white/10 px-2">
                        <span>No.</span>
                        <span>Wallet</span>
                        <span className="text-center">Qty</span>
                        <span className="text-center">Comm.</span>
                        <span className="text-right">Time</span>
                      </div>
                      
                      {commissionTab === 'resale' && resaleRecords.length > 0 ? (
                        resaleRecords.map(r => (
                          <div key={r.id} className="grid grid-cols-5 text-[10px] font-bold py-6 px-2 border-b border-white/5 items-center hover:bg-white/[0.01] transition-colors">
                            <span className="text-white/30 font-mono">#{r.id}</span>
                            <span className="truncate pr-4 font-mono text-[9px] uppercase">{r.wallet}</span>
                            <span className="text-center font-black italic text-lg tabular-nums">{r.qty}</span>
                            <span className="text-center text-cyan-400 italic font-black tabular-nums">{r.commission?.split(' ')[0]}</span>
                            <span className="text-right text-[8px] text-white/20 font-mono">{r.time.split(',')[0]}</span>
                          </div>
                        ))
                      ) : (
                        <div className="py-24 flex flex-col items-center justify-center opacity-20 grayscale">
                            <LayoutGrid className="w-16 h-16 text-cyan-400 mb-6 stroke-[1]" />
                            <div className="text-[10px] font-black uppercase tracking-[0.6em]">No Data</div>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @supports (-webkit-touch-callout: none) {
          .no-scrollbar {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
