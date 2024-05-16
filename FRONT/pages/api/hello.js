export default async function handler(req, res){
  const url = 'http://localhost:3001/cars'
  try {
    const apiResponse = await fetch(url)
    const data = await apiResponse.json()
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500).json({error: "erreur lors du chargement"})
  }
}
