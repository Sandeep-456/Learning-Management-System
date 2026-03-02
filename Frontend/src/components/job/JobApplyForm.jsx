import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function JobApplyForm({ setApplyJob, job, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    portfolio: "",
    immediateJoiner: "",
    relocate: "",
    offlineDrive: "",
    noticePeriod: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!form.resume.trim()) newErrors.resume = "Resume link is required";

    if (!form.immediateJoiner) newErrors.immediateJoiner = "Required";
    if (!form.relocate) newErrors.relocate = "Required";
    if (!form.offlineDrive) newErrors.offlineDrive = "Required";

    if (!form.noticePeriod.trim()) newErrors.noticePeriod = "Required";

    return newErrors;
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setApplyJob(null);
    }, 1800);
  };

  return (
    <motion.div
      onClick={() => setApplyJob(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="
          bg-white/90 backdrop-blur-xl
          rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          p-6 w-[95%] max-w-2xl
          max-h-[90vh] overflow-y-auto relative
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
        >
          <FaTimes />
        </button>

        {/* SUCCESS */}
        {success ?
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-emerald-600">
              Application Submitted Successfully 🎉
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              We’ll get back to you soon.
            </p>
          </div>
        : <>
            {/* HEADER */}
            <h3 className="text-lg font-bold text-slate-800">
              Apply for {job.role}
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              {job.companyName} • {job.location}
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name *"
                  value={form.name}
                  onChange={(val) => setForm({ ...form, name: val })}
                  error={errors.name}
                />

                <InputField
                  label="Email *"
                  value={form.email}
                  type="email"
                  onChange={(val) => setForm({ ...form, email: val })}
                  error={errors.email}
                />

                <InputField
                  label="Phone Number *"
                  value={form.phone}
                  type="tel"
                  onChange={(val) => setForm({ ...form, phone: val })}
                  error={errors.phone}
                />

                <InputField
                  label="Notice Period (days) *"
                  value={form.noticePeriod}
                  onChange={(val) => setForm({ ...form, noticePeriod: val })}
                  error={errors.noticePeriod}
                />
              </div>

              {/* LINKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Resume Link *"
                  placeholder="Google Drive / Cloud Link"
                  value={form.resume}
                  type="url"
                  onChange={(val) => setForm({ ...form, resume: val })}
                  error={errors.resume}
                />

                <InputField
                  label="Portfolio Link (Optional)"
                  value={form.portfolio}
                  type="url"
                  onChange={(val) => setForm({ ...form, portfolio: val })}
                />
              </div>

              {/* YES / NO QUESTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <YesNoGroup
                  label="Immediate Joiner?"
                  value={form.immediateJoiner}
                  onChange={(val) => setForm({ ...form, immediateJoiner: val })}
                  error={errors.immediateJoiner}
                />

                <YesNoGroup
                  label="Willing to Relocate?"
                  value={form.relocate}
                  onChange={(val) => setForm({ ...form, relocate: val })}
                  error={errors.relocate}
                />

                <YesNoGroup
                  label="Attend Offline Drive?"
                  value={form.offlineDrive}
                  onChange={(val) => setForm({ ...form, offlineDrive: val })}
                  error={errors.offlineDrive}
                />
              </div>

              {/* SUBMIT */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                disabled={loading}
                type="submit"
                className="
                  w-full py-3 rounded-xl text-sm font-semibold
                  bg-indigo-600 text-white
                  shadow-[0_10px_20px_rgba(79,70,229,0.4)]
                  hover:bg-indigo-700
                  disabled:opacity-60
                  transition flex justify-center
                "
              >
                {loading ?
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                : "Submit Application"}
              </motion.button>
            </form>
          </>
        }
      </motion.div>
    </motion.div>
  );
}

/* -------------------- REUSABLE COMPONENTS -------------------- */

function InputField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full rounded-xl px-4 py-2 text-sm
          bg-slate-50 border
          ${
            error ? "border-red-500" : (
              "border-slate-300 focus:border-indigo-400"
            )
          }
          focus:ring-2 focus:ring-indigo-400
        `}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function YesNoGroup({ label, value, onChange, error }) {
  return (
    <div>
      <p className="text-sm text-slate-600 mb-2">{label}</p>

      <div className="flex gap-4">
        {["yes", "no"].map((opt) => (
          <label
            key={opt}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer text-sm
              ${
                value === opt ?
                  "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700"
              }
            `}
          >
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="hidden"
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
