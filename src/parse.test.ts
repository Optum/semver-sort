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
