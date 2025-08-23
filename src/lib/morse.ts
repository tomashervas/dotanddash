export type MorseSymbol = {
  letter: string;
  code: string;
  mnemonic: string;
  relatedWord: string;
};

export const MORSE_CODE: Record<string, Omit<MorseSymbol, 'letter'>> = {
  'A': { code: '.-', mnemonic: 'A-ZUL', relatedWord: 'Avión' },
  'B': { code: '-...', mnemonic: 'BO-ni-ta-ni-ña', relatedWord: 'Barco' },
  'C': { code: '-.-.', mnemonic: 'CO-ca-CO-la', relatedWord: 'Casa' },
  'D': { code: '-..', mnemonic: 'DOY-li-la', relatedWord: 'Dedo' },
  'E': { code: '.', mnemonic: 'Es', relatedWord: 'Elefante' },
  'F': { code: '..-.', mnemonic: 'fu-ma-FEO-si', relatedWord: 'Faro' },
  'G': { code: '--.', mnemonic: 'GO-TA-GOL', relatedWord: 'Gato' },
  'H': { code: '....', mnemonic: 'hi-pi-pi-pi', relatedWord: 'Huevo' },
  'I': { code: '..', mnemonic: 'I-sla', relatedWord: 'Iglesia' },
  'J': { code: '.---', mnemonic: 'ja-BON-JABON-JABON', relatedWord: 'Jirafa' },
  'K': { code: '-.-', mnemonic: 'KOR-pi-KOL', relatedWord: 'Koala' },
  'L': { code: '.-..', mnemonic: 'li-MON-ci-to', relatedWord: 'Lápiz' },
  'M': { code: '--', mnemonic: 'MO-MO', relatedWord: 'Mano' },
  'N': { code: '-.', mnemonic: 'NO-che', relatedWord: 'Nido' },
  'O': { code: '---', mnemonic: 'OH-DIOS-MIO', relatedWord: 'Ojo' },
  'P': { code: '.--.', mnemonic: 'pi-SO-PI-so', relatedWord: 'Perro' },
  'Q': { code: '--.-', mnemonic: 'QUE-COS-TAN-CARO', relatedWord: 'Queso' },
  'R': { code: '.-.', mnemonic: 'ra-MA-da', relatedWord: 'Ratón' },
  'S': { code: '...', mnemonic: 'si-si-si', relatedWord: 'Sol' },
  'T': { code: '-', mnemonic: 'Te', relatedWord: 'Taza' },
  'U': { code: '..-', mnemonic: 'u-ni-CO', relatedWord: 'Uva' },
  'V': { code: '...-', mnemonic: 'ven-ti-la-DOR', relatedWord: 'Vela' },
  'W': { code: '.--', mnemonic: 'what-A-SHOW', relatedWord: 'Wafle' },
  'X': { code: '-..-', mnemonic: 'X-en-la-FREN-te', relatedWord: 'Xilófono' },
  'Y': { code: '-.--', mnemonic: 'YO-soy-YO-soy', relatedWord: 'Yate' },
  'Z': { code: '--..', mnemonic: 'ZOR-RO-ma-lo', relatedWord: 'Zanahoria' },
};

export const ALPHABET = Object.keys(MORSE_CODE);

export const PRACTICE_WORDS = [
    "HOLA", "MUNDO", "CODIGO", "PRACTICA", "MORSE", "PUNTO", "RAYA", "AGUA", "TIERRA", "AGENTE", "FUEGO", "SONIDO", "CASA", "JUEGO", "LUZ"
];
