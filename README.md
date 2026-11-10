# Library Management System

A backend Library Management System built with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

## Project Structure

The backend application is located in the `api/` directory.

```text
library-management-system/
├── README.md
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   └── prisma/
    │       └── prisma.service.ts
    ├── .env.example
    └── package.json
```

## Technology Stack

- NestJS
- TypeScript
- Prisma ORM 7.10.1
- PostgreSQL
- Prisma PostgreSQL adapter

## Database Schema

The Prisma schema defines the following models:

- **User** – stores user information, including name, email, password and role.
- **Genre** – stores book genres.
- **Book** – stores book information and references a genre.
- **Review** – stores book reviews associated with users.

### User Roles

The `Role` enum defines two roles:

- `PATRON`
- `LIBRARIAN`

The default role for a new user is `PATRON`.

## Schema Decisions

The Book model references Genre through a `genreId` foreign key instead of embedding genre information directly inside each book record.

This relational design keeps genre information consistent and avoids duplicating genre names across multiple books. A genre can be associated with many books, while each book belongs to one genre. The relationship is enforced through a foreign key and Prisma's `@relation` attribute.

This approach also makes it easier to update genre information centrally, query books by genre, and maintain referential integrity in PostgreSQL.

## Database Setup

### 1. Install dependencies

Open a terminal in the `api/` directory:

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file using `.env.example` as a template.

Set your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Replace the example credentials with your own PostgreSQL database details.

### 3. Apply database migrations

```bash
npx prisma migrate deploy
```

### 4. Seed the database

```bash
npx tsx prisma/seed.ts
```

The seed script inserts four genres and sixteen books.

## Build the Application

```bash
npm run build
```

## Run the Application

Development mode:

```bash
npm run start:dev
```

## Prisma Service

The `PrismaService` extends `PrismaClient` and implements NestJS lifecycle hooks.

- `onModuleInit()` connects to the database.
- `onModuleDestroy()` disconnects from the database.

This provides database connection management within the NestJS application.

## Environment Variables

The `.env.example` file provides a PostgreSQL `DATABASE_URL` placeholder. Do not commit actual database credentials to the repository.

## License

This project was developed as part of a Library Management System assignment.