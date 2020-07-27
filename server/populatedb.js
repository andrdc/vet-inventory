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

	var brand = new Brand(branddetail);

	brand.save(function(err){
		if(err){
			callback(err, null);
			return;
		}
		console.log('New Brand: ' + brand);
		brand.push(brand);
		callback(null, brand);
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

	var food = new Food(fooddetail);

	food.save(function(err){
		if(err){
			callback(err, null);
			return;
		}

		console.log('New Food: ' + food);
		food.push(food);
		callback(null, food);
	});
}

function foodInstanceCreate(food, receive_date, expiration_date, callback){
	foodinstancedetail = {
		food: food,
		receive_date: receive_date,
		expiration_date: expiration_date
	}

	var foodinstance = new FoodInstance(foodinstancedetail);

	foodinstance.save(function(err){
		if(err){
			console.log('ERROR CREATING FoodInstance: ' + foodinstance);
			callback(err, null);
			return;
		}

		console.log('New FoodInstance: ' + foodinstance);
		foodinstances.push(foodinstances);
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

	var leash = new Leash(leashdetail);

	leash.save(function(err){
		if(err){
			callback(err, null);
			return;
		}

		console.log('New Leash: ' + leash);
		leash.push(leash);
		callback(null, leash);
	});
}

function leashInstanceCreate(leash, receive_date, callback){
	leashinstancedetail = {
		leash: leash,
		receive_date: receive_date
	}

	var leashinstance = new LeashInstance(leashinstancedetail);

	leashinstance.save(function(err){
		if(err){
			console.log('ERROR CREATING LeashInstance: ' + leashinstance);
			callback(err, null);
			return;
		}

		console.log('New LeashInstance: ' + leashinstance);
		leashinstances.push(leashinstances);
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
			foodInstanceCreate(food[0], '14/02/2020', '14/02/2021', callback)
		},
		function(callback) {
			foodInstanceCreate(food[1], '14/02/2020', '14/02/2021', callback)
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
			leashInstanceCreate(leash[0], '14/02/2020', callback)
		},
		function(callback) {
			leashInstanceCreate(leash[1], '14/02/2020', callback)
		}
	], callback);
}

async.series([
	createBrands,
	createFood,
	createFoodInstances,
	createLeash,
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
