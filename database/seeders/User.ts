import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import users from 'App/Models/users'

export default class UserSeeder extends BaseSeeder {
public async run () {
    await users.createMany([
      {
        email: 'virk@adonisjs.com',
        password: 'secret',
        name: 'charles',
        surname: 'louaazo',
      },
      {
        email: 'romain@adonisjs.com',
        password: 'secret',
        name: 'romain',
        surname: 'ueto',
      },
      {
        email: 'vitek@adonisjs.com',
        password: 'secret',
        name: 'vitek',
        surname: 'agot',
      },
      {
        email: 'roain@adonisjs.com',
        password: 'secret',
        name: 'pierre',
        surname: 'lougo',
      }

    ])
  }
}
