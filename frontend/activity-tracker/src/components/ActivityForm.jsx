import { useState, useEffect } from "react";

// komponenta za obrazec za dodajanje ali urejanje aktivnosti
function ActivityForm({ activity, onSave, onCancel }) {
  // stanje obrazca 
  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    duration: "",
    category: ""
  });

  // useEffect za inicializacijo obrazca, če se ureja obstoječa aktivnost
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

  // funkcija za posodabljanje vrednosti polj obrazca
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // funkcija za submit obrazca
  const handleSubmit = (e) => {
    e.preventDefault();
    // pretvori duration v številko ali nastavi null
    const data = { ...form, duration: form.duration ? parseInt(form.duration) : null };
    // če urejamo obstoječo aktivnost, dodaj id
    if (activity && activity.id) data.id = activity.id;
    onSave(data); // pošlji podatke nazaj v nadrejeno komponento
  };

  // JSX obrazca
  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Ime aktivnosti"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Kategorija"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        name="duration"
        type="number"
        value={form.duration}
        onChange={handleChange}
        placeholder="Trajanje (min)"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Opis"
      ></textarea>
      <button type="submit">Shrani</button>
      <button type="button" onClick={onCancel}>Prekliči</button>
    </form>
  );
}

export default ActivityForm;