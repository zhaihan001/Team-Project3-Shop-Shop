import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// PAGES

import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import Profile from "./components/Profile";
import UserShop from "./components/UserShop";
import CartPage from "./pages/CartPage";
import { UserProvider } from "./contexts/UserContext";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const adminLogin = {
    email: "test@test.com",
    password: "password123",
  };

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop/:id" element={<ShopPage />} />

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              <Route path="/saved" element={<Saved />} />

              <Route path="/profile" element={<Profile />} />

              <Route path="/usershop" element={<UserShop />} />

              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </div>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
