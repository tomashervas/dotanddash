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
  "AIRE","AGUA","AMIGO","AMOR","ANIMAL","AÑO","ARBOL","ARTE","AVIÓN","BARCO",
  "BEBER","BIBLIOTECA","BLANCO","BOLSA","BRAZO","BUENO","CABALLO","CABEZA","CAFÉ","CALLE",
  "CAMINO","CAMISA","CANCION","CARNE","CARRO","CASA","CIELO","CIUDAD","CLASE","COMER",
  "COMIDA","COMPRAR","CONOCER","CORRER","COSA","CUERPO","CUENTO","CUERDA","CUARTO","CUCHARA",
  "CUENTO","CUENTO","CULTURA","CURSO","DAR","DIA","DIBUJO","DINERO","DOLOR","DORMIR",
  "EDIFICIO","EJEMPLO","EJERCICIO","ELLA","ELLOS","ENCONTRAR","ENTENDER","ENTRAR","ESCUCHAR","ESCUELA",
  "ESCRIBIR","ESPACIO","ESPERAR","ESTUDIAR","EXPLICAR","FAMILIA","FELIZ","FIESTA","FLOR","FOTO",
  "FRUTA","FUEGO","FUTURO","GANAR","GATO","GENTE","GOBIERNO","GRANDE","GRUPO","GUERRA",
  "HABLAR","HACER","HERMANO","HIJO","HOMBRE","HORA","HOTEL","IDEA","IGLESIA","IMAGEN",
  "INFORME","INTERNET","IR","JARDIN","JUGAR","JUEGO","JUVENTUD","LADO","LARGO","LENGUA",
  "LETRA","LIBRO","LIMPIAR","LLEVAR","LLUVIA","LUZ","MADRE","MANO","MESA","MIRAR",
  "MODO","MOMENTO","MONEDA","MONTE","MUJER","MUNDO","MÚSICA","NACER","NATURALEZA","NEGRO",
  "NIÑO","NOCHE","NOMBRE","NUEVO","NUMERO","OBJETO","OCIO","OIDO","OJOS","ORDEN",
  "ORGANIZAR","PADRE","PAIS","PALABRA","PAN","PAPEL","PARAR","PARQUE","PASADO","PASAR",
  "PEQUEÑO","PERDER","PERRO","PERSONA","PESCAR","PIEDRA","PIEL","PINTAR","PIE","PLANTA",
  "PLAZA","POCO","POLICIA","PODER","PUEBLO","PUERTA","QUERER","RAPIDO","REIR","RESPONDER",
  "RIO","ROPA","RUIDO","SABER","SACAR","SAL","SALIR","SALUD","SEÑOR","SENTIR",
  "SER","SERVICIO","SIGNIFICAR","SILLA","SITUACION","SOBRE","SOL","SONREIR","SONIDO","SUERTE",
  "TARDE","TAXI","TEATRO","TELEFONO","TIEMPO","TIERRA","TOMAR","TREN","TRABAJO","TRISTE",
  "UNIVERSIDAD","USAR","VALLE","VEHICULO","VENIR","VER","VERANO","VERDAD","VIAJE","VIDA",
  "VIVIR","VOZ","ZAPATO","ZONA"
];
