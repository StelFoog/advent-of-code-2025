import elf from "elf-help";
import { input } from "../src/inputManager";

const [_ranges, _ids] = input.split("\n\n");
const ranges = _ranges.split("\n").map((l) => elf.range(...(l.split("-").map(Number) as [number, number])));
const ids = _ids.split("\n").map(Number);

let sum = 0;
for (const id of ids) {
	if (ranges.some((r) => r.contains(id))) sum++;
}
console.log(sum);
