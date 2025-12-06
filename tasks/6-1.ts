import elf from "elf-help";
import { input } from "../src/inputManager";

const cells = input.split("\n").map((l) => l.trim().split(/\s+/));

let sum = 0;
for (let i = 0; i < cells[0].length; i++) {
	const nums: number[] = [];
	for (let j = 0; j < cells.length - 1; j++) nums.push(Number(cells[j][i]));
	if (cells[cells.length - 1][i] === "+") sum += elf.sum(...nums);
	else sum += elf.product(...nums);
}
console.log(sum);
