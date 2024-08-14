/**
 * Generates a random number between 0 - 1.
 * Then subtracts 0.5. If number is negative, sort backwards,
 * if positive number, sort forwards.
 */
export const randomSort = () => 0.5 - Math.random();
