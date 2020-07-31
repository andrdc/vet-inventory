<template>
	<div class="new-brand">
		<form>
			<section>
				<b-field label="Name">
					<b-input v-model="name"></b-input>
				</b-field>
			</section>
		</form>
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
</style>
