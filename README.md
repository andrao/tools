# 🧰 @andrao/tools

This repo contains a variety of lightweight server- and browser-compatible Typescript tools.

| Function         | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| `asyncInterval`  | Call an async function on interval until condition satisfied              |
| `capitalize`     | Type-safe string capitalization                                           |
| `clone`          | Clone an object                                                           |
| `deepEqual`      | Assert deep equality between two objects                                  |
| `isError`        | `Error` instance type predicate                                           |
| `retry`          | Execute a callback function with retry parameters                         |
| `safe`           | Assert that `T \| undefined` is `T`                                       |
| `timeAgo`        | Return the relative time difference string between now and the given date |
| `timeoutPromise` | Promise-wrapped `setTimeout()`                                            |
| `trim`           | Fancy string trimming                                                     |
| `uncapitalize`   | Type-safe string uncapitalization                                         |
| `uriJoin`        | Like `path.join()` but maintains the `//` in `http(s)://`                 |
| `uuid`           | Generate a v4 UUID                                                        |

It also contains a two query-string tools:

| Function                           | Description                                     |
| ---------------------------------- | ----------------------------------------------- |
| `querystring/parseQueryString`     | Dependency-free query parameter parsing         |
| `querystring/stringifyQueryParams` | Dependency-free query parameter stringification |
