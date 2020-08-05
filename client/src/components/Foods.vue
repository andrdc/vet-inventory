<template>
	<div class="foods">
		<div class="title-container">
			<h2 class="is-size-3">Foods</h2>
			<b-button type="is-primary"
					  icon-pack="fas"
					  icon-left="plus"
					  tag="router-link"
					  to="/food/create">
				Add
			</b-button>
		</div>
		<div class="foods-container">
			<div class="food"
				 v-for="(food, index) in foods"
				 :key="index">
				{{ food.name }}, {{ food.weigth }} KG.
				<br>
				({{ food.type }}), {{ food.brand.name }}.
				<br>
				<b-button tag="router-link"
						  :to="{ path: 'food/update', query: { id: food._id } }"
						  type="is-warning"
						  icon-pack="fas"
						  icon-left="edit"
						  expanded>
					Edit
				</b-button>
			</div>
		</div>
		<div class="error" v-if="isFoodError">{{ foodError }}</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'foods',
	data(){
		return{
			foods: null,
			isFoodError: false,
			foodError: 'Error : '
		}
	},
	methods: {
		/* Get all the foods from the API
		/* @param none : none
		/* @return none : none */
		getFoods(){
			axios.get(process.env.VUE_APP_FOODS).then((response) => {
				this.foods = response.data;
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

.title-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}

.title-container > button {
	margin-left: 10px;
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
