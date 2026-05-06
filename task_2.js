/**
 * Task 2: Closures & Arrow Functions
 *
 * Each factory returns an inner function that logs the current count and then
 * increments it. That inner function closes over a mutable `count` initialized
 * from `start`, so repeated calls share the same remembered state.
 */

/**
 * Creates a counter using a `function` as the inner closure.
 *
 * @param {number} start - Initial value for the internal counter.
 * @returns {function(): void} A function that logs `count` then does `count += 1`.
 */
function createCounter(start) {
    let count = start;
    return function next() {
        console.log("count (function keyword):", count);
        count += 1;
    };
}

/**
 * Same behavior using an arrow function as the inner closure.
 * With no use of `this` or `arguments`, it captures `count` the same way as
 * {@link createCounter}.
 *
 * @param {number} start - Initial value for the internal counter.
 * @returns {function(): void} A function that logs `count` then does `count += 1`.
 */
function createCounterArrow(start) {
    let count = start;
    return () => {
        console.log("count (arrow inner):", count);
        count += 1;
    };
}

console.log("\n--- createCounter (function expression as inner) ---\n");
const counterA = createCounter(0);
counterA();
counterA();
counterA();

console.log("\n--- createCounterArrow (arrow as inner) ---\n");
const counterB = createCounterArrow(1);
for (let i = 0; i < 5; i++) {
    counterB();
}

console.log("\n--- Separate instances keep separate state ---\n");
const c1 = createCounter(0);
const c2 = createCounter(100);
c1();
c2();
c1();
c2();
c1();
c2();

console.log(
    "\nNote: Here both inner forms remember `start`/`count` the same way.\n" +
        "Arrows differ from `function` when it comes to `this` and `arguments`;\n" +
        "this closure-only counter does not use those, so behavior matches.\n"
);
