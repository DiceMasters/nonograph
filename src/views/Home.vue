<template>
	<div class="home">
		<router-link class="home_btn" to="/levels">{{ lib.play }}</router-link>
		<router-link class="home_btn" to="/events">{{ lib.events }}</router-link>
		<router-link class="home_btn" to="/album">{{ lib.album }}</router-link>
		<router-link class="home_btn" to="/top">{{ lib.top }}</router-link>
		<router-link class="home_btn" to="/about">{{ lib.about }}</router-link>
	</div>
</template>

<script>
export default {
	computed: {
		lib (lang) { return this.$store.getters['lib/getLangLib']('RU') }
	}
}
</script>

<style lang="less">
.home {
	display: flex;
	flex-direction: column;
	align-items: center;

	&_btn {
		max-width: 100%;
		min-width: 240px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: black;
		padding: 4px 10px;
		border: 3px solid black;
		font-weight: bold;
		font-size: 16px;
		text-transform: uppercase;
		text-decoration: none;
		color: white;
		text-align: center;
		transition: background-color .25s;

		&:hover, &:focus {
			color: black;
			background-color: white;
		}

		&:not(:last-child) { margin-bottom: 10px; }
	}
}
</style>