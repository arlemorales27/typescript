// src/hello.ts - ejemplos básicos para compilar y ejecutar

// Tipos primitivos y inferencia
const pi: number = 3.1415;
let saludo: string = 'Hola TypeScript';
let activo: boolean = true;

// Funciones: parámetros obligatorios, opcionales y por defecto
function suma(a: number, b: number): number { return a + b }
function greet(name: string, title?: string){
  return title ? `${title} ${name}` : `Hola ${name}`;
}
function multiply(x: number, y = 2){ return x * y }

// Uso de union y unknown
function procesar(input: unknown){
  if(typeof input === 'string') return input.toUpperCase();
  if(typeof input === 'number') return input * 2;
  return null;
}

// Interfaces y clases
interface User { id: number; name: string }
class Person implements User {
  constructor(public id: number, public name: string, private secret = ''){}
  greet(){ console.log(`Hola, soy ${this.name}`) }
}

// Ejecutar ejemplos
console.log('pi=', pi);
console.log(suma(2,3), multiply(5));
console.log(greet('Arle'));
console.log('procesar:', procesar('test'));

const p = new Person(1, 'Arle');
p.greet();

console.log('Fin del ejemplo hello.ts');

export {};
