<template>
	<section>
		<div class="header">
			<b-button @click="changeSideBarState()" icon-pack="fas" icon-left="bars">Menu</b-button>
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
						<span @click="changeSideBarState()">
							<b-menu-item icon-pack="fas"
										 icon="home"
										 label="Home"
										 tag="router-link"
										 to="/">
							</b-menu-item>
						</span>
						<span @click="changeSideBarState()">
							<b-menu-item label="Brands"
										 icon-pack="fas"
										 icon="archive"
										 tag="router-link"
										 to="/brands">
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
		changeSideBarState(){
			if(this.open)
				this.open = false;
			else
				this.open = true;
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
	padding: 0 1rem 0 0.25rem;
}
</style>
