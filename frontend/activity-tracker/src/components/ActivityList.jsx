import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import ActivityForm from "./ActivityForm";

const BASE_URL = "http://localhost:8080/api/activities";

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Napaka pri pridobivanju aktivnosti:", err);
    }
  };

  const handleAddOrUpdate = async (activity) => {
    try {
      if (activity.id) {
        // update
        const res = await fetch(`${BASE_URL}/${activity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        });
        const updated = await res.json();
        setActivities(activities.map(a => a.id === updated.id ? updated : a));
      } else {
        // add
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(activity),
        });
        const newAct = await res.json();
        setActivities([...activities, newAct]);
      }
      setShowForm(false);
      setEditingActivity(null);
    } catch (err) {
      console.error("Napaka pri shranjevanju aktivnosti:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      setActivities(activities.filter(a => a.id !== id));
    } catch (err) {
      console.error("Napaka pri brisanju aktivnosti:", err);
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  return (
    <div>
      <button onClick={() => { setEditingActivity(null); setShowForm(true); }}>
        Dodaj novo aktivnost
      </button>

      {showForm && (
        <ActivityForm
          activity={editingActivity}
          onSave={handleAddOrUpdate}
          onCancel={() => { setShowForm(false); setEditingActivity(null); }}
        />
      )}

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