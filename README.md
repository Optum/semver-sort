# `semver-sort` 🦕

Sorts a set of version strings semantically

## Usage

`semver-sort` can be used from code or from the cli directly.

### api

```ts
import * as semver from "https://deno.land/std@0.155.0/semver/mod.ts";
import { semverSort } from "https://deno.land/x/semver-sort@0.1.2/mod.ts";

const sorted: { version: string; semver: SemVer }[] = semverSort(
  "1.12.0",
  "1.7",
  "2",
  "1.13.0",
);

// 2, 1.13.0, 1.12.0, 1.7
```

### cli

Pass line delimited version strings as stdin to have them sorted.

```sh
cat test.txt | deno run "https://deno.land/x/semver-sort@0.1.0/main.ts"
```

##### install

```sh
deno install "https://deno.land/x/semver-sort@0.1.0/main.ts" -n semver-sort
cat test.txt | semver-sort
```

##### get the latest version

```sh
cat test.txt | semver-sort | head -n 1
```

##### get all versions except the latest

```sh
cat test.txt | semver-sort | tail -n +2
```

## Contributing

- [License](./LICENSE)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Individual Contributor License](./INDIVIDUAL_CONTRIBUTOR_LICENSE.md)
- [Contributing](./CONTRIBUTING.md)

## License

Distributed under the Apache 2.0 License. See [`LICENSE`](./LICENSE) for more
information.

<!-- MAINTAINERS -->

## Maintainers

- Justin Chase
  - GitHub: [justinmchase](https://github.com/justinmchase)
  - Email: justin.chase@optum.com
