<template>
	<div class="grid">
		<Hearts @defeat="_defeatHandle" />
		<div class="grid_body">
			<div class="grid_row grid_row_head">
				<div
					class="grid_col grid_col_head"
					:class="{ 'done': colHeadMap[hri] === 0 }"
					v-for="(hrow, hri) in getVerticalLine"
					:key="`hrow${ hri }`"
				>
					<div>
						<span
							v-for="(num, i) in getColBlocksArray (hri)"
							:key="`rnum${ i }`"
						>
							{{ num }}
						</span>
					</div>
				</div>
			</div>
			<div class="grid_row" v-for="(row, ri) in buildedLevel" :key="`row${ ri }`">
				<div class="grid_col grid_col_head" :class="{ 'done': rowHeadMap[ri] === 0 }">
					<div>
						<span
							v-for="(num, i) in getRowBlocksArray (row)"
							:key="`colspan${ i }`"
						>
							{{ num }}
						</span>
					</div>
				</div>
				<div
					class="grid_col"
					:class="{ 'valid': col.status === 'valid', 'error': col.status === 'error' }"
					v-for="(col, ci) in row"
					:key="`col${ ci }`"
					@mousemove="_colHandle(ri, ci, col.val, col.status)"
					@click="_colHandle(ri, ci, col.val, col.status, true)"
				></div>
			</div>
			<transition enter-active-class="animate flipInX" @after-enter="openWinModal">
				<img :src="b64Image" class="grid_body_image" v-show="win" />
			</transition>
		</div>
		<Modal :show="defeat"><Defeat @refresh="resetLevel" /></Modal>
		<Modal :show="winModal"><Win @refresh="resetLevel" /></Modal>
	</div>
</template>

<script>
import Hearts from './Hearts'
import Modal from '../Modal'
import Defeat from '../Defeat'
import Win from '../Win'

export default {
	props: {
		level: {
			type: Array,
			default() {
				return null
			}
		},
		name: {
			type: String,
			default: ''
		},
		b64Image: {
			type: String,
			default: ''
		}
	},
	components: { Hearts, Modal, Defeat, Win },
	data () {
		return {
			isMapStarted: false,
			buildedLevel: [],
			finishCols: 0,
			defeat: false,
			win: false,
			winModal: false,
			mouseDown: false,
			rowHeadMap: [],
			colHeadMap: []
		}
	},
	created () {
		this.buildLevel ()

		document.addEventListener ('mousedown', this.moseDownOn)
		document.addEventListener ('mouseup', this.moseDownOff)
	},
	beforeDestroy () {
		document.removeEventListener ('mousedown', this.moseDownOn)
		document.removeEventListener ('mouseup', this.moseDownOff)
	},
	computed: {
		getVerticalLine () { return this.buildedLevel[0] }
	},
	methods: {
		buildLevel () {
			const map = this.level.map(row => {
				return row.map( col => {
					if (col) this.finishCols++

					return { status: 'close', val: col }
				})
			})

			this.isMapStarted = true
			this.buildedLevel = map

			this.buildHeadMap ()
		},
		buildImage () {
			const img = new Image ()
			img.width = 400
			img.height = 400
			img.src = this.b64Image
			this.$refs.image.appendChild(img)
		},
		buildHeadMap () {
			this.rowHeadMap = this.level.map(row => row.reduce((prev, cur) => prev + cur, 0))
			for (let i = 0; i < this.level.length; i++) {
				this.colHeadMap.push(this.level.reduce((accumulator, cur) => accumulator + cur[i], 0))
			}
		},
		_colHandle (x, y, value, status, isClick = false) {
			let mode = (!isClick) ? (status === 'close' && this.mouseDown) : (status === 'close')

			if (mode) {
				let status = (value) ? 'valid' : 'error'

				if (value) {
					this.finishCols--

					/**
					 * TODO: Менять статус head столбцов и строк
					 */
					this.$set(this.rowHeadMap, x, this.rowHeadMap[x] - 1)
					this.$set(this.colHeadMap, y, this.colHeadMap[y] - 1)

					if (this.finishCols <= 0) this._winHandle()
				}
				else this.$emit('lifesDecrement')
				this.$set(this.buildedLevel[x][y], 'status', status)
			}
		},
		_defeatHandle () { this.defeat = true },
		_winHandle () { this.win = true },
		getRowBlocksArray (arr) {
			let cur = 0
			let doneArr = []

			arr.forEach( val => {
				if (val.val && !cur) {
					doneArr.push(val.val)
					cur++
				}
				else if (val.val && cur) doneArr[doneArr.length - 1]++
				else cur = 0
			})

			return doneArr
		},
		getColBlocksArray (y) {
			let cur = 0
			let lineArr = []
			let doneArr = []

			// Формируем массив Y на основе значений this.buildedLevel
			this.buildedLevel.forEach( (val, i) => {
				lineArr.push(val[y])
			})

			// Проходимся по массиву Y, формируем массив значений линии
			lineArr.forEach( (val, i) => {
				if (val.val && !cur) {
					doneArr.push(val.val)
					cur++
				}
				else if (val.val && cur) doneArr[doneArr.length - 1]++
				else cur = 0
			})

			return doneArr
		},
		resetLevel () {
			this.$emit('lifesReset')
			this.buildLevel()
			this.defeat = false
			this.win = false
			this.winModal = false
		},
		openWinModal () {
			setTimeout( () => {
				this.winModal = true
			}, 300)
		},
		moseDownOn () { this.mouseDown = true },
		moseDownOff () { this.mouseDown = false }
	}
}
</script>

