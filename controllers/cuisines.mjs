export default function initCuisinesController(db) {
  const index = async (req, res) => {
    try {
      const cuisines = await db.Cuisine.findAll();
      console.log('all cuisines', cuisines)
      res.send(cuisines);
    }
    catch(error) {
      console.log(error);
    }
  }
  
  return {index}
}