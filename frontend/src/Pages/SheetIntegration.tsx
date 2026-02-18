import { useEffect, useState } from "react";
import axios from "axios";

interface Field {
  leadField: string;
  order: number;
}

interface Mapping {
  _id: string;
  formID: string | null;
  page: string | null;
  spreadsheetId: string;
  sheetName: string;
  isActive: boolean;
  fields: Field[];
}

const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <div
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
      checked ? "bg-green-500" : "bg-zinc-600"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
        checked ? "translate-x-5" : ""
      }`}
    />
  </div>
);

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
  token: localStorage.getItem("token") || "",
});

const SheetIntegration = () => {
  const [formID, setFormID] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState("");

  const [fields, setFields] = useState<Field[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings = async () => {
    const res = await axios.get<Mapping[]>(
      `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-mappings`,
      { headers: getAuthHeader() }
    );
    setMappings(res.data);
  };

  const toggleField = (field: string) => {
    setFields((prev) => {
      const exists = prev.find((f) => f.leadField === field);
      let updated: Field[];
      if (exists) {
        updated = prev.filter((f) => f.leadField !== field);
      } else {
        updated = [...prev, { leadField: field, order: prev.length }];
      }
      return updated.map((f, i) => ({ ...f, order: i }));
    });
  };

  const isFieldChecked = (field: string) =>
    fields.some((f) => f.leadField === field);

  const handleSubmit = async () => {
    if (!spreadsheetId.trim() || !sheetName.trim()) {
      return;
    }

    const payload = {
      formID: formID || null,
      page: page || null,
      spreadsheetId,
      sheetName,
      isActive,
      fields,
    };

    if (editingId) {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-mapping/${editingId}`,
        payload,
        { headers: getAuthHeader() }
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-mapping`,
        payload,
        { headers: getAuthHeader() }
      );
    }

    resetForm();
    fetchMappings();
  };

  const resetForm = () => {
    setFormID("");
    setPage("");
    setSpreadsheetId("");
    setSheetName("");
    setIsActive(false);
    setFields([]);
    setEditingId(null);
  };

  const editMapping = (m: Mapping) => {
    setEditingId(m._id);
    setFormID(m.formID || "");
    setPage(m.page || "");
    setSpreadsheetId(m.spreadsheetId);
    setSheetName(m.sheetName);
    setIsActive(m.isActive);
    setFields([...m.fields].sort((a, b) => a.order - b.order));
  };

  const toggleMapping = async (id: string, active: boolean) => {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-toggle/${id}`,
      { isActive: !active },
      { headers: getAuthHeader() }
    );
    fetchMappings();
  };

  const deleteMapping = async (id: string) => {
    if (!confirm("Delete this mapping?")) return;
    setLoadingDelete(id);
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/admin/sheet-mapping/${id}`,
      { headers: getAuthHeader() }
    );
    setLoadingDelete(null);
    fetchMappings();
  };

  const getFieldOrder = (field: string) => {
    const f = fields.find((f) => f.leadField === field);
    return f ? f.order + 1 : null;
  };

  return (
    <div className="space-y-6">
      {/* FORM */}
      <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl space-y-4">
        <div className="flex justify-between">
          <h2 className="font-semibold">
            {editingId ? "Edit Mapping" : "Create Mapping"}
          </h2>

          <ToggleSwitch
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            placeholder="Form ID"
            value={formID}
            onChange={(e) => setFormID(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded"
          />

          <input
            placeholder="/page-name"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded"
          />

          <input
            placeholder="Spreadsheet ID *"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded"
          />

          <input
            placeholder="Sheet Name *"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            className="bg-zinc-800 px-3 py-2 rounded"
          />
        </div>

        {/* FIELD SELECT */}
        <div className="flex flex-wrap gap-2">
          {allFields.map((field) => {
            const order = getFieldOrder(field);
            const selected = isFieldChecked(field);

            return (
              <button
                key={field}
                onClick={() => toggleField(field)}
                className={`relative text-xs px-4 py-2 rounded-lg transition
        ${
          selected
            ? "bg-yellow-500 text-black"
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
        }`}
              >
                {field}

                {order && (
                  <span
                    className="
            absolute -top-2 -right-2
            bg-red-500 text-white
            text-[10px] font-bold
            w-5 h-5
            flex items-center justify-center
            rounded-full shadow
          "
                  >
                    {order}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            disabled={!spreadsheetId || !sheetName}
            onClick={handleSubmit}
            className="bg-yellow-500 px-5 py-2 rounded text-black disabled:opacity-40"
          >
            {editingId ? "Update" : "Save"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-zinc-700 px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {mappings.map((m) => (
          <div
            key={m._id}
            className="bg-zinc-800/70 border border-white/10 p-4 rounded-xl"
          >
            <div className="flex justify-between">
              <h3>{m.sheetName}</h3>
              <ToggleSwitch
                checked={m.isActive}
                onChange={() => toggleMapping(m._id, m.isActive)}
              />
            </div>

            <p className="text-xs mt-1">
              {m.formID || "All Forms"} • {m.page || "All Pages"}
            </p>

            <p className="text-yellow-400 text-xs">{m.fields.length} Fields</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => editMapping(m)}
                className="text-xs bg-yellow-500 px-3 py-1 rounded text-black"
              >
                Edit
              </button>

              <button
                disabled={loadingDelete === m._id}
                onClick={() => deleteMapping(m._id)}
                className="text-xs bg-red-500 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SheetIntegration;
