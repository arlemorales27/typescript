"use strict";
// src/hello.ts - ejemplos básicos para compilar y ejecutar
Object.defineProperty(exports, "__esModule", { value: true });
// Tipos primitivos y inferencia
const pi = 3.1415;
let saludo = 'Hola TypeScript';
let activo = true;
// Funciones: parámetros obligatorios, opcionales y por defecto
function suma(a, b) { return a + b; }
function greet(name, title) {
    return title ? `${title} ${name}` : `Hola ${name}`;
}
function multiply(x, y = 2) { return x * y; }
// Uso de union y unknown
function procesar(input) {
    if (typeof input === 'string')
        return input.toUpperCase();
    if (typeof input === 'number')
        return input * 2;
    return null;
}
class Person {
    constructor(id, name, secret = '') {
        this.id = id;
        this.name = name;
        this.secret = secret;
    }
    greet() { console.log(`Hola, soy ${this.name}`); }
}
// Ejecutar ejemplos
console.log('pi=', pi);
console.log(suma(2, 3), multiply(5));
console.log(greet('Arle'));
console.log('procesar:', procesar('test'));
const p = new Person(1, 'Arle');
p.greet();
console.log('Fin del ejemplo hello.ts');
