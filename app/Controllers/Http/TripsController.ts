import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Trip from "App/Models/Trip";
import { schema } from "@ioc:Adonis/Core/Validator";
import { DateTime } from "luxon";
import axios from "axios";
import City from "App/Models/City";
import Reservation from "App/Models/Reservation";
import { geoCity } from "App/Types/geoCity";
export default class TripsController {
  public async search({ request }: HttpContextContract) {
    const data = request.qs();

    const page = data.page ? data.page : 1;
    const trips = await Trip.query()
      .preload("driver")
      .preload("from")
      .preload("to")
      .where("from_city_id", data.from)
      .where("to_city_id", data.to)
      .where("date", ">=", data.date)
      .andWhere(
        "date",
        "<=",
        DateTime.fromSQL(data.date).plus({ day: 1 }).toString()
      )
      .where("seats", ">=", data.people)
      .paginate(page, 20);

    return trips;
  }
  public async create({ request, auth, response }: HttpContextContract) {
    const validations = await schema.create({
      from_city_id: schema.number(),
      to_city_id: schema.number(),
      date: schema.date({
        format: "yyyy-MM-dd HH:mm",
      }),
      description: schema.string(),
      seats: schema.number(),
      price: schema.number(),
    });
    const data = await request.validate({ schema: validations });
    let trip = new Trip();
    let user = await auth.authenticate();
    let from = await City.findBy("code", data.from_city_id);
    let to = await City.findBy("code", data.to_city_id);

    if (!from) {
      let response = await axios.get(
        `${process.env.GEO_API_URL}communes/${data.from_city_id}`
      );

      const responseData: geoCity = response.data;
      if (responseData) {
        from = await City.create({
          code: responseData.code,
          code_departement: responseData.codeDepartement,
          codes_postaux: JSON.stringify(responseData.codesPostaux),
          code_region: responseData.codeRegion,
          population: parseInt(responseData.population),
          name: responseData.nom,
        });
      }
    }
    if (!to) {
      let response = await axios.get(
        `${process.env.GEO_API_URL}communes/${data.to_city_id}`
      );
      const responseData: geoCity = response.data;
      if (responseData) {
        to = await City.create({
          code: responseData.code,
          code_departement: responseData.codeDepartement,
          codes_postaux: JSON.stringify(responseData.codesPostaux),
          code_region: responseData.codeRegion,
          population: parseInt(responseData.population),
          name: responseData.nom,
        });
      }
    }
    if (from && to) {
      trip.from_city_id = from.code;
      trip.to_city_id = to.code;
      trip.date = data.date;
      trip.description = data.description;
      trip.price = data.price;
      trip.seats = data.seats;
      trip.trip_time = DateTime.now();
      trip.driver_id = user.id;
      await trip.save();

      return trip;
    } else {
      response.safeStatus(404);
    }
  }
  public async find({ request }: HttpContextContract) {
    const id = await request.param("id");
    const trip = await Trip.query()
      .where("id", id)
      .preload("driver")
      .preload("from")
      .preload("to")
      .first();
    return trip;
  }
  public async ownTrips({ auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const trips = await user
      .related("trips")
      .query()
      .preload("from")
      .preload("to");
    return trips;
  }
  public async reservations({ request }: HttpContextContract) {
    const id = await request.param("id");
    const reservations = await Reservation.query()
      .preload("passenger")
      .where("trip_id", id);
    return reservations;
  }
  public async reserve({ request, auth }: HttpContextContract) {
    const id = await request.param("id");
    const user = await auth.authenticate();
    const trip = await Trip.find(id);
    if (user && trip) {
      const reservation = Reservation.create({
        state: "pending",
        trip_id: trip.id,
        passenger_id: user.id,
      });
      return reservation;
    }
  }
  public async changeState({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const id = await request.param("id");

    const reservation = await Reservation.find(id);

    if (reservation) {
      const url = request.url();
      if (url.includes("accept")) {
        reservation.state = "accepted";
      } else if (url.includes("cancel")) {
        reservation.state = "canceled";
      }
      await reservation.save();
      const trip = await Trip.query()
        .where("id", reservation?.trip_id)
        .preload("driver")
        .preload("from")
        .preload("reservation")
        .preload("to")
        .first();
      return trip;
    }
  }
}
