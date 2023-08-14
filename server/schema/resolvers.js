const { UserList, MovieList } = require("../FakeData");

const resolvers = {
	Query: {
		users() {
			return UserList;
		},
		user: (parent, args) => {
			return UserList.find((user) => user.id === Number(args.id));
		},
		movies: () => MovieList,
		movie: (parent, args) => {
			return MovieList.find((movie) => movie.name === args.name);
		},
	},
	User: {
		favoriteMovies: (parent) => {
			
			return MovieList.filter(
				(movie) =>
					movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
			);
		},
	},
	Mutation: {
		createUser: (parent, args, context, info) => {
			let user = args.input;
			console.log("userinput",user)
			user.id = UserList.length;
			console.log(user);
			UserList.push(user);
			return user;
		},
		updateUserName: (parent, args) => {
			const id = Number(args.input.id);
			const newName = args.input.name;
			UserList.forEach((user) => {
				if (user.id === id) {
					user.name = newName;
				}

				return user;
			});
			return UserList.find((user) => user.id === id);
		},
		deleteuser: (parent, args) => {
			return UserList.filter((user) => user.id !== Number(args.input));
		},
	},
};

module.exports = { resolvers };
