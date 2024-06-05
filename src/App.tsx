import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Register } from "./components/Register";
import Main from "./components/Main";
import Dashboard from "./components/Dashboard";
import { Layout } from "./components/Layout";
import AnonymousRoute from "./utils/AnonymousRoute";
import Account from "./components/Account";
import { useGetCurrentUser } from "./api/queries";

const App = () => {
  const { data } = useGetCurrentUser();
  const userId = data?.currentUser.userId;

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
                <Route path="expenses" element={<div>xxxxx</div>} />
                <Route path="account" element={<Account userId={userId} />} />
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
