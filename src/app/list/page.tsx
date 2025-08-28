
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { ALPHABET, MORSE_CODE } from "@/lib/morse"
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { ArrowLeft, Volume2 } from "lucide-react";

  const DOT_DURATION = 0.1; // 100ms
  const DASH_DURATION = 0.3; // 300ms
  const SYMBOL_PAUSE = 0.1; // 100ms
  const TONE_FREQUENCY = 700;

  export default function ListPage() {
    const toneSynth = useRef<Tone.Synth | null>(null);
    const [isPlaying, setIsPlaying] = useState<string | null>(null); // State to track the playing letter

    useEffect(() => {
        toneSynth.current = new Tone.Synth().toDestination();
        return () => {
            toneSynth.current?.dispose();
        };
    }, []);

    const playCode = useCallback(async (code: string, letter: string) => {
        if (isPlaying) return;

        if (Tone.context.state !== 'running') {
            await Tone.start();
        }

        setIsPlaying(letter);
        const now = Tone.now();
        let timeOffset = 0;

        for (const symbol of code) {
            const duration = symbol === '.' ? DOT_DURATION : DASH_DURATION;
            toneSynth.current?.triggerAttackRelease(TONE_FREQUENCY, duration, now + timeOffset);
            timeOffset += duration + SYMBOL_PAUSE;
        }

        setTimeout(() => setIsPlaying(null), timeOffset * 1000);

    }, [isPlaying]);

    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl shadow-xl relative">
            <div className="absolute top-4 left-4">
                <Link href="/" passHref>
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
            </div>
          <CardHeader className="text-center pt-12">
            <CardTitle className="text-3xl font-headline">Listado de Símbolos Morse</CardTitle>
            <CardDescription>Consulta el abecedario completo, su código y sus mnemónicos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] font-bold text-lg">Letra</TableHead>
                  <TableHead className="font-bold text-lg">Código</TableHead>
                  <TableHead className="font-bold text-lg">Mnemónico</TableHead>
                  <TableHead className="w-[80px] font-bold text-lg text-right">Sonido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ALPHABET.map((letter) => {
                  const morseData = MORSE_CODE[letter];
                  return (
                    <TableRow key={letter}>
                        <TableCell className="font-bold text-2xl">{letter}</TableCell>
                        <TableCell className="font-mono text-2xl tracking-widest">{morseData.code}</TableCell>
                        <TableCell className="text-md">{morseData.mnemonic}</TableCell>
                        <TableCell className="text-right">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => playCode(morseData.code, letter)}
                                disabled={isPlaying !== null}
                                aria-label={`Reproducir sonido para la letra ${letter}`}
                            >
                                <Volume2 className="h-5 w-5" />
                            </Button>
                        </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    )
  }