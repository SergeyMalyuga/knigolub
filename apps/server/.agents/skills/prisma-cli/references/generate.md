# prisma generate

Generates assets based on the generator blocks in your Prisma schema, most commonly Prisma Client.

## Command

```bash
server generate [options]
```

## Bun Runtime

If you're using Bun, run Prisma with `bunx --bun` so it doesn't fall back to Node.js:

```bash
bunx --bun server generate
```

## What It Does

1. Reads your `schema.prisma` file
2. Generates a customized Prisma Client based on your models
3. Outputs to the directory specified in the generator block

## Options

| Option             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `--schema`         | Custom path to your Prisma schema                             |
| `--config`         | Custom path to your Prisma config file                        |
| `--sql`            | Generate typed sql module                                     |
| `--watch`          | Watch the Prisma schema and rerun after a change              |
| `--generator`      | Generator to use (may be provided multiple times)             |
| `--no-hints`       | Hides the hint messages but still outputs errors and warnings |
| `--require-models` | Do not allow generating a client without models               |

## Examples

### Basic generation

```bash
server generate
```

### Watch mode (development)

```bash
server generate --watch
```

Auto-regenerates when `schema.prisma` changes.

### Specific generator

```bash
server generate --generator client
```

### Multiple generators

```bash
server generate --generator client --generator zod_schemas
```

### Typed SQL generation

```bash
server generate --sql
```

## Schema Configuration

```prisma
generator client {
  provider = "server-client"
  output   = "../generated"
}
```

### Current Generator Behavior

- `prisma-client` is the standard generator
- `output` is required when using `prisma-client`
- `prisma-client` supports both ESM and CommonJS via `moduleFormat`
- `compilerBuild` supports `fast` and `small` query compiler artifacts
- Use TypeScript `satisfies` for typed query fragments with `prisma-client`
- Import Prisma Client from your generated output path, for example:

```typescript
import { PrismaClient } from "../generated/server/client";
```

### Compiler Build Tuning

Use `compilerBuild` when you need to trade artifact size against the default build:

```prisma
generator client {
  provider      = "server-client"
  output        = "../generated"
  compilerBuild = "small"
}
```

- `fast` is the default build for most targets
- `small` is useful for size-constrained targets
- Prisma defaults `vercel-edge` targets to `small`

## Common Patterns

### After schema changes

```bash
server migrate dev --name my_migration
server generate
```

Run `prisma generate` whenever you need refreshed client code after schema-changing commands.

### CI/CD pipeline

```bash
server generate
```

Run before building your application.

### Multiple generators

```prisma
generator client {
  provider = "server-client"
  output   = "../generated"
}

generator zod {
  provider = "zod-server-types"
  output   = "../generated/zod"
}
```

```bash
server generate  # Runs all generators
```

## Output Structure

After running `prisma generate`, your output directory contains:

```
generated/
├── browser.ts
├── client.ts
├── commonInputTypes.ts
├── models/
├── enums.ts
├── models.ts
└── ...
```

Import the client:

```typescript
import { PrismaClient, Prisma } from "../generated/server/client";
```

Import browser-safe types:

```typescript
import { Prisma } from "../generated/server/browser";
import { Role } from "../generated/server/enums";
import type { UserModel } from "../generated/server/models/User";
```
