import { assertEquals } from "../deps/std.ts";
import { semverSort } from "./sort.ts";

Deno.test({
  name: "SORT00",
  fn: () => {
    const sorted = semverSort("1", "2");
    assertEquals(
      sorted.map((v) => v.version),
      ["2", "1"],
    );
  },
});
Deno.test({
  name: "SORT01",
  fn: () => {
    const sorted = semverSort("1", "1.0", "1.0.0");
    assertEquals(
      sorted.map((v) => v.version),
      ["1.0.0", "1.0", "1"],
    );
  },
});

Deno.test({
  name: "SORT02",
  fn: () => {
    const sorted = semverSort("1.0.0", "1.1.0", "1.0.1");
    assertEquals(
      sorted.map((v) => v.version),
      ["1.1.0", "1.0.1", "1.0.0"],
    );
  },
});

Deno.test({
  name: "SORT03",
  fn: () => {
    const sorted = semverSort("1.0.0-tst.0", "1.0.0-tst.1", "1.0.1-tst.0");
    assertEquals(
      sorted.map((v) => v.version),
      ["1.0.1-tst.0", "1.0.0-tst.1", "1.0.0-tst.0"],
    );
  },
});
