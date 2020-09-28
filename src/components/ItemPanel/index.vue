<template>
    <div class="itempannel">
        <Item ref="itemChild" @loadTopo="loadTopo"/>
    </div>
</template>

<script>
    import Item from "./item";
    import eventBus from "@/utils/eventBus";

    export default {
        components: {Item},
        data() {
            return {
                page: null,
                command: null
            };
        },
        created() {
            this.bindEvent();
        },
        methods: {
            bindEvent() {
                eventBus.$on("afterAddPage", page => {
                    this.page = page;
                });
            },
            //重新加载树
            loadTree() {
                this.$refs.itemChild.loadTree();
            },
            loadTopo(nodes, edges) {
                this.$emit('loadTopo', nodes, edges)
            }
        }
    };
</script>

<style scoped>
    .itempannel {
        height: 100%;
        left: 0px;
        z-index: 2;
        background: #f7f9fb;
        min-height: 100vh;
        /*width: 300px;*/
        /*padding-top: 8px;*/
        border-right: 1px solid #e6e9ed;
    }
</style>
