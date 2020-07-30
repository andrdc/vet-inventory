<template>
	<div class="leashes">
		<h2 class="is-size-3">Leashes</h2>
		<div class="leashes-container">
			<div class="leash"
				 @click="goToLeash()"
				 v-for="(leash, index) in leashes"
				 :key="index">
				{{ leash.name }} ({{ leash.material }}).
				<br>
				{{ leash.brand.name }}.
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'leashs',
	data(){
		return{
			leashes: null
		}
	},
	methods: {
		goToLeash(){
			console.log('You clicked a leash');
		},
		/* Get all the leashs from the API
		/* @param none : none
		/* @return none : none */
		getLeashes(){
			axios.get(process.env.VUE_APP_LEASHES).then((response) => {
				this.leashes = response.data;
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
		this.getLeashes();
	}
}
</script>

<style scoped>
.leashes {
	margin: 5px;
	padding: 5px;
}

.leashes-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-content: flex-start;
}

.leash {
	border: 1px solid black;
	border-radius: 5px;
	margin: 10px;
	padding: 10px;
	cursor: pointer;
}
</style>
