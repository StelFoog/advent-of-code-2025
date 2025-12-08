import elf, { Coordinate2D } from "elf-help";
import { input } from "../src/inputManager";

let start = elf.coord(0, 0);
const map = input.split("\n").map((l, y) =>
	l.split("").map((char, x) => {
		if (char === "S") start = elf.coord(x, y);
		return char === "^";
	})
);

let splits = 0;
const passedStarts = elf.multiMap<boolean>(2);
const timelines = elf.multiMap<number>(2);
const q = elf.orderedQueue<Coordinate2D>((v) => v.y);
q.add(start);
timelines.set([start.x, start.y], 1);
while (q.length) {
	const { x, y } = q.dequeue()!;
	if (passedStarts.get(x, y)) continue;
	passedStarts.set([x, y], true);
	const times = timelines.get(x, y)!;
	for (let i = y; i < map.length; i++) {
		if (i === map.length - 1) {
			splits += times;
			break;
		}
		if (map[i][x]) {
			const left = elf.coord(x - 1, i);
			const leftTimelines = timelines.get(left.x, left.y);
			q.add(left);
			timelines.set([left.x, left.y], (leftTimelines ?? 0) + times);

			const right = elf.coord(x + 1, i);
			const rightTimelines = timelines.get(right.x, right.y);
			q.add(right);
			timelines.set([right.x, right.y], (rightTimelines ?? 0) + times);
			break;
		}
	}
}
console.log(splits);
