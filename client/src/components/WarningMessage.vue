<template>
	<b-message type="is-warning"
			   size="is-medium"
			   has-icon
			   icon-pack="fas"
			   icon="exclamation-triangle">
		{{ warning }}
	</b-message>
</template>

<script>
export default {
	name: 'warning-message',
	data(){
		return {
			warning: 'Editing this element may change other elements in the database. Proceed with caution.'
		}
	}
}
</script>
