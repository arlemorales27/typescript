// src/advanced.ts - ejemplos intermedios/avanzados

// Generics
function identity<T>(v: T): T { return v }
const n = identity<number>(123);
const s = identity('cadena');

// Clase genérica
class Box<T> { constructor(public value: T){} }
const b = new Box<string>('hola');

// Utility types
type Persona = { id: number; name: string; age?: number }
type PersonaParcial = Partial<Persona>

// Tipos condicionales
type Unbox<T> = T extends (infer U)[] ? U : T
type T1 = Unbox<string[]> // string

// Tuplas y spread
type Pair = [number, string]
const pair: Pair = [1, 'a']

console.log('n, s, b.value:', n, s, b.value);
console.log('T1 (Unbox<string[]>):', (null as unknown) as T1);
console.log('pair:', pair);
console.log('Fin del ejemplo advanced.ts');

export {};
