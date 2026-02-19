import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Helper/Loader";

interface TrackingField {
  _id: string;
  key: string;
  isActive: boolean;
}

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  token: localStorage.getItem("token") || "",
});

const defaultSamples = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "adgroupid",
];

export default function TrackingIntegration() {
  const [fields, setFields] = useState<TrackingField[]>([]);
  const [newKey, setNewKey] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFields = async () => {
    setLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/utm/tracking`,
      { headers: getAuthHeader() }
    );
    setFields(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const toggle = async (id: string, active: boolean) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/utm/tracking/toggle/${id}`,
      { isActive: !active },
      { headers: getAuthHeader() }
    );
    fetchFields();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this UTM?")) return;
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/utm/tracking/${id}`,
      { headers: getAuthHeader() }
    );
    fetchFields();
  };

  const add = async () => {
    if (!newKey.trim()) return;

    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/utm/tracking`,
      { key: newKey },
      { headers: getAuthHeader() }
    );

    setNewKey("");
    fetchFields();
  };

  const seedDefault = async () => {
    for (const key of defaultSamples) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/utm/tracking`,
          { key },
          { headers: getAuthHeader() }
        );
      } catch {}
    }
    fetchFields();
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* ADD NEW */}
      <div className="bg-zinc-900 border border-white/10 p-5 rounded-xl">
        <div className="flex justify-between mb-3">
          <h2 className="font-semibold">Allowed Tracking Params</h2>

          <button
            onClick={seedDefault}
            className="text-xs bg-zinc-700 px-3 py-1 rounded"
          >
            Load Default UTM
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="utm_device / utm_network"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded text-sm sm:min-w-sm"
          />

          <button
            onClick={add}
            className="bg-yellow-500 px-4 rounded text-black text-sm"
          >
            Add
          </button>
        </div>

        {fields.map((f) => (
          <div
            key={f._id}
            className="flex justify-between items-center bg-zinc-800 p-2 rounded mb-2"
          >
            <span className="text-sm">{f.key}</span>

            <div className="flex gap-2">
              <button
                onClick={() => toggle(f._id, f.isActive)}
                className={`text-xs px-2 py-1 rounded ${
                  f.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {f.isActive ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => remove(f._id)}
                className="text-xs bg-red-500 px-2 rounded"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
