import elf from "elf-help";
import { input } from "../src/inputManager";

// Only works for real input
const paragraphs = input.split("\n\n");
const regions = paragraphs[paragraphs.length - 1].split("\n").map((l) => {
	const [x, y, ...presents] = elf.parseNumbers(l, { alsoSplitOn: [":", "x"] });
	return { x, y, presents };
});

let total = 0;
for (const { x, y, presents } of regions) {
	if (Math.floor(x / 3) * Math.floor(y / 3) >= elf.sum(...presents)) total++;
}
console.log(total);
