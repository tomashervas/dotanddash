
"use client";

import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ALPHABET, MORSE_CODE, type MorseSymbol } from "@/lib/morse";
import { ArrowLeft, Lightbulb, SkipForward } from 'lucide-react';
import Link from 'next/link';

type LetterData = MorseSymbol;

export default function LearnPage() {
  const [currentLetterData, setCurrentLetterData] = useState<LetterData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState({ message: '', color: '' });
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [key, setKey] = useState(0);

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
    getRandomLetter();
  }, []);

  const handleShowMnemonic = () => {
    if (!currentLetterData) return;
    setShowMnemonic(true);
    setFeedback({ message: `Mnemonic: ${currentLetterData.mnemonic}`, color: 'text-blue-500' });
    setTimeout(() => {
      getRandomLetter();
    }, 3000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (showMnemonic || !currentLetterData) return;
    
    if (inputValue.trim().toUpperCase() === currentLetterData.mnemonic.toUpperCase()) {
      setFeedback({ message: 'Correct! Well done.', color: 'text-green-600' });
      setTimeout(getRandomLetter, 1500);
    } else {
      setFeedback({ message: "Not quite. Try again or ask for a hint!", color: 'text-destructive' });
    }
  };

  if (!currentLetterData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
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
          <CardTitle className="text-3xl font-headline">Learn the Mnemonics</CardTitle>
          <CardDescription>Type the mnemonic for the letter shown below.</CardDescription>
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
                    placeholder="Enter mnemonic word..."
                    className="text-center text-lg h-12"
                    disabled={showMnemonic}
                />
                <Button type="submit" className="w-full h-12 text-lg" disabled={showMnemonic}>Check Answer</Button>
            </form>

            {feedback.message && (
                <p className={`text-center font-semibold text-lg transition-opacity duration-300 ${feedback.color}`}>
                    {feedback.message}
                </p>
            )}
            {showMnemonic && (
                 <p className="text-center text-muted-foreground">
                    Related word: <strong>{currentLetterData.relatedWord}</strong>
                 </p>
            )}

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleShowMnemonic} disabled={showMnemonic}>
            <Lightbulb className="mr-2 h-4 w-4" />
            Show Mnemonic
          </Button>
          <Button variant="secondary" onClick={getRandomLetter}>
             Next Letter
            <SkipForward className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
