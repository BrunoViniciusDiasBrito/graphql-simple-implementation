const { authors, books } = require("../database/dummyData");
const express = require("express");
const app = express();
const consign = require("consign");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

// ** GraphQl object Type
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book wirriten by a author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Authors",
  description: "This represent a Author that written a book",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve(args) {
        const filteredBook = books.filter(book => book.authorId === args.id);
        return filteredBook;
      },
    },
  }),
});

const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "List of book",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors of the books",
      resolve: () => authors,
    },
  }),
});

// ** GraphQl Schema
const schema = new GraphQLSchema({
  query: rootQueryType,
});

// ** GraphQl Route
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

consign().include("routes").into(app);

module.exports = app;
