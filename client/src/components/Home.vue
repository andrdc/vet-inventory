<template>
	<div class="home">
		<div class="title-container">
			<h2 class="is-size-3">Food</h2>
			<b-button type="is-primary"
					  icon-pack="fas"
					  icon-left="plus"
					  @click="createFoodInstance()">
				Add
			</b-button>
		</div>
		<div class="instances-container">
			<div class="instance"
				 @click="food()"
				 v-for="(foodinstance, index) in foodinstances"
				 :key="index">
				{{ foodinstance.food.name }}, {{ foodinstance.food.weigth }} KG.
				<br>
				({{ foodinstance.food.type }}), {{ foodinstance.food.brand.name }}.
				<br>
				Received: {{ foodinstance.receive_date }}.
				<br>
				Expiration: {{ foodinstance.expiration_date }}.
			</div>
		</div>
		<div class="error" v-if="isFoodError">{{ foodError }}</div>
		<div class="title-container">
			<h2 class="is-size-3">Leash</h2>
			<b-button type="is-primary"
					  icon-pack="fas"
					  icon-left="plus"
					  @click="createLeashInstance()">
				Add
			</b-button>
		</div>
		<div class="instances-container">
			<div class="instance"
				 @click="leash()"
				 v-for="(leashinstance, index) in leashinstances"
				 :key="index">
				{{ leashinstance.leash.name }} ({{ leashinstance.leash.material }}).
				<br>
				{{ leashinstance.leash.brand.name }}.
				<br>
				Received: {{ leashinstance.receive_date }}.
			</div>
		</div>
		<div class="error" v-if="isLeashError">{{ leashError }}</div>
	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	name: "home",
	data(){
		return{
			foodinstances: null,
			leashinstances: null,
			dateFormat: 'DD-MM-YYYY',
			isFoodError: false,
			isLeashError: false,
			foodError: 'Error : ',
			leashError: 'Error : '
		}
	},
	methods: {
		food(){
			console.log('You clicked a food instance');
		},
		leash(){
			console.log('You clicked a leash instance');
		},
		/* Get all the food instances from the API
		/* @param none : none
		/* @return none : none */
		getFoodInstances(){
			axios.get(process.env.VUE_APP_FOOD_INSTANCES).then((response) => {
				this.foodinstances = response.data;
				this.formatFoodDates();
			}).catch((error) => {
				this.isFoodError = true;
				if(error.response){
					this.foodError += (error.response.data + error.response.status + error.response.headers);
				}else if(error.request){
					this.foodError += error.request;
				}else{
					this.foodError += error.message;
				}
			});
		},
		/* Get all the leash instances from the API
		/* @param none : none
		/* @return none : none */
		getLeashInstances(){
			axios.get(process.env.VUE_APP_LEASH_INSTANCES).then((response) => {
				this.leashinstances = response.data;
				this.formatLeashDates();
			}).catch((error) => {
				this.isLeashError = true;
				if(error.response){
					this.leashError += (error.response.data + error.response.status + error.response.headers);
				}else if(error.request){
					this.leashError += error.request;
				}else{
					this.leashError += error.message;
				}
			});
		},
		/* Format dates of Food instances
		/* @param none : none
		/* @return none : none */
		formatFoodDates(){
			this.foodinstances.forEach(instance => {
				instance.receive_date = moment(instance.receive_date).format(this.dateFormat);
				instance.expiration_date = moment(instance.expiration_date).format(this.dateFormat);
			});
		},
		/* Format dates of Leash instances
		/* @param none : none
		/* @return none : none */
		formatLeashDates(){
			this.leashinstances.forEach(instance => {
				instance.receive_date = moment(instance.receive_date).format(this.dateFormat);
			});
		},
		createFoodInstance(){ console.log('Create new Food instance' ); },
		createLeashInstance(){ console.log('Create new Leash instance' ); }
	},
	mounted(){
		this.getFoodInstances();
		this.getLeashInstances();
	}
}
</script>

<style scoped>
.home {
	margin: 5px;
	padding: 5px;
}

.title-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}

.title-container > button {
	margin-left: 10px;
}

.instances-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-content: flex-start;
}

.instance {
	border: 1px solid black;
	border-radius: 5px;
	margin: 10px;
	padding: 5px;
	cursor: pointer;
}
</style>
