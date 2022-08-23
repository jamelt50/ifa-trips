import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Trip from "App/Models/Trip";
export default class TripsController {
  public async search({ request }: HttpContextContract) {
    const data = request.qs();
    const trips = await Trip.query()
      .where("from_city_id", data.from)
      .where("to_city_id", data.to)
      .where("date", "<", data.date);

    return { search: trips };
  }
  public async find({ request }: HttpContextContract) {
    const id = await request.param("id");
    const trip = await Trip.find(id);
    return trip;
  }
}
