/**
 * Task 1 — Function declarations vs expressions, hoisting, higher-order function
 *
 * How this file is ordered:
 * - The brief asks you to call getCalculation(CALC_AREA)(...) *before* the function
 *   definitions, so Step 3 (first hoisting test) and Step 4 (first bonus snapshot)
 *   run at the top of the file.
 * - Steps 1 and 2 are the actual definitions; they appear after that on purpose.
 *
 * `logBonusScopeSnapshot` is a function declaration → hoisted, so it can be
 * invoked from the top of the file even though its body appears later.
 */

const SHAPE_CIRCLE = "circle";
const SHAPE_SQUARE = "square";

const AREA = "area";
const PERIMETER = "perimeter";

// *bonus* before definitions
logBonusScopeSnapshot("before any definitions");

// === Subtask 3 — Hoisting test (BEFORE the definitions written below) ===
console.log("\n--- SubTask 3. Call getCalculation before all the function definitions.");
// Both `getCalculation` and `calculateArea` are *function declarations*, so
// JavaScript hoists their full definitions to the top of this scope. That is
// why this call works even though the `function calculateArea` / `function
// getCalculation` lines appear later in the file.

const circleRadius = 10;
const squareSide = 5;

// calculate area of circle
// Observation: works before the lines below because declarations are hoisted.

try {
  const circleArea = getCalculation(AREA)(SHAPE_CIRCLE, circleRadius);
  console.log(`Success. Area of circle radius=${circleRadius}: ${circleArea}`);
} catch (e) {
  console.log(
    `Failed to calculate area of circle radius=${circleRadius}: ${e.name} - ${e.message}`
  );
}
// calculate perimeter of square
// Observation: doesn't work because `calculatePerimeter` is a function expression assigned to const that is not initialized yet.
try {
  const squarePerimeter = getCalculation(PERIMETER)(SHAPE_SQUARE, squareSide);
  console.log(`Success. Perimeter of square side=${squareSide}: ${squarePerimeter}`);
} catch (e) {
  console.log(
    `Failed to calculate perimeter of square side=${squareSide}: ${e.name} - ${e.message}`
  );
}

// function declaration
function calculateArea(shape, value) {
    if (shape === SHAPE_CIRCLE) {
        return Math.PI * value * value;
    }
    if (shape === SHAPE_SQUARE) {
        return value * value;
    }
    throw new Error('Unsupported shape for area: "' + shape + '"');
}

// function expression assigned to const
const calculatePerimeter = function (shape, value) {
    if (shape === SHAPE_CIRCLE) {
        return 2 * Math.PI * value;
    }
    if (shape === SHAPE_SQUARE) {
        return 4 * value;
    }
    throw new Error('Unsupported shape for perimeter: "' + shape + '"');
};

// higher-order function
function getCalculation(type) {
    if (type === AREA) {
        return calculateArea;
    }
    if (type === PERIMETER) {
        return calculatePerimeter;
    }
    throw new Error('Unknown type: "' + type + '"');
}

// === Subtask 3 — Hoisting test (AFTER the definitions) ===
console.log("\n--- SubTask 3. Call getCalculation after all the function definitions.");
// calculate area of circle
// Observation: same as before; declarations were already hoisted.
try {
  const circleArea = getCalculation(AREA)(SHAPE_CIRCLE, circleRadius);
  console.log(`Success. Area of circle radius=${circleRadius}: ${circleArea}`);
} catch (e) {
  console.log(
    `Failed to calculate area of circle radius=${circleRadius}: ${e.name} - ${e.message}`
  );
}
// calculate perimeter of square
// Observation: works because `calculatePerimeter` is initialized
try {
  const squarePerimeter = getCalculation(PERIMETER)(SHAPE_SQUARE, squareSide);
  console.log(`Success. Perimeter of square side=${squareSide}: ${squarePerimeter}`);
} catch (e) {
  console.log(
    `Failed to calculate perimeter of square side=${squareSide}: ${e.name} - ${e.message}`
  );
}


/**
 * Bonus: typeof checks for globalThis vs module scope.
 * When called before `const calculatePerimeter = ...` has run, reading
 * `calculatePerimeter` throws ReferenceError (temporal dead zone).
 */
function logBonusScopeSnapshot(contextLabel) {
    console.log("\n--- BONUS [" + contextLabel + "]");
    console.log("globalThis.calculateArea:", typeof globalThis.calculateArea);
    console.log("globalThis.calculatePerimeter:", typeof globalThis.calculatePerimeter);
    console.log("globalThis.getCalculation:", typeof globalThis.getCalculation);
    console.log("Module scope typeof calculateArea:", typeof calculateArea);
    try {
        console.log("Module scope typeof calculatePerimeter:", typeof calculatePerimeter);
    } catch (e) {
        console.log("Module scope typeof calculatePerimeter (error — not ready before const line):", e.name, "-", e.message);
    }
    console.log("Module scope typeof getCalculation:", typeof getCalculation);
}

// *bonus* after all definitions
logBonusScopeSnapshot("after all definitions");
