import Vue from 'vue'
import VueRouter from 'vue-router'

import Home 	from '../views/Home.vue'
import Events 	from '../views/Events.vue'
import Top 		from '../views/Top.vue'
import Album 	from '../views/Album.vue'
import About 	from '../views/About.vue'
import Play		from '../views/Playground'
import Levels	from '../views/Levels'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/events', name: 'Events', component: Events },
  { path: '/album', name: 'Album', component: Album },
  { path: '/top', name: 'Top', component: Top },
  { path: '/about', name: 'About', component: About },
  { path: '/play/:id', name: 'Play', component: Play },
  { path: '/levels', name: 'Levels', component: Levels }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
