import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout.tsx";
import Register from "./pages/Register.tsx";
import SignIn from "./pages/SignIn.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
