
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MORSE_CODE, ALPHABET, PRACTICE_WORDS } from '@/lib/morse';
import { ArrowLeft, Play, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

const DOT_DURATION = 0.1; // 100ms
const DASH_DURATION = 0.3; // 300ms
const SYMBOL_PAUSE = 0.1; // 100ms
const LETTER_PAUSE = 3;   // 3s

const TONE_FREQUENCY = 700;
const LEVEL_UP_STREAK = 10;

type Level = 1 | 2 | 3 | 4;

export default function HearPage() {
    const [level, setLevel] = useState<Level>(1);
    const [correctStreak, setCorrectStreak] = useState(0);
    const [sequence, setSequence] = useState('');
    const [morseSequence, setMorseSequence] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState({ message: '', color: '' });
    const [errorCount, setErrorCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const toneSynth = useRef<Tone.Synth | null>(null);

    // Initialize Tone.js and load progress from localStorage
    useEffect(() => {
        toneSynth.current = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
        }).toDestination();
        
        const savedLevel = localStorage.getItem('dotanddash_hearing_level');
        const savedStreak = localStorage.getItem('dotanddash_hearing_streak');
        if (savedLevel) setLevel(parseInt(savedLevel, 10) as Level);
        if (savedStreak) setCorrectStreak(parseInt(savedStreak, 10));

    }, []);

    // Generate a new sequence when level changes
    useEffect(() => {
        generateNewSequence();
    }, [level]);

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('dotanddash_hearing_level', level.toString());
        localStorage.setItem('dotanddash_hearing_streak', correctStreak.toString());
    }, [level, correctStreak]);

    const generateNewSequence = useCallback(() => {
        let newSequence = '';
        let length = 0;
        
        if (level === 1) length = 2;
        if (level === 2) length = 3;
        if (level === 3) length = 4;

        if (level < 4) {
            for (let i = 0; i < length; i++) {
                newSequence += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            }
        } else {
            newSequence = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)].toUpperCase();
        }

        const morseRep = newSequence.split('').map(char => MORSE_CODE[char]?.code || '').join(' / ');

        setSequence(newSequence);
        setMorseSequence(morseRep);
        setInputValue('');
        setFeedback({ message: '', color: '' });
        setErrorCount(0);
        setShowHint(false);
    }, [level]);

    const playSequence = useCallback(async () => {
        if (isPlaying || !sequence) return;
        
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        
        setIsPlaying(true);
        const now = Tone.now();
        let timeOffset = 0;

        for (const letter of sequence.split('')) {
            const code = MORSE_CODE[letter.toUpperCase()]?.code;
            if (code) {
                for (const symbol of code) {
                    const duration = symbol === '.' ? DOT_DURATION : DASH_DURATION;
                    toneSynth.current?.triggerAttackRelease(TONE_FREQUENCY, duration, now + timeOffset);
                    timeOffset += duration + SYMBOL_PAUSE;
                }
            }
            timeOffset += LETTER_PAUSE - SYMBOL_PAUSE; // Subtract one symbol pause because it's added at the end of the letter
        }
        
        // Wait for the sequence to finish playing before re-enabling the button
        setTimeout(() => setIsPlaying(false), timeOffset * 1000);

    }, [sequence, isPlaying]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim().toUpperCase() === sequence.toUpperCase()) {
            setFeedback({ message: '¡Correcto! ¡Muy bien!', color: 'text-green-600' });
            
            const newStreak = correctStreak + 1;
            if (newStreak >= LEVEL_UP_STREAK && level < 4) {
                setLevel(prev => (prev + 1) as Level);
                setCorrectStreak(0);
                 setFeedback({ message: `¡Correcto! ¡Subes al nivel ${level + 1}!`, color: 'text-green-600' });
            } else {
                setCorrectStreak(newStreak);
            }

            setTimeout(() => {
                generateNewSequence();
            }, 1500);

        } else {
            setFeedback({ message: 'Incorrecto. Inténtalo de nuevo.', color: 'text-destructive' });
            const newErrorCount = errorCount + 1;
            setErrorCount(newErrorCount);
            setCorrectStreak(0); // Reset streak on error

            if (newErrorCount >= 2) {
                setShowHint(true);
            }
        }
    };

    const getLevelName = (level: Level) => {
        switch(level) {
            case 1: return "Nivel 1: 2 Letras";
            case 2: return "Nivel 2: 3 Letras";
            case 3: return "Nivel 3: 4 Letras";
            case 4: return "Nivel 4: Palabras";
            default: return "Nivel Desconocido";
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-lg shadow-xl relative">
                <div className="absolute top-4 left-4">
                    <Link href="/" passHref>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
                <CardHeader className="text-center pt-12">
                    <CardTitle className="text-3xl font-headline">Practicar Audición de Morse</CardTitle>
                    <CardDescription>Escucha la secuencia y escribe lo que oyes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="w-full text-center p-4 border rounded-lg">
                        <p className="text-lg font-semibold">{getLevelName(level)}</p>
                        {level < 4 && (
                             <div className='mt-2'>
                                <Progress value={(correctStreak / LEVEL_UP_STREAK) * 100} className="w-full" />
                                <p className="text-sm text-muted-foreground mt-1">{correctStreak} / {LEVEL_UP_STREAK} para el siguiente nivel</p>
                            </div>
                        )}
                       
                    </div>

                    <Button onClick={playSequence} disabled={isPlaying} className="w-full h-24 text-2xl">
                        <Volume2 className="w-10 h-10 mr-4" />
                        {isPlaying ? 'Reproduciendo...' : 'Reproducir Sonido'}
                    </Button>

                     {showHint && (
                        <div className="bg-muted text-muted-foreground rounded-lg w-full p-4 flex items-center justify-center">
                            <p className="text-xl font-mono tracking-widest" aria-label="Pista en código morse">{morseSequence}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escribe aquí las letras o la palabra..."
                            className="text-center text-lg h-12"
                            disabled={isPlaying}
                        />
                        <Button type="submit" className="w-full h-12 text-lg" disabled={isPlaying}>Comprobar</Button>
                    </form>

                    {feedback.message && (
                        <p className={`text-center font-semibold text-lg transition-opacity duration-300 ${feedback.color}`}>
                            {feedback.message}
                        </p>
                    )}

                </CardContent>
                <CardFooter className="flex justify-end">
                     <Button variant="secondary" onClick={generateNewSequence} disabled={isPlaying}>
                        Saltar Secuencia
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

