import { readAll } from "./deps/std.ts";
import { semverSort } from "./src/mod.ts";

const input = await readAll(Deno.stdin);
const lines = await new TextDecoder().decode(input);
const versions = lines
  .split(/\r\n|\n|\s|,/)
  .map((l) => l.trim())
  .filter((l) => l);

try {
  for (const { version } of semverSort(...versions)) {
    console.log(version);
  }
} catch (err) {
  const { code } = err;
  if (code === "EPIPE") {
    // ignore, this can happen if stdout is closed by a piped process
    // such as `semver-sort | head -n 1` which will close stdout after a single line.
  } else {
    throw err;
  }
}
