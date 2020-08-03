<template>
<div id="app">
	<SideBar></SideBar>
	<router-view />
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
$primary: #2A4B7C;
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

/* Error messages */
.error {
	border: 2px solid $danger;
	border-radius: 5px;
	margin: 10px;
	padding: 5px;
	font-weight: bold;
	background: rgba(255, 56, 97, 0.3);
}
</style>
