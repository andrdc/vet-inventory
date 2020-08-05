<template>
	<b-message type="is-warning"
			   size="is-medium"
			   has-icon
			   icon-pack="fas"
			   icon="exclamation-triangle">
		{{ message }}
	</b-message>
</template>

<script>
/* eslint-disable */
export default {
	name: 'warning-message',
	props: ['message']
}
</script>
