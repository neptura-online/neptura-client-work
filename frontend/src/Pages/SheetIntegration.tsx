import { useState } from "react";
import axios from "axios";

const allFields = [
  "time",
  "name",
  "email",
  "phone",
  "industry",
  "message",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "lpurl",
];

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  token: localStorage.getItem("token"),
});

const SheetIntegration = () => {
  const [formID, setFormID] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [fields, setFields] = useState<string[]>([]);

  const toggleField = (field: string) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-mapping`,
      {
        formID,
        spreadsheetId,
        sheetName,
        isActive,
        fields: fields.map((f) => ({ leadField: f })),
      },
      {
        headers: getAuthHeader(),
      }
    );

    alert("Mapping Saved");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif">
        Google Sheet Integration
      </h1>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-zinc-400">Form ID</label>
            <input
              value={formID}
              onChange={(e) => setFormID(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">Spreadsheet ID</label>
            <input
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400">Sheet Name</label>
            <input
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              Enable Google Sheet
            </label>
          </div>
        </div>

        <div>
          <p className="text-sm text-zinc-400 mb-2">Select Fields to Push</p>

          <div className="grid grid-cols-3 gap-2">
            {allFields.map((field) => (
              <label
                key={field}
                className="flex items-center gap-2 text-xs bg-zinc-800 px-2 py-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={fields.includes(field)}
                  onChange={() => toggleField(field)}
                />
                {field}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 rounded-lg bg-yellow-500 px-6 py-2 text-black font-semibold hover:bg-yellow-400"
        >
          Save Mapping
        </button>
      </div>
    </div>
  );
};

export default SheetIntegration;
