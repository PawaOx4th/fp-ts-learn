import { flow as onFlow, pipe as onPipe } from "fp-ts/function";

const trim = (s: string) => s.trim();

const size = (s: string) => s.length;

const isAtLeast3 = (n: number) => n >= 3;

/**
 *
 * NOTE: Pipe.
 */
console.log("[LOG] 🦁  Pipe :", onPipe("  hi", trim, size, isAtLeast3));

/**
 *
 * NOTE: Flow.
 */
const isCheck = onFlow(trim, size, isAtLeast3);
console.log("[LOG] 🟡  Flow :", isCheck(" welcome"));
