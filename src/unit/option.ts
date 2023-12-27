import * as O from "fp-ts/Option";
import { cons } from "fp-ts/lib/ReadonlyNonEmptyArray";
import { pipe } from "fp-ts/lib/function";

/**
 * Calculates the inverse of a given number.
 *
 * @param {number} x - The number for which to calculate the inverse.
 * @return {Option<number>} An option type that contains the inverse of the number if it is not zero, otherwise it is none.
 */
const inverse = (x: number): O.Option<number> =>
	x === 0 ? O.none : O.some(1 / x);

//  NOTE: Option .match

const getUiMessageWithInverse = (x: number): string => {
	return pipe(
		x,
		inverse,
		O.match(
			() => "no inverse",
			(y) => `inverse of ${x} is ${y}`,
		),
	);
};

console.log("[LOG]  option   :", getUiMessageWithInverse(0));
console.log("[LOG]  option   :", getUiMessageWithInverse(2));

// NOTE: Option .fromNullable
const value1: number | null = null;
const value2: number | null = 2;

console.log("[LOG] 🟣  formNullable :", O.fromNullable(value1));
console.log("[LOG] 🟣  formNullable :", O.fromNullable(value2));
const checkValueIsNotNull = (val: number | null | undefined | string) => {
	const result = O.fromNullable(val);
	if (result._tag === "None") {
		return O.none;
	}
	return O.some(result.value);
};

const getValue = (val: Parameters<typeof checkValueIsNotNull>[0]) => {
	return pipe(
		val,
		checkValueIsNotNull,
		O.match(
			() => "is null",
			(val) => `value is ${val} and typeof is "${typeof val}"`,
		),
	);
};
console.log("[LOG] 🧡  is null ? :", getValue(1));
