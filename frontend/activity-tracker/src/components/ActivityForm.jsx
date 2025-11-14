import { useState, useEffect } from "react";

function ActivityForm({ activity, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    duration: "",
    category: ""
  });

  useEffect(() => {
    if (activity) {
      setForm({
        name: activity.name || "",
        description: activity.description || "",
        date: activity.date || "",
        duration: activity.duration || "",
        category: activity.category || ""
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // convert duration to number
    const data = { ...form, duration: form.duration ? parseInt(form.duration) : null };
    if (activity && activity.id) data.id = activity.id;
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Ime aktivnosti" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Kategorija" required />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="Trajanje (min)" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Opis"></textarea>
      <button type="submit">Shrani</button>
      <button type="button" onClick={onCancel}>Prekliči</button>
    </form>
  );
}

export default ActivityForm;