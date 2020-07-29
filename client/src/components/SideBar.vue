<template>
	<section>
		<b-button @click="open = true" class="mx-5 my-5">Show</b-button>
		<b-sidebar
			type="is-light"
			:fullheight="fullheight"
			:overlay="overlay"
			:open.sync="open"
		>
			<div class="p-1">
				<h1 class="has-text-primary">Inventory</h1>
				<b-menu>
					<b-menu-list label="Menu">
						<b-menu-item icon-pack="fas"
									 icon="info"
									 label="Home"
									 tag="router-link"
									 to="/">
						</b-menu-item>
						<b-menu-item label="About"
									 icon-pack="fas"
									 icon="link"
									 tag="router-link"
									 to="/about">
						</b-menu-item>
					</b-menu-list>
				</b-menu>
			</div>
		</b-sidebar>
	</section>
</template>

<script>
export default{
	data(){
		return{
			open: false,
			overlay: true,
			fullheight: true,
		};
	}
};
</script>

<style scoped>
.p-1 {
	padding: 1em;
}
</style>
