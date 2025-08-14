
import './App.css'
// import {useQuery, useMutation} from '@apollo/client';

const GET_USERS = `
  query getUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

function App() {

  return (
    <>
      <h1>Users</h1>
      <div></div>
    </>
  )
}

export default App
