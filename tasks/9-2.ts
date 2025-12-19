import elf, { Coordinate2D, linesIntersect2D, Range } from "elf-help";
import { input } from "../src/inputManager";

const tiles = input.split("\n").map((l) => elf.coord(...(l.split(",").map(Number) as [number, number])));

const lines = tiles.map((p1, idx) => elf.line(p1, tiles[(idx + 1) % tiles.length]));
// Split into horizontal and vertical lines
const horizontalLines: typeof lines = [];
const verticalLines: typeof lines = [];
lines.forEach((l) => (l.start.x === l.end.x ? verticalLines.push(l) : horizontalLines.push(l)));

const xMin = Math.min(...tiles.map((t) => t.x));

let max = 0;
for (const [a, b] of elf.permutations(tiles, 2)) {
	const area = (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
	if (a.x === b.x || a.y === b.y) continue;
	if (area > max) {
		const c = elf.coord(a.x, b.y);
		const d = elf.coord(b.x, a.y);
		if (!pointInPolygon(c) || !pointInPolygon(d)) continue;
		let ranges = [elf.range(Math.min(a.x, d.x) + 1, Math.max(a.x, d.x) - 1)];
		let y = a.y;
		for (const { start, end } of horizontalLines) {
			if (start.y !== y) continue;
			const range = elf.range(Math.min(start.x, end.x), Math.max(start.x, end.x));
			for (let i = 0; i < ranges.length; i++) {
				const details = range.overlaps(ranges[i], true);
				if (!details) continue;
				ranges = [...ranges.slice(0, i), ...ranges.slice(i + 1), ...(details.outside ?? [])];
				break;
			}
		}
		let rLines = ranges.map((r) => elf.line([r.start, y], [r.end, y]));
		if (rLines.some((l) => !pointInPolygon(l.start))) continue;
		if (rLines.some((l1) => verticalLines.some((l2) => elf.linesIntersect2D(l1, l2)))) continue;

		ranges = [elf.range(Math.min(b.x, c.x) + 1, Math.max(b.x, c.x) - 1)];
		y = b.y;
		for (const { start, end } of horizontalLines) {
			if (start.y !== y) continue;
			const range = elf.range(Math.min(start.x, end.x), Math.max(start.x, end.x));
			for (let i = 0; i < ranges.length; i++) {
				const details = range.overlaps(ranges[i], true);
				if (!details) continue;
				ranges = [...ranges.slice(0, i), ...ranges.slice(i + 1), ...(details.outside ?? [])];
				break;
			}
		}
		rLines = ranges.map((r) => elf.line([r.start, y], [r.end, y]));
		if (rLines.some((l) => !pointInPolygon(l.start))) continue;
		if (rLines.some((a) => verticalLines.some((b) => elf.linesIntersect2D(a, b)))) continue;

		ranges = [elf.range(Math.min(a.y, c.y) + 1, Math.max(a.y, c.y) - 1)];
		let x = a.x;
		for (const { start, end } of verticalLines) {
			if (start.x !== x) continue;
			const range = elf.range(Math.min(start.y, end.y), Math.max(start.y, end.y));
			for (let i = 0; i < ranges.length; i++) {
				const details = range.overlaps(ranges[i], true);
				if (!details) continue;
				ranges = [...ranges.slice(0, i), ...ranges.slice(i + 1), ...(details.outside ?? [])];
				break;
			}
		}
		rLines = ranges.map((r) => elf.line([x, r.start], [x, r.end]));
		if (rLines.some((l) => !pointInPolygon(l.start))) continue;
		if (rLines.some((a) => horizontalLines.some((b) => elf.linesIntersect2D(a, b)))) continue;

		ranges = [elf.range(Math.min(b.y, d.y) + 1, Math.max(b.y, d.y) - 1)];
		x = b.x;
		for (const { start, end } of verticalLines) {
			if (start.x !== x) continue;
			const range = elf.range(Math.min(start.y, end.y), Math.max(start.y, end.y));
			for (let i = 0; i < ranges.length; i++) {
				const details = range.overlaps(ranges[i], true);
				if (!details) continue;
				ranges = [...ranges.slice(0, i), ...ranges.slice(i + 1), ...(details.outside ?? [])];
				break;
			}
		}
		rLines = ranges.map((r) => elf.line([x, r.start], [x, r.end]));
		if (rLines.some((l) => !pointInPolygon(l.start))) continue;
		if (rLines.some((a) => horizontalLines.some((b) => elf.linesIntersect2D(a, b)))) continue;

		max = area;
	}
}
console.log(max);

function pointOnSomeLine(p: Coordinate2D) {
	return lines.some(({ start, end }) => {
		if (start.x === end.x) {
			return p.x === start.x && Math.min(start.y, end.y) <= p.y && Math.max(start.y, end.y) >= p.y;
		} else {
			return p.y === start.y && Math.min(start.x, end.x) <= p.x && Math.max(start.x, end.x) >= p.x;
		}
	});
}

function pointInPolygon(p: Coordinate2D) {
	if (pointOnSomeLine(p)) return true;
	let diff = 0;
	const pLine = elf.line({ x: xMin - 1, y: p.y }, p);
	for (const line of verticalLines) {
		if (Math.min(line.start.y, line.end.y) > p.y || Math.max(line.start.y, line.end.y) < p.y) continue;
		if (pLine.start.x > line.start.x || pLine.end.x < line.start.x) continue;

		if (line.start.y > line.end.y) {
			if (diff > 0) diff = 0;
			else diff--;
		} else {
			if (diff < 0) diff = 0;
			else diff++;
		}
	}
	return diff !== 0;
}
