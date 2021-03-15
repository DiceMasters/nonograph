<template>
    <div class="modal" v-show="show" @click.stop="close">
        <div class="modal_body">
            <slot></slot>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    methods: {
        close() { this.$emit('close') }
    }
}
</script>

<style lang="less">
.modal {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .75);
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
    z-index: 999;

    &_body {
        max-width: 95%;
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: white;
        padding: 20px;
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    }
}
</style>