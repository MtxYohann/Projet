

export default async function handler(req, res) {
    const url = 'http://localhost:3001/cars';
    
    if (req.method === 'POST') {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
  
        if (response.ok) {
          const newCar = await response.json();
          res.status(201).json(newCar);
        } else {
          res.status(response.status).json({ error: 'Failed to add car' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error adding car' });
      }
    } else {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  }
  