<style lang="less">
.grid {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	&_body {
		display: flex;
		flex-direction: column;
		border: 1px solid black;
		position: relative;

		&_image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			image-rendering: optimizeSpeed;
			image-rendering: -moz-crisp-edges;
			image-rendering: -o-crisp-edges;
			image-rendering: -webkit-optimize-contrast;
			image-rendering: pixelated;
			image-rendering: optimize-contrast;
			-ms-interpolation-mode: nearest-neighbor;
		}
	}

	&_row {
		display: flex;
		align-items: stretch;
		position: relative;
	}

	&_col {
		width: 30px;
		height: 30px;
		flex-basis: 30px;
		flex-shrink: 0;
		background-color: white;
		border: 2px solid black;
		font-size: 0;
		cursor: pointer;

		&:hover { background-color: rgba(0, 0, 0, .3); }
		&.valid { background-color: black; }

		&.error {
			background-image: url("data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJ0aW1lcyIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXRpbWVzIGZhLXctMTEiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzUyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjQyLjcyIDI1NmwxMDAuMDctMTAwLjA3YzEyLjI4LTEyLjI4IDEyLjI4LTMyLjE5IDAtNDQuNDhsLTIyLjI0LTIyLjI0Yy0xMi4yOC0xMi4yOC0zMi4xOS0xMi4yOC00NC40OCAwTDE3NiAxODkuMjggNzUuOTMgODkuMjFjLTEyLjI4LTEyLjI4LTMyLjE5LTEyLjI4LTQ0LjQ4IDBMOS4yMSAxMTEuNDVjLTEyLjI4IDEyLjI4LTEyLjI4IDMyLjE5IDAgNDQuNDhMMTA5LjI4IDI1NiA5LjIxIDM1Ni4wN2MtMTIuMjggMTIuMjgtMTIuMjggMzIuMTkgMCA0NC40OGwyMi4yNCAyMi4yNGMxMi4yOCAxMi4yOCAzMi4yIDEyLjI4IDQ0LjQ4IDBMMTc2IDMyMi43MmwxMDAuMDcgMTAwLjA3YzEyLjI4IDEyLjI4IDMyLjIgMTIuMjggNDQuNDggMGwyMi4yNC0yMi4yNGMxMi4yOC0xMi4yOCAxMi4yOC0zMi4xOSAwLTQ0LjQ4TDI0Mi43MiAyNTZ6Ij48L3BhdGg+PC9zdmc+");
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
		}

		&_head {
			min-width: 50px;
			width: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: black;
			padding: 0 8px;
			color: white;
			position: absolute;
			top: 0;
			right: 100%;
			cursor: default;

			&:hover { background-color: black; }

			& > div {
				display: flex;

				span {
					font-size: 16px;
					color: white;

					&:not(:last-child) { margin-right: 5px; }
				}
			}

			&.done {
				background-image: url("data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJ0aW1lcyIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLXRpbWVzIGZhLXctMTEiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzUyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjQyLjcyIDI1NmwxMDAuMDctMTAwLjA3YzEyLjI4LTEyLjI4IDEyLjI4LTMyLjE5IDAtNDQuNDhsLTIyLjI0LTIyLjI0Yy0xMi4yOC0xMi4yOC0zMi4xOS0xMi4yOC00NC40OCAwTDE3NiAxODkuMjggNzUuOTMgODkuMjFjLTEyLjI4LTEyLjI4LTMyLjE5LTEyLjI4LTQ0LjQ4IDBMOS4yMSAxMTEuNDVjLTEyLjI4IDEyLjI4LTEyLjI4IDMyLjE5IDAgNDQuNDhMMTA5LjI4IDI1NiA5LjIxIDM1Ni4wN2MtMTIuMjggMTIuMjgtMTIuMjggMzIuMTkgMCA0NC40OGwyMi4yNCAyMi4yNGMxMi4yOCAxMi4yOCAzMi4yIDEyLjI4IDQ0LjQ4IDBMMTc2IDMyMi43MmwxMDAuMDcgMTAwLjA3YzEyLjI4IDEyLjI4IDMyLjIgMTIuMjggNDQuNDggMGwyMi4yNC0yMi4yNGMxMi4yOC0xMi4yOCAxMi4yOC0zMi4xOSAwLTQ0LjQ4TDI0Mi43MiAyNTZ6Ij48L3BhdGg+PC9zdmc+");
				background-position: center;
				background-repeat: no-repeat;
				background-size: contain;
				background-color: white;

				span { display: none; }
			}
		}
	}

	&_row_head {
		position: absolute;
		left: 0;
		bottom: 100%;

		.grid_col_head {
			min-width: 30px;
			width: 30px;
			min-height: 50px;
			height: auto;
			padding: 8px 0;
			position: static;

			div {
				flex-direction: column;

				span:not(:last-child) {
					margin-right: 0;
					margin-bottom: 3px;
				}
			}
		}

		&.done { color: black; }
	}
}

.animate {
	animation-duration: 1s;
	animation-fill-mode: both;
}

.flipInX {
	-webkit-backface-visibility: visible !important;
	backface-visibility: visible !important;
	-webkit-animation-name: flipInX;
	animation-name: flipInX;
}

@keyframes flipInX {
	from {
		-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
		transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
		-webkit-animation-timing-function: ease-in;
		animation-timing-function: ease-in;
		opacity: 0;
	}

	40% {
		-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
		transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
		-webkit-animation-timing-function: ease-in;
		animation-timing-function: ease-in;
	}

	60% {
		-webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
		transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
		opacity: 1;
	}

	80% {
		-webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
		transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
	}

	to {
		-webkit-transform: perspective(400px);
		transform: perspective(400px);
	}
}
</style>