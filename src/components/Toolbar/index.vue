<template>
    <div class="toolbar">
        <a-row type="flex">
            <a-col :span="1"></a-col>
            <a-col :span="11">
                <span @click="saveTopo"><a-icon type="save" style="font-size: larger"/>&nbsp;保存</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="runTask"> <a-icon type="play-circle" style="font-size: larger"/>&nbsp;运行</span>&nbsp;&nbsp;&nbsp;
                <span @click="showNodeLog"> <a-icon type="code" style="font-size: larger"/>&nbsp;日志</span>


            </a-col>
            <a-col :span="11" style="text-align: right;font-size: larger">
                <link
                        rel="stylesheet"
                        type="text/css"
                        href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css"
                />
                <i
                        class="command iconfont icon-undo"
                        title="撤销"
                        :class="undoList.length>0?'':'disable'"
                        @click="handleUndo"
                ></i>
                <i
                        class="command iconfont icon-redo"
                        title="重做"
                        :class="redoList.length>0?'':'disable'"
                        @click="handleRedo"
                ></i>
                <span class="separator"></span>
                <!-- <i data-command="copy" class="command iconfont icon-copy-o disable" title="复制"></i>
                <i data-command="paste" class="command iconfont icon-paster-o disable" title="粘贴"></i>-->
                <i
                        data-command="delete"
                        class="command iconfont icon-delete-o"
                        title="删除"
                        :class="selectedItem?'':'disable'"
                        @click="handleDelete"
                ></i>
                <span class="separator"></span>
                <i
                        data-command="zoomIn"
                        class="command iconfont icon-zoom-in-o"
                        title="放大"
                        @click="handleZoomIn"
                ></i>
                <i
                        data-command="zoomOut"
                        class="command iconfont icon-zoom-out-o"
                        title="缩小"
                        @click="handleZoomOut"
                ></i>
                <i
                        data-command="autoZoom"
                        class="command iconfont icon-fit"
                        title="适应画布"
                        @click="handleAutoZoom"
                ></i>
                <i
                        data-command="resetZoom"
                        class="command iconfont icon-actual-size-o"
                        title="实际尺寸"
                        @click="handleResetZoom"
                ></i>
                <span class="separator"></span>
                <!--<i
                        data-command="toBack"
                        class="command iconfont icon-to-back"
                        :class="selectedItem?'':'disable'"
                        title="层级后置"
                        @click="handleToBack"
                ></i>
                <i
                        data-command="toFront"
                        class="command iconfont icon-to-front"
                        :class="selectedItem?'':'disable'"
                        title="层级前置"
                        @click="handleToFront"
                ></i>-->
                <!-- <span class="separator"></span>
                 <span class="separator"></span>-->
                <i
                        data-command="multiSelect"
                        class="command iconfont icon-select"
                        :class="multiSelect?'disable':''"
                        title="多选"
                        @click="handleMuiltSelect"
                ></i>
               <!-- <i
                        data-command="addGroup"
                        class="command iconfont icon-group"
                        title="成组"
                        :class="addGroup?'':'disable'"
                        @click="handleAddGroup"
                ></i>
                <i data-command="unGroup" class="command iconfont icon-ungroup disable" title="解组"></i>-->
                <!-- <el-button @click="consoleData" type="primary">控制台输出数据</el-button>-->
            </a-col>
            <a-col :span="1"></a-col>
        </a-row>

        <a-modal title="运行日志"
                 :visible="showLog"
                 @cancel="handleCancelLog" width="700px" cancelText="关闭" :ok-button-props="{ props: { display: none } }">
            <log></log>
            <template slot="footer">
                <a-button key="back" @click="handleCancelLog">
                    关闭
                </a-button>
            </template>
        </a-modal>

    </div>
</template>

