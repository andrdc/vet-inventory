<template>
	<div class="new-leash-instance">
		<h2 class="is-size-3 has-text-primary">{{ title }}</h2>
		<div class="form-container">
			<form class="form">
				<WarningMessage v-if="id" :message="warning"></WarningMessage>
				<div class="error" v-if="isLeashInstanceError">{{ leashInstanceError }}</div>
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
					<div class="error" v-if="isLeashError">{{ leashError }}</div>
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
							  @click="sendLeashInstance()">
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
	name: 'create-leash-instance',
	props: ['id'],
	components: {
		WarningMessage
	},
	data(){
		const today = new Date();
		return{
			title: 'Create Leash Instance',
			leashinstance: null,
			leashes: [],
			receive_date: null,
			leash: null,
			submitDisabled: true,
			minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
			isLeashError: false,
			leashError: 'Error : ',
			isLeashInstanceError: false,
			leashInstanceError: 'Error : ',
			warning: "Edit only if it's the same date that you received this product. If not, don't edit it. Proceed with caution."
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
		/* POST method to the API to update Leash Instance
		/* @param none : none
		/* @return none : none */
		updateLeashInstance(){
			axios.post(process.env.VUE_APP_LEASH_INSTANCE_UPDATE + this.id, {
				food: this.food,
				receive_date: this.receive_date,
				_id: this.id
			}).then((res) => {
				console.log(res);
			});
			this.clearInput();
		},
		sendLeashInstance(){
			if(this.id)
				this.updateLeashInstance();
			else
				this.createLeashInstance();
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
		isThereAnId(){
			if(this.id){
				this.title = 'Update Leash Instance';
				this.getLeashInstance();
				return true;
			}else{
				return false;
			}
		},
		/* Get Leash Instance by id from the API
		/* @param none : none
		/* @return none : none */
		getLeashInstance(){
			axios.get(process.env.VUE_APP_LEASH_INSTANCE_FIND + this.id).then((res) => {
				this.leashinstance = res.data;
				this.leash = this.leashinstance.leash;
				this.receive_date = this.getDateFromString(this.leashinstance.receive_date);
			}).catch((err) => {
				this.isLeashInstanceError = true;
				if(err.response){
					this.leashInstanceError += (err.response.data + err.response.status + err.response.headers);
				}else if(err.request){
					this.leashInstanceError += err.request;
				}else{
					this.leashInstanceError += err.message;
				}
			});
		},
		getDateFromString(str){
			let date = new Date();
			let day = '';
			let month = '';
			let year = '';

			year = str[0] + str[1] + str[2] + str[3];
			month = str[5] + str[6];
			day = str[8] + str[9];
			date.setDate(day);
			date.setMonth(month);
			date.setYear(year);

			return date;
		}
	},
	mounted(){
		this.getLeashes();
		this.isThereAnId();
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
