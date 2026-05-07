/**
 * Task 3: Scope, Parameters, and `this` Binding
 */

// Subtask 1: function that logs a greeting
function greetUser(name = "Guest") {
    console.log("greetUser:", "Hello, " + name + "!");
}
// Test the function
console.log("\n--- Greeting Function ---");
greetUser();
greetUser("Alex");

// Subtask 2: Create an object `user` with two methods: `sayHiRegular` and `sayHiArrow`
const user = {
    name: "Mykola",
    // Regular function: `this` is the call site (the object when called as user.sayHi()).
    sayHiRegular: function () {
        console.log("Hi (regular),", this.name);
    },
    // Arrow: no own `this` — uses `this` from the *enclosing* scope where this
    // object literal runs (e.g. `undefined` in Node modules / strict top-level),
    // not the object as `user`.
    sayHiArrow: () => {
        console.log("Hi (arrow),", this.name);
    }
};

// Subtask 3:  Use both an arrow function and a regular function as sayHi, showing the difference in `this` binding.
console.log("\n--- Method calls on `user` ---");
user.sayHiRegular();
user.sayHiArrow();

console.log("\n--- Detached reference ---");
// define two functions that are detached from the `user` object
const detachedRegular = user.sayHiRegular;
const detachedArrow = user.sayHiArrow;

// Plain call with no receiver: in strict mode / modules `this` is often
// `undefined` for the regular method, and the arrow's lexical `this` is the
// same outer scope — so both can print `undefined` for `name` (looks "the same").
detachedRegular();
detachedArrow();

// `.call(user)` sets `this` for a normal function, but not for an arrow
// (arrow `this` is fixed lexically).
console.log("\nWith .call(user) — regular obeys, arrow ignores:");
detachedRegular.call(user);
detachedArrow.call(user);

// Subtask 4:  Compare var and let in a for loop
console.log("\n--- var vs let after a for loop ---");
for (var i = 0; i < 3; i++) {
    /* var: one binding shared by the whole function scope */
}
console.log("After loop, `var i` is still visible:", i);
for (let j = 0; j < 3; j++) {
    /* let: block-scoped to the for-loop */
}
try {
    console.log(j);
} catch (e) {
    console.log("After loop, `let j` is not visible (expected):", e.name, "-", e.message);
}
