<template>
	<div id="app">
		<SubNav/>
		<Title/>
		<router-view/>
	</div>
</template>

<script>
import Title from './components/Title'
import SubNav from './components/SubNavigation'

export default {
	components: { Title, SubNav }
}
</script>

<style>
html, body {
	padding: 0;
	margin: 0;
}

* {
	-ms-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
}

*:focus { outline: none; }

#app {
	max-width: 100vw;
	max-height: 100vh;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: 'Arimo', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #333;
}
</style>