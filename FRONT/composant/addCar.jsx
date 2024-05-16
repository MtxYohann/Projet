import { useState } from 'react';
import styles from "@/styles/Home.module.css";


export default function AddCarForm({ onCarAdded }) {
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [Cylindree, setCylindree] = useState('');
  const [Position_moteur, setPositionMoteur] = useState('');
  const [Architechture_moteur, setArchitectureMoteur] = useState('');
  const [Poid, setPoid] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addcars', {
      method: 'POST',
      
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ marque, model, Cylindree, Position_moteur, Architechture_moteur, Poid }),
    });

    if (response.ok) {
      const newCar = await response.json();
      onCarAdded(newCar);
      setMarque('');
      setModel('');
      setCylindree('');
      setPositionMoteur('');
      setArchitectureMoteur('');
      setPoid('');
    } else {
      console.error('Failed to add car');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.add}>
      <label>Marque de la voiture :</label><br/>
      <input 
        type="text" 
        value={marque} 
        onChange={(e) => setMarque(e.target.value)} 
        placeholder="BMW, Audi ..." 
        required 
      /><br/>
      <label>Modèle de la voiture :</label><br/>
      <input 
        type="text" 
        value={model} 
        onChange={(e) => setModel(e.target.value)} 
        placeholder="RS3, e46, c4 ..." 
        required 
      /><br/>
      <label>Cylindrée :</label><br/>
      <input 
        type="text" 
        value={Cylindree} 
        onChange={(e) => setCylindree(e.target.value)} 
        placeholder="Cylindrée" 
        required 
      /><br/>
      <label>Position du moteur :</label><br/>
      <input 
        type="text" 
        value={Position_moteur} 
        onChange={(e) => setPositionMoteur(e.target.value)} 
        placeholder="avant, arrière" 
        required 
      /><br/>
      <label>architecture du moteur :</label><br/>
      <input 
        type="text" 
        value={Architechture_moteur} 
        onChange={(e) => setArchitectureMoteur(e.target.value)} 
        placeholder="Architecture du moteur" 
        required 
      /><br/>
      <label>Poids :</label><br/>
      <input 
        type="number" 
        value={Poid} 
        onChange={(e) => setPoid(e.target.value)} 
        placeholder="1500" 
        required 
      /><br/>
      <button type="submit">Ajouter Voiture</button>
    </form>
  );
}
