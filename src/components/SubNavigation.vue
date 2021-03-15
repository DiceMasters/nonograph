<template>
    <div class="subnav">
        <router-link class="subnav_btn" to="/" tag="button" v-if="isNotHomeRouter">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
        </router-link>
        <button class="subnav_btn" v-if="isPlaygroundRouter">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo-alt" class="svg-inline--fa fa-undo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path></svg>
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        isPlaygroundRouter() { return this.$route.path === '/play' },
        isNotHomeRouter() { return this.$route.path !== '/' },
    }
}
</script>

<style lang="less">
    .subnav {
        display: flex;
        align-items: center;
        position: absolute;
        top: 20px;
        left: 20px;

        &_btn {
            width: 40px;
            height: 40px;
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            background-color: white;
            border-radius: 50%;
            border: 3px solid black;
            text-decoration: none;
            cursor: pointer;

            svg {
                width: 15px;
                height: 15px;
            }

            &:hover, &:focus {
                background-color: black;

                svg {
                    filter: invert(100%);
                }
            }

            &:not(:last-child) { margin-right: 10px; }
        }
    }
</style>