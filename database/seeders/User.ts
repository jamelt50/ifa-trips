import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import users from 'App/Models/users'

export default class UserSeeder extends BaseSeeder {
public async run () {
    await users.createMany([
      {
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'supersecret'
      },
      {
        email: 'vitk@adonisjs.com',
        password: 'secret',
      },
      {
        email: 'roain@adonisjs.com',
        password: 'supersecret'
      }

    ])
  }
}
