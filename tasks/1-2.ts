import { input } from "../src/inputManager";

let dial = 50;
let count = 0;

input.split("\n").forEach((line) => {
	const [dir] = line[0];
	let num = Number(line.slice(1));
	if (num >= 100) count += Math.floor(num / 100);
	num %= 100;

	if (dir === "L") {
		if (dial !== 0 && dial - num <= 0) count++;
		dial -= num;
	} else {
		if (dial + num >= 100) count++;
		dial += num;
	}
	dial %= 100;
	if (dial < 0) dial += 100;
});

console.log(count);
