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
  import { ArrowLeft } from "lucide-react";
  
  export default function ListPage() {
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
                  <TableHead className="w-[100px] font-bold text-lg">Letra</TableHead>
                  <TableHead className="font-bold text-lg">Código</TableHead>
                  <TableHead className="font-bold text-lg">Mnemónico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ALPHABET.map((letter) => (
                  <TableRow key={letter}>
                    <TableCell className="font-bold text-2xl">{letter}</TableCell>
                    <TableCell className="font-mono text-2xl tracking-widest">{MORSE_CODE[letter].code}</TableCell>
                    <TableCell className="text-md">{MORSE_CODE[letter].mnemonic}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    )
  }
  