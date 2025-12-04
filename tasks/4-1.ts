import { input } from "../src/inputManager";

let sum = 0;
const grid = input.split("\n").map((row) => row.split("").map((c) => c === "@"));

for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		if (!grid[y][x]) continue;

		let surrounding = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (!i && !j) continue;
				if (grid[y + i]?.[x + j]) surrounding++;
			}
		}
		if (surrounding < 4) sum++;
	}
}

console.log(sum);
