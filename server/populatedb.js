#! /usr/bin/env node

var async = require('async')
var Brand = require('./models/brand')
var Food = require('./models/food')
var FoodInstance = require('./models/foodinstance')
var Leash = require('./models/leash')
var LeashInstance = require('./models/leashinstance')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_VETINVENTORY, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var brand = [];
var food = [];
var foodinstances = [];
var leash = [];
var leashinstances = [];

function brandCreate(name, callback){
	branddetail = {
		name : name
	}

	var myBrand = new Brand(branddetail);

	myBrand.save(function(err){
		if(err){
			callback(err, null);
			return;
		}
		console.log('New Brand: ' + myBrand);
		brand.push(myBrand);
		callback(null, myBrand);
	});
}

function foodCreate(type, weigth, price_vet, price_public, brand, name, callback){
	fooddetail = {
		type: type,
		weigth: weigth,
		price_vet: price_vet,
		price_public: price_public,
		brand: brand,
		name: name
	}

	var myFood = new Food(fooddetail);

	myFood.save(function(err){
		if(err){
			callback(err, null);
			return;
		}

		console.log('New Food: ' + myFood);
		food.push(myFood);
		callback(null, myFood);
	});
}

function foodInstanceCreate(food, receive_date, expiration_date, callback){
	foodinstancedetail = {
		food: food,
		receive_date: receive_date,
		expiration_date: expiration_date
	}

	var myFoodinstance = new FoodInstance(foodinstancedetail);

	myFoodinstance.save(function(err){
		if(err){
			console.log('ERROR CREATING FoodInstance: ' + myFoodinstance);
			callback(err, null);
			return;
		}

		console.log('New FoodInstance: ' + myFoodinstance);
		foodinstances.push(myFoodinstance);
		callback(null, food);
	});
}

function leashCreate(material, price_vet, price_public, brand, name, callback){
	leashdetail = {
		material: material,
		price_vet: price_vet,
		price_public: price_public,
		brand: brand,
		name: name
	}

	var myLeash = new Leash(leashdetail);

	myLeash.save(function(err){
		if(err){
			callback(err, null);
			return;
		}

		console.log('New Leash: ' + myLeash);
		leash.push(myLeash);
		callback(null, myLeash);
	});
}

function leashInstanceCreate(leash, receive_date, callback){
	leashinstancedetail = {
		leash: leash,
		receive_date: receive_date
	}

	var myLeashinstance = new LeashInstance(leashinstancedetail);

	myLeashinstance.save(function(err){
		if(err){
			console.log('ERROR CREATING LeashInstance: ' + myLeashinstance);
			callback(err, null);
			return;
		}

		console.log('New LeashInstance: ' + myLeashinstance);
		leashinstances.push(myLeashinstance);
		callback(null, leash);
	});
}

function createBrands(callback) {
	async.series([
		function(callback) {
			brandCreate('Nupec', callback);
		},
		function(callback) {
			brandCreate('Royal Canin', callback);
		},
		function(callback) {
			brandCreate('Logical Leather', callback);
		}
	], callback);
}

function createFood(callback){
	async.parallel([
		function(){
			foodCreate('Kibbles', 2, 168, 247, brand[0], 'Cachorro', callback);
		},
		function(callback){
			foodCreate('Kibbles', 0.91, 194.25, 259, brand[1], 'Mini Starter Mother and Baby', callback);
		}
	], callback);
}

function createFoodInstances(callback){
	async.parallel([
		function(callback) {
			foodInstanceCreate(food[0], '2020-02-14', '2021-02-14', callback)
		},
		function(callback) {
			foodInstanceCreate(food[1], '2020-02-14', '2021-02-14', callback)
		}
	], callback);
}

function createLeash(callback){
	async.parallel([
		function(){
			leashCreate('Leather', 80, 120, brand[2], 'Correa de cuero', callback);
		},
		function(callback){
			leashCreate('Leather', 85.50, 135, brand[2], 'Correa de cuero reforzada', callback);
		}
	], callback);
}

function createLeashInstances(callback){
	async.parallel([
		function(callback) {
			leashInstanceCreate(leash[0], '2020-02-14', callback)
		},
		function(callback) {
			leashInstanceCreate(leash[1], '2020-02-14', callback)
		}
	], callback);
}

async.series([
	createBrands,
	createFood,
	createLeash,
	createFoodInstances,
	createLeashInstances
], function(err, results){
	if (err) {
		console.log('FINAL ERR: ' + err);
	}
	else {
		console.log('FoodInstances: ' + foodinstances);
		console.log('LeashInstances: ' + leashinstances);
	}
	// All done, disconnect from database
	mongoose.connection.close();
});
