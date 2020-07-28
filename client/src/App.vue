<template>
<div id="app">
	<SideBar></SideBar><!--
						<div id="nav">
						<router-link to="/">Home</router-link> |
						<router-link to="/about">About</router-link>
						</div>
						<router-view /> -->
</div>
</template>

<script>
import SideBar from '@/components/SideBar';

export default{
	name: 'App',
	components: {
		SideBar
	}
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

/* Set your colors */
$primary: #92A8D1;
$primary-invert: findColorInvert($primary);

$colors: (
	"white": ($white, $black),
	"black": ($black, $white),
	"light": ($light, $light-invert),
	"dark": ($dark, $dark-invert),
	"primary": ($primary, $primary-invert),
	"info": ($info, $info-invert),
	"success": ($success, $success-invert),
	"warning": ($warning, $warning-invert),
	"danger": ($danger, $danger-invert),
);

/* Links */
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

/* Import Bulma and Buefy styles */
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
