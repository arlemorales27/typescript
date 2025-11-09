"use strict";
// src/advanced.ts - ejemplos intermedios/avanzados
Object.defineProperty(exports, "__esModule", { value: true });
// Generics
function identity(v) { return v; }
var n = identity(123);
var s = identity('cadena');
// Clase genérica
var Box = /** @class */ (function () {
    function Box(value) {
        this.value = value;
    }
    return Box;
}());
var b = new Box('hola');
var pair = [1, 'a'];
console.log('n, s, b.value:', n, s, b.value);
console.log('T1 (Unbox<string[]>):', null);
console.log('pair:', pair);
console.log('Fin del ejemplo advanced.ts');
