import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import UsercontextProvider from "./Context/Usercontext"


export const Client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include"
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={Client}>
      <UsercontextProvider>
        <App />
      </UsercontextProvider>
    </ApolloProvider>
  </StrictMode>,
)
