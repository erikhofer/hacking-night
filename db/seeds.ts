import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 5; i++) {
    await db.team.create({
      data: {
        name: `Team ${i + 1}`,
        password: "12345",
        juiceShopUrl: `http://localhost:900${i}`,
      },
    })
  }
}

export default seed
