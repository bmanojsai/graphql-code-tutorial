const { gql } = require("apollo-server");

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		username: String!
		age: Int!
		nationality: Nationality!
		friends: [User!]
		favoriteMovies: [Movie!]
	}

	enum Nationality {
		CANADA
		BRAZIL
		INDIA
		GERMANY
		CHILE
	}

	type Movie {
		id: ID!
		name: String!
		yearOfPublication: Int!
		isInTheaters: Boolean!
	}

	type Query {
		users: [User!]!
		user(id: ID!): User!
		movies: [Movie!]!
		movie(name: String!): Movie
	}

	input createUserInput {
		name: String!
		username: String!
		age: Int!
		nationality: Nationality = INDIA
	}

	input updateUserNameInput {
		id: ID!
		name: String!
	}

	type Mutation {
		createUser(input: createUserInput): User!
		updateUserName(input: updateUserNameInput!): User!
        deleteuser(input : ID!):[User!]
	}
`;

module.exports = { typeDefs };
