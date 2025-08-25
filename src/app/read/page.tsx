
"use client";

import { useState, useEffect, useCallback, type FormEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MORSE_CODE, PRACTICE_WORDS } from "@/lib/morse";
import { ArrowLeft, SkipForward } from 'lucide-react';
import Link from 'next/link';
import * as Tone from 'tone';

export default function ReadPage() {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [morseWord, setMorseWord] = useState<string>('');
  const [errorCount, setErrorCount] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<{ [key: number]: string }>({});
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState({ message: '', color: '' });
  const toneSynth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    toneSynth.current = new Tone.Synth().toDestination();
    return () => {
      toneSynth.current?.dispose();
    };
  }, []);

  const getNewWord = useCallback(() => {
    const randomWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
    const morseRepresentation = randomWord
      .split('')
      .map(char => MORSE_CODE[char.toUpperCase()]?.code || '')
      .join(', ');
      
    setCurrentWord(randomWord);
    setMorseWord(morseRepresentation);
    setInputValue('');
    setFeedback({ message: '', color: '' });
    setRevealedLetters({}); // Reset revealed letters
 setErrorCount(0); // Reset error count on new word
  }, []);

  useEffect(() => {
    getNewWord();
  }, [getNewWord]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;
    
    if (inputValue.trim().toUpperCase() === currentWord.toUpperCase()) {
 setRevealedLetters({}); // Reset revealed letters on correct answer
      setErrorCount(0); // Reset error count on correct answer
      setFeedback({ message: '¡Correcto! ¡Excelente!', color: 'text-green-600' });
      const now = Tone.now();
      toneSynth.current?.triggerAttackRelease("C5", "8n", now);
      toneSynth.current?.triggerAttackRelease("E5", "8n", now + 0.2);
      toneSynth.current?.triggerAttackRelease("G5", "8n", now + 0.4);
      setTimeout(getNewWord, 1500);
      return; // Exit after correct answer
    }

    const now = Tone.now();
    toneSynth.current?.triggerAttackRelease("F3", "8n", now);
    toneSynth.current?.triggerAttackRelease("C3", "8n", now + 0.2);

    
    setErrorCount(prev => prev + 1);

    let currentRevealed = { ...revealedLetters };
    if (errorCount === 2 || errorCount === 4) { // Hint after 3rd and 5th incorrect attempts
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * currentWord.length);
        } while (currentRevealed[randomIndex]); // Ensure we don't reveal the same letter twice
        currentRevealed[randomIndex] = currentWord[randomIndex].toUpperCase();
        setRevealedLetters(currentRevealed);
    }

    let hintString = Array(currentWord.length).fill('- ').map((dash, index) => currentRevealed[index] || dash).join('');

    if (Object.keys(currentRevealed).length > 0) {
        setFeedback({ message: `Incorrecto. Pista: ${hintString}`, color: 'text-destructive' });
    } else {
 setFeedback({ message: "Incorrecto. Inténtalo de nuevo.", color: 'text-destructive' });
    }
  };

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
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
          <CardTitle className="text-3xl font-headline">Practicar Lectura de Morse</CardTitle>
          <CardDescription>Traduce la siguiente palabra en código morse.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-muted text-muted-foreground rounded-lg w-full p-6 flex items-center justify-center">
                <span className="text-3xl font-mono tracking-widest">{morseWord}</span>
            </div>
          
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe la palabra aquí..."
                    className="text-center text-lg h-12"
                />
                <Button type="submit" className="w-full h-12 text-lg">Comprobar Palabra</Button>
            </form>

            {feedback.message && (
                <p className={`text-center font-semibold text-lg transition-opacity duration-300 ${feedback.color}`}>
                    {feedback.message}
                </p>
            )}

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="secondary" onClick={getNewWord}>
             Siguiente Palabra
            <SkipForward className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
