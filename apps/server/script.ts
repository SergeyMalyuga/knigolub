import { prisma } from "./lib/prisma";

async function main() {
  const books = await prisma.book.findMany();
  console.log(books);
}

main().then(async () => await prisma.$disconnect());
