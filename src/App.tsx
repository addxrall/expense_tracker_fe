import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Register } from "./components/Register";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import { Layout } from "./components/Layout";
import AnonymousRoute from "./utils/AnonymousRoute";
import Account from "./components/Account";
import Expenses from "./components/Expenses";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="account" element={<Account />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AnonymousRoute>
            <Register />
          </AnonymousRoute>
        }
      />
    </Routes>
  );
};

export default App;
