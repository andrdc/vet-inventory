<template>
	<section>
		<div class="header">
			<b-button @click="open = true" icon-pack="fas" icon-left="bars">Menu</b-button>
			<Header></Header>
		</div>
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
						<span @click="closeSideBar()">
							<b-menu-item icon-pack="fas"
										 icon="info"
										 label="Home"
										 tag="router-link"
										 to="/">
							</b-menu-item>
						</span>
						<span @click="closeSideBar()">
							<b-menu-item label="About"
										 icon-pack="fas"
										 icon="link"
										 tag="router-link"
										 to="/about">
							</b-menu-item>
						</span>
					</b-menu-list>
				</b-menu>
			</div>
		</b-sidebar>
	</section>
</template>

<script>
import Header from "@/components/Header.vue";

export default{
	components: {
		Header
	},
	data(){
		return{
			open: false,
			overlay: true,
			fullheight: true,
		};
	},
	methods: {
		closeSideBar(){
			this.open = false;
		}
	}
};
</script>

<style scoped>
.p-1 {
	padding: 1em;
}

.header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
}
</style>
