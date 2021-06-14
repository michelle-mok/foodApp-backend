export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const users = await db.User.findAll();
      response.send({ users });
    } catch (error) {
      console.log(error);
    }
  };

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

  return {
    index, newUser
  };
}
