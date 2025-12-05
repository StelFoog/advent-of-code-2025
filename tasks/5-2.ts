import elf from "elf-help";
import { input } from "../src/inputManager";

const [_ranges] = input.split("\n\n");
let ranges = _ranges
	.split("\n")
	.map((l) => elf.range(...(l.split("-").map(Number) as [number, number])))
	.sort((a, b) => a.start - b.start);

const nextRanges = [ranges[0]];
for (let i = 1; i < ranges.length; i++) {
	const range = ranges[i];
	const nextIdx = nextRanges.length - 1;
	if (nextRanges[nextIdx].overlaps(range)) {
		nextRanges[nextIdx] = elf.range(nextRanges[nextIdx].start, Math.max(nextRanges[nextIdx].end, range.end));
	} else {
		nextRanges.push(range);
	}
}

console.log(elf.sum(...nextRanges.map((r) => r.size)));
