
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Sword, ArrowLeft } from 'lucide-react';

export default function GamesPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-grid-slate-100/[0.05] dark:bg-grid-slate-900/[0.05]">
      <Card className="w-full max-w-md m-4 shadow-xl animate-fade-in-down relative">
        <div className="absolute top-4 left-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </Link>
        </div>
        <CardHeader className="text-center pt-12">
          <CardTitle className="text-3xl font-headline">Zona de Juegos</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            ¡Ponte a prueba y compite con tus amigos!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Link href="/games/battle" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="default">
                <Sword className="w-6 h-6 mr-3" />
                Batalla Morse
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
