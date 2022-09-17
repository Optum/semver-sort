import { SemVer, semver } from "../deps/std.ts";
import { Version } from "./version.ts";

export function parse(version: Version): SemVer {
  if (version instanceof semver.SemVer) {
    return version;
  }
  const versionString = version.toString();

  // supports converting partial versions such as 1, 1.0 into valid semantic versions.
  const parsed = semver.parse(versionString) ??
    semver.parse(`${versionString}.0`) ??
    semver.parse(`${versionString}.0.0`);

  if (parsed == null) {
    throw new Error(`unable to parse invalid version ${version}`);
  }

  return parsed;
}
