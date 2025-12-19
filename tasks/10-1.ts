import elf from "elf-help";
import { input } from "../src/inputManager";

const machines = input.split("\n").map((l) => {
	const [seq, ...buttons] = l.split(" ").slice(0, -1); // remove joltage
	return { seq: seq.slice(1, -1), btns: buttons.map((b) => b.slice(1, -1).split(",").map(Number)) };
});

let min = 0;
for (const { seq, btns } of machines) {
	let ok = false;
	for (let i = 1; i <= btns.length && !ok; i++) {
		for (const combo of elf.combinations(btns, i)) {
			if (activatesSequence(seq, combo)) ok = true;
		}
		if (ok) min += i;
	}
}
console.log(min);

function activatesSequence(target: string, buttons: number[][]) {
	let seq = Array.from(target, () => false);
	for (const btn of buttons) {
		for (const trigger of btn) {
			seq[trigger] = !seq[trigger];
		}
	}
	return seq.map((v) => (v ? "#" : ".")).join("") === target;
}
