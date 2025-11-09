"use strict";
// src/hello.ts - ejemplos básicos para compilar y ejecutar
Object.defineProperty(exports, "__esModule", { value: true });
// Tipos primitivos y inferencia
var pi = 3.1415;
var saludo = 'Hola TypeScript';
var activo = true;
// Funciones: parámetros obligatorios, opcionales y por defecto
function suma(a, b) { return a + b; }
function greet(name, title) {
    return title ? "".concat(title, " ").concat(name) : "Hola ".concat(name);
}
function multiply(x, y) {
    if (y === void 0) { y = 2; }
    return x * y;
}
// Uso de union y unknown
function procesar(input) {
    if (typeof input === 'string')
        return input.toUpperCase();
    if (typeof input === 'number')
        return input * 2;
    return null;
}
var Person = /** @class */ (function () {
    function Person(id, name, secret) {
        if (secret === void 0) { secret = ''; }
        this.id = id;
        this.name = name;
        this.secret = secret;
    }
    Person.prototype.greet = function () { console.log("Hola, soy ".concat(this.name)); };
    return Person;
}());
// Ejecutar ejemplos
console.log('pi=', pi);
console.log(suma(2, 3), multiply(5));
console.log(greet('Arle'));
console.log('procesar:', procesar('test'));
var p = new Person(1, 'Arle');
p.greet();
console.log('Fin del ejemplo hello.ts');
