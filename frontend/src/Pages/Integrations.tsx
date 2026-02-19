import { useNavigate } from "react-router-dom";

const Integrations = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif">Integrations</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Google Sheets</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Send Leads Automatically to Google Sheets
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/integrations/google-sheet")}
            className="rounded-lg bg-yellow-500 px-5 py-2 text-black font-semibold hover:bg-yellow-400"
          >
            Configure
          </button>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Tracking UTM</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Control which UTM parameters are allowed
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/integrations/tracking")}
            className="rounded-lg bg-yellow-500 px-5 py-2 text-black font-semibold"
          >
            Configure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
