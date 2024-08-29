import { AppBar, Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

type HebrewLetter = 'א' | 'ב' | 'ג' | 'ד' | 'ה' | 'ו' | 'ז' | 'ח' | 'ט' | 'י' | 'כ' | 'ל' | 'מ' | 'נ' | 'ס' | 'ע' | 'פ' | 'צ' | 'ק' | 'ר' | 'ש' | 'ת';

const App = () => {

  const [simbolo, setSimbolo] = useState<HebrewLetter | null>(null)

  const [resultado, setResultado] = useState<number>(0)

  const [registro, setRegistro] = useState<HebrewLetter[]>([]);

  const calcularValorNumerico = (value: string) => {
    let total = 0;
    for (let i = 0; i < value.length; i++) {
      const letter = value[i] as HebrewLetter;
      if (diccionario[letter]) {
        total += diccionario[letter]
      }
    }
    return total;
  }
  const agregarAlRegistro = (value: HebrewLetter) => {
    setRegistro([...registro, value])
    setResultado(0);
    setSimbolo(null);
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as HebrewLetter;
    setSimbolo(value)
  }
  const diccionario: Record<HebrewLetter, number> = {
    "א": 1,
    "ב": 2,
    "ג": 3,
    "ד": 4,
    "ה": 5,
    "ו": 6,
    "ז": 7,
    "ח": 8,
    "ט": 9,
    "י": 10,
    "כ": 20,
    "ל": 30,
    "מ": 40,
    "נ": 50,
    "ס": 60,
    "ע": 70,
    "פ": 80,
    "צ": 90,
    "ק": 100,
    "ר": 200,
    "ש": 300,
    "ת": 400,
  }

  function convertirABinario(numero: number) {
    // Comprobar si el número es un entero
    if (isNaN(numero) || !Number.isInteger(numero)) {
      return "Error: El valor ingresado no es un número entero.";
    }

    // Variables para almacenar el resultado y el residuo
    let resultado = "";
    let residuo;

    // Dividir el número por 2 en cada iteración
    while (numero > 0) {
      residuo = numero % 2;
      resultado = residuo + resultado;
      numero = Math.floor(numero / 2);
    }

    // Invertir la cadena para obtener el orden correcto de los bits
    return resultado.split("").reverse().join("");
  }

  function forzarABits12(binario: string) {
    // Comprobar si el valor es una cadena
    // if (!typeof binario === "string") {
    //   return "Error: El valor ingresado no es una cadena.";
    // }

    // Eliminar espacios en blanco
    binario = binario.trim();

    // Validar si es binario
    if (!/^[01]+$/.test(binario)) {
      return "Error: La cadena ingresada no es un número binario válido.";
    }

    // Calcular la cantidad de ceros a rellenar
    let cerosRellenar = 12 - binario.length;

    if (cerosRellenar < 0) {
      return binario;
    }

    // Rellenar con ceros a la izquierda
    binario = "0".repeat(cerosRellenar) + binario;

    // Cortar la cadena a 12 bits
    return binario.slice(0, 12);
  }

  function printBinaryBox(bit: string) {
    if (bit === "0") {
      return <Box sx={{ background: 'white', border: "1px solid black", width: 10, height: 10, mr: 0.2 }} />;
    } else if (bit === "1") {
      return <Box sx={{ background: 'black', border: "1px solid black ", width: 10, height: 10, mr: 0.2 }} />;
    } else {
      return <p>Error: Numero binario invalido. Por favor ingresa 0 o 1.</p>;
    }
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
            <Typography>
              Mi App
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexFlow: 'column wrap', margin: 'auto', width: '80%', minHeight: '100vh', height: '100%', paddingTop: 10 }}>
        <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
          <TextField label="Simbolo" value={simbolo} onChange={onChange} />
          <Button sx={{ marginBlock: 2, p: 1.6 }} variant='contained' onClick={() => {
            simbolo && setResultado(calcularValorNumerico(simbolo))
          }}>Calcular</Button>
        </Box>
        {
          resultado > 0 && (
            <Box sx={{}}>
              <Typography>El valor numérico del simbolo es: {resultado} y en binario seria: {convertirABinario(resultado)}</Typography>
              <Button onClick={() => { agregarAlRegistro(simbolo as HebrewLetter) }}>
                Añadir al registro de simbolos
              </Button>
            </Box>
          )
        }
        {
          registro.length > 0 && (
            <Box sx={{ marginTop: 10 }}>
              <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
                <Typography variant="h5">Registro de simbolos</Typography>
                <Button color='error' size='small' variant="contained" onClick={() => {
                  setRegistro([]);
                  setResultado(0);
                  setSimbolo(null);
                }}>Borrar todo</Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Simbolo</TableCell>
                    <TableCell>Valor numérico</TableCell>
                    <TableCell>En binario</TableCell>
                    <TableCell>Grafico</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    registro.map((num, index) => (
                      <TableRow key={index}>
                        <TableCell>{num}</TableCell>
                        <TableCell>{calcularValorNumerico(num)}</TableCell>
                        <TableCell>{forzarABits12(String(convertirABinario(calcularValorNumerico(num))))}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexFlow: 'row nowrap' }}>
                            {forzarABits12(String(convertirABinario(calcularValorNumerico(num)))).split("").map((bit) => printBinaryBox(bit))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </Box>
          )
        }
      </Box>
    </>
  )
}
export default App;