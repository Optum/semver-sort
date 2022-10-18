import { SemVer, semver } from "../deps/std.ts";
import { Version } from "./version.ts";

export function parse(version: Version): SemVer {
  if (version instanceof semver.SemVer) {
    return version;
  }
  let versionString = version.toString().trim();

  // Python version documentation:
  // https://peps.python.org/pep-0440/#public-version-identifiers
  //
  // supports converting _most_ python versions into common semver
  // [N!]N(.N)*[{a|b|rc}N][.postN][.devN]
  //
  // | example     | result       |
  // | ----------- | ------------ |
  // | 0.13.1.dev0 | 0.13.1-dev.0 |
  // | 0.13.1d0    | 0.13.1-d.0   |
  //
  const py = versionString.match(
    /^(\d+)[.](\d+)[.](\d+)[.]?(a|b|rc|dev|post)(\d+)$/,
  );
  if (py) {
    const [, major, minor, patch, pre, dev] = py;
    versionString = `${major}.${minor}.${patch}-${pre}.${dev}`;
  }

  // supports converting partial versions such as 1, 1.0 into valid semantic versions.
  const parsed = semver.parse(versionString) ??
    semver.parse(`${versionString}.0`) ??
    semver.parse(`${versionString}.0.0`);

  if (parsed == null) {
    throw new Error(`unable to parse invalid version ${version}`);
  }

  return parsed;
}
