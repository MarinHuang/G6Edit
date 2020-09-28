<template>
    <div>
        <p>节点1 开始运行 2020-08-20 15:00:00</p>
        <p>节点1 运行完成 2020-08-20 15:00:00</p>
        <p>节点2 开始运行 2020-08-20 15:00:00</p>
        <p>节点2 运行完成 2020-08-20 15:00:00</p>
        <p>节点3 开始运行 2020-08-20 15:00:00</p>
        <p>节点3 运行完成 2020-08-20 15:00:00</p>
        <p>节点4 开始运行 2020-08-20 15:00:00</p>
        <p>节点4 运行完成 2020-08-20 15:00:00</p>
        <p>节点5 开始运行 2020-08-20 15:00:00</p>
        <p>节点5 运行完成 2020-08-20 15:00:00</p>
        <p>节点6 开始运行 2020-08-20 15:00:00</p>
        <p>节点6 运行报错 2020-08-20 15:00:00</p>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                node: {},
            };
        },
        props:{

        },
        created() {
            this.bindEvent();
        },
        methods: {

        }
    };
</script>

<style>
    .context-menu {

        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        margin: 5px 0;
        z-index: 1;
        display: none;
    }

    .context-menu li {
        cursor: pointer;
        font-size: 12px;
        height: 28px;
        line-height: 28px;
    }

    .context-menu li:hover {
        background-color: #f5f7fa;
    }
</style>
