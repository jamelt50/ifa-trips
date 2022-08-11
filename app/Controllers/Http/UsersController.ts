import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import users from "App/Models/users";

export default class UsersController {
  public async list() {
    const user = await users.all();

    return { users: user };
  }
  public async findOne(ctx: HttpContextContract) {
    // const user = await users.all();
    return { users: ctx };
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input("password");
    const email = await request.input("email");

    try {
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "24hours",
      });

      return token.toJSON();
    } catch {
      return response
        .status(400)
        .send({
          error: {
            message: "User with provided credentials could not be found",
          },
        });
    }
  }

  public async register({ request, response }: HttpContextContract) {
    const validations = await schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.confirmed()]),
      name: schema.string({}),
      surname: schema.string({}),
    });
    const data = await request.validate({ schema: validations });
    const user = await users.create(data);
    return response.created(user);
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout();
    return response.status(200);
  }
  public async authUser({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    return { user: auth.user };
  }
}
