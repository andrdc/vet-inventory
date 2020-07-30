<template>
	<div class="leashes">
		<div class="title-container">
			<h2 class="is-size-3">Leashes</h2>
			<b-button type="is-primary"
					  icon-pack="fas"
					  icon-left="plus"
					  @click="createLeash()">
				Add
			</b-button>
		</div>
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
		},
		createLeash(){ console.log('Create new Leash'); }
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

.title-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}

.title-container > button {
	margin-left: 10px;
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
