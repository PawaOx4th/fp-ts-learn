import * as O from "fp-ts/Option";
import { log } from "fp-ts/lib/Console.js";
import { pipe } from "fp-ts/lib/function";

const inverse = (x: number): O.Option<number> =>
	x === 0 ? O.none : O.some(1 / x);

const getHead = <A>(as: ReadonlyArray<A>): O.Option<A> =>
	as.length === 0 ? O.none : O.some(as[0]);

const toUpperCase = (s: string): string => s.toUpperCase();

const addPrefix =
	(prefix: string) =>
	(s: string): string =>
		`${prefix} : ${s}`;

const getBestMovie = (titles: ReadonlyArray<string>): O.Option<string> =>
	pipe(
		titles,
		getHead,
		/**
		 *
		 * NOTE: .map() returns an Option<Option<string>>
		 */
		O.map(toUpperCase),
		O.map(addPrefix("🍿 Best movie")),
	);

// const movies = ["Interstellar", "Inception", "The Dark Knight"];
// console.log(JSON.stringify(getBestMovie(movies), null, 2)); // Some("Interstellar")

const getInverseHead = (ns: ReadonlyArray<number>) =>
	pipe(
		ns,
		getHead,
		// /**
		//  *
		//  * NOTE: O.map(inverse) => Option<Option<number>> 🤔
		//  */
		// O.map(inverse),
		// /**
		//  *
		//  * NOTE: using O.flatten to get Option<number> 🤔
		//  */
		// O.flatten,
		/**
		 *
		 *  NOTE: O.chain() is a combination of O.map() and O.flatten() ✅
		 */
		O.chain(inverse),
	);

log(JSON.stringify(getInverseHead([1, 2, 3]), null, 2))(); // Some(1)
