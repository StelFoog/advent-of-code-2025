import elf from "elf-help";
import { input } from "../src/inputManager";

const machines = input.split("\n").map((l) => {
	const buttons = l.split(" ").slice(1); // remove indicator lights
	const joltage = buttons.pop()!;
	return {
		btns: buttons.map((b) => b.slice(1, -1).split(",").map(Number)),
		jolt: joltage.slice(1, -1).split(",").map(Number),
	};
});

let sum = 0;
for (const { btns, jolt } of machines) {
	const patterns: [number, number[]][] = [];
	for (let i = 0; i <= btns.length; i++) {
		for (const combo of elf.combinations(btns, i)) {
			const change = jolt.map((_) => 0);
			for (const btn of combo) for (const v of btn) change[v]++;
			patterns.push([i, change]);
		}
	}

	const getSteps = elf.memoize(
		(curr: number[]) => {
			if (curr.every((v) => v === 0)) return 0;
			let min = Infinity;
			for (const [cost, change] of patterns) {
				const pressed = curr.map((v, idx) => v - change[idx]);
				if (pressed.some((v) => v < 0 || v % 2 !== 0)) continue;

				const subSteps = getSteps(pressed.map((v) => v / 2));
				if (subSteps === Infinity) continue;
				const steps = cost + 2 * subSteps;
				if (steps < min) min = steps;
			}
			return min;
		},
		[(v) => v.join(",")]
	);

	sum += getSteps(jolt);
}
console.log(sum);
