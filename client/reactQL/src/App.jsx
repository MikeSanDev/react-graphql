import './App.css'
import { useQuery, gql, useMutation } from '@apollo/client';

// Define GraphQL query for getting all users
// gql template literal parses the query into a format Apollo understands
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

// Define GraphQL query for getting a user by ID (with a variable)
const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age 
      isMarried
    }
  }
`;

// This GraphQL mutation creates a new user with dynamic input variables and returns the user's name.
const CREATE_USER = gql`
 mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
     createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;



function App() {
  // "Holy trinity" for GET_USERS query:
  // data → actual returned data
  // error → holds error info if the request fails
  // loading → boolean while waiting for data
  const { 
    data: getUsersData, 
    error: getUsersError, 
    loading: getUsersLoading,
  } = useQuery(GET_USERS);

  // Same thing but for GET_USER_BY_ID, passing variables into the query
  const { 
    data: getUserByIdData, 
    error: getUserByIdError, 
    loading: getUserByIdLoading, 
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "1" }, // sets the $id in the query above
  });

  const [createUser] = useMutation(CREATE_USER)

  // Handle loading state for all users
  if (getUsersLoading) return <p> Data Loading..</p>;

  // Handle error state for all users
  if (getUsersError) return <p>Error: {getUsersError.message}</p>
  
  const handleCreateUser = async () => {
    createUser()
  };
  
  return (
    <>

  <div>
    <input placeholder='Name...' />
    <input placeholder='Age...' type='number'/>
    <input placeholder='Boolean...' type='number' />
    <button onClick={handleCreateUser}> Create User </button>
  </div>
      <h1>Users</h1>
      <div>
        {/* Conditional rendering for single user query */}
        {getUserByIdLoading ? (
          <p>Loading user...</p>
        ) : getUserByIdError ? (
          <p>Error: {getUserByIdError.message}</p>
        ) : (
          <>
            <h1>User Details:</h1>
            {/* Safely access fields from the returned data */}
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
          </>
        )}
      </div>

      <div>
        {/* This section currently won’t work — getUserByIdData is an object,
            so you need to access .getUserById.name, not .name directly */}
        <h1>Chosen User:</h1>
        {getUserByIdData.name}
      </div>

      <div>
        {/* Loop through the array of users from getUsersData */}
        {getUsersData.getUsers.map((user) => (
          <div key={user.id}> {/* key is important for React lists */}
            <p> Name: {user.name} </p>
            <p> Age: {user.age} </p>
            <p> Is this user married?: {user.isMarried ? "Yes" : "No"} </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App