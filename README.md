# rozenite-pnp

A demo project for integrating [Rozenite](https://rozenite.dev) in a Yarn PnP environment.

## Setup

### Requirements

- [mise](https://mise.jdx.dev)

```bash
mise trust
mise install

corepack enable
```

## Development

### 1. Build Application

```bash
# Configure nodeLinker to `node-modules` for building the native application
yarn config set nodeLinker node-modules && yarn

# Build Android/iOS applications

# Restore nodeLinker to `pnp`
yarn config set nodeLinker pnp && yarn
```

### 2. Run

```bash
# Start Metro dev server
yarn start
```

### 3. Verify Rozenite Integration

After running `yarn start`, launch the React Native app and press `j` to open the inspector.
Verify that Rozenite is integrated and the plugin is properly registered.
