import { readAll } from "./deps/std.ts";
import { semverSort } from "./src/mod.ts";

const input = await readAll(Deno.stdin);
const lines = await new TextDecoder().decode(input);
const versions = lines
  .split(/\r\n|\n|\s|,/)
  .map((l) => l.trim())
  .filter((l) => l);

for (const { version } of semverSort(...versions)) {
  console.log(version);
}
