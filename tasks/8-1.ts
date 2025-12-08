import elf from "elf-help";
import { input } from "../src/inputManager";

const boxes = input.split("\n").map((v) => elf.coord(...(v.split(",").map(Number) as [number, number, number])));
const distances: { first: number; second: number; dist: number }[] = [];
for (let i = 0; i < boxes.length; i++) {
	const fBox = boxes[i];
	for (let j = i + 1; j < boxes.length; j++) {
		const sBox = boxes[j];
		distances.push({
			first: i,
			second: j,
			dist: Math.sqrt(Math.pow(fBox.x - sBox.x, 2) + Math.pow(fBox.y - sBox.y, 2) + Math.pow(fBox.z - sBox.z, 2)),
		});
	}
}
distances.sort((a, b) => a.dist - b.dist);

let connections = 0;
const circuts: Set<number>[] = [];
const circutMap = new Map<number, number>();
for (const { first, second } of distances) {
	if (connections >= 1000) break;
	connections++;
	const fCirc = circutMap.get(first) !== undefined ? circuts[circutMap.get(first)!] : undefined;
	const sCirc = circutMap.get(second) !== undefined ? circuts[circutMap.get(second)!] : undefined;
	if (fCirc && fCirc === sCirc) continue;

	switch ([fCirc, sCirc].filter((v) => v !== undefined).length) {
		case 0:
			const nl = circuts.push(new Set([first, second]));
			circutMap.set(first, nl - 1);
			circutMap.set(second, nl - 1);
			break;
		case 1:
			if (fCirc) {
				fCirc.add(second);
				circutMap.set(second, circutMap.get(first)!);
			} else {
				sCirc!.add(first);
				circutMap.set(first, circutMap.get(second)!);
			}
			break;
		case 2:
			sCirc!.forEach((v) => {
				fCirc!.add(v);
				circutMap.set(v, circutMap.get(first)!);
			});
			sCirc!.clear();
	}
}
console.log(
	elf.product(
		...circuts
			.map((s) => s.size)
			.sort((a, b) => b - a)
			.slice(0, 3)
	)
);
