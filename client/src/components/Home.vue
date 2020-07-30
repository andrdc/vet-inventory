<template>
	<div class="home">
		<h2 class="is-size-3">Food</h2>
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
		<h2 class="is-size-3">Leash</h2>
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
			dateFormat: 'DD-MM-YYYY'
		}
	},
	methods: {
		food(){
			console.log('You clicked a food instance');
		},
		leash(){
			console.log('You clicked a leash instance');
		},
		getFoodInstances(){
			axios.get(process.env.VUE_APP_FOOD_INSTANCES)
				 .then((response) => {
					console.log(response);
					this.foodinstances = response.data;
					this.formatFoodDates();
				})
				 .catch((error) => {
					if(error.response){
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}else if(error.request){
						console.log(error.request);
					}else{
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
		},
		getLeashInstances(){
			axios.get(process.env.VUE_APP_LEASH_INSTANCES)
				 .then((response) => {
					console.log(response);
					this.leashinstances = response.data;
					this.formatLeashDates();
				})
				 .catch((error) => {
					if(error.response){
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					}else if(error.request){
						console.log(error.request);
					}else{
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
		},
		formatFoodDates(){
			this.foodinstances.forEach(instance => {
				instance.receive_date = moment(instance.receive_date).format(this.dateFormat);
				instance.expiration_date = moment(instance.expiration_date).format(this.dateFormat);
			});
		},
		formatLeashDates(){
			this.leashinstances.forEach(instance => {
				instance.receive_date = moment(instance.receive_date).format(this.dateFormat);
			});
		}
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
