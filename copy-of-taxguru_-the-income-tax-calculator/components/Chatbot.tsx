
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import MicrophoneIcon from './icons/MicrophoneIcon';
import SpeakerOnIcon from './icons/SpeakerOnIcon';
import SpeakerOffIcon from './icons/SpeakerOffIcon';

// Add SpeechRecognition to window type for TypeScript
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface ChatbotProps {
    onClose: () => void;
}

const supportedLanguages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'kn-IN', name: 'Kannada' },
    { code: 'bn-IN', name: 'Bengali' },
    { code: 'mr-IN', name: 'Marathi' },
    { code: 'gu-IN', name: 'Gujarati' },
];

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'ai', text: 'Hello! I am TaxGPT. How can I help you with your Indian income tax questions today?', timestamp: new Date().toLocaleTimeString() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [selectedLang, setSelectedLang] = useState('en-US');
    const [isSpeechOutputOn, setIsSpeechOutputOn] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 5000); // Clear error message after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);

    const speak = useCallback((text: string, lang: string) => {
        if (!isSpeechOutputOn || !window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang === lang) || voices.find(v => v.lang.startsWith(lang.split('-')[0]));
        if (voice) {
            utterance.voice = voice;
        }
        window.speechSynthesis.speak(utterance);
    }, [isSpeechOutputOn]);

    const handleSend = useCallback(async (messageText: string = input) => {
        if (messageText.trim() === '') return;
        setError(null);
        window.speechSynthesis?.cancel();

        const userMessage: ChatMessage = { sender: 'user', text: messageText, timestamp: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const aiResponseText = await sendMessageToAI(messageText);
            const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText, timestamp: new Date().toLocaleTimeString() };
            setMessages(prev => [...prev, aiMessage]);
            speak(aiResponseText, selectedLang);
        } catch (error) {
            const errorMessageText = "Sorry, something went wrong. Please try again.";
            const errorMessage: ChatMessage = { sender: 'ai', text: errorMessageText, timestamp: new Date().toLocaleTimeString() };
            setMessages(prev => [...prev, errorMessage]);
            speak(errorMessageText, selectedLang);
        } finally {
            setIsTyping(false);
        }
    }, [input, selectedLang, speak]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.interimResults = true;

            recognition.onresult = (event: any) => {
                let final_transcript = '';
                let interim_transcript = Array.from(event.results)
                  .map((result: any) => result[0].transcript).join('');

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                    }
                }
                
                setInput(interim_transcript || final_transcript);

                if (final_transcript) {
                    recognition.stop();
                    handleSend(final_transcript);
                }
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                let errorMessage = "An error occurred during speech recognition. Please try again.";
                if (event.error === 'network') {
                    errorMessage = "Speech recognition failed. Please check your network connection and try again.";
                } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    errorMessage = "Microphone access denied. Please allow microphone access in your browser settings to use this feature.";
                } else if (event.error === 'no-speech') {
                    errorMessage = "No speech was detected. Please try again.";
                }
                setError(errorMessage);
                setIsListening(false);
            };
        }

        if (window.speechSynthesis && window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, [handleSend]);


    const handleToggleListen = () => {
        setError(null);
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            if (recognitionRef.current) {
                window.speechSynthesis?.cancel();
                recognitionRef.current.lang = selectedLang;
                setInput('');
                recognitionRef.current.start();
                setIsListening(true);
            } else {
                setError("Sorry, your browser doesn't support speech recognition.");
            }
        }
    };
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLang(e.target.value);
        if(isListening) {
            recognitionRef.current?.stop();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
             <div className="flex flex-col h-[70vh] w-96 bg-white dark:bg-neutral-dark shadow-2xl rounded-xl border border-neutral dark:border-neutral-darkest">
                <div className="flex justify-between items-center p-4 bg-primary text-white rounded-t-xl">
                    <div>
                        <h2 className="text-lg font-bold">TaxGPT Assistant</h2>
                        <p className="text-sm text-primary-light/80">Your guide to Indian taxes</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <select 
                            value={selectedLang} 
                            onChange={handleLanguageChange}
                            className="bg-primary-light/30 text-white text-xs rounded-md p-1 border-0 focus:ring-2 focus:ring-white/50"
                            aria-label="Select voice language"
                        >
                            {supportedLanguages.map(lang => (
                                <option key={lang.code} value={lang.code} className="text-black">{lang.name}</option>
                            ))}
                        </select>
                         <button onClick={() => setIsSpeechOutputOn(prev => !prev)} className="p-1 rounded-full text-primary-light/80 hover:text-white hover:bg-white/10 transition-colors" aria-label="Toggle speech output">
                            {isSpeechOutputOn ? <SpeakerOnIcon className="h-5 w-5"/> : <SpeakerOffIcon className="h-5 w-5"/>}
                        </button>
                        <button onClick={onClose} className="p-1 rounded-full text-primary-light/80 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close chat">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto bg-neutral-light/30 dark:bg-neutral-dark/30">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-neutral dark:bg-neutral-darkest text-neutral-darkest dark:text-white rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-neutral-dark dark:text-neutral-light/60'} text-right`}>{msg.timestamp}</p>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-neutral dark:bg-neutral-darkest text-neutral-darkest dark:text-white rounded-bl-none">
                                   <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-neutral-dark/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-neutral-dark/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-neutral-dark/50 rounded-full animate-bounce"></span>
                                   </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="p-4 border-t border-neutral dark:border-neutral-darkest">
                    <div className="flex items-center space-x-2">
                         <button 
                            onClick={handleToggleListen} 
                            className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-light dark:bg-neutral-darkest text-neutral-dark dark:text-neutral-light hover:bg-neutral/50 dark:hover:bg-neutral-dark'}`}
                            disabled={!recognitionRef.current}
                            aria-label={isListening ? 'Stop listening' : 'Start listening'}
                        >
                            <MicrophoneIcon className="h-5 w-5"/>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isListening && handleSend(input)}
                            placeholder={isListening ? 'Listening...' : "Ask about taxes..."}
                            className="flex-1 bg-neutral-light dark:bg-neutral-darkest border border-neutral dark:border-neutral-dark rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                            disabled={isListening}
                        />
                        <button 
                            onClick={() => handleSend(input)} 
                            className="bg-primary hover:bg-primary-light text-white rounded-full p-3 transition-colors disabled:bg-neutral" 
                            disabled={isTyping || isListening || !input.trim()}
                            aria-label="Send message"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.894 15V4.106A1 1 0 0010.894 2.553z" />
                                <path d="M10.894 2.553L9.106 2.553l7 14 .001.001.002.002.005.004.01.007.014.009.02.01.028.01.036.01.048.007.058.004.07.002.082-.001.094-.002.106-.004.118-.006.13-.007.142-.01.154-.01.166-.012.178-.013.19-.013.202-.012.214-.01.226-.008.238-.006.25-.004.262-.002.274 0 .286.002.298.002.31.004.322.006.334.007.346.008.358.01.37.01.382.012.394.013.406.013.418.012.43.01.442.008.454.006.466.004.478.002.49 0 .502-.002.514-.002.526-.004.538-.006.55-.007.562-.008.574-.01.586-.01.598-.012.61-.013.622-.013.634-.012.646-.01.658-.008.67-.006.682-.004.694-.002.706 0" />
                            </svg>
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-500 text-center mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
