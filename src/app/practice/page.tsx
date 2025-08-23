"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MORSE_CODE, PRACTICE_WORDS } from '@/lib/morse';
import { ArrowLeft, RefreshCw, Volume2, Ear } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const SHORT_PRESS_MS = 200;
const LETTER_PAUSE_MS = 1000;

export default function PracticePage() {
    const [word, setWord] = useState('');
    const [letterIndex, setLetterIndex] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [decodedWord, setDecodedWord] = useState('');
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [attempts, setAttempts] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    
    const { toast } = useToast();

    const pressStart = useRef<number | null>(null);
    const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
    const toneSynth = useRef<Tone.Synth | null>(null);

    const getNewWord = useCallback(() => {
        const newWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
        setWord(newWord);
        setLetterIndex(0);
        setCurrentInput('');
        setDecodedWord('');
        setFeedback({ message: '', type: '' });
        setAttempts(0);
        setIsComplete(false);
    }, []);

    useEffect(() => {
        toneSynth.current = new Tone.Synth().toDestination();
        getNewWord();
        return () => {
            toneSynth.current?.dispose();
        };
    }, [getNewWord]);

    const processLetter = useCallback(() => {
        if (!word || currentInput === '') return;
        const currentLetter = word[letterIndex];
        const correctCode = MORSE_CODE[currentLetter]?.code;

        if (currentInput === correctCode) {
            setDecodedWord(prev => prev + currentLetter);
            setFeedback({ message: `Correct!`, type: 'success' });
            setLetterIndex(prev => prev + 1);
            setAttempts(0);
            if (letterIndex + 1 === word.length) {
                setIsComplete(true);
                setFeedback({ message: `Word Complete: ${word}!`, type: 'success' });
                 toast({
                    title: "Congratulations!",
                    description: `You successfully typed "${word}" in Morse code.`,
                 })
            }
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            setFeedback({ message: `Incorrect. Try again.`, type: 'error' });
            if (newAttempts >= 2) {
                const mnemonic = MORSE_CODE[currentLetter]?.mnemonic;
                const relatedWord = MORSE_CODE[currentLetter]?.relatedWord;
                setFeedback({ message: `Hint: Mnemonic is '${mnemonic}'. Think '${relatedWord}'.`, type: 'hint' });
            }
        }
        setCurrentInput('');
    }, [word, letterIndex, currentInput, attempts, toast]);

    const handlePressStart = async () => {
        if (isComplete) return;
        if(Tone.context.state !== 'running') {
            await Tone.start();
        }
        pressStart.current = Date.now();
        toneSynth.current?.triggerAttack("C4");
        if (pauseTimeout.current) {
            clearTimeout(pauseTimeout.current);
            pauseTimeout.current = null;
        }
    };

    const handlePressEnd = () => {
        if (isComplete || !pressStart.current) return;
        const pressDuration = Date.now() - pressStart.current;
        pressStart.current = null;
        toneSynth.current?.triggerRelease();

        const symbol = pressDuration < SHORT_PRESS_MS ? '.' : '-';
        setCurrentInput(prev => prev + symbol);

        pauseTimeout.current = setTimeout(processLetter, LETTER_PAUSE_MS);
    };

    const feedbackColor =
        feedback.type === 'success' ? 'text-green-500' :
        feedback.type === 'error' ? 'text-destructive' :
        feedback.type === 'hint' ? 'text-blue-500' :
        'text-muted-foreground';

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl shadow-xl relative">
                <div className="absolute top-4 left-4">
                    <Link href="/" passHref>
                        <Button variant="ghost" size="icon" aria-label="Back to home">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
                <CardHeader className="text-center pt-12">
                    <CardTitle className="text-3xl font-headline">Practice Morse</CardTitle>
                    <CardDescription>Tap out the word below. Short press for a dot, long for a dash.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="w-full p-4 border rounded-lg bg-muted min-h-[120px] flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground">WORD TO TYPE</p>
                        <p className="text-5xl font-bold tracking-widest font-headline">{word}</p>
                    </div>

                    <div className="w-full p-4 border rounded-lg bg-background min-h-[120px] flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground">YOUR INPUT</p>
                        <p className="text-3xl font-mono text-primary min-h-[40px]">
                            <span className="text-foreground">{decodedWord}</span>
                            <span className="text-muted-foreground">{word.substring(decodedWord.length)}</span>
                        </p>
                        <p className="text-4xl font-mono text-blue-500 min-h-[40px] animate-pulse">
                            {currentInput || "..."}
                        </p>
                    </div>

                    <Button
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onTouchStart={handlePressStart}
                        onTouchEnd={handlePressEnd}
                        className="w-full h-40 text-2xl font-bold rounded-lg bg-primary hover:bg-primary/90 active:scale-95 transition-transform duration-150 select-none"
                        disabled={isComplete}
                    >
                        <Ear className="w-10 h-10 mr-4" />
                        TAP HERE
                    </Button>

                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                     <p className={cn("font-semibold h-6", feedbackColor)}>{feedback.message || "A 1-second pause separates letters."}</p>
                     <Button variant="secondary" onClick={getNewWord}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        New Word
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
