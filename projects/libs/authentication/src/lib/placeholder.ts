// This main entrypoint does not (yet) contain any components
export class NoExports {
  constructor() {
    // eslint-disable-next-line no-console
    console.warn(`This package does not contain any utilities in its main package.
    Utilities available in this @qls/authentication package can all be imported through their subpackages (secondary entrypoints).
    To import these utilities, import their modules directly: @qls/authentication/http'`);
  }
}
