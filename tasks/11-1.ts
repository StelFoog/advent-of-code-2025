import elf from "elf-help";
import { input } from "../src/inputManager";

const paths: Record<string, string[]> = {};
for (const line of input.split("\n")) {
	const [from, tos] = line.split(": ");
	paths[from] = tos.split(" ");
}

const getPaths = elf.memoize((from: string) => {
	let sum = 0;
	for (const path of paths[from]) {
		if (path === "out") sum++;
		else sum += getPaths(path);
	}
	return sum;
});

console.log(getPaths("you"));
