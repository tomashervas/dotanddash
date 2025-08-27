
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MORSE_CODE, PRACTICE_WORDS } from '@/lib/morse';
import { ArrowLeft, RefreshCw, Trophy, Crown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SHORT_PRESS_MS = 300;
const LETTER_PAUSE_MS = 1000;

type Player = 1 | 2;
type Scores = { player1: number; player2: number };
type HighScore = { name: string; score: number };

export default function BattlePage() {
    const [word, setWord] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const { toast } = useToast();

    // Player state
    const [players, setPlayers] = useState({ player1: 'Jugador 1', player2: 'Jugador 2' });
    const [scores, setScores] = useState<Scores>({ player1: 0, player2: 0 });
    const [activePlayer, setActivePlayer] = useState<Player | null>(null);
    const [playerInputs, setPlayerInputs] = useState({ player1: '', player2: '' });
    const [decodedWords, setDecodedWords] = useState({ player1: '', player2: '' });
    const [letterIndices, setLetterIndices] = useState({ player1: 0, player2: 0 });

    // High score state
    const [highScore, setHighScore] = useState<HighScore | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const pressStart = useRef<number | null>(null);
    const letterTimeout = useRef<NodeJS.Timeout | null>(null);
    const toneSynth = useRef<Tone.Synth | null>(null);
    const playerToastId = useRef<string | null>(null);

    // Load players and high score from localStorage
    useEffect(() => {
        const p1 = localStorage.getItem('dotanddash_player1');
        const p2 = localStorage.getItem('dotanddash_player2');
        if (p1 && p2) {
            setPlayers({ player1: p1, player2: p2 });
        } else {
            setIsModalOpen(true);
        }

        const hs = localStorage.getItem('dotanddash_battle_highscore');
        if (hs) {
            setHighScore(JSON.parse(hs));
        }
    }, []);
    
    const handleSavePlayers = () => {
        if (player1Name && player2Name) {
            localStorage.setItem('dotanddash_player1', player1Name);
            localStorage.setItem('dotanddash_player2', player2Name);
            setPlayers({ player1: player1Name, player2: player2Name });
            setIsModalOpen(false);
        }
    };


    const getNewWord = useCallback(() => {
        const newWord = PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
        setWord(newWord);
        setPlayerInputs({ player1: '', player2: '' });
        setDecodedWords({ player1: '', player2: '' });
        setLetterIndices({ player1: 0, player2: 0 });
        setIsComplete(false);
        setActivePlayer(null);
        if (letterTimeout.current) clearTimeout(letterTimeout.current);
    }, []);

    useEffect(() => {
        toneSynth.current = new Tone.Synth().toDestination();
        getNewWord();
        return () => {
            toneSynth.current?.dispose();
            if (letterTimeout.current) clearTimeout(letterTimeout.current);
        };
    }, [getNewWord]);

    const checkHighScore = (winnerName: string, winnerScore: number) => {
        if (!highScore || winnerScore > highScore.score) {
            const newHighScore = { name: winnerName, score: winnerScore };
            setHighScore(newHighScore);
            localStorage.setItem('dotanddash_battle_highscore', JSON.stringify(newHighScore));
            toast({
                title: '¡Nuevo Récord!',
                description: `${winnerName} ha establecido un nuevo récord con ${winnerScore} puntos.`,
                duration: 5000,
            });
        }
    };


    const processInput = useCallback((player: Player) => {
        const currentInput = playerInputs[`player${player}`];
        const letterIndex = letterIndices[`player${player}`];
        
        if (!word || currentInput === '' || letterIndex >= word.length) return;

        const currentLetter = word[letterIndex];
        const correctCode = MORSE_CODE[currentLetter]?.code;

        if (currentInput === correctCode) {
            const newDecodedWord = decodedWords[`player${player}`] + currentLetter;
            setDecodedWords(prev => ({ ...prev, [`player${player}`]: newDecodedWord }));
            setLetterIndices(prev => ({ ...prev, [`player${player}`]: letterIndex + 1 }));

            if (letterIndex + 1 === word.length) {
                setIsComplete(true);
                const winnerName = players[`player${player}`];
                const newScores = { ...scores, [`player${player}`]: scores[`player${player}`] + 1 };
                setScores(newScores);

                 if (playerToastId.current) {
                    toast.dismiss(playerToastId.current);
                }
                const { id } = toast({
                    title: "¡Ronda Ganada!",
                    description: `¡${winnerName} ha ganado la ronda!`,
                    duration: 3000,
                });
                playerToastId.current = id;

                checkHighScore(winnerName, newScores[`player${player}`]);

                setTimeout(getNewWord, 3000);
            }
        } else {
             toneSynth.current?.triggerAttackRelease("C3", "2n");
        }
        
        setPlayerInputs(prev => ({...prev, [`player${player}`]: ''}));

    }, [word, playerInputs, letterIndices, decodedWords, players, scores, getNewWord, toast, highScore]);

    useEffect(() => {
        if (letterTimeout.current) {
            clearTimeout(letterTimeout.current);
        }
        if (activePlayer && playerInputs[`player${activePlayer}`] !== '') {
            letterTimeout.current = setTimeout(() => {
                processInput(activePlayer);
                setActivePlayer(null);
            }, LETTER_PAUSE_MS);
        }
    }, [activePlayer, playerInputs, processInput]);


    const handlePressStart = async (player: Player) => {
        if (isComplete) return;
        
        setActivePlayer(player);

        if (Tone.context.state !== 'running') {
            await Tone.start();
        }
        if (letterTimeout.current) {
            clearTimeout(letterTimeout.current);
        }
        pressStart.current = Date.now();
        toneSynth.current?.triggerAttack("700hz");
    };

    const handlePressEnd = (player: Player) => {
        if (isComplete || !pressStart.current || activePlayer !== player) return;
        
        const pressDuration = Date.now() - pressStart.current;
        pressStart.current = null;
        toneSynth.current?.triggerRelease();

        const symbol = pressDuration < SHORT_PRESS_MS ? '.' : '-';
        setPlayerInputs(prev => ({...prev, [`player${player}`]: prev[`player${player}`] + symbol}));
    };
    
    const currentInputForPlayer = (player: Player) => {
        return `${decodedWords[`player${player}`]}<span class="text-primary animate-pulse">${playerInputs[`player${player}`]}</span>`;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¡Bienvenidos a la Batalla Morse!</DialogTitle>
                        <DialogDescription>
                            Introduce los nombres de los jugadores para empezar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p1-name" className="text-right">Jugador 1</Label>
                            <Input id="p1-name" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="p2-name" className="text-right">Jugador 2</Label>
                            <Input id="p2-name" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSavePlayers}>Guardar y Empezar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            <Card className="w-full max-w-4xl shadow-xl relative">
                <div className="absolute top-4 left-4">
                    <Link href="/games" passHref>
                        <Button variant="ghost" size="icon" aria-label="Volver a juegos">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
                <CardHeader className="text-center pt-12">
                    <CardTitle className="text-3xl font-headline">Batalla Morse</CardTitle>
                    <CardDescription>¡El más rápido en teclear la palabra gana la ronda!</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4">
                    
                    <div className="w-full grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 border rounded-lg">
                            <p className="text-sm font-semibold">{players.player1}</p>
                            <p className="text-3xl font-bold">{scores.player1}</p>
                        </div>
                        <div className="p-2 border rounded-lg bg-yellow-100 dark:bg-yellow-900">
                             <p className="text-sm font-semibold flex items-center justify-center gap-1"><Crown className="w-4 h-4 text-yellow-500"/> RÉCORD</p>
                            <p className="text-xl font-bold">{highScore ? `${highScore.name}: ${highScore.score}` : 'N/A'}</p>
                        </div>
                        <div className="p-2 border rounded-lg">
                            <p className="text-sm font-semibold">{players.player2}</p>
                            <p className="text-3xl font-bold">{scores.player2}</p>
                        </div>
                    </div>

                    <div className="w-full p-4 border rounded-lg bg-muted min-h-[100px] flex flex-col justify-center items-center text-center">
                        <p className="text-sm text-muted-foreground">PALABRA A ESCRIBIR</p>
                        <p className="text-5xl font-bold tracking-widest font-headline">{word}</p>
                    </div>

                     <div className="w-full grid grid-cols-2 gap-4">
                        {([1, 2] as const).map(pNum => (
                            <div key={pNum} className="w-full p-4 border rounded-lg bg-background min-h-[100px] flex flex-col justify-center items-center text-center">
                                <p className="text-sm text-muted-foreground">{players[`player${pNum}`]}'s INPUT</p>
                                <p className="text-3xl font-mono text-foreground min-h-[40px] tracking-widest"
                                dangerouslySetInnerHTML={{ __html: currentInputForPlayer(pNum) }} />
                            </div>
                        ))}
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                        {([1, 2] as const).map((pNum) => (
                             <Button
                                key={pNum}
                                onMouseDown={() => handlePressStart(pNum)}
                                onMouseUp={() => handlePressEnd(pNum)}
                                onTouchStart={(e) => { e.preventDefault(); handlePressStart(pNum); }}
                                onTouchEnd={(e) => { e.preventDefault(); handlePressEnd(pNum); }}
                                className={cn(
                                    "w-full h-32 text-2xl font-bold rounded-lg active:scale-95 transition-transform duration-150 select-none touch-manipulation",
                                    pNum === 1 ? 'bg-blue-600 hover:bg-blue-600/90' : 'bg-red-600 hover:bg-red-600/90',
                                    'text-white'
                                )}
                                disabled={isComplete}
                            >
                                <Trophy className="w-8 h-8 mr-4" />
                                {players[`player${pNum}`]}
                            </Button>
                        ))}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-center">
                     <Button variant="secondary" onClick={getNewWord}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Nueva Palabra / Saltar Ronda
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

