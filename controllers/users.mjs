import sequelizePackage from 'sequelize';
const { Op } = sequelizePackage;
import jsSHA from 'jssha';

export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const users = await db.User.findAll({
        where: {
          id: {
            [Op.ne]: Number(request.cookies.userId),
          }
        }
      });
      response.send({ users });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (req, res) => {
    console.log(req.body);
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8'});
    shaObj.update(req.body.password);
    const hashedPassword = shaObj.getHash('HEX');
    console.log('hashedPassword', hashedPassword);
    try {
      const userInfo = await db.User.findOne({
        where: {
          [Op.and]: {
            username: req.body.username,
            password: hashedPassword,
          }
        }
      })
      const userCuisines = await userInfo.getCuisines();
      console.log('user cuisines====', userCuisines);
      console.log('user info-----', userInfo);
      if (userInfo !== null) {
        res.cookie('userId', userInfo.id);
        res.send({ userInfo, userCuisines });
      } else {
        res.status(403).send('login not successsful');
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const newUser = async (req, res) => {
    console.log('request body', req.body); 
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8'});
    shaObj.update(req.body.password);
    const hashedPassword = shaObj.getHash('HEX');
    try {
      const addUser = await db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.profilePic
      })
    
      const entries = await addUser.addCuisines(req.body.cuisines);
      console.log('new user id', addUser.id);
      res.cookie(userId, addUser.id);
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

const updateUser = async (req, res) => {
  console.log(req.body);
  try {
    

    const update = await db.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      profilePic: req.body.profilePic,
      }, {
        where: {
          id: req.cookies.userId,
        },
        returning: true,
      }
    )
    console.log('updated details', update[1]);
    const user = await db.User.findOne({
      where: {
        id: req.cookies.userId,
      }
    })
    const updatedCuisines = await user.setCuisines(req.body.cuisines);
  
    res.send({update, updatedCuisines});
  }
  catch (error) {
    console.log(error);
  }
}

const singleUser = async (req, res) => {
  try {
    const userInfo = await db.User.findOne({
        where: {
        id: req.cookies.userId,
        }
      })
      const userCuisines = await userInfo.getCuisines();
      res.send({userInfo, userCuisines});
  }
  catch (error) {
    console.log(error);
  }
}

const logout = (req, res) => {

  // const user = await db.User.findOne({
  //   where: {
  //     id: Number(req.params.id)
  //   }
  // })
  res.clearCookie('userId');
  res.clearCookie('chatroomId');
  res.sendStatus(200);
}

  return {
    index, newUser, getEveryonesCuisines, login, updateUser, singleUser, logout
  };
}
