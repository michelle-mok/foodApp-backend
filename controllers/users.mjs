export default function initUsersController(db) {
  const index = async (request, response) => {
    try {
      const users = await db.User.findAll();
      response.send({ users });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
