import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
	query GetAllUsers {
		users {
			id
			name
			age
			username
			nationality
			friends {
				name
				nationality
			}
		}
	}
`;

const QUERY_ALL_MOVIES = gql`
	query GetAllMovies {
		movies {
			id
			isInTheaters
			name
			yearOfPublication
		}
	}
`;

const GET_MOVIE_BY_NAME = gql`
	query GetMovieByName($name: String!) {
		movie(name: $name) {
			id
			isInTheaters
			name
			yearOfPublication
		}
	}
`;

const CREATE_USER = gql`
	mutation CreateUser($createUserInput: createUserInput) {
		createUser(input: $createUserInput) {
			id
			name
			nationality
			age
		}
	}
`;

export default function DisplayData() {
	//search movie state
	const [movieSearched, setMovieSearched] = useState("");

	//create user state
	const [Name, setName] = useState("");
	const [Username, setUsername] = useState("");
	const [Age, setAge] = useState();
	const [Nationality, setNationality] = useState("");

	//useQuery API calls -> will be called on page loads/component renders.
	const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);

	const {
		data: MovieData,
		loading: MovieLoading,
		error: MovieError,
	} = useQuery(QUERY_ALL_MOVIES);

	//useLazyQuery API calls -> used to trigger a call based on event.
	const [fetchMovie, { data: MovieSearchData, error: MovieSearchError },]=
		useLazyQuery(GET_MOVIE_BY_NAME);

	//mutation API calls -> for mutation calls.
	const [createuser, { data: NewUserData, error: CreateUserError }] =
		useMutation(CREATE_USER);

	if (loading || MovieLoading) return <div>Data is Loading!</div>;

	if (error || MovieError) alert("error", error.message, MovieError.message);

	return (
		<div>
			<div  style={{border : "1px solid black", margin : "10px", padding : "10px"}}>
			<h1>Get Movie by Name</h1>
			<div>
				<input
					type="text"
					placeholder="Interstellar..."
					onChange={(event) => setMovieSearched(event.target.value)}
					value={movieSearched}
				/>
				<button
					onClick={() => fetchMovie({ variables: { name: movieSearched } })}
				>
					Fetch Data
				</button>
				<div></div>
			</div>
			{MovieSearchError && (
				<div>
					There is an error while searching for movie. {MovieSearchError}
				</div>
			)}
			{MovieSearchData?.movie && (
				<>
					<h3>{movieSearched} details:</h3>
					<div>
						<p>Name : {MovieSearchData.movie.name}</p>
						<p>
							isInTheaters :{" "}
							{MovieSearchData.movie.isInTheaters ? "true" : "false"}
						</p>
						<p>yearOfPublication : {MovieSearchData.movie.yearOfPublication}</p>
					</div>
				</>
			)}
			</div>

			<div style={{border : "1px solid black", margin : "10px", padding : "10px"}}>
				<h1>Create a User</h1>
				<input
					type="text"
					placeholder="Enter Name..."
					onChange={(event) => setName(event.target.value)}
					value={Name}
				/>
				<input
					type="text"
					placeholder="Enter username..."
					onChange={(event) => setUsername(event.target.value)}
					value={Username}
				/>
				<input
					type="text"
					placeholder="Enter Age..."
					onChange={(event) => setAge(Number(event.target.value))}
					value={Age}
				/>
				<input
					type="text"
					placeholder="Enter Nationality..."
					onChange={(event) => setNationality(event.target.value.toUpperCase())}
					value={Nationality}
				/>
				<button
					onClick={() => {
						createuser({
							variables: {
								createUserInput: {
									name: Name,
									username: Username,
									age: Age,
									nationality: Nationality,
								},
							},
						});
						refetch();
					}}
				>
					Create User
				</button>
			</div>

			{data && (
				<div style={{ border: "1px solid black", margin: "10px" }}>
					<h1>List of Users</h1>
					<div style={{ margin: "10px", height: 400, overflow: "scroll" }}>
						{data.users.map((user) => {
							return (
								<div>
									<p>id : {user.id}</p>
									<p>Username : {user.username}</p>
									<p>Age : {user.age}</p>
									<p>Nationality : {user.nationality}</p>
								</div>
							);
						})}
					</div>
				</div>
			)}

			{MovieData && (
				<div style={{ border: "1px solid black", margin: "10px" }}>
					<h1>List of Movies</h1>
					<div style={{ margin: "10px", height: 400, overflow: "scroll" }}>
						{MovieData.movies.map((movie) => {
							return (
								<div>
									<p>Name : {movie.name}</p>
									<p>isInTheaters : {movie.isInTheaters ? "true" : "false"}</p>
									<p>yearOfPublication : {movie.yearOfPublication}</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
