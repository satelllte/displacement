# DISCLAIMER

<br/>

**_NOT A FINAL PRODUCT, THE PRODUCT IS IN THE EARLY STAGES OF DEVELOPMENT_**

<br/>

# DISPLACEMENT

Displacement maps generator.

## Try in Online Code Editor

### [Gitpod](https://www.gitpod.io/)

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/satelllte/displacement)

### [GitHub Codespaces](https://github.com/features/codespaces)

[![Open in Remote - Containers](https://img.shields.io/static/v1?label=Remote%20-%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/satelllte/displacement)

## Prerequisites

- [NodeJS](https://nodejs.org/)
- [Rust & Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

## Development

Install dependencies:

```bash
npm install
```

Compile WebAssembly:

```bash
npm run build:wasm
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

```bash
npm run build:wasm
npm run build:web
```

Output files will be available in `out` directory.
The directory contents can be served on some static website hosting service like [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), etc.

Also, the production build can be previewed locally using `serve` script:

```bash
npm run serve
```

## Testing

### WebAssembly

Before running any of the test here, go to `wasm` directory

```bash
cd wasm
```

Unit tests:

```bash
./rs-test.sh
```

Code quality check:

```bash
./rs-clippy.sh
```

Code formatting check:

```bash
./rs-fmt.sh
```

### Web

Types check:

```bash
npm run test:typescript
```

Lint check:

```bash
npm run test:lint
```
