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
import Footer from "./components/Footer";
import Saved from "./components/Saved";
import Profile from "./components/Profile";
import UserShop from "./components/UserShop";
import CartPage from "./pages/CartPage";
import { UserProvider } from "./contexts/UserContext";
import { ShopProvider } from "./contexts/ShopContext";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import SignInPage from "./pages/SignInPage";
import MyShop from "./pages/MyShop";
import AddProduct from "./components/AddProduct";
import { ProductProvider } from "./contexts/ProductContext";



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
        <ShopProvider>
          <ProductProvider>

          <div className="App">
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />

                {/* refactor to include parameters */}
                {/* route when user clicks to view a specific shop - id = id of that shop */}
                <Route path="/shop/:id" element={<ShopPage />} />

                {/* route for when user clicks on a specific product on that shop's page id = id of that shop and productId = id of that product */}
                <Route path="/shop/:id/product/:productId" element={<ProductPage />} />

                <Route path="/login" element={<SignInPage />} />

                <Route path="/saved" element={<Saved />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/usershop" element={<MyShop />} />

                <Route path="/cart" element={<CartPage />} />

                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </Router>
          </div>
          </ProductProvider>
        </ShopProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
