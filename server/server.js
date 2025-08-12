import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from "@apollo/server/standalone"

/// local/test data - we can add an api here later
const users = [
{ id: "1", name: "Michael Sanchez", age: "31", isMarried: true},
{ id: "2", name: "Sarah Le", age: "31", isMarried: true},
{ id: "3", name: "Truffles", age: "11", isMarried: false},
{ id: "4", name: "Ginny", age: "6", isMarried: false},
];

/// where our GraphQL goes use back-tick apos 
// - GraphhQL has a specific language and it all goes in the typeDefs 
const typeDefs =  `
    type Query {
        getUsers: [User] 
        getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!) : User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`
const resolvers = {
    Query: {
        getUsers: () => {
            return users;
        }, 
        /// parent is Query above ^ will not be used but args will be used to get id
        getUserById: (parent, args) => {
            const id = args.id
            return users.find(user => user.id === id)
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const { name, age, isMarried } = args;
            const newUser = {
                //// creates user and auto adds id by 1+ and convert to a string
             id: (user.length + 1).toString(),
             name,
             age,
             isMarried
            };
            users.push(newUser);
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(server, {
    listen: {port: 4000}, 
});

console.log(`Server Running at: ${url}`);

/// Query, Mutation is like CRUD - CUD is Mutation and Read would be query
/// typeDefs, resolvers
/// typeDefs just defines the types, does not do anything with it - you need a function
/// resolvers are those functions