import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import users from "App/Models/users";

export default class UsersController {
  public async list() {
    const user = await users.all();

    return { users: user };
  }
  public async findOne(ctx:HttpContextContract) {
    // const user = await users.all();

    return { users: ctx};
  }
}
