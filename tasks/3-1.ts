import { input } from "../src/inputManager";

let sum = 0;

input.split("\n").forEach((bank) => {
	let firstIdx = 0;
	for (let i = 1; i < bank.length - 1; i++) {
		if (bank[i] > bank[firstIdx]) firstIdx = i;
	}

	let secondIdx = firstIdx + 1;
	for (let i = secondIdx + 1; i < bank.length; i++) {
		if (bank[i] > bank[secondIdx]) secondIdx = i;
	}

	sum += Number(bank[firstIdx] + bank[secondIdx]);
});

console.log(sum);
