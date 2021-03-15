import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import lib from './modules/lib'

export default new Vuex.Store({
  state: {
    levels: [
      {
        id: 0,
        title: 'Кентавр',
        done: false,
        grid: [
          [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 1, 1, 0, 1, 1, 1, 0],
          [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
          [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
          [0, 1, 1, 0, 0, 1, 0, 1, 1, 0],
          [0, 1, 1, 0, 0, 1, 1, 0, 1, 0],
          [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 0, 1, 1, 0]
        ],
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRF////IR49lVdK8vLw98ORuLXA6599no+SllhBWzY9gtcCkgAAADlJREFUeJxjYGBgFGAAAiFFIMGopAjkMJoYgkgX0UAGBhG3dAEGxhZPMNkpJsAg0dgoDiQFJ04XAACVjAemfAHxawAAAABJRU5ErkJggg=='
      },
      {
        id: 1,
        title: 'Test',
        done: false,
        grid: [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ],
        img : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAB5QTFRF////IR49lVdK8vLw98ORuLXA6599no+SllhBWzY9gtcCkgAAADlJREFUeJxjYGBgFGAAAiFFIMGopAjkMJoYgkgX0UAGBhG3dAEGxhZPMNkpJsAg0dgoDiQFJ04XAACVjAemfAHxawAAAABJRU5ErkJggg=='
      }
    ]
  },
  mutations: {
  },
  getters: {
    getLevels (state) { return state.levels }
  },
  modules: {
    lib
  }
})
