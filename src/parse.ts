import { SemVer, semver } from "../deps/std.ts";
import { Version } from "./version.ts";

export function parse(version: Version): SemVer {
  if (version instanceof semver.SemVer) {
    return version;
  }
  let versionString = version.toString();

  // supports converting python pre-release versions into common semver
  // e.g. `0.13.1.dev0` -> `0.13.1-dev.0`
  const py0 = versionString.match(/(\d+)[.](\d+)[.](\d+)[.](\w+)(\d+)/);
  if (py0) {
    const [, major, minor, patch, pre, dev] = py0;
    versionString = `${major}.${minor}.${patch}-${pre}.${dev}`;
  }
  // e.g. `0.13.1d0` -> `0.13.1-d.0`
  const py1 = versionString.match(/(\d+)[.](\d+)[.](\d+)(\w+)(\d+)/);
  if (py1) {
    const [, major, minor, patch, pre, dev] = py1;
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
