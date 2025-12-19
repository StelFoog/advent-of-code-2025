import elf from "elf-help";
import { input } from "../src/inputManager";

const tiles = input.split("\n").map((l) => elf.coord(...(l.split(",").map(Number) as [number, number])));

let max = 0;
for (let i = 0; i < tiles.length; i++) {
	for (let j = i + 1; j < tiles.length; j++) {
		const a = tiles[i];
		const b = tiles[j];
		const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
		if (area > max) max = area;
	}
}

console.log(max);
