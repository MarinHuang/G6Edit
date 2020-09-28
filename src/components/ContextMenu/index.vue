<template>
    <div>
        <v-contextmenu ref="dataContextmenu" style="width: 150px;padding: 5px">
            <v-contextmenu-item @click="runCurrentNode">
                <a-icon type="play-circle" style="height: 15px;color: #70CD79"/>&nbsp;执行节点
            </v-contextmenu-item>
            <v-contextmenu-item @click="stopCurrentNode">
                <a-icon type="play-circle" style="height: 15px;color: #E82C1D"/>&nbsp;停止节点
            </v-contextmenu-item>
            <v-contextmenu-item @click="executeFromNode">
                <a-icon type="double-right" style="height: 15px;"/>&nbsp;从节点执行
            </v-contextmenu-item>
            <v-contextmenu-item @click="executeToNode">
                <a-icon type="double-left" style="height: 15px;"/>&nbsp;执行到节点
            </v-contextmenu-item>
            <v-contextmenu-item @click="showNodeResult">
                <a-icon type="read" style="height: 15px;color: #DBC8D4"/>&nbsp;查看结果
            </v-contextmenu-item>
            <v-contextmenu-item @click="showNodeLog">
                <a-icon type="code" style="height: 15px;color: #333333"/>&nbsp;查看日志
            </v-contextmenu-item>
            <v-contextmenu-item @click="copyNode">
                <a-icon type="copy" style="height: 15px;color: #FDD455"/>&nbsp;复制节点
            </v-contextmenu-item>
            <v-contextmenu-item @click="deleteNode">
                <a-icon type="delete" style="height: 15px;color: #F15B54"/>&nbsp;删除节点
            </v-contextmenu-item>
            <v-contextmenu-item divider></v-contextmenu-item>
        </v-contextmenu>

        <a-modal title="Title"
                :visible="showResult"
                @cancel="handleCancel" width="700px" >
            <result ></result>
            <template slot="footer">
                <a-button key="back" @click="handleCancel">
                    关闭
                </a-button>
            </template>
        </a-modal>


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
    import okSvg from "@/assets/icons/ok.svg";
    import loadingSvg from "@/assets/icons/loading.gif";
    import errorSvg from "@/assets/icons/error.svg";
    import Result from "@/components/Result"
    import Log from "@/components/Log"

    const x = 3;
    const y = 2;
    const z = 1;
    const gData = [];
    const generateData = (_level, _preKey, _tns) => {
        const preKey = _preKey || '0';
        const tns = _tns || gData;

        const children = [];
        for (let i = 0; i < x; i++) {
            const key = `${preKey}-${i}`;
            tns.push({title: key, key, scopedSlots: {title: 'title'}});
            if (i < y) {
                children.push(key);
            }
        }
        if (_level < 0) {
            return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
            tns[index].children = [];
            return generateData(level, key, tns[index].children);
        });
    };
    generateData(z);

    const dataList = [];
    const generateList = data => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const key = node.key;
            dataList.push({key, title: key});
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    generateList(gData);
    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };

    export default {
        components:{
            Result,
            Log
        },
        data() {
            return {
                node: {},
                showResult:false,
                showLog:false,
            };
        },
        props:{
            graph: {
                type: Object,
                default: () => {
                }
            }
        },
        created() {
            this.bindEvent();
        },
        methods: {
            handleCancelLog(){
                if(this.showLog){
                    this.showLog=false
                }
            },
            handleCancel(){
              if(this.showResult){
                  this.showResult=false
              }
            },
            deleteNode(){

            },
            copyNode(){

            },
            showNodeLog(){
                this.showLog=true
            },
            /*查看节点结果*/
            showNodeResult(){

                this.showResult=true
            },
            runCurrentNode() {
                let _that=this
                const models = {
                    stateImage: loadingSvg,
                    isDoingStart: false,
                    isDoingEnd: true,
                    state:"running"
                };
                _that.graph.update( this.node, models);
                const Sourcemodels = {
                    stateImage: okSvg,
                    isDoingStart: true,
                    isDoingEnd: false,
                    state:"complete"
                };
                setTimeout(function () {
                    _that.graph.update( _that.node, Sourcemodels);
                }, 3000);

            },
            /*从当前节点执行*/
            executeFromNode(){
                this.cleanAllState();
                let _that=this
                const models = {
                    stateImage: loadingSvg,
                    isDoingStart: false,
                    isDoingEnd: true,
                    state:"running"
                };
                _that.graph.update( this.node, models);
                setTimeout(function () {

                    _that.runTaskForLast(_that.node)
                }, 3000);

            },
            /*执行到当前节点*/
            executeToNode(){
                this.cleanAllState();
            },
            /*停止当前节点*/
            stopCurrentNode(){
            },
            /*清空所有节点状态*/
            runTaskForLast(node) {
                let _that=this
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
                    setTimeout(function () {
                        _that.graph.update(targetNode, models);
                    }, 3000);
                    return;
                }
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

            },
            bindEvent() {
                eventBus.$on("contextmenuClick", e => {
                    this.node = e.item
                    /**先清除之前的弹窗**/
                    this.NodeTreeItem = null;
                    if (e.item.getModel() == null) {
                        this.$refs.dataContextmenu.hide()
                        return;
                    }
                    ;
                    this.NodeTreeItem = {
                        id: this.node.id,
                        title: this.node.label,
                        parentId: null
                    };
                    const x = e.clientX
                    // 因为我放在页面上的box有滚动条，所以需要减掉该盒子的scrollTop
                    //const y = event.currentTarget.offsetTop - document.getElementById('left').scrollTop;
                    const y = e.clientY
                    const postition = {
                        top: y,
                        left: x
                    };
                    this.$refs.dataContextmenu.show(postition);
                });
                eventBus.$on("mousedown", () => {
                    this.NodeTreeItem = null;
                });
            },
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
