# SECURITY EXCEPTIONS

## `react-snap` vulnerabilities
The package `react-snap` has known vulnerabilities (ReDoS, Path Traversal) through its headless Chrome puppeteer dependencies.

These vulnerabilities are accepted because `react-snap` is strictly a `devDependency` and only runs at build time. It is not bundled or exploitable in the production runtime environment.

Last reviewed: 2026-03-10
