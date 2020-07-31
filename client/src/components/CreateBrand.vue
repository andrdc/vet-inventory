<template>
	<div class="new-brand">
		<h2 class="is-size-3 has-text-primary">Create Brand</h2>
		<div class="form-container">
			<form class="form">
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
				<br>
				<span class="submit">
					<b-button type="is-success"
							  :disabled=submitDisabled
							  @click="createBrand()">
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
	name: 'create-brand',
	data(){
		return{
			name: '',
			submitDisabled: true,
			/* Match any string with any letters that occurs at least 5 times. */
			regex: '^[a-zA-Z]{5,}$',
			errorMessage: 'Only characters, no numbers'
		}
	},
	methods: {
		createBrand(){
			if(this.name.match(this.regex)){
				axios.post(process.env.VUE_APP_BRANDS, {
					name: this.name,
				});
				this.clearInput();
			}
		},
		clearInput(){ this.name = ''; }
	},
	watch: {
		name: function(){
			if(this.name.length > 4)
				this.submitDisabled = false;
			else
				this.submitDisabled = true;
		}
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
