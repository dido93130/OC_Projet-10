import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Définition du composant Slider
const Slider = () => {
  // Utilisation du hook personnalisé useData pour récupérer les données
  const { data } = useData();

  // Déclaration de l'état index pour suivre la position actuelle du slider
  const [index, setIndex] = useState(0);

  // Tri des données par ordre décroissant de date
const byDateDesc = data?.focus?.sort((evtB, evtA) =>
new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
) || []; // Si data ou data.focus est undefined, initialise byDateDesc à un tableau vide
  
  // Utilisation de useEffect pour mettre à jour l'index à intervalles réguliers
  useEffect(() => {
    // Création d'un intervalle qui se déclenche toutes les 5000 millisecondes
    const interval = setInterval(() => {
      // Mise à jour de l'index en vérifiant s'il est inférieur à la longueur des données
      // Si c'est le cas, on incrémente l'index, sinon on revient à zéro pour boucler
      setIndex(prevIndex => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0);
    }, 5000);
  
    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [byDateDesc.length]); // La dépendance byDateDesc.length assure que l'effet se déclenche lorsque la longueur des données change
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
           <div  className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{event.date && getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
               {byDateDesc.map((_, radioIdx) => (
                <input
                  // Modification key par _.title
                  key={`${_.title}`}
                  type="radio"
                  readOnly
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