<script>
    import eventBus from "@/utils/eventBus";
    import Util from "@antv/g6/src/util";
    import {uniqueId, getBox} from "@/utils";
    import Log from "@/components/Log"

    export default {
        components:{
            Log
        },
        data() {
            return {
                page: {},
                graph: {},
                redoList: [],
                undoList: [],
                selectedItem: null,
                multiSelect: false,
                addGroup: false,
                showLog:false
            };
        },
        created() {
            this.init();
            this.bindEvent();
        },
        watch: {
            selectedItem(val) {
                if (val && val.length > 1) {
                    this.addGroup = true;
                } else {
                    this.addGroup = false;
                }
            }
        },
        props: {
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
        methods: {
            showNodeLog(){
                this.showLog=true
            },
            handleCancelLog(){
                if(this.showLog){
                    this.showLog=false
                }
            },
            /*运行任务*/
            runTask(){
                this.$emit('runTask');
            },
            /*保存流程信息*/
            saveTopo() {
                var nodes = [];
                var edges = [];
                let Nodes = this.graph.getNodes();
                for (var i = 0; i < Nodes.length; i++) {
                    let model = Nodes[i].getModel();
                    nodes[i] = model
                }
                let Edges = this.graph.getEdges();
                for (var i = 0; i < Edges.length; i++) {
                    let model = Edges[i].getModel();
                    edges[i] = model
                }
                var item = JSON.parse(localStorage.getItem("taskList"));
                let ids = uuid();
                var data={
                    id:ids,
                    nodes:nodes,
                    edges:edges
                }
                if(item==null){
                    item=[]
                }
                item.push(data)
                var checkedIdStr = JSON.stringify(item);
                localStorage.setItem("taskList", checkedIdStr);
                //调用父页面重新加载任务方法
                this.$emit('initTreeData')
            },
            init() {
                /* const {editor, command} = this.$parent;
                 this.editor = editor;
                 this.command = command;*/
            },
            bindEvent() {
                let self = this;
                eventBus.$on("afterAddPage", page => {
                    self.page = page;
                    self.graph = self.page.graph;
                });
                eventBus.$on("add", data => {
                    this.redoList = data.redoList;
                    this.undoList = data.undoList;
                });
                eventBus.$on("update", data => {
                    this.redoList = data.redoList;
                    this.undoList = data.undoList;
                });
                eventBus.$on("delete", data => {
                    this.redoList = data.redoList;
                    this.undoList = data.undoList;
                });
                eventBus.$on("updateItem", item => {
                    this.command.executeCommand("update", [item]);
                });
                eventBus.$on("addItem", item => {
                    this.command.executeCommand("add", [item]);
                });
                eventBus.$on("nodeselectchange", () => {
                    this.selectedItem = this.graph.findAllByState("node", "selected");
                    this.selectedItem = this.selectedItem.concat(
                        ...this.graph.findAllByState("edge", "selected")
                    );
                });
                eventBus.$on("deleteItem", () => {
                    this.handleDelete();
                });
                eventBus.$on("muliteSelectEnd", () => {
                    this.multiSelect = false;
                    this.selectedItem = this.graph.findAllByState("node", "selected");
                });
            },
            handleUndo() {
                if (this.undoList.length > 0) this.command.undo();
            },
            handleRedo() {
                if (this.redoList.length > 0) this.command.redo();
            },
            handleDelete() {
                if (this.selectedItem.length > 0) {
                    this.command.executeCommand("delete", this.selectedItem);
                    this.selectedItem = null;
                }
            },
            getFormatPadding() {
                return Util.formatPadding(this.graph.get("fitViewPadding"));
            },
            getViewCenter() {
                const padding = this.getFormatPadding();
                const graph = this.graph;
                const width = this.graph.get("width");
                const height = graph.get("height");
                return {
                    x: (width - padding[2] - padding[3]) / 2 + padding[3],
                    y: (height - padding[0] - padding[2]) / 2 + padding[0]
                };
            },
            handleZoomIn() {
                const currentZoom = this.graph.getZoom();
                this.graph.zoomTo(currentZoom + 0.5, this.getViewCenter());
            },
            handleZoomOut() {
                const currentZoom = this.graph.getZoom();
                this.graph.zoomTo(currentZoom - 0.5, this.getViewCenter());
            },
            handleToBack() {
                if (this.selectedItem && this.selectedItem.length > 0) {
                    this.selectedItem.forEach(item => {
                        item.toBack();
                        this.graph.paint();
                    });
                }
            },
            handleToFront() {
                if (this.selectedItem && this.selectedItem.length > 0) {
                    this.selectedItem.forEach(item => {
                        if (item.getType() === "edge") {
                            // const nodeGroup = this.graph.get("nodeGroup");
                            // const edgeGroup = item.get("group");
                            // nodeGroup.toFront();
                            // edgeGroup.toFront()
                        } else {
                            item.toFront();
                        }

                        this.graph.paint();
                    });
                }
            },
            handleAutoZoom() {
                this.graph.fitView(20);
            },
            handleResetZoom() {
                this.graph.zoomTo(1, this.getViewCenter());
            },
            handleMuiltSelect() {
                this.multiSelect = true;
                this.graph.setMode("mulitSelect");
            },
            handleAddGroup() {
                //TODO 这部分等阿里更新Group之后添加
                // const model = {
                //   id: "group" + uniqueId(),
                //   title: "新建分组"
                // };
                // // this.command.executeCommand("add", "group", model);
                // this.selectedItem.forEach(item => {
                //   console.log(item);
                // });

                //this.getPosition(this.selectedItem);
            },
            getPosition(items) {
                const boxList = [];
                items.forEach(item => {
                    const box = item.getBBox();
                    boxList.push(getBox(box.x, box.y, box.width, box.height));
                });
                let minX1, minY1, MaxX2, MaxY2;
                boxList.forEach(box => {
                    if (typeof minX1 == "undefined") {
                        minX1 = box.x1;
                    }
                    if (typeof minY1 == "undefined") {
                        minY1 = box.y1;
                    }
                    if (typeof MaxX2 == "undefined") {
                        MaxX2 = box.x2;
                    }
                    if (typeof MaxY2 == "undefined") {
                        MaxY2 = box.y2;
                    }
                    if (minX1 > box.x1) {
                        minX1 = box.x1;
                    }
                    if (minY1 > box.y1) {
                        minY1 = box.y1;
                    }
                    if (MaxX2 < box.x2) {
                        MaxX2 = box.x2;
                    }
                    if (MaxY2 < box.y2) {
                        MaxY2 = box.y2;
                    }
                });
                const width = MaxX2 - minX1,
                    height = MaxY2 - minY1,
                    x = minX1 + width / 2,
                    y = minY1 + height / 2,
                    id = "team" + uniqueId();
                const model = {
                    id: id,
                    width,
                    height,
                    x,
                    y,
                    shape: "teamNode"
                };
                this.command.executeCommand("add", model);
                // const item = this.graph.findById(id);
                // item.get("group").toBack();
                // const edgeGroup = this.graph.get("edgeGroup");
                // edgeGroup.toFront();
                // this.graph.paint();
            },

            consoleData() {
                //console.log(this.graph.save());
            }
        }
    };


    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdefhijklmnopqrstuvwxyz";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
</script>


<style scoped>
    .toolbar {
        box-sizing: border-box;
        padding: 8px 0px;
        width: 100%;
        border: 1px solid #e9e9e9;
        height: 42px;
        z-index: 3;
        box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);

    }

    .toolbar .command:nth-of-type(1) {
        margin-left: 24px;
    }

    .toolbar .command {
        box-sizing: border-box;
        width: 27px;
        height: 27px;
        margin: 0px 6px;
        border-radius: 2px;
        padding-left: 4px;
        display: inline-block;
        border: 1px solid rgba(2, 2, 2, 0);
    }

    .toolbar .command:hover {
        cursor: pointer;
        border: 1px solid #e9e9e9;
    }

    .toolbar .disable {
        color: rgba(0, 0, 0, 0.25);
    }

    .toolbar .separator {
        margin: 4px;
        border-left: 1px solid #e9e9e9;
    }
</style>
