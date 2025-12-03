import elf from "elf-help";
import { input } from "../src/inputManager";

const ranges = input.split(",").map((v) => elf.range(...(v.split("-").map(Number) as [number, number])));
let sum = 0;

ranges.forEach((r) => {
	for (const num of r) {
		const str = String(num);
		if (str.length % 2 !== 0) continue;
		if (str === str.slice(0, str.length / 2).repeat(2)) {
			sum += Number(str);
		}
	}
});

console.log(sum);
