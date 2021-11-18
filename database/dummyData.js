const authors = [
  { id: 1, name: "J. R. Rowling" },
  { id: 2, name: "Charles Duhig" },
  { id: 3, name: "Tompakow" },
];

const books = [
  { id: 1, name: "O Poder do habito", authorId: 2 },
  { id: 2, name: "Harry Potter", authorId: 1 },
  { id: 3, name: "O Corpo Fala", authorId: 3 },
  { id: 4, name: "Lie to me", authorId: 3 },
  { id: 5, name: "me engana que eu te esgano", authorId: 3 },
];

module.exports = { authors, books };
