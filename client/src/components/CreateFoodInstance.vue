<template>
	<div class="new-food-instance">
		<h2 class="is-size-3 has-text-primary">Create Food Instance</h2>
		<div class="form-container">
			<form class="form">
				<section>
					<b-field horizontal>
						<template slot="label">
							Food
							<b-tooltip type="is-light" label="Food Name">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-select placeholder="Select a Food"
								  expanded
								  v-model="food">
							<option v-for="(food, index) in foods"
									:value="food"
									:key="index">
								{{ food.name }}, {{ food.weigth }}KG ({{ food.brand.name }}).
							</option>
						</b-select>
					</b-field>
					<div class="error" v-if="isFoodError">{{ foodError }}</div>
					<b-field horizontal label="Received Date">
						<b-datepicker placeholder="Click to select"
									  :min-date="minDate"
									  :max-date="minDate"
									  v-model="receive_date"
									  icon-pack="fas"
									  icon="calendar"
									  trap-focus>
						</b-datepicker>
					</b-field>
					<b-field horizontal label="Expiration Date">
						<b-datepicker placeholder="Click to select"
									  :min-date="minDate"
									  v-model="expiration_date"
									  icon-pack="fas"
									  icon="calendar"
									  trap-focus>
						</b-datepicker>
					</b-field>
				</section>
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="createFoodInstance()">
						Send
					</b-button>
				</span>
			</form>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'create-food-instance',
	data(){
		const today = new Date();
		return{
			foods: [],
			receive_date: null,
			expiration_date: null,
			food: null,
			submitDisabled: true,
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			isFoodError: false,
			foodError: 'Error : ',
		}
	},
	methods: {
		/* POST method to the API to create a new food-instance
		/* @param none : none
		/* @return none : none */
		createFoodInstance(){
			axios.post(process.env.VUE_APP_FOOD_INSTANCES, {
				food: this.food,
				receive_date: this.receive_date,
				expiration_date: this.expiration_date
			});
			this.clearInput();
		},
		clearInput(){
			this.food = null;
			this.receive_date = null;
			this.expiration_date = null;
		},
		validateInput(){
			if(this.food != null &&
			   this.receive_date != null &&
			   this.expiration_date != null){
				this.submitDisabled = false;
			}else{
				this.submitDisabled = true;
			}

			return this.submitDisabled;
		},
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
	},
	watch: {
		food: function(){ this.validateInput(); },
		receive_date: function(){ this.validateInput(); },
		expiration_date: function(){ this.validateInput(); }
	}
}
</script>

<style scoped>
.new-food-instance {
	margin: 5px;
	padding: 5px;
}

.form-container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}

@media all and (max-width: 2000px) {
	.form {
		width: 30%;
	}
}

@media all and (max-width: 1000px) {
	.form {
		width: 50%;
	}
}

@media all and (max-width: 800px) {
	.form {
		width: 70%;
	}
}

@media all and (max-width: 600px) {
	.form {
		width: 100%;
	}
}

.submit {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>
