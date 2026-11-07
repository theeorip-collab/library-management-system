import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const genres = [
    "Fiction",
    "Science Fiction",
    "Mystery",
    "Fantasy",
  ];

  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const books = [
    { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542", genre: "Fiction" },
    { title: "Purple Hibiscus", author: "Chimamanda Ngozi Adichie", isbn: "9781616202415", genre: "Fiction" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", genre: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", genre: "Fiction" },

    { title: "Dune", author: "Frank Herbert", isbn: "9780441172719", genre: "Science Fiction" },
    { title: "1984", author: "George Orwell", isbn: "9780451524935", genre: "Science Fiction" },
    { title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "9781451673319", genre: "Science Fiction" },
    { title: "The Martian", author: "Andy Weir", isbn: "9780553418026", genre: "Science Fiction" },

    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", isbn: "9780307454546", genre: "Mystery" },
    { title: "Murder on the Orient Express", author: "Agatha Christie", isbn: "9780062693662", genre: "Mystery" },
    { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", isbn: "9780451532256", genre: "Mystery" },
    { title: "Gone Girl", author: "Gillian Flynn", isbn: "9780307588371", genre: "Mystery" },

    { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", genre: "Fantasy" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", isbn: "9780747532699", genre: "Fantasy" },
    { title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "9780756404741", genre: "Fantasy" },
    { title: "A Game of Thrones", author: "George R.R. Martin", isbn: "9780553593716", genre: "Fantasy" },
  ];

  for (const book of books) {
    const genre = await prisma.genre.findUnique({
      where: { name: book.genre },
    });

    if (!genre) {
      throw new Error(`Genre not found: ${book.genre}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genreId: genre.id,
      },
    });
  }

  console.log("Database seeded: 4 genres and 16 books.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });