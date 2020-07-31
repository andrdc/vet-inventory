<template>
	<div class="new-brand">
		<h2 class="is-size-3 has-text-primary">Create Brand</h2>
		<div class="form-container">
			<form class="form">
				<section>
					<b-field label="Name">
						<b-input v-model="name"></b-input>
					</b-field>
				</section>
				<section>
					<b-input type="submit"></b-input>
				</section>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'create-brand',
	data(){
		return{
			name: ''
		}
	},
	methods: {
		createBrand(){ console.log('Create new Brand'); }
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
</style>
