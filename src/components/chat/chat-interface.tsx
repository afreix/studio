
"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, User, Sparkles, Bot } from 'lucide-react';
import { semanticSearchEvents, SemanticSearchEventsOutput } from '@/ai/flows/semantic-search-events';
import type { ChatMessage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await semanticSearchEvents({ query: inputValue });
      
      let responseText: string | React.ReactNode = "No relevant events found.";
      if (aiResponse.results && aiResponse.results.length > 0) {
        responseText = (
          <div className="space-y-2">
            <p>Here are some events I found related to your query:</p>
            {aiResponse.results.map(event => (
              <Card key={event.id} className="bg-background/50 p-3 text-sm">
                <p><strong>Source:</strong> {event.source}</p>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Date:</strong> {format(new Date(event.ts), "MMM d, yyyy 'at' h:mm a")}</p>
                <details className="mt-1">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">View Payload</summary>
                  <pre className="mt-1 text-xs bg-popover p-2 rounded-md overflow-x-auto">
                    {JSON.stringify(event.payload, null, 2)}
                  </pre>
                </details>
              </Card>
            ))}
          </div>
        );
      } else if (aiResponse.results && aiResponse.results.length === 0) {
         responseText = "I looked for events related to your query, but couldn't find any matches.";
      }


      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-md overflow-hidden">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {typeof message.text === 'string' ? <p>{message.text}</p> : message.text}
                 <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left'}`}>
                    {format(message.timestamp, 'p')}
                </p>
              </div>
              {message.sender === 'user' && (
                 <Avatar className="h-8 w-8">
                   <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                 </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] rounded-lg px-3 py-2 text-sm shadow bg-muted text-muted-foreground">
                    <Sparkles className="h-4 w-4 animate-pulse inline-block mr-1" /> Thinking...
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Ask about your events..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading || inputValue.trim() === ''}>
            <Send className="h-4 w-4 mr-0 md:mr-2" />
            <span className="hidden md:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
