import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import users from "App/Models/users";
import Drive from "@ioc:Adonis/Core/Drive";

export default class UsersController {
  public async list() {
    const user = await users.all();

    return { users: user };
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const validations = await schema.create({
      name: schema.string({}),
      password: schema.string.optional({}, [rules.confirmed()]),
      surname: schema.string({}),
    });
    const data = await request.validate({ schema: validations });
    const profile_pic = request.file("profile_pic", {
      size: "2mb",
      extnames: ["jpg", "png", "jpeg"],
    });

    if (profile_pic) {
      if (!profile_pic.isValid) {
        return profile_pic.errors;
      }
      await profile_pic.moveToDisk("./");
      const fileUrl = profile_pic.fileName
        ? process.env.BACK_URL + (await Drive.getUrl(profile_pic.fileName))
        : null;
      if (fileUrl) {
        Drive.delete(user.profile_pic);
        user.profile_pic = fileUrl;
      }
    }

    if (user) {
      user.name = data.name;
      if (data.password) {
        user.surname = data.surname;
        user.password = data.password;
      }

      await user.save();
      return { user: user };
    }
    return response.status(400).send({
      error: {
        message: "User with provided credentials could not be found",
      },
    });
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
      return response.status(400).send({
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

  public async getUser({ auth, request }: HttpContextContract) {
    await auth.use("api").authenticate();
    const id = await request.param("id");
    const user = await users.find(id);
    return user;
  }
}
