const data = {
  authors: [
    { id: "1", name: "Akash", bookIds: ["101", "102"] },
    { id: "2", name: "Suhas", bookIds: ["103"] },
  ],
  books: [
    { id: "101", title: "Book 1", publishedYear: 2024, authorId: "1" },
    { id: "102", title: "Book 2", publishedYear: 2023, authorId: "1" },
    { id: "103", title: "Book 3", publishedYear: 2022, authorId: "2" },
  ],
};

export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      //   console.log(parent);
      return data.authors.find((data) => data.id === parent.authorId);
    },
  },
  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter((d) => parent.bookIds.includes(d.id));
    },
  },
  Query: {
    authors: (parent, args, context, info) => {
      return data.authors;
    },
    books: (parent, args, context, info) => {
      return data.books;
    },
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      const newBook = { ...args, id: data.books.length + 1 };
      data.books.push(newBook);
      return newBook;
    },
  },
};
