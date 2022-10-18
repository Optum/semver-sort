import { assertEquals, assertThrows, semver } from "../deps/std.ts";
import { parse } from "./parse.ts";

Deno.test({
  name: "PARSE00",
  fn: () => {
    const v = parse("1");
    assertEquals(v.toString(), "1.0.0");
  },
});
Deno.test({
  name: "PARSE01",
  fn: () => {
    const v = parse("1.0");
    assertEquals(v.toString(), "1.0.0");
  },
});
Deno.test({
  name: "PARSE02",
  fn: () => {
    const v = parse("1.0.0");
    assertEquals(v.toString(), "1.0.0");
  },
});
Deno.test({
  name: "PARSE03",
  fn: () => {
    const v = parse("1.0.0-tst.0");
    assertEquals(v.toString(), "1.0.0-tst.0");
  },
});
Deno.test({
  name: "PARSE04",
  fn: () => {
    assertThrows(() => parse("abc"));
  },
});
Deno.test({
  name: "PARSE05",
  fn: () => {
    const v = new semver.SemVer("1.2.3");
    assertEquals(parse(v), v);
  },
});

const pythonVersions = [
  ["0.13.1a0", "0.13.1-a.0"],
  ["0.13.1b0", "0.13.1-b.0"],
  ["0.13.1rc0", "0.13.1-rc.0"],
  ["0.13.1.dev0", "0.13.1-dev.0"],
  ["0.13.1.post0", "0.13.1-post.0"],
];

for (let i = 0; i < pythonVersions.length; i++) {
  const [input, expected] = pythonVersions[i];
  Deno.test({
    name: `PY${i.toString().padStart(2, "0")}`,
    fn: () => {
      const v = parse(input);
      assertEquals(v.toString(), expected);
    },
  });
}
