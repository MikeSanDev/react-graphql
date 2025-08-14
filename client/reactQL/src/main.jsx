import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"; 

const client = new ApolloClient({
  ///api link to our GraphQL server
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(), /// cache to store data-cache to memory
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </StrictMode>,
)
