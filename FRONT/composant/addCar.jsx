import { useState } from 'react';


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
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={marque} 
        onChange={(e) => setMarque(e.target.value)} 
        placeholder="Marque de la voiture" 
        required 
      />
      <input 
        type="text" 
        value={model} 
        onChange={(e) => setModel(e.target.value)} 
        placeholder="Modèle de la voiture" 
        required 
      />
      <input 
        type="text" 
        value={Cylindree} 
        onChange={(e) => setCylindree(e.target.value)} 
        placeholder="Cylindrée" 
        required 
      />
      <input 
        type="text" 
        value={Position_moteur} 
        onChange={(e) => setPositionMoteur(e.target.value)} 
        placeholder="Position du moteur" 
        required 
      />
      <input 
        type="text" 
        value={Architechture_moteur} 
        onChange={(e) => setArchitectureMoteur(e.target.value)} 
        placeholder="Architecture du moteur" 
        required 
      />
      <input 
        type="number" 
        value={Poid} 
        onChange={(e) => setPoid(e.target.value)} 
        placeholder="Poids" 
        required 
      />
      <button type="submit">Ajouter Voiture</button>
    </form>
  );
}
