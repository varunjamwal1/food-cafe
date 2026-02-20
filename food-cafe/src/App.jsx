import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import FullscreenLoader from "./componets/Loader/FullscreenLoader";
import useLoadData from "./hooks/useLoadData";
import { Home, Auth, Orders, Table, Menu, Items,Dashboard } from "./pages";
import Header from "./componets/Header";


const Layout = () => {
  const location = useLocation();
  const loading = useLoadData(); // 🔹 get loader state
  const hideHeaderRoutes = ["/auth"];
  const token = localStorage.getItem("token");

  // 🔹 Show fullscreen loader while fetching user data
  if (loading) return <FullscreenLoader />;

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={token ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute token={token}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute token={token}>
              <Table />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute token={token}>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute token={token}>
              <Items />
            </ProtectedRoute>
          }
        />
           <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
            <Dashboard/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
};

function ProtectedRoute({ children, token }) {
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
