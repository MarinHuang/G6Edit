<template>
    <div class="page">
        <div :id="pageId" class="graph-container" style="position: relative;"></div>
        <context-menu ref="menuChild" :graph="graph" ></context-menu>
    </div>
</template>


<script>
    import Toolbar from "../Toolbar";
    import ContextMenu from "../ContextMenu";

    import G6 from "@antv/g6/build/g6";
    import {initBehavors} from "@/behavior";
    import {getData} from "@/components/Base/data.js";
    import okSvg from "@/assets/icons/ok.svg";
    import loadingSvg from "@/assets/icons/loading.gif";
    import closeSvg from "@/assets/icons/close.svg";
    import bgImg from "@/assets/bg.jpg";
    import errorSvg from "@/assets/icons/error.svg";

    let Datas;
    export default {
        data() {
            return {
                pageId: "graph-container",
                graph: null
            };
        },
        components: {
            Toolbar,
            ContextMenu
        },
        props: {
            height: {
                type: Number,
                default: 0
            },
            width: {
                type: Number,
                default: 0
            },
            data: {
                type: Object,
                default: () => {
                    return {
                        nodes: [],
                        edges: []
                    }
                }
            },
            editor: {
                type: Object,
                default: () => {
                }
            },
            command: {
                type: Object,
                default: () => {
                }
            }
        },
        created() {
            initBehavors();
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            });
        },
        computed: {
            newNodes() {
                return this.data.nodes;
            }
        },
        watch: {
            newNodes(val) {
                this.graph.changeData(this.data);
            }
        },
        methods: {
            runCurrentNode(node){
                debugger
            },
            /*画布初始化*/
            init() {
                const height = this.height - 42
                const width = this.width - 400
                this.graph = new G6.Graph({
                    container: "graph-container",
                    //切换渲染方式 让画布支持GIF
                    renderer: "svg",
                    height: height,
                    width: width,
                    modes: {
                        // 支持的 behavior
                        default: [
                            "drag-canvas",
                            "zoom-canvas",
                            "hover-node",
                            "select-node",
                            "hover-edge",
                            "keyboard",
                            "customer-events",
                            "add-menu",
                        ],
                        mulitSelect: ["mulit-select"],
                        addEdge: ["add-edge"],
                        moveNode: ["drag-item"]
                    }
                });
                let command = this.command;
                this.editor.emit("afterAddPage", {graph: this.graph, command});
                this.readData();
            },
            readData() {
                Datas = getData();
                if (Datas) {
                    this.graph.read(Datas);
                }
            },
            runTask() {
                //1 初始化所有任务状态
                this.cleanAllState();
                //2 模拟任务运行 后期修改为从接口获取运行数据
                this.runtaskNodes()
            },
            /*运行任务*/
            runtaskNodes() {
                //1 获取所有根节点 开始运行任务
                let allStartNodes = this.getAllStartNodes();
                for (var i = 0; i < allStartNodes.length; i++) {
                    var that = this;
                    let allStartNode = allStartNodes[i];
                    setTimeout(function () {
                    that.runTaskForLast(allStartNode)
                    }, 3000);
                }
            },
            /*模拟运行*/
            runTaskForLast(node) {
                let Node = this.getNodes(node._cfg.id);
                let edges = node.getEdges();
                if (edges == null || edges.length == 0) {
                    const model = {
                        stateImage: errorSvg,
                        state:"failed"
                    };
                    this.graph.update(Node, model);
                    return
                }
                if(edges.length==1 && edges[0].getTarget()._cfg.id == node._cfg.id){
                    let target = edges[0].getTarget();
                    let targetNode = this.getNodes(target._cfg.id);
                    const models = {
                        stateImage: okSvg,
                        isDoingStart: false,
                        isDoingEnd: false,
                        state:"complete"
                    };
                    this.graph.update(targetNode, models);
                    return;
                }
                debugger
                for(var i=0;i<edges.length;i++){
                    if(edges[i].getSource()._cfg.id== node._cfg.id ){
                        let source = edges[i].getSource();
                        let sourceNode = this.getNodes(source._cfg.id);
                        const Sourcemodels = {
                            stateImage: okSvg,
                            isDoingStart: true,
                            isDoingEnd: false,
                            state:"complete"
                        };
                        this.graph.update(sourceNode, Sourcemodels);
                        let target = edges[i].getTarget();
                        let targetNode = this.getNodes(target._cfg.id);
                        const models = {
                            stateImage: loadingSvg,
                            isDoingStart: false,
                            isDoingEnd: true,
                            state:"running"
                        };
                        this.graph.update(targetNode, models);
                        let _that=this
                        setTimeout(function () {
                            _that.runTaskForLast(targetNode)
                        }, 3000);
                    }
                }

            },
            getNodes(key){
                let nodes = this.graph.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                    if(nodes[i]._cfg.id==key){
                        return nodes[i];
                    }
                }
            },
            getAllStartNodes() {
                let rootNodes = [];
                let nodes = this.graph.getNodes();
                for (var i = 0; i < nodes.length; i++) {
                    //获取没有连线的根节点 直接执行
                    let edges = nodes[i].getEdges();
                    if (edges == null || edges.length == 0 || (edges.length == 1 && edges[0].getSource()._cfg.id == nodes[i]._cfg.id)) {
                        const model = {
                            stateImage: loadingSvg,
                            state:"running"
                        };
                        this.graph.update(nodes[i], model);
                        rootNodes.push(nodes[i]);
                    }
                }
                return rootNodes;
            },
            /*清空所有节点状态*/
            cleanAllState() {
                let nodes = this.graph.getNodes();
                if (nodes.length == 0 || nodes == null) {
                    this.$message.error('任务运行失败！您没有设置任何节点');
                    return
                }
                for (var i = 0; i < nodes.length; i++) {
                    const model = {
                        stateImage: null,
                        isDoingEnd: false,
                        isDoingStart: false
                    };
                    this.graph.update(nodes[i], model);
                }

            }
        }
    };
</script>

<style scoped>
    .page {
        /*margin-left: 200px;
        margin-right: 200px;*/
    }

    /* 提示框的样式 */
    .g6-tooltip {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        font-size: 12px;
        color: #545454;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px 8px;
        box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
</style>
