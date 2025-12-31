import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: number;
  role: "admin" | "user";
  roleAssignedBy: string;
};

type Props = {
  user: User;
};

const ProfilePage = ({ user }: Props) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const handleProfileSave = () => {
    console.log("Profile update payload:", profile);
  };

  const handlePasswordChange = async () => {
    if (passwords.next !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/user/${user._id}/password`,
        {
          currentPassword: passwords.current,
          newPassword: passwords.next,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      alert("Password updated successfully");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (error: any) {
      alert(error.response?.data || "Password update failed");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-zinc-900 p-6 space-y-4"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-24 w-24 rounded-full bg-yellow-500 text-black flex items-center justify-center text-3xl font-bold">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>

          <span
            className={`rounded-md px-3 py-1 text-xs font-medium ${
              user.role === "admin"
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            {user.role}
          </span>
        </div>
        <div>
          <label className="text-xs text-zinc-400">Role Assign By</label>
          <div>
            <p>{Object(user.roleAssignedBy)}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-full rounded-lg border border-red-500/40 py-2 text-red-400 hover:bg-red-500/10"
        >
          Close Account
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="lg:col-span-2 rounded-2xl border border-white/10 bg-zinc-900 p-6 space-y-6"
      >
        <div>
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Name"
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm"
            />

            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="Email"
              type="email"
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm"
            />

            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="Phone"
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm md:col-span-2"
            />
          </div>

          <button
            onClick={handleProfileSave}
            className="mt-4 rounded-lg bg-yellow-500 px-6 py-2 text-black font-semibold hover:bg-yellow-400"
          >
            Save Changes
          </button>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm md:col-span-2"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwords.next}
              onChange={(e) =>
                setPasswords({ ...passwords, next: e.target.value })
              }
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="rounded-lg bg-zinc-800 border border-white/10 px-4 py-2 text-sm"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="mt-4 rounded-lg border border-white/10 px-6 py-2 hover:bg-zinc-800"
          >
            Update Password
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
