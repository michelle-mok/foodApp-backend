const faker = require('faker');
const jsSHA = require("jssha");

const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8'});
shaObj.update('qwerty');
const hashedPassword = shaObj.getHash('HEX');

module.exports = {
  up: async (queryInterface) => {
    const usersList = [];

    for (let i = 0; i < 100; i += 1) {
      usersList.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
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

    const userCuisines = [
      {
        user_id: 1,
        cuisine_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        cuisine_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        cuisine_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        cuisine_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        cuisine_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        cuisine_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        cuisine_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        cuisine_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        cuisine_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        cuisine_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        cuisine_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        cuisine_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        cuisine_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        cuisine_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 6,
        cuisine_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        cuisine_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        cuisine_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        cuisine_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 7,
        cuisine_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        cuisine_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        cuisine_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 8,
        cuisine_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        cuisine_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        cuisine_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        cuisine_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 9,
        cuisine_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        cuisine_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        cuisine_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        cuisine_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 10,
        cuisine_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    try {
      const result = await queryInterface.bulkInsert('users', usersList);
      const result2 = await queryInterface.bulkInsert('cuisines', cuisinesList);
      const result3 = await queryInterface.bulkInsert ('user_cuisines', userCuisines);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_cuisines', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('cuisines', null, {});
  },
};
