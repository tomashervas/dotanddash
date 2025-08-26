import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Code, BookOpen, List, Eye, Ear } from 'lucide-react';
import { Globe } from 'lucide-react';
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-grid-slate-100/[0.05] dark:bg-grid-slate-900/[0.05]">
      <Card className="w-full max-w-md m-4 shadow-xl animate-fade-in-down">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
             <h1 className="text-5xl font-bold tracking-tighter text-primary font-headline">dotanddash</h1>
          </div>
          <CardTitle className="text-2xl font-headline">Bienvenido a la app para aprender Código Morse</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Tu viaje para dominar los puntos y las rayas comienza aquí.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Link href="/learn" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="default">
                <BookOpen className="w-6 h-6 mr-3" />
                Aprender Morse
              </Button>
            </Link>
            <Link href="/practice" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="secondary">
                 <Code className="w-6 h-6 mr-3" />
                Practicar Morse
              </Button>
            </Link>
             <Link href="/hear" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="secondary">
                 <Ear className="w-6 h-6 mr-3" />
                Practicar Audición
              </Button>
            </Link>
            <Link href="/read" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="secondary">
                 <Eye className="w-6 h-6 mr-3" />
                Practicar Lectura
              </Button>
            </Link>
            <Link href="/list" passHref>
              <Button className="w-full py-8 text-xl transition-transform duration-200 hover:scale-105" size="lg" variant="outline">
                 <List className="w-6 h-6 mr-3" />
                Listado de Símbolos
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <p className='text-md text-muted-foreground'>Made with <span> ❤️ </span> for my dear son Marcel</p>
          <a href="http://josetomashervas.com" className='text-blue-500 text-md hover:underline' >Jose Tomás Hervás <Globe className="inline-block w-4 h-4 ml-1" /></a>
      </CardFooter>
      </Card>
    </main>
  );
}
