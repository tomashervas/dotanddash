export type MorseSymbol = {
  letter: string;
  code: string;
  mnemonic: string;
  relatedWord: string;
};

export const MORSE_CODE: Record<string, Omit<MorseSymbol, 'letter'>> = {
  'A': { code: '.-', mnemonic: 'ARBOL', relatedWord: 'Avión' },
  'B': { code: '-...', mnemonic: 'BOFETADA', relatedWord: 'Barco' },
  'C': { code: '-.-.', mnemonic: 'COCACOLA', relatedWord: 'Casa' },
  'D': { code: '-..', mnemonic: 'DOCENA', relatedWord: 'Dedo' },
  'E': { code: '.', mnemonic: 'EL', relatedWord: 'Elefante' },
  'F': { code: '..-.', mnemonic: 'FARAONA', relatedWord: 'Faro' },
  'G': { code: '--.', mnemonic: 'GONDOLA', relatedWord: 'Gato' },
  'H': { code: '....', mnemonic: 'HABITANTE', relatedWord: 'Huevo' },
  'I': { code: '..', mnemonic: 'ISLA', relatedWord: 'Iglesia' },
  'J': { code: '.---', mnemonic: 'JABONOSO', relatedWord: 'Jirafa' },
  'K': { code: '-.-', mnemonic: 'KOSACO', relatedWord: 'Koala' },
  'L': { code: '.-..', mnemonic: 'LIMONADA', relatedWord: 'Lápiz' },
  'M': { code: '--', mnemonic: 'MOTO', relatedWord: 'Mano' },
  'N': { code: '-.', mnemonic: 'NOTA', relatedWord: 'Nido' },
  'Ñ': { code: '--.--', mnemonic: 'ÑOÑOPATOSO', relatedWord: 'Nido' },
  'O': { code: '---', mnemonic: 'OTOÑO', relatedWord: 'Ojo' },
  'P': { code: '.--.', mnemonic: 'PELOTONES', relatedWord: 'Perro' },
  'Q': { code: '--.-', mnemonic: 'COCODRILO', relatedWord: 'Queso' },
  'R': { code: '.-.', mnemonic: 'REDONDA', relatedWord: 'Ratón' },
  'S': { code: '...', mnemonic: 'SEVILLA', relatedWord: 'Sol' },
  'T': { code: '-', mnemonic: 'TOS', relatedWord: 'Taza' },
  'U': { code: '..-', mnemonic: 'UNICO', relatedWord: 'Uva' },
  'V': { code: '...-', mnemonic: 'VENTILADOR', relatedWord: 'Vela' },
  'W': { code: '.--', mnemonic: 'WINDOWSDOS', relatedWord: 'Wafle' },
  'X': { code: '-..-', mnemonic: 'XOCHIMILCO', relatedWord: 'Xilófono' },
  'Y': { code: '-.--', mnemonic: 'YOTESOPLO', relatedWord: 'Yate' },
  'Z': { code: '--..', mnemonic: 'ZORROLIBRE', relatedWord: 'Zanahoria' },
};

export const ALPHABET = Object.keys(MORSE_CODE);

export const PRACTICE_WORDS = [
  "OSO",
    // "HOLA", "MUNDO", "CODIGO", "PRACTICA", "MORSE", "PUNTO", "RAYA", "AGUA", "TIERRA", "AGENTE", "FUEGO", "SONIDO", "CASA", "JUEGO", "LUZ"
];
