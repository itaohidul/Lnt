import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello Commander! I'm your LNT Infrastructure Assistant. How can I help you optimize your node routing or explain our referral economy today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          history: messages.map(m => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }))
        })
      });

      if (!response.ok) throw new Error('Failed to connect to LNT routing node');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "I encountered a routing error in my logic core. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle */}
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-bitcoin text-black shadow-2xl hover:scale-110 transition-transform z-[60] cyber-glow p-0"
      >
        <Bot className="w-8 h-8" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[400px] max-w-[90vw] h-[600px] z-[60]"
          >
            <Card className="bg-card-black border-bitcoin/50 h-full flex flex-col shadow-2xl overflow-hidden">
              <CardHeader className="bg-bitcoin text-black py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 fill-current" />
                    <CardTitle className="text-lg font-black italic uppercase tracking-tighter">LNT COMMAND AI</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-black/10 text-black">
                    <X className="w-6 h-6" />
                </Button>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-bitcoin text-black font-bold' : 'bg-white/10 text-bitcoin'}`}>
                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                          </div>
                          <div className={`p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-bitcoin text-black font-medium' : 'bg-white/5 border border-white/10 text-white leading-relaxed'}`}>
                            {m.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[85%]">
                          <div className="w-8 h-8 rounded bg-white/10 text-bitcoin flex items-center justify-center">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                          </div>
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-muted italic text-xs">
                             Analyzing network protocols...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 bg-deep-black border-t border-white/10">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask about nodes, rewards, LNT..." 
                      className="bg-white/5 border-white/10 h-12"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <Button onClick={handleSend} className="bg-bitcoin text-black h-12 w-12 p-0">
                        <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="mt-2 text-[8px] text-center text-muted uppercase font-bold tracking-widest opacity-50">
                    Powered by Gemini 3.1 Flash
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
