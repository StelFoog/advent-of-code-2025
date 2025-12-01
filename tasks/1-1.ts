import { input } from "../src/inputManager";

let dial = 50;
let count = 0;

input.split("\n").forEach((line) => {
	const [dir] = line[0];
	const num = Number(line.slice(1));
	if (dir === "L") {
		dial -= num;
	} else {
		dial += num;
	}
	dial %= 100;
	if (dial < 0) dial += 100;
	if (dial === 0) count++;
});

console.log(count);
