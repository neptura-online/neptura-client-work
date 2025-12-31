import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LeadDetails from "./Pages/LeadDetails";
import { useEffect, useState } from "react";
import type { Lead, User } from "./types/type";
import AdminProtectedRoute from "./Components/Helper/AdminProtectedRoute";
import AdminLogin from "./Pages/AdminLogin";
import LeadDashboard from "./Pages/LeadDashBoard";
import AdminDasBoard from "./Pages/AdminDasBoard";
import AdminLayout from "./Layouts/AdminLayout";
import ExportLeads from "./Pages/ExportLeads";
import axios from "axios";
import UsersDashboard from "./Pages/UsersDashboard";
import ProfilePage from "./Pages/ProfilePage";
import PartialLeadDashboard from "./Pages/PartialLeadDashBoard";

type CreateUserPayload = {
  name: string;
  email: string;
  phone: number;
  password: string;
  role: "admin" | "user" | "owner";
};

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
});

const App = () => {
  const [partialLeads, setPartialLeads] = useState<Lead[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const combinedArray = [...leads, ...partialLeads];
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        headers: getAuthHeader(),
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/lead`, {
        headers: getAuthHeader(),
      });
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/lead/${id}`, {
        headers: getAuthHeader(),
      });

      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      alert("Failed to delete lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartialData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/partiallead`,
        {
          headers: getAuthHeader(),
        }
      );
      setPartialLeads(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePartial = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/partiallead/${id}`,
        {
          headers: getAuthHeader(),
        }
      );

      setPartialLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      alert("Failed to delete lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const userDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
        headers: getAuthHeader(),
      });

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      alert("Failed to delete lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async (data: CreateUserPayload) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        data,
        { headers: getAuthHeader() }
      );

      setUsers((prev) => [res.data.user, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, role: "admin" | "user") => {
    try {
      setLoading(true);

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/${id}/role`,
        { role },
        { headers: getAuthHeader() }
      );

      setUsers((prev) => prev.map((u) => (u._id === id ? res.data.user : u)));
    } catch (error) {
      console.error(error);
      alert("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id || users.length === 0) return;

    const foundUser = users.find((user) => user._id === id);
    if (foundUser) {
      setUser(foundUser);
    }

    if (foundUser?.role === "admin" || foundUser?.role === "owner") {
      setIsAdmin(true);
    }
  }, [users]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/admin/login")
      return;

    fetchData();
    fetchUserData();
    fetchPartialData();
  }, [location.pathname]);

  return (
    <div className=" bg-zinc-950 max-w-screen overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<LandingPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout isAdmin={isAdmin} />
              </AdminProtectedRoute>
            }
          >
            <Route
              index
              element={
                <AdminDasBoard users={users} loading={loading} leads={leads} />
              }
            />
            <Route
              path="leads"
              element={
                <LeadDashboard
                  isAdmin={isAdmin}
                  loading={loading}
                  leads={leads}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="partialleads"
              element={
                <PartialLeadDashboard
                  isAdmin={isAdmin}
                  loading={loading}
                  leads={partialLeads}
                  handleDelete={handleDeletePartial}
                />
              }
            />

            <Route
              path="export"
              element={<ExportLeads leads={combinedArray} />}
            />
            {isAdmin && (
              <Route
                path="users"
                element={
                  <UsersDashboard
                    users={users}
                    loading={loading}
                    handleDelete={userDelete}
                    handleCreate={handleCreate}
                    handleRoleChange={handleRoleChange}
                  />
                }
              />
            )}

            <Route
              path="lead/:id"
              element={<LeadDetails leads={combinedArray} />}
            />
            <Route
              path="profile"
              element={user && <ProfilePage user={user} />}
            />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
