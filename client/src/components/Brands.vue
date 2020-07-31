<template>
	<div class="brands">
		<div class="title-container">
			<h2 class="is-size-3">Brands</h2>
			<b-button type="is-primary"
					  icon-pack="fas"
					  icon-left="plus"
					  tag="router-link"
					  to="/brand/create">
				Add
			</b-button>
		</div>
		<div class="brands-container">
			<div class="brand"
				 @click="goToBrand()"
				 v-for="(brand, index) in brands"
				 :key="index">
				{{ brand.name }}
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'brands',
	data(){
		return{
			brands: null
		}
	},
	methods: {
		goToBrand(){
			console.log('You clicked a brand');
		},
		/* Get all the brands from the API
		/* @param none : none
		/* @return none : none */
		getBrands(){
			axios.get(process.env.VUE_APP_BRANDS).then((response) => {
				this.brands = response.data;
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
		this.getBrands();
	}
}
</script>

<style scoped>
.brands {
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

.brands-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-content: flex-start;
}

.brand {
	border: 1px solid black;
	border-radius: 5px;
	margin: 10px;
	padding: 10px;
	cursor: pointer;
}
</style>
