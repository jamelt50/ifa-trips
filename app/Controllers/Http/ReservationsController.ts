import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Reservation from "App/Models/Reservation";

export default class ReservationsController {
  public async ownReservations({ auth }: HttpContextContract) {
    const user = await auth.authenticate();
    const reservations = await Reservation.query()
      .where("passenger_id", user.id)
      .preload("trip", (trip) => {
        trip.preload("driver");
        trip.preload("from");
        trip.preload("to");
      });

    return reservations;
  }

  public async cancel({request, response }: HttpContextContract) {
    const id = await request.param("id");
    const reservation = await Reservation.find(id);
    if (reservation) {
      reservation.state = "canceled";
      reservation?.save();
      return reservation;
    } else {
      response.safeStatus(404);
    }
  }
}
