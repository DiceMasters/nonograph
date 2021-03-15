<template>
	<div class="modal_content">
		<div class="modal_content_title">
			<p>Yor win</p>
		</div>
		<div class="modal_content_controlls">
			<router-link class="modal_content_controlls_item" to="/levels" tag="button">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" class="svg-inline--fa fa-home fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>
			</router-link>
			<button class="modal_content_controlls_item" @click="$emit('refresh')">
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo-alt" class="svg-inline--fa fa-undo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path></svg>
			</button>
		</div>
	</div>
</template>

<style lang="less">
.modal_content {
	display: flex;
	flex-direction: column;
	align-items: center;

	&_title {
		margin-bottom: 30px;

		p {
			font-size: 28px;
			text-align: center;
			color: #333;
		}
	}

	&_controlls {
		display: flex;
		align-items: center;

		&_item {
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 3px solid #333;
			border-radius: 50%;
			cursor: pointer;

			svg {
				width: 20px;
				height: 20px;
			}

			&:not(:last-child) { margin-right: 10px; }
		}
	}
}
</style>