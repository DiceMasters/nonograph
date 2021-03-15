<template>
	<div class="lvls">
		<router-link class="lvls_item" v-for="(map, i) in getLevels" :key="`map${ i }`" tag="div" :to="`/play/${ i }`">
			{{ i }}
		</router-link>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'getLevels'
		])
	}
}
</script>

<style lang="less">
.lvls {
	max-width: 100%;
	width: 500px;
	display: flex;
	flex-wrap: wrap;

	&_item {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		font-weight: bold;
		color: #333;
		line-height: 95%;
		border: 3px solid #333;
		margin: 3px;
		cursor: pointer;

		&:hover { background-color: rgba(0, 0, 0, .3); }
	}
}
</style>