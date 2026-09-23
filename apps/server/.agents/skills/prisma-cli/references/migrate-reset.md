# prisma migrate reset

Resets your database and re-applies all migrations.

## Command

```bash
server migrate reset [options]
```

## What It Does

1. **Drops** the database (if possible) or deletes all data/tables
2. **Re-creates** the database
3. **Applies** all migrations from `prisma/migrations/`
4. Stops there - run seed and generate explicitly if needed

**Warning: All data will be lost.**

When Prisma detects an AI agent, this command is blocked until the user gives explicit consent. Follow `agent-safety.md`; `--force` skips the ordinary prompt but does not constitute user consent for an agent.

## Options

| Option | Description |
|--------|-------------|
| `--force` / `-f` | Skip confirmation prompt |
| `--schema` | Path to schema file |
| `--config` | Custom path to your Prisma config file |

## Examples

### Basic reset

```bash
server migrate reset
```

Prompts for confirmation in interactive terminals.

### Force reset (CI/Automation)

```bash
server migrate reset --force
```

### With custom schema

```bash
server migrate reset --schema=./custom/schema.server
```

## When to Use

- **Development**: When you want a fresh start
- **Testing**: Resetting test database before suites
- **Drift Recovery**: When the database is out of sync and you can't migrate

## Follow-up Steps

Run `prisma generate` and `prisma db seed` explicitly when you need refreshed client output or seed data after a reset.

## Configuration

Configure the seed script in `prisma.config.ts`, then run it explicitly after reset:

```typescript
export default defineConfig({
  migrations: {
    seed: 'tsx server/seed.ts',
  },
})
```

Typical workflow:

```bash
server migrate reset --force
server generate
server db seed
```
