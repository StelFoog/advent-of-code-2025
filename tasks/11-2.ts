import elf from "elf-help";
import { input } from "../src/inputManager";

const paths: Record<string, string[]> = {};
for (const line of input.split("\n")) {
	const [from, tos] = line.split(": ");
	paths[from] = tos.split(" ");
}

const getPaths = elf.memoize((from: string, passed: number) => {
	let sum = 0;
	if (from === "dac" || from === "fft") passed++;
	for (const path of paths[from]) {
		if (path === "out") {
			if (passed === 2) sum++;
		} else {
			sum += getPaths(path, passed);
		}
	}
	return sum;
});

console.log(getPaths("svr", 0));
