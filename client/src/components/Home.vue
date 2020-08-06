<template>
	<div class="home">
		<b-field label="Admin Password">
			<b-input type="password" v-model="admin">
			</b-input>
		</b-field>
		<div class="title-container">
			<h2 class="is-size-3">Food</h2>
			<b-button type="is-primary"
					  tag="router-link"
					  to="food-instance/create"
					  icon-pack="fas"
					  icon-left="plus">
				Add
			</b-button>
		</div>
		<div class="instances-container">
			<div class="instance"
				 v-for="(foodinstance, index) in foodinstances"
				 :key="index">
				{{ foodinstance.food.name }}, {{ foodinstance.food.weigth }} KG.
				<br>
				({{ foodinstance.food.type }}), {{ foodinstance.food.brand.name }}.
				<br>
				Received: {{ foodinstance.receive_date }}.
				<br>
				Expiration: {{ foodinstance.expiration_date }}.
				<br>
				<span class="buttons-container">
					<b-button tag="router-link"
							  :to="{ path: 'food-instance/update', query: { id: foodinstance._id } }"
							  type="is-warning"
							  icon-pack="fas"
							  icon-left="edit"
							  expanded :disabled=isNotAdmin>
						Edit
					</b-button>
					<b-button @click="deleteFoodInstance(foodinstance._id)"
							  type="is-danger"
							  icon-pack="fas"
							  icon-left="trash"
							  expanded :disabled=isNotAdmin>
						Delete
					</b-button>
				</span>
			</div>
		</div>
		<div class="error" v-if="isFoodError">{{ foodError }}</div>
		<div class="title-container">
			<h2 class="is-size-3">Leash</h2>
			<b-button type="is-primary"
					  tag="router-link"
					  to="leash-instance/create"
					  icon-pack="fas"
					  icon-left="plus">
				Add
			</b-button>
		</div>
		<div class="instances-container">
			<div class="instance"
				 v-for="(leashinstance, index) in leashinstances"
				 :key="index">
				{{ leashinstance.leash.name }} ({{ leashinstance.leash.material }}).
				<br>
				{{ leashinstance.leash.brand.name }}.
				<br>
				Received: {{ leashinstance.receive_date }}.
				<br>
				<span class="buttons-container">
					<b-button tag="router-link"
							  :to="{ path: 'leash-instance/update', query: { id: leashinstance._id } }"
							  type="is-warning"
							  icon-pack="fas"
							  icon-left="edit"
							  expanded :disabled=isNotAdmin>
						Edit
					</b-button>
					<b-button @click="deleteLeashInstance(leashinstance._id)"
							  type="is-danger"
							  icon-pack="fas"
							  icon-left="trash"
							  expanded :disabled=isNotAdmin>
						Delete
					</b-button>
				</span>
			</div>
		</div>
		<div class="error" v-if="isLeashError">{{ leashError }}</div>
	</div>
</template>

<script>
/* eslint-disable */
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
			leashError: 'Error : ',
			foodKey: 0,
			leashKey: 0,
			admin: '',
			isNotAdmin: true
		}
	},
	methods: {
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
		/* Delete FoodInstance by id
		/* @param none : none
		/* @return none : none */
		deleteFoodInstance(instance_id){
			axios.post(process.env.VUE_APP_FOOD_INSTANCE_DELETE + instance_id)
				 .then((res) => {
				console.log(res);
			});
			this.foodKey += 1;
		},
		/* Delete LeashInstance by id
		/* @param none : none
		/* @return none : none */
		deleteLeashInstance(instance_id){
			axios.post(process.env.VUE_APP_LEASH_INSTANCE_DELETE + instance_id)
				 .then((res) => {
				console.log(res);
			});
			this.leashLey += 1;
		}
	},
	mounted(){
		this.getFoodInstances();
		this.getLeashInstances();
	},
	watch: {
		foodKey: function(){
			this.getFoodInstances();
		},
		leashKey: function(){
			this.getLeashInstances();
		},
		admin: function(){
			if(this.admin === process.env.VUE_APP_ADMIN_PASS)
				this.isNotAdmin = false;
			else
				this.isNotAdmin = true;
		}
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
}
</style>
