<template>
	<div class="playground">
		<Grid
			:level="getGrid"
			:name="getTitle"
			:b64Image="getImage"
		/>
	</div>
</template>

<script>
import Grid from '../components/play/Grid'

import { mapGetters } from 'vuex'

export default {
	name: 'Play',
	components: { Grid },
	computed: {
		...mapGetters([
			'getLevels'
		]),
		getId() { return (this.$route) ? this.$route.params.id : null },
		getLevel() { return (this.getId) ? this.getLevels.find( val => val.id === Number(this.getId)) : null },
		getGrid() { return (this.getLevel) ? this.getLevel.grid : [] },
		getTitle() { return (this.getLevel) ? this.getLevel.title : '' },
		getImage() { return (this.getLevel) ? this.getLevel.img : '' }
	}
}
</script>

<style lang="less">
	.playground {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>