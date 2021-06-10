const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const usersList = [];

    for (let i = 0; i < 100; i += 1) {
      usersList.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'qwerty',
        profile_pic: faker.image.imageUrl(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const cuisinesList = [
      {
        name: 'Thai',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Spanish',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Malay',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Indonesian',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Chinese',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Japanese',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Mexican',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Indian',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Peranakan',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    try {
      const result = await queryInterface.bulkInsert('users', usersList);
      const result2 = await queryInterface.bulkInsert('cuisines', cuisinesList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('cuisines', null, {});
  },
};
