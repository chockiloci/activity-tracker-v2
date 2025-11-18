import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import ActivityForm from "./ActivityForm";

// osnovni URL za API klice
const BASE_URL = "http://localhost:8080/api/activities";

// komponenta za prikaz aktivnosti
function ActivityList() {
  // stanja aplikacije
  const [activities, setActivities] = useState([]); // seznam aktivnosti
  const [editingActivity, setEditingActivity] = useState(null); // aktivnost, ki jo urejamo
  const [showForm, setShowForm] = useState(false); // ali se obrazec prikazuje

  // useEffect za inicialni fetch 
  useEffect(() => {
    fetchActivities();
  }, []);

  // pridobi aktivnosti iz backend-a
  const fetchActivities = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Napaka pri pridobivanju aktivnosti:", err);
    }
  };

  // dodajanje ali urejanje aktivnosti
  const handleAddOrUpdate = async (activity) => {
    try {
      if (activity.id) {
        // uredi obstoječo aktivnost
        const res = await fetch(`${BASE_URL}/${activity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        });
        const updated = await res.json();
        setActivities(activities.map(a => a.id === updated.id ? updated : a));
      } else {
        // dodaj novo aktivnost
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        });
        const newAct = await res.json();
        setActivities([...activities, newAct]);
      }
      // zapri obrazec po shranjevanju
      setShowForm(false);
      setEditingActivity(null);
    } catch (err) {
      console.error("Napaka pri shranjevanju aktivnosti:", err);
    }
  };

  // izbriši aktivnost
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      setActivities(activities.filter(a => a.id !== id));
    } catch (err) {
      console.error("Napaka pri brisanju aktivnosti:", err);
    }
  };

  // uredi aktivnost
  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  // JSX za komponento
  return (
    <div>
      {/* gumb za dodajanje nove aktivnosti */}
      <button
        onClick={() => {
          setEditingActivity(null);
          setShowForm(true);
        }}
      >
        Dodaj novo aktivnost
      </button>

      {/* obrazec za dodajanje/urejanje aktivnosti */}
      {showForm && (
        <ActivityForm
          activity={editingActivity}
          onSave={handleAddOrUpdate}
          onCancel={() => {
            setShowForm(false);
            setEditingActivity(null);
          }}
        />
      )}

      {/* seznam aktivnosti */}
      {activities.map(act => (
        <ActivityCard
          key={act.id}
          activity={act}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default ActivityList;