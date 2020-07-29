<template>
	<div class="home">
		<h2 class="is-size-3">Food</h2>
		<div class="instance" v-for="(foodinstance, index) in foodinstances" :key="index">
			{{ foodinstance.food.type }}
			{{ foodinstance.food.brand.name }}
			{{ foodinstance.receive_date }}
			{{ foodinstance.expiration_date }}
		</div>
		<h2 class="is-size-3">Leash</h2>
		<div class="instance" v-for="(leashinstance, index) in leashinstances" :key="index">
			{{ leashinstance.leash.name }}
			{{ leashinstance.leash.material }}
			{{ leashinstance.leash.brand.name }}
			{{ leashinstance.receive_date }}
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "home",
	data(){
		return{
			foodinstances: null,
			leashinstances: null
		}
	},
	methods: {
		getFoodInstances(){
			axios.get(process.env.VUE_APP_FOOD_INSTANCES)
				 .then((response) => {
					console.log(response);
					this.foodinstances = response.data;
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

.instance {
	border: 1px solid black;
	border-radius: 5px;
	margin: 10px;
	padding: 5px;
}
</style>
