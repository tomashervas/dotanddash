export type MorseSymbol = {
  letter: string;
  code: string;
  mnemonic: string;
};

export const MORSE_CODE: Record<string, Omit<MorseSymbol, 'letter'>> = {
  'A': { code: '.-', mnemonic: 'ARBOL' },
  'B': { code: '-...', mnemonic: 'BOFETADA' },
  'C': { code: '-.-.', mnemonic: 'COCACOLA' },
  'D': { code: '-..', mnemonic: 'DOCENA' },
  'E': { code: '.', mnemonic: 'EL' },
  'F': { code: '..-.', mnemonic: 'FARAONA' },
  'G': { code: '--.', mnemonic: 'GONDOLA' },
  'H': { code: '....', mnemonic: 'HABITANTE' },
  'I': { code: '..', mnemonic: 'ISLA' },
  'J': { code: '.---', mnemonic: 'JABONOSO' },
  'K': { code: '-.-', mnemonic: 'KOSACO' },
  'L': { code: '.-..', mnemonic: 'LIMONADA' },
  'M': { code: '--', mnemonic: 'MOTO' },
  'N': { code: '-.', mnemonic: 'NOTA' },
  'Ñ': { code: '--.--', mnemonic: 'ÑOÑOPATOSO' },
  'O': { code: '---', mnemonic: 'OTOÑO' },
  'P': { code: '.--.', mnemonic: 'PELOTONES' },
  'Q': { code: '--.-', mnemonic: 'COCODRILO' },
  'R': { code: '.-.', mnemonic: 'REDONDA' },
  'S': { code: '...', mnemonic: 'SEVILLA' },
  'T': { code: '-', mnemonic: 'TOS' },
  'U': { code: '..-', mnemonic: 'UNICO' },
  'V': { code: '...-', mnemonic: 'VENTILADOR' },
  'W': { code: '.--', mnemonic: 'WINDOWSDOS' },
  'X': { code: '-..-', mnemonic: 'XOCHIMILCO' },
  'Y': { code: '-.--', mnemonic: 'YOTESOPLO' },
  'Z': { code: '--..', mnemonic: 'ZORROLIBRE' },
};

export const ALPHABET = Object.keys(MORSE_CODE);

export const PRACTICE_WORDS = [
  "AIRE","AGUA","AMIGO","AMOR","ANIMAL","AÑO","ARBOL","ARTE","AVION","BARCO",
  "BEBER","BIBLIOTECA","BLANCO","BOLSA","BRAZO","BUENO","CABALLO","CABEZA","CAFE","CALLE",
  "CAMINO","CAMISA","CANCION","CARNE","CARRO","CASA","CIELO","CIUDAD","CLASE","COMER",
  "COMIDA","COMPRAR","CONOCER","CORRER","COSA","CUERPO","CUENTO","CUERDA","CUARTO","CUCHARA",
  "CUENTO","CUENTO","CULTURA","CURSO","DAR","DIA","DIBUJO","DINERO","DOLOR","DORMIR",
  "EDIFICIO","EJEMPLO","EJERCICIO","ELLA","ELLOS","ENCONTRAR","ENTENDER","ENTRAR","ESCUCHAR","ESCUELA",
  "ESCRIBIR","ESPACIO","ESPERAR","ESTUDIAR","EXPLICAR","FAMILIA","FELIZ","FIESTA","FLOR","FOTO",
  "FRUTA","FUEGO","FUTURO","GANAR","GATO","GENTE","GOBIERNO","GRANDE","GRUPO","GUERRA",
  "HABLAR","HACER","HERMANO","HIJO","HOMBRE","HORA","HOTEL","IDEA","IGLESIA","IMAGEN",
  "INFORME","INTERNET","IR","JARDIN","JUGAR","JUEGO","JUVENTUD","LADO","LARGO","LENGUA",
  "LETRA","LIBRO","LIMPIAR","LLEVAR","LLUVIA","LUZ","MADRE","MANO","MESA","MIRAR",
  "MODO","MOMENTO","MONEDA","MONTE","MUJER","MUNDO","MUSICA","NACER","NATURALEZA","NEGRO",
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

