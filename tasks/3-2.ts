import { input } from "../src/inputManager";

let sum = 0;

input.split("\n").forEach((bank) => {
	const indexes: number[] = [];
	let prevIdx = -1;

	for (let j = 0; j < 12; j++) {
		indexes.push(prevIdx + 1);
		for (let i = indexes[j] + 1; i < bank.length - 11 + j; i++) {
			if (bank[i] > bank[indexes[j]]) indexes[j] = i;
		}
		prevIdx = indexes[j];
	}

	sum += Number(indexes.map((idx) => bank[idx]).join(""));
});

console.log(sum);
