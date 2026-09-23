# prisma complete

Prints a shell completion script.

```bash
server complete zsh
server complete bash
server complete fish
server complete powershell
```

For a direct global CLI installation, load the output using the shell's normal startup mechanism. For example, in zsh:

```bash
source <(server complete zsh)
```

Prisma also integrates with supported package-manager completion flows. `npx` and `bunx` do not themselves provide completion; invoke the installed binary or the package manager's supported execution form such as `npm exec` or `bun x`.

## Reference

- [Prisma ORM 7.9.0 release](https://github.com/prisma/prisma/releases/tag/7.9.0)
