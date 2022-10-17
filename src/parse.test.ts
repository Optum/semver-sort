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
Deno.test({
  name: "PARSE06",
  fn: () => {
    const v = parse("0.13.1.dev0");
    assertEquals(v.toString(), "0.13.1-dev.0");
  },
});
Deno.test({
  name: "PARSE07",
  only: true,
  fn: () => {
    const v = parse("12.0.0b4");
    assertEquals(v.toString(), "12.0.0-b.4");
  },
});
