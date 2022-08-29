/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'UsersController.login')
Route.get('/auth/user', 'UsersController.authUser').middleware('auth')
Route.post('/logout', 'UsersController.logout').middleware('auth')
Route.post('/register', 'UsersController.register')
Route.get('/users', 'UsersController.list').middleware('auth')
Route.post('/profile/update', 'UsersController.update').middleware('auth')

Route.get('/trips/search', 'TripsController.search')
Route.post('/trips/create', 'TripsController.create').middleware('auth')
Route.get('/trips/my-trips', 'TripsController.ownTrips').middleware('auth')
Route.get('/trips/find/:id', 'TripsController.find')
Route.get('/trips/:id/reservations', 'TripsController.reservations').middleware('auth')
Route.post('/trips/reserve/:id', 'TripsController.reserve').middleware('auth')
Route.post('/trips/cancel/:id', 'TripsController.changeState').middleware('auth')
Route.post('/trips/accept/:id', 'TripsController.changeState').middleware('auth')


Route.get('/reservations/my-reservations', 'ReservationsController.ownReservations').middleware('auth')
Route.put('/reservations/cancel/:id', 'ReservationsController.cancel').middleware('auth')