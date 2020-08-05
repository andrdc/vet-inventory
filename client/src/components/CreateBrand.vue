<template>
	<div class="new-brand">
		<h2 class="is-size-3 has-text-primary">{{ title }}</h2>
		<div class="form-container">
			<form class="form">
				<WarningMessage v-if="id" :message="warning"></WarningMessage>
				<section>
					<b-field>
						<template slot="label">
							Name
							<b-tooltip type="is-light" label="Name of the brand">
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
				</section>
				<div class="error" v-if="isBrandError">{{ brandError }}</div>
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="sendBrand()">
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
import WarningMessage from '@/components/WarningMessage.vue';

export default {
	name: 'create-brand',
	props: ['id'],
	components: {
		WarningMessage
	},
	data(){
		return{
			title: 'Create Brand',
			brand: null,
			isBrandError: false,
			brandError: 'Error : ',
			name: '',
			submitDisabled: true,
			/* Match any string with any letters that occurs at least 5 times. */
			regex: '^[a-zA-Z]{5,}$',
			errorMessage: 'Only characters, no numbers',
			warning: 'Editing this element may change other elements in the database. Proceed with caution.'
		}
	},
	methods: {
		/* POST method to the API to create a new brand
		/* @param none : none
		/* @return none : none */
		createBrand(){
			if(this.name.match(this.regex)){
				axios.post(process.env.VUE_APP_BRANDS, {
					name: this.name,
				});
				this.clearInput();
			}
		},
		/* POST method to the API to update Brand
		/* @param none : none
		/* @return none : none */
		updateBrand(){
			if(this.name.match(this.regex)){
				axios.post(process.env.VUE_APP_BRAND_UPDATE + this.id, {
					name: this.name,
					_id: this.id
				}).then(function (response) {
					console.log(response);
				});
				this.clearInput();
			}
		},
		sendBrand(){
			if(this.id)
				this.updateBrand();
			else
				this.createBrand();
		},
		clearInput(){ this.name = ''; },
		getBrand(){
			axios.get(process.env.VUE_APP_BRAND_FIND + this.id).then((response) => {
				this.brand = response.data;
				this.name = this.brand.name;
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
				this.title = "Update Brand";
				this.getBrand();
				return true;
			}else{
				return false;
			}
		}
	},
	watch: {
		name: function(){
			if(this.name.length > 4)
				this.submitDisabled = false;
			else
				this.submitDisabled = true;
		}
	},
	mounted(){
		this.isThereAnID();
	}
}
</script>

<style scoped>
.new-brand {
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
