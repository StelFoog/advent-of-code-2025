import elf from "elf-help";
import { input } from "../src/inputManager";

let start = elf.coord(0, 0);
const map = input.split("\n").map((l, y) =>
	l.split("").map((char, x) => {
		if (char === "S") start = elf.coord(x, y);
		return char === "^";
	})
);

let splits = 0;
const passedSpaces = elf.multiMap<boolean>(2);
const q = [start];
while (q.length) {
	const { x, y } = q.shift()!;
	for (let i = y; i < map.length; i++) {
		if (passedSpaces.get(x, i)) break;
		passedSpaces.set([x, i], true);
		if (map[i][x]) {
			splits++;
			q.push(elf.coord(x - 1, i), elf.coord(x + 1, i));
			break;
		}
	}
}
console.log(splits);
