01. Difference between var, let, and const
var → Function-scoped, allows redeclaration, can “leak” outside blocks.
let → Block-scoped, no redeclaration, reassignment allowed.
const → Block-scoped, no redeclaration, no reassignment (but object/array contents can change).


02. forEach()
Loops through array
Does not return a new array (returns undefined)
Used for side effects (e.g., console.log, updating values).

 map()
Loops through array
Returns a new array with transformed values
Used when you want to change data.

 filter()
Loops through array
Returns a new array with elements that pass a condition
Used to pick certain item

03. Arrow Functions (ES6)
Shorter way to write functions → const add = (a, b) => a + b;
Support implicit return (no return if one expression).
Don’t have their own this → use this from outer scope.
Can’t be used with new (not constructors).

04. Destructuring (ES6)
Array:
const [a, b] = [1, 2]; 
Object:
const {name, age} = {name:"Alice", age:25}; 
Default values:
const [x=10] = [];

05. Template Literals (ES6)
Use backticks: `Hello ${name}!`

Supports:
Variable interpolation: ${}
Multi-line strings
Expressions inside strings

Difference:
Cleaner than "Hello " + name + "!"
No need for \n for new lines
Can embed calculations directly.