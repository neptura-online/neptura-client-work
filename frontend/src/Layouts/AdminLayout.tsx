import { NavLink, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { GrTableAdd } from "react-icons/gr";

type AdminRouteProps = {
  isAdmin: boolean;
};

const AdminLayout = ({ isAdmin }: AdminRouteProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition flex items-center gap-1.5 ${
      isActive
        ? "bg-zinc-800 text-white"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
    }`;

  return (
    <section className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        <aside className="hidden md:fixed md:flex md:w-[20%] h-screen p-6">
          <div className="w-full pt-4 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-sm flex flex-col">
            <div className="flex-col items-center gap-3 mb-10 px-2">
              <img src="/assets/logowhite.webp" alt="logo" className="h-20" />
              <div>
                <p className="pl-2 pt-2 text-sm text-zinc-400">Admin Panel</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2 text-sm p-1">
              <NavLink to="/admin" end className={linkClass}>
                <MdDashboard className="text-xl" /> Dashboard
              </NavLink>
              <NavLink to="/admin/leads" className={linkClass}>
                <AiFillFileAdd className="text-xl" /> Leads
              </NavLink>
              <NavLink to="/admin/partialleads" className={linkClass}>
                <GrTableAdd className="text-xl" /> Partial Leads
              </NavLink>
              <NavLink to="/admin/export" className={linkClass}>
                <TiExport className="text-xl" /> Export Leads
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin/users" className={linkClass}>
                  <FaUsers className="text-xl" /> Users
                </NavLink>
              )}
            </nav>

            <div className="mt-auto text-xs text-zinc-500 px-2 pb-2">
              © {new Date().getFullYear()} e-Marketing
            </div>
          </div>
        </aside>

        <main className="w-full md:ml-[18%] p-6">
          <div className="mx-auto max-w-300">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AdminLayout;
