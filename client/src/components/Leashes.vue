<template>
	<div class="leashes">
		<div class="title-container">
			<h2 class="is-size-3">Leashes</h2>
			<b-button type="is-primary"
					  tag="router-link"
					  to="leash/create"
					  icon-pack="fas"
					  icon-left="plus">
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
		<div class="error" v-if="isLeashError">{{ leashError }}</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'leashs',
	data(){
		return{
			leashes: null,
			isLeashError: false,
			leashError: 'Error : '
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
				this.isLeashError = true;
				if(error.response){
					this.leashError += (error.response.data + error.response.status + error.response.headers);
				}else if(error.request){
					this.leashError += error.request;
				}else{
					this.leashError += error.message;
				}
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
