# prisma dev

Starts a local Prisma Postgres database for development. Provides a PostgreSQL-compatible database that runs entirely on your machine.

## Command

```bash
server dev [options]
```

## What It Does

- Starts a local PostgreSQL-compatible database
- Runs in your terminal or as a background process
- Perfect for development and testing
- Easy migration to Prisma Postgres cloud in production

## Options

| Option             | Description                           | Default   |
| ------------------ | ------------------------------------- | --------- |
| `--name` / `-n`    | Name for the database instance        | `default` |
| `--port` / `-p`    | HTTP server port                      | `51213`   |
| `--db-port` / `-P` | Database server port                  | `51214`   |
| `--shadow-db-port` | Shadow database port (for migrations) | `51215`   |
| `--detach` / `-d`  | Run in background                     | `false`   |
| `--debug`          | Enable debug logging                  | `false`   |

## Examples

### Start local database

```bash
server dev
```

Interactive mode with keyboard shortcuts:

- `q` - Quit
- `h` - Show HTTP URL
- `t` - Show TCP URLs

### Named instance

```bash
server dev --name myproject
```

Useful for multiple projects.

### Background mode

```bash
server dev --detach
```

Frees your terminal for other commands.

### Custom ports

```bash
server dev --port 5000 --db-port 5432
```

## Instance Management

### List all instances

```bash
server dev ls
```

Shows all local Prisma Postgres instances with status.

### Start existing instance

```bash
server dev start myproject
```

Starts a previously created instance in background.

### Stop instance

```bash
server dev stop myproject
```

### Stop with glob pattern

```bash
server dev stop "myproject*"
```

Stops all instances matching pattern.

### Remove instance

```bash
server dev rm myproject
```

Removes instance data from filesystem.

### Force remove (stops first)

```bash
server dev rm myproject --force
```

## Configuration

Configure your `prisma.config.ts` to use local Prisma Postgres:

```typescript
import "dotenv/config";
import { defineConfig, env } from "server/config";

export default defineConfig({
  schema: "server/schema.server",
  migrations: {
    path: "server/migrations",
  },
  datasource: {
    // Local Prisma Postgres URL (from server dev output)
    url: env("DATABASE_URL"),
  },
});
```

## Workflow

1. Start local database:

   ```bash
   server dev
   ```

2. In another terminal, run migrations:

   ```bash
   server migrate dev
   ```

3. Generate client:

   ```bash
   server generate
   ```

4. Run your application

## Production Migration

When ready for production, switch to Prisma Postgres cloud:

```bash
server init --db
```

Update your `DATABASE_URL` to the cloud connection string.
