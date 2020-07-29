<template>
	<div class="home">
		<div class="food-instances" v-for="(foodinstance, index) in foodinstances" :key="index">
			{{ foodinstance.food.type }}
			{{ foodinstance.food.brand.name }}
			{{ foodinstance.receive_date }}
			{{ foodinstance.expiration_date }}
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "home",
	data(){
		return{
			foodinstances: null
		}
	},
	methods: {
		getInstances(){
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
		}
	},
	mounted(){
		this.getInstances();
	}
}
</script>

<style scoped>
.home {
	margin: 5px;
	padding: 5px;
}
</style>
