"use strict";
// src/advanced.ts - ejemplos intermedios/avanzados
Object.defineProperty(exports, "__esModule", { value: true });
// Generics
function identity(v) { return v; }
const n = identity(123);
const s = identity('cadena');
// Clase genérica
class Box {
    constructor(value) {
        this.value = value;
    }
}
const b = new Box('hola');
const pair = [1, 'a'];
console.log('n, s, b.value:', n, s, b.value);
console.log('T1 (Unbox<string[]>):', null);
console.log('pair:', pair);
console.log('Fin del ejemplo advanced.ts');
