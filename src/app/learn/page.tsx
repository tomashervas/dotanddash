
"use client";

import { useState, useEffect, useCallback, type FormEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ALPHABET, MORSE_CODE, type MorseSymbol } from "@/lib/morse";
import { ArrowLeft, Lightbulb, SkipForward } from 'lucide-react';
import Link from 'next/link';
import * as Tone from 'tone';

type LetterData = MorseSymbol;

export default function LearnPage() {
  const [currentLetterData, setCurrentLetterData] = useState<LetterData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState({ message: '', color: '' });
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [key, setKey] = useState(0);
 const toneSynth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    toneSynth.current = new Tone.Synth().toDestination();
    return () => {
      toneSynth.current?.dispose();
    };
  }, []);

  const getRandomLetter = useCallback(() => {
    const randomLetter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    const data = MORSE_CODE[randomLetter];
    setCurrentLetterData({ letter: randomLetter, ...data });
    setInputValue('');
    setFeedback({ message: '', color: '' });
    setShowMnemonic(false);
    setKey(prevKey => prevKey + 1); // For re-triggering animation
  }, []);

  useEffect(() => {
    // This now correctly runs only on the client-side
    getRandomLetter();
  }, [getRandomLetter]);

  const handleShowMnemonic = () => {
    if (!currentLetterData) return;
    setShowMnemonic(true);
    setFeedback({ message: `Mnemónico: ${currentLetterData.mnemonic}`, color: 'text-accent-foreground' });
    setTimeout(() => {
      getRandomLetter();
    }, 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (showMnemonic || !currentLetterData) return;
    
    if (inputValue.trim().toUpperCase() === currentLetterData.mnemonic.toUpperCase()) {
      
      
      setFeedback({ message: '¡Correcto! Bien hecho.', color: 'text-green-600' });
      setTimeout(getRandomLetter, 1500);

      const now = Tone.now();
      toneSynth.current?.triggerAttackRelease("C5", "8n", now);
      toneSynth.current?.triggerAttackRelease("E5", "8n", now + 0.2);
      toneSynth.current?.triggerAttackRelease("G5", "8n", now + 0.4);
      
    } else {
      const now = Tone.now();
      toneSynth.current?.triggerAttackRelease("F3", "8n", now);
      toneSynth.current?.triggerAttackRelease("C3", "8n", now + 0.2);
      setFeedback({ message: "No es correcto. ¡Inténtalo de nuevo o pide una pista!", color: 'text-destructive' });
    }
  };

  if (!currentLetterData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
       <Card className="w-full max-w-lg shadow-xl relative" key={key}>
        <div className="absolute top-4 left-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </Link>
        </div>
        <CardHeader className="text-center pt-12">
          <CardTitle className="text-3xl font-headline">Aprende los Mnemónicos</CardTitle>
          <CardDescription>Escribe el mnemónico para la letra que se muestra a continuación.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-primary text-primary-foreground rounded-full w-40 h-40 flex items-center justify-center animate-fade-in-down">
                <span className="text-8xl font-bold font-headline">{currentLetterData.letter}</span>
            </div>
          
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Introduce la palabra mnemónica..."
                    className="text-center text-lg h-12"
                    disabled={showMnemonic}
                />
                <Button type="submit" className="w-full h-12 text-lg" disabled={showMnemonic}>Comprobar Respuesta</Button>
            </form>

            {feedback.message && (
                <p className={`text-center font-semibold text-lg transition-opacity duration-300 ${feedback.color}`}>
                    {feedback.message}
                </p>
            )}

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleShowMnemonic} disabled={showMnemonic}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Mostrar Mnemónico
          </Button>
          <Button variant="secondary" onClick={getRandomLetter}>
             Siguiente Letra
            <SkipForward className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
