<template>
	<div class="new-leash-instance">
		<h2 class="is-size-3 has-text-primary">Create Leash Instance</h2>
		<div class="form-container">
			<form class="form">
				<section>
					<b-field horizontal>
						<template slot="label">
							Leash
							<b-tooltip type="is-light" label="Leash Name">
								<b-icon size="is-small"
										pack="fas"
										icon="question-circle">
								</b-icon>
							</b-tooltip>
						</template>
						<b-select placeholder="Select a Leash"
								  expanded
								  v-model="leash">
							<option v-for="(leash, index) in leashes"
									:value="leash"
									:key="index">
								{{ leash.name }}, {{ leash.material }}. ({{ leash.brand.name }}).
							</option>
						</b-select>
					</b-field>
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
				</section>
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="createLeashInstance()">
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
	name: 'create-leash-instance',
	data(){
		const today = new Date();
		return{
			leashes: [],
			receive_date: null,
			leash: null,
			submitDisabled: true,
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
		}
	},
	methods: {
		/* POST method to the API to create a new leash-instance
		/* @param none : none
		/* @return none : none */
		createLeashInstance(){
			axios.post(process.env.VUE_APP_LEASH_INSTANCES, {
				leash: this.leash,
				receive_date: this.receive_date,
			});
			this.clearInput();
		},
		clearInput(){
			this.leash = null;
			this.receive_date = null;
		},
		validateInput(){
			if(this.leash != null &&
			   this.receive_date != null){
				this.submitDisabled = false;
			}else{
				this.submitDisabled = true;
			}

			return this.submitDisabled;
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
	},
	watch: {
		leash: function(){ this.validateInput(); },
		receive_date: function(){ this.validateInput(); },
	}
}
</script>

<style scoped>
.new-leash-instance {
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
