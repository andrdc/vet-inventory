<template>
	<div class="foods">
		<h2 class="is-size-3">Foods</h2>
		<div class="foods-container">
			<div class="food"
				 @click="goToFood()"
				 v-for="(food, index) in foods"
				 :key="index">
				{{ food.name }}, {{ food.weigth }} KG.
				<br>
				({{ food.type }}), {{ food.brand.name }}.
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'foods',
	data(){
		return{
			foods: null
		}
	},
	methods: {
		goToFood(){
			console.log('You clicked a food');
		},
		/* Get all the foods from the API
		/* @param none : none
		/* @return none : none */
		getFoods(){
			axios.get(process.env.VUE_APP_FOODS).then((response) => {
				console.log(response);
				this.foods = response.data;
			}).catch((error) => {
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
		this.getFoods();
	}
}
</script>

<style scoped>
.foods {
	margin: 5px;
	padding: 5px;
}

.foods-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-content: flex-start;
}

.food {
	border: 1px solid black;
	border-radius: 5px;
	margin: 10px;
	padding: 10px;
	cursor: pointer;
}
</style>
