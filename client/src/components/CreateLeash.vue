<template>
	<div class="new-leash">
		<h2 class="is-size-3 has-text-primary">{{ title }}</h2>
		<div class="form-container">
			<form class="form">
				<div class="error" v-if="isLeashError">{{ leashError }}</div>
				<section>
					<b-field horizontal>
						<template slot="label">
							Name
							<b-tooltip type="is-light" label="Name of the leash">
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
							Material
							<b-tooltip type="is-light" label="Leash material (Leather)">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-field>
							<b-select placeholder="Select a Material"
									  expanded
									  v-model="material">
								<option value="Leather">Leather</option>
								<option value="Plastic">Plastic</option>
								<option value="Fabric">Fabric</option>
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
								 max=1000
								 v-model="price_public"></b-input>
					</b-field>
				</section>
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="createLeash()">
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
	name: 'create-leash',
	props: ['id'],
	data(){
		return{
			title: 'Create Leash',
			leash: null,
			brands: [],
			material: '',
			price_vet: 0,
			price_public: 0,
			brand: null,
			name: '',
			submitDisabled: true,
			/* Match any string with any letters that occurs at least 5 times. */
			regex: '^[a-zA-Z]{5,}$',
			/* Match any number from 0 to 100 including float numbers */
			regexNum: '^[0-9]{1,3}.{0,1}[0-9]{0,2}$',
			errorMessage: 'Only characters, no numbers',
			errorMessageNum: 'Only numbers',
			isBrandError: false,
			brandError: 'Error : ',
			isLeashError: false,
			leashError: 'Error : '
		}
	},
	methods: {
		matchRegex(){
			if(this.name.match(this.regex) &&
			   this.material.match(this.regex) &&
			   this.price_vet.toString().match(this.regexNum) &&
			   this.price_public.toString().match(this.regexNum))
				this.submitDisabled = true;
			else
				this.submitDisabled = false;

			return this.submitDisabled;
		},
		/* POST method to the API to create a new leash
		/* @param none : none
		/* @return none : none */
		createLeash(){
			axios.post(process.env.VUE_APP_LEASHES, {
				name: this.name,
				material: this.material,
				brand: this.brand,
				price_vet: this.price_vet,
				price_public: this.price_public
			});
			this.clearInput();
		},
		clearInput(){
			this.name = '';
			this.material = '';
			this.brand = null;
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
		isThereAnId(){
			if(this.id){
				this.title = "Update Leash"
				this.getLeash();
				return true;
			}else{
				return flase;
			}
		},
		getLeash(){
			axios.get(process.env.VUE_APP_LEASH_FIND + this.id).then((response) => {
				this.leash = response.data;
				this.name = this.leash.name;
				this.material = this.leash.material;
				this.brand = this.leash.brand;
				this.price_vet = this.leash.price_vet;
				this.price_public = this.leash.price_public;
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
		this.isThereAnId();
		this.getBrands();
	},
	watch: {
		/* We don't know how the user is going to input all
		/* the information, so we better check in every input
		/* to match the regex. An so enable the submit button. */
		name: function(){ this.matchRegex(); },
		material: function(){ this.matchRegex(); },
		brand: function(){ this.matchRegex(); },
		price_vet: function(){ this.matchRegex(); },
		price_public: function(){ this.matchRegex(); }
	}
}
</script>

<style scoped>
.new-leash {
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
