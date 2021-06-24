import sequelizePackage from 'sequelize';
const { Op } = sequelizePackage;

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
  
  const suggestedPeople = async (req, res) => {
  console.log ('user id', req.cookies.userId);

  try {
    const user = await db.User.findOne({
      where: {
        id: Number(req.cookies.userId),
      },
      include: [{
        model: db.Cuisine,
      }]
    })
    console.log('user', user);

    const cuisineIds = [];
    user.cuisines.forEach((cuisine) => {
      if (cuisineIds.length < 2) {
      cuisineIds.push(cuisine.id)
      }
    })

    console.log('cuisine ids', cuisineIds);
    const suggestedUsers = await db.User.findAll({
      where: {
        id: {
          [Op.ne]: req.cookies.userId,
        }
      },
      include: [{
        model: db.Cuisine,
        where: { 
          id: {
            [Op.or]: cuisineIds
          }
      }
      }]
    })
    console.log('suggested users', suggestedUsers);
    res.send(suggestedUsers);
  }
  catch (error) {
    console.log(error);
  }
}

return {index, suggestedPeople};
}