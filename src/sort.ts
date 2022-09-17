import { SemVer, semver } from "../deps/std.ts";
import { Version } from "./version.ts";
import { parse } from "./parse.ts";

export function semverSort(
  ...versions: Version[]
): { version: string; semver: SemVer }[] {
  const map = new Map<string, SemVer>();
  for (const version of versions) {
    const vs = version.toString();
    if (!map.has(vs)) {
      const v = parse(version);
      map.set(vs, v);
    }
  }

  return [...map]
    .sort(([ls, lv], [rs, rv]) =>
      semver.gt(lv, rv)
        ? -1
        : semver.lt(lv.version, rv.version)
        ? 1
        : ls.length > rs.length
        ? -1
        : ls.length < rs.length
        ? 1
        : 0
    )
    .map(([version, semver]) => ({ version, semver }));
}
