export const COMPANIES = new WeakMap();
export const TOKENS = new Map();
export const EXPERIMENTS = new Map();

/*
Q:is there a Map, WeakMap, Set, WeakSet method to clear its contents?
A:Yes, Map and Set objects in JavaScript (and TypeScript) have a clear() method that 
removes all elements from the collection. 
However, WeakMap and WeakSet do not have a clear() method due to their nature of 
holding weak references to their keys/values, which are cleared automatically by the 
garbage collector when there are no other references to the objects.

Here's how you can use the clear() method for Map and Set:
```javascript
// For a Map
const tokens = new Map();
tokens.set('key', 'value');
tokens.clear(); // Clears all entries in the Map

// For a Set
const items = new Set();
items.add('value');
items.clear(); // Clears all entries in the Set
```

Since WeakMap and WeakSet do not have a clear() method, if you need to clear all entries, you would typically just create a new instance:
```javascript
// For a WeakMap
let companies = new WeakMap();
// To clear, reassign to a new WeakMap
companies = new WeakMap();

// For a WeakSet
let weakItems = new WeakSet();
// To clear, reassign to a new WeakSet
weakItems = new WeakSet();
```
This approach effectively removes all existing entries by discarding the old instance 
and starting with a fresh one.
*/

/*
Q: how do i iterate through the keys of a WeakMap, or the values of a WeakSet?

A: Iterating directly through the keys of a WeakMap or the values of a WeakSet is 
not possible in JavaScript. The WeakMap and WeakSet collections are designed to hold 
weak references to their keys and values, respectively. This means that the existence 
of an object in a WeakMap or WeakSet does not prevent it from being garbage-collected. 
Because of this, JavaScript does not provide a way to directly enumerate or iterate 
over the keys of a WeakMap or the values of a WeakSet to avoid exposing potentially 
dangling references.

For WeakMap, you can only interact with its elements by using the .get(), .set(), .has(), 
and .delete() methods with a reference to the key object. Similarly, for WeakSet, you can 
only use .add(), .has(), and .delete() methods with a reference to the value object.

If you need to iterate over keys or values, you should use a Map or a Set instead, 
as these collections are iterable:
- For a Map, you can iterate over its keys, values, or key-value pairs using methods 
like .keys(), .values(), and .entries(), or directly with a for...of loop.
```javascript
export const TOKENS = new Map();
// Assuming TOKENS is populated with some key-value pairs
for (const [key, value] of TOKENS) {
    console.log(key, value);
}
```
For a Set, you can iterate over its values using a for...of loop or the .values() 
method (which is the same as .keys() for sets, for compatibility with Map).
```javascript
const items = new Set();
// Assuming items is populated with some values
for (const value of items) {
    console.log(value);
}
```

If you absolutely need the functionality of weak references combined with the ability to 
iterate over the elements, you would have to implement a custom solution. 
This could involve maintaining a separate Set or Map alongside your WeakMap or WeakSet 
for iteration purposes, but this approach requires careful management to avoid memory leaks 
by ensuring that objects are removed from both collections when they are no longer needed.
*/
