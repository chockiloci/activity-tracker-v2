import { useState } from "react";

// GLOBALNO: barve kategorij
const categoryColors = {};
const availableColors = [
  "#ff7f50", "#4bbadcff", "#d83765ff", "#feb2b2ff", "#000075", "#b57d97ff",
  "#7f8282ff", "#45fcfcff", "#911eb4", "#008080", "#50454bff", "#d39cf6ff", 
  "#3cb44b", "#3c5ac5ff", "#780320ff", "#640174e2", "#eee370ff", "#f032e6",
];

// funkcija za pridobitev barve kategorije
function getCategoryColor(category) {
  if (categoryColors[category]) return categoryColors[category];
  const usedColors = Object.values(categoryColors);
  const freeColor = availableColors.find(c => !usedColors.includes(c)) || "#000000";
  categoryColors[category] = freeColor;
  return freeColor;
}

// komponenta za prikaz posamezne aktivnosti
function ActivityCard({ activity, onEdit, onDelete }) {
  const [showDescription, setShowDescription] = useState(false);

  // funkcija za izbris aktivnosti z potrditvijo
  const handleDelete = () => {
    const confirmed = window.confirm(`Ali res želiš izbrisati aktivnost "${activity.name}"?`);
    if (confirmed) onDelete(activity.id);
  };

  // preveri, če je aktivnost kmalu (danes ali v naslednjih 48 urah)
  const isSoon = (() => {
    if (!activity.date) return false;
    const now = new Date();
    const actDate = new Date(activity.date);
    const diff = actDate - now;
    const isSameDay =
      actDate.getFullYear() === now.getFullYear() &&
      actDate.getMonth() === now.getMonth() &&
      actDate.getDate() === now.getDate();
    return isSameDay || (diff < 1000 * 60 * 60 * 48 && diff > 0);
  })();

  // formatiran datum
  const formattedDate = activity.date
    ? new Date(activity.date).toLocaleDateString("sl-SI", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  // pridobi barvo kategorije
  const badgeColor = getCategoryColor(activity.category);
  
  {/* karta aktivnosti za prikaz */}
  return (
    <div className={`card ${isSoon ? "soon" : ""}`}>
      <h3>{activity.name}</h3>

      {/* barva kategorije */}
      <div className="category-line">
        <span className="badge" style={{ backgroundColor: badgeColor }}>
          {activity.category}
        </span>
      </div>

      {/* opis aktivnosti in datum */}
      {activity.date && <p><strong>Datum:</strong> {formattedDate}</p>}
      {activity.duration !== undefined && activity.duration !== null && <p><strong>Trajanje:</strong> {activity.duration} min</p>}
      {activity.description && showDescription && <p className="description">{activity.description}</p>}

      {/* gumb za pokažanje opisa aktivnosti */}
      <div className="card-buttons">
        <div className="left-btns">
          {activity.description && (
            <button onClick={() => setShowDescription(!showDescription)}>
              {showDescription ? "Skrij opis" : "Pokaži več"}
            </button>
          )}
        </div>

        {/* gumbi za urejanje in brisanje */}
        <div className="right-btns">
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(activity)}>
              Uredi
            </button>
          )}
          <button className="delete-btn" onClick={handleDelete}>
            Izbriši
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;