import elf from "elf-help";
import { input } from "../src/inputManager";

const lines = input.split("\n");
const eqIndexes: { idx: number; sym: string }[] = [];
lines
	.pop()
	?.split("")
	.forEach((sym, idx) => {
		if (sym === " ") return;
		eqIndexes.push({ sym, idx });
	});

let sum = 0;
for (let i = 0; i < eqIndexes.length; i++) {
	const { sym, idx } = eqIndexes[i];
	const nextIdx = eqIndexes[i + 1]?.idx;
	const cells = lines.map((l) => l.slice(idx, nextIdx ? nextIdx - 1 : undefined));

	const nums: number[] = [];
	for (let j = 0; j < cells[0].length; j++) {
		let num = "";
		for (const c of cells) num += c[j];
		nums.push(Number(num));
	}
	if (sym === "+") sum += elf.sum(...nums);
	else sum += elf.product(...nums);
}

console.log(sum);
