import elf from "elf-help";
import { input } from "../src/inputManager";

const ranges = input.split(",").map((v) => elf.range(...(v.split("-").map(Number) as [number, number])));
let sum = 0;

ranges.forEach((r) => {
	for (const num of r) {
		const str = String(num);
		for (let i = 1; i <= str.length / 2; i++) {
			if (str.length % i !== 0) continue;
			if (str === str.slice(0, i).repeat(str.length / i)) {
				sum += Number(str);
				break;
			}
		}
	}
});

console.log(sum);
