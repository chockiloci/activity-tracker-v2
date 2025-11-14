import { useState, useEffect } from "react";
import "./App.css";
import ActivityCard from "./components/ActivityCard";

function App() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Hobi");
  const [categoryInput, setCategoryInput] = useState("");

  // --- FE -> BE klici ---
  const fetchActivities = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/activities");
      const data = await res.json();
      const upcoming = removePastActivities(data);
      setActivities(upcoming);
    } catch (err) {
      console.error("Napaka pri nalaganju aktivnosti:", err);
    }
  };

  const addActivityAPI = async (activity) => {
    try {
      const res = await fetch("http://localhost:8080/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });
      const saved = await res.json();
      setActivities((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Napaka pri dodajanju aktivnosti:", err);
    }
  };

  const updateActivityAPI = async (id, activity) => {
    try {
      const res = await fetch(`http://localhost:8080/api/activities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });
      const saved = await res.json();
      setActivities((prev) =>
        prev.map((a) => (a.id === saved.id ? saved : a))
      );
    } catch (err) {
      console.error("Napaka pri urejanju aktivnosti:", err);
    }
  };

  const deleteActivityAPI = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/activities/${id}`, {
        method: "DELETE",
      });
      setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Napaka pri brisanju aktivnosti:", err);
    }
  };

  // --- Odstrani pretekle aktivnosti ---
  const removePastActivities = (list) => {
    const todayStr = new Date().toISOString().split("T")[0];
    return list.filter((a) => !a.date || a.date >= todayStr);
  };

  // --- useEffect za inicialni fetch in samodejno brisanje preteklih ---
  useEffect(() => {
    fetchActivities();

    const intervalId = setInterval(() => {
      setActivities((prev) => removePastActivities(prev));
    }, 60 * 60 * 1000); // enkrat na uro preveri pretekle aktivnosti

    return () => clearInterval(intervalId);
  }, []);

  // --- Dodaj aktivnost ---
  const addActivity = (e) => {
    e.preventDefault();
    if (!name) return alert("Ime aktivnosti mora biti vnešeno!");
    if (category === "Drugo" && !categoryInput)
      return alert("Če izberete 'Drugo', vnesite svojo kategorijo!");
    if (duration && Number(duration) <= 0)
      return alert("Trajanje mora biti pozitivno število!");

    const selectedCategory = category === "Drugo" ? categoryInput : category;

    const newActivity = {
      name,
      description,
      date,
      duration: duration ? Number(duration) : null,
      category: selectedCategory,
    };

    addActivityAPI(newActivity);
    resetForm();
  };

  // --- Uredi aktivnost ---
  const editActivity = (activity) => {
    setEditingActivity(activity);
    setName(activity.name);
    setDescription(activity.description || "");
    setDate(activity.date || "");
    setDuration(activity.duration || "");
    setCategory(
      ["Hobi", "Šola", "Služba"].includes(activity.category)
        ? activity.category
        : "Drugo"
    );
    setCategoryInput(
      ["Hobi", "Šola", "Služba"].includes(activity.category)
        ? ""
        : activity.category
    );
    setShowForm(true);
  };

  const updateActivity = (e) => {
    e.preventDefault();
    const selectedCategory = category === "Drugo" ? categoryInput : category;
    const updatedActivity = {
      name,
      description,
      date,
      duration: duration ? Number(duration) : null,
      category: selectedCategory,
    };
    updateActivityAPI(editingActivity.id, updatedActivity);
    resetForm();
  };

  // --- Izbriši aktivnost ---
  const deleteActivity = (id) => {
    if (
      window.confirm("Ali res želiš izbrisati to aktivnost?")
    ) {
      deleteActivityAPI(id);
    }
  };

  // --- Reset forme ---
  const resetForm = () => {
    setEditingActivity(null);
    setName("");
    setDescription("");
    setDate("");
    setDuration("");
    setCategory("Hobi");
    setCategoryInput("");
    setShowForm(false);
  };

  // --- Urgentne aktivnosti in sortiranje ---
  const sortedActivities = [...activities].sort((a, b) => {
    const now = new Date();
    const getIsSoon = (dateStr) => {
      if (!dateStr) return false;
      const date = new Date(dateStr);
      const diff = date - now;
      const isSameDay =
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();
      return isSameDay || (diff < 1000 * 60 * 60 * 48 && diff > 0);
    };

    const isSoonA = getIsSoon(a.date);
    const isSoonB = getIsSoon(b.date);

    if (isSoonA && !isSoonB) return -1;
    if (!isSoonA && isSoonB) return 1;
    return new Date(a.date) - new Date(b.date);
  });

  // --- JSX ---
  return (
    <div className="app">
      <header className="header">
        <h1>Dnevnik aktivnosti</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Dodaj
        </button>
      </header>

      {(showForm || editingActivity) && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingActivity ? "Uredi aktivnost" : "Dodaj novo aktivnost"}</h2>
            <form onSubmit={editingActivity ? updateActivity : addActivity}>
              <input
                type="text"
                placeholder="Ime aktivnosti *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Opis (neobvezno)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="number"
                min="1"
                placeholder="Trajanje v minutah (ali pustite prazno)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Hobi">Hobi</option>
                <option value="Šola">Šola</option>
                <option value="Služba">Služba</option>
                <option value="Drugo">Drugo</option>
              </select>
              {category === "Drugo" && (
                <input
                  type="text"
                  placeholder="Vnesi svojo kategorijo"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
              )}
              <div className="form-buttons">
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Prekliči
                </button>
                <button type="submit" className="save-btn">
                  Shrani
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="activities-grid">
        {activities.length === 0 ? (
          <div className="no-activities">
            <p>Zabeležene ni nobene aktivnosti. Dodaj svojo prvo!</p>
            <p>Če bo aktivnost v naslednjih 48 urah, bo obarvana rdeče.</p>
          </div>
        ) : (
          sortedActivities.map((a) => (
            <ActivityCard
              key={a.id}
              activity={a}
              onDelete={() => deleteActivity(a.id)}
              onEdit={() => editActivity(a)}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default App;