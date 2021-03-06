'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//calculate the difference between two dates (days, hours, min, sec)
function dateDiff(date1, date2){
    var diff = {}
    var tmp = date2 - date1;
    tmp = Math.floor(tmp/1000);
    diff.sec = tmp % 60;
    tmp = Math.floor((tmp-diff.sec)/60);
    diff.min = tmp % 60;
    tmp = Math.floor((tmp-diff.min)/60);
    diff.hour = tmp % 24;
    tmp = Math.floor((tmp-diff.hour)/24);
    diff.day = tmp;
    return diff;
}
//Calculate the duration of a rental
function Duration(pickupDate, returnDate) {
var date1 = Date.parse(pickupDate);
var date2 = Date.parse(returnDate);
var result = dateDiff(date1,date2);
return result.day + 1;
}

//Calculate the price for a duration
function DurationPrice(days, carId) {
var pricePerDay=0;
for(var i=0; i<cars.length; i++){
    if(carId == cars[i].id){
        if(days == 1){
        pricePerDay = cars[i].pricePerDay
        }
        else if(days > 1 && days <= 4){
        pricePerDay = cars[i].pricePerDay * 90/100;
        }
        else if(days > 4 && days < 10){
        pricePerDay = cars[i].pricePerDay * 70/100;
        }
        else{
        pricePerDay = cars[i].pricePerDay * 50/100;
        }
    }
}
var result = days * pricePerDay;
return result;
}

//Calculate the price for a distance
function DistancePrice(distance, carId) {
var pricePerKm=0;
for(var i=0; i<cars.length; i++){
    if(carId == cars[i].id){
    pricePerKm = cars[i].pricePerKm;
    }
}
var result = distance * pricePerKm;
return result;
}

//Calculate the final price for all the rentals
function Price() {
for(var i=0; i<rentals.length; i++) {
    rentals[i].price = DurationPrice(Duration(rentals[i].pickupDate, rentals[i].returnDate),rentals[i].carId) + DistancePrice(rentals[i].distance,rentals[i].carId);
    }
}

//Calculate the commissions
function Commission() {
var comm;
for(var i=0; i<rentals.length; i++) {
    comm = rentals[i].price * 30/100;
    rentals[i].commission.insurance = comm * 50/100;
    rentals[i].commission.assistance = Duration(rentals[i].pickupDate, rentals[i].returnDate) * 1;
    rentals[i].commission.drivy = comm - rentals[i].commission.insurance - rentals[i].commission.assistance;
    }
}

//Calculate the Deductible
function Deductible() {
for(var i=0; i<rentals.length; i++) {
    if(rentals[i].options.deductibleReduction == true){
        rentals[i].price = rentals[i].price + 4 * Duration(rentals[i].pickupDate, rentals[i].returnDate);
        }
    }
}

//Pay each actor for one rental and debit the driver
function Pay(rental) {
var IdRental = rental.id;
for(var i=0; i<actors.length; i++) {
    if(IdRental == actors[i].rentalId){
        actors[i].payment[0].amount = rental.price;
        actors[i].payment[1].amount = rental.price * 70/100;
        actors[i].payment[2].amount = rental.commission.insurance;
        actors[i].payment[3].amount = rental.commission.assistance;
        actors[i].payment[4].amount = rental.commission.drivy;
        if(rentals[i].options.deductibleReduction == true){
            actors[i].payment[4].amount += 4 * Duration(rentals[i].pickupDate, rentals[i].returnDate);
            }
        }
    }
}
//Pay each actor for all rentals
function PayActors() {
for(var i=0; i<rentals.length; i++) {
    Pay(rentals[i]);
    }
}

Price(); //Call the function Price
Commission(); //Call the function Commission
Deductible(); //Call the function Deductible
PayActors(); //Call the function PayActor

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
