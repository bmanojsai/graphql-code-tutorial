const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => {
		return { req };
	},
});

server
	.listen(4000)
	.then(({ url }) =>
		console.log(
			` \n( ( ( ( ( ( ( ( o ) ) ) ) ) ) ) )\n \nApollo GraphQL Server started at 4000 :) \nYou can access it at ${url}`
		)
	);
