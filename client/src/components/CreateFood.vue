<template>
	<div class="new-food">
		<h2 class="is-size-3 has-text-primary">{{ title }}</h2>
		<div class="form-container">
			<form class="form">
				<WarningMessage v-if="id"></WarningMessage>
				<div class="error" v-if="isFoodError">{{ foodError }}</div>
				<section>
					<b-field horizontal>
						<template slot="label">
							Name
							<b-tooltip type="is-light" label="Name of the food">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-input type="text"
								 :pattern=regex
								 :title=errorMessage
								 min-length=5
								 maxlength=20
								 v-model="name"></b-input>
					</b-field>
					<b-field horizontal>
						<template slot="label">
							Type
							<b-tooltip type="is-light" label="Type of Food (Kibbles)">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-field>
							<b-select placeholder="Select a Type"
									  expanded
									  v-model="type">
								<option value="Kibbles">Kibbles</option>
							</b-select>
						</b-field>
					</b-field>
					<b-field horizontal>
						<template slot="label">
							Brand
							<b-tooltip type="is-light" label="Brand Name">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-select placeholder="Select a Brand"
								  expanded
								  v-model="brand">
							<option v-for="(brand, index) in brands"
									:value="brand"
									:key="index">
								{{ brand.name }}
							</option>
						</b-select>
					</b-field>
					<div class="error" v-if="isBrandError">{{ brandError }}</div>
					<b-field horizontal>
						<template slot="label">
							Weigth
							<b-tooltip type="is-light" label="KG">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-input type="number"
								 step="any"
								 :pattern=regexNum
								 :title=errorMessageNum
								 min-length=1
								 maxlength=5
								 min=0
								 max=100
								 v-model="weigth"></b-input>
					</b-field>
					<b-field horizontal>
						<template slot="label">
							Price Vet
							<b-tooltip type="is-light" label="Veterinarian price">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-input type="number"
								 step="any"
								 :pattern=regexNum
								 :title=errorMessageNum
								 min-length=1
								 min=0
								 v-model="price_vet"></b-input>
					</b-field>
					<b-field horizontal>
						<template slot="label">
							Price Public
							<b-tooltip type="is-light" label="Public price">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-input type="number"
								 step="any"
								 :pattern=regexNum
								 :title=errorMessageNum
								 min-length=1
								 min=0
								 v-model="price_public"></b-input>
					</b-field>
				</section>
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="sendFood()">
						Send
					</b-button>
				</span>
			</form>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import WarningMessage from '@/components/WarningMessage.vue'

export default {
	name: 'create-food',
	props: ['id'],
	components: {
		WarningMessage
	},
	data(){
		return{
			title: 'Create Food',
			food: null,
			brands: [],
			type: '',
			weigth: 0,
			price_vet: 0,
			price_public: 0,
			brand: null,
			name: '',
			submitDisabled: true,
			/* Match any string with any letters that occurs at least 5 times. */
			regex: '^[a-zA-Z]{5,}$',
			/* Match any number from 0 to 100 including float numbers */
			regexNum: '^[0-9]{1,2}.{0,1}[0-9]{1,2}$',
			errorMessage: 'Only characters, no numbers',
			errorMessageNum: 'Only numbers',
			isBrandError: false,
			brandError: 'Error : ',
			isFoodError: false,
			foodError: 'Error : '
		}
	},
	methods: {
		matchRegex(){
			if(this.name.match(this.regex) &&
			   this.weigth.toString().match(this.regexNum) &&
			   this.price_vet.toString().match(this.regexNum) &&
			   this.price_public.toString().match(this.regexNum))
				this.submitDisabled = true;
			else
				this.submitDisabled = false;

			return this.submitDisabled;
		},
		/* POST method to the API to create a new food
		/* @param none : none
		/* @return none : none */
		createFood(){
			axios.post(process.env.VUE_APP_FOODS, {
				name: this.name,
				type: this.type,
				brand: this.brand,
				weigth: this.weigth,
				price_vet: this.price_vet,
				price_public: this.price_public
			});
			this.clearInput();
		},
		/* POST method to the API to update Food
		/* @param none : none
		/* @return none : none */
		updateFood(){
			axios.post(process.env.VUE_APP_FOOD_UPDATE + this.id, {
				name: this.name,
				type: this.type,
				brand: this.brand,
				weigth: this.weigth,
				price_vet: this.price_vet,
				price_public: this.price_public,
				_id: this.id
			}).then(function (response) {
				console.log(response);
			});
			this.clearInput();
		},
		sendFood(){
			if(this.id)
				this.updateFood();
			else
				this.createFood();
		},
		clearInput(){
			this.name = '';
			this.type = '';
			this.brand = null;
			this.weigth = 0;
			this.price_vet = 0;
			this.price_public = 0;
		},
		/* Get all the brands from the API
		/* @param none : none
		/* @return none : none */
		getBrands(){
			axios.get(process.env.VUE_APP_BRANDS).then((response) => {
				this.brands = response.data;
			}).catch((error) => {
				this.isBrandError = true;
				if(error.response){
					this.brandError += (error.response.data + error.response.status + error.response.headers);
				}else if(error.request){
					this.brandError += error.request;
				}else{
					this.brandError += error.message;
				}
			});
		},
		isThereAnID(){
			if(this.id){
				this.title = "Update Food";
				this.getFood();
				return true;
			}else{
				return false;
			}
		},
		getFood(){
			axios.get(process.env.VUE_APP_FOOD_FIND + this.id).then((response) => {
				this.food = response.data;
				this.name = this.food.name;
				this.type = this.food.type;
				this.brand = this.food.brand;
				this.weigth = this.food.weigth;
				this.price_vet = this.food.price_vet;
				this.price_public = this.food.price_public;
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
	},
	mounted(){
		this.isThereAnID();
		this.getBrands();
	},
	watch: {
		/* We don't know how the user is going to input all
		/* the information, so we better check in every input
		/* to match the regex. An so enable the submit button. */
		name: function(){ this.matchRegex(); },
		type: function(){ this.matchRegex(); },
		brand: function(){ this.matchRegex(); },
		weigth: function(){ this.matchRegex(); },
		price_vet: function(){ this.matchRegex(); },
		price_public: function(){ this.matchRegex(); }
	}
}
</script>

<style scoped>
.new-food {
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
