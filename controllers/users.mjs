import sequelizePackage from 'sequelize';
const { Op } = sequelizePackage;

export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const users = await db.User.findAll();
      response.send({ users });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (req, res) => {
    console.log(req.body);

    try {
      const userInfo = await db.User.findOne({
        where: {
          [Op.and]: {
            username: req.body.username,
            password: req.body.password
          }
        }
      })
      console.log('user info-----', userInfo);
      if (userInfo !== null) {
        res.send(userInfo);
      } else {
        res.sendStatus(404);
      }
      
    }
    catch (error) {
      console.log(error);
    }
  }

  const newUser = async (req, res) => {
    console.log('request body', req.body);
   
    try {
      const addUser = await db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
    
      const entries = await addUser.addCuisines(req.body.cuisines);
      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getEveryonesCuisines = async (req, res) => {
    console.log(req.body);

    try {
      const everyone = await db.User.findAll({
        where: {
          id: req.body.everyone,
        },
        include: [{
          model: db.Cuisine,
          attributes: ['name'],
        }]
      })

      const everyonesCuisineArray = []
      everyone.forEach((person) => person.cuisines.forEach((cuisine) => everyonesCuisineArray.push(cuisine.name)));
      console.log(everyonesCuisineArray);

      const sharedCuisines = []
      function count_duplicate(array){
        let counts = {}

        for (let i =0; i < array.length; i++) { 
            if (counts[array[i]]) {
              counts[array[i]] += 1
              } else {
              counts[array[i]] = 1
              }
            }  
            
          console.log(counts);
          for (let cuisine in counts) {
            if (counts[cuisine] === everyone.length) {
                sharedCuisines.push(cuisine);
            }
          }
        }

      count_duplicate(everyonesCuisineArray);
      console.log(sharedCuisines);
      res.send(sharedCuisines);
    }
    catch (error) {
      console.log(error);
    }
}

  return {
    index, newUser, getEveryonesCuisines, login
  };
}
