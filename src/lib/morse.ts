export type MorseSymbol = {
  letter: string;
  code: string;
  mnemonic: string;
  relatedWord: string;
};

export const MORSE_CODE: Record<string, Omit<MorseSymbol, 'letter'>> = {
  'A': { code: '.-', mnemonic: 'A-PART', relatedWord: 'Apple' },
  'B': { code: '-...', mnemonic: 'BEA-ver-dam-dam', relatedWord: 'Boat' },
  'C': { code: '-.-.', mnemonic: 'CO-ca-CO-la', relatedWord: 'Cat' },
  'D': { code: '-..', mnemonic: 'DUM-my-my', relatedWord: 'Dog' },
  'E': { code: '.', mnemonic: 'Eh', relatedWord: 'Eye' },
  'F': { code: '..-.', mnemonic: 'did-it-FAIL-again', relatedWord: 'Fire' },
  'G': { code: '--.', mnemonic: 'GOOD-GOD-almighty', relatedWord: 'Goat' },
  'H': { code: '....', mnemonic: 'hip-pi-ty-hop', relatedWord: 'Hat' },
  'I': { code: '..', mnemonic: 'I-vy', relatedWord: 'Ice' },
  'J': { code: '.---', mnemonic: 'in-JU-RY-LAW', relatedWord: 'Jet' },
  'K': { code: '-.-', mnemonic: 'KAN-ga-ROO', relatedWord: 'Kite' },
  'L': { code: '.-..', mnemonic: 'a-LIT-tle-bit', relatedWord: 'Lion' },
  'M': { code: '--', mnemonic: 'MA-MA', relatedWord: 'Moon' },
  'N': { code: '-.', mnemonic: 'NA-vy', relatedWord: 'Nest' },
  'O': { code: '---', mnemonic: 'OH-MY-GOD', relatedWord: 'Orange' },
  'P': { code: '.--.', mnemonic: 'a-PI-AN-o', relatedWord: 'Pig' },
  'Q': { code: '--.-', mnemonic: 'GOD-SAVE-THE-queen', relatedWord: 'Queen' },
  'R': { code: '.-.', mnemonic: 'ro-TA-tion', relatedWord: 'Rabbit' },
  'S': { code: '...', mnemonic: 'si-si-si', relatedWord: 'Sun' },
  'T': { code: '-', mnemonic: 'Tea', relatedWord: 'Tree' },
  'U': { code: '..-', mnemonic: 'u-ni-FORM', relatedWord: 'Umbrella' },
  'V': { code: '...-', mnemonic: 'va-ca-tion-TIME', relatedWord: 'Violin' },
  'W': { code: '.--', mnemonic: 'what-A-MESS', relatedWord: 'Whale' },
  'X': { code: '-..-', mnemonic: 'X-marks-the-SPOT', relatedWord: 'Xylophone' },
  'Y': { code: '-.--', mnemonic: 'WHY-oh-WHY-oh', relatedWord: 'Yacht' },
  'Z': { code: '--..', mnemonic: 'ZINC-ZOO-keeper', relatedWord: 'Zebra' },
};

export const ALPHABET = Object.keys(MORSE_CODE);

export const PRACTICE_WORDS = [
    "HELLO", "WORLD", "NEXTJS", "REACT", "CODE", "PRACTICE", "MORSE", "DOT", "DASH", "WATER", "EARTH", "AGENT", "FIREBASE", "STUDIO", "SOUND"
];
