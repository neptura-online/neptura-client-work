import { useEffect, useMemo, useState } from "react";
import { StatCard } from "../Components/Helper/StatCard";
import LeadsChart from "../Components/LeadsChart";
import RecentLeads from "../Components/RecentLeads";
import { Link, NavLink } from "react-router-dom";
import { type AdminDashBoardProps, type User } from "../types/type";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AdminProfileDropdown from "../Components/Helper/AdminProfileDropdown";
import axios from "axios";

const AdminDasBoard = ({ users, leads, loading }: AdminDashBoardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const today = new Date().toDateString();
  const oneWeekAgo = new Date(Date.now() - 7 * 86400000);

  const verify = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/verify`,
        {},
        {
          headers: {
            token: `${token}`,
          },
        }
      );
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id || users.length === 0) return;

    const foundUser = users.find((user) => user._id === id);
    if (foundUser) {
      setUser(foundUser);
    }
  }, [users]);

  const todayLeads = useMemo(
    () =>
      leads.filter((l) => new Date(l.createdAt).toDateString() === today)
        .length,
    [leads, today]
  );

  const weeklyLeads = useMemo(
    () => leads.filter((l) => new Date(l.createdAt) >= oneWeekAgo).length,
    [leads]
  );

  const topSourceToday = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      if (new Date(l.createdAt).toDateString() === today) {
        const s = l.utm_source || "Direct";
        map[s] = (map[s] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  }, [leads, today]);

  return (
    <div className="space-y-6">
      <header className="sticky top-0 z-20 bg-zinc-950/80 backdrop-blur border-b border-white/10 py-4 flex flex-col md:flex-row justify-between gap-3">
        <h2 className="hidden md:block text-2xl font-semibold font-serif">
          Welcome back, {user?.name} 👋
        </h2>
        <div className="flex md:gap-3 justify-between md:justify-start">
          {user && <AdminProfileDropdown currentUser={user} />}

          <div className="flex justify-between items-center gap-2">
            <button
              onClick={() => setMenuOpen((menuOpen) => !menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? (
                <IoMdClose className="h-8 w-8" />
              ) : (
                <FiMenu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
        <h2 className="text-2xl md:hidden font-semibold">
          Welcome back,admin 👋
        </h2>
      </header>
      {menuOpen && (
        <div className="md:hidden absolute bg-zinc-900/60 h-40 w-50 top-22 right-7 z-60 rounded-2xl p-2">
          <nav className="flex flex-col gap-2 text-sm p-1">
            <NavLink
              to="/admin"
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/leads"
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
            >
              Leads
            </NavLink>
            <NavLink
              to="/admin/export"
              className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
            >
              Export Leads
            </NavLink>
          </nav>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today Leads"
          value={todayLeads}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Weekly Leads"
          value={weeklyLeads}
          color="from-purple-500 to-indigo-600"
        />
        <StatCard
          title="Total Leads"
          value={leads.length}
          color="from-pink-500 to-rose-600"
        />
        <StatCard
          title="Top Source Today"
          value={topSourceToday}
          color="from-emerald-500 to-green-600"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeadsChart leads={leads} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 flex flex-col justify-center">
          <p className="text-sm text-zinc-400 mb-2">System Status</p>
          <p className="text-sm text-emerald-400">
            {loading ? "Loading data..." : "All systems operational"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentLeads leads={leads} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
          <p className="text-sm text-zinc-400 mb-4">Quick Actions</p>
          <Link
            to="/admin/leads"
            className="block rounded-lg bg-yellow-500 py-2 text-center text-black font-semibold hover:bg-yellow-400"
          >
            View All Leads
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDasBoard;
