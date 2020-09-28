<template>
    <div class="card-container">
        <a-tabs type="card">
            <a-tab-pane key="1" tab="模型列表">
                <div class="menu">

                    <a-input-search style="margin-bottom: 8px" placeholder="请输入关键字" @change="onChange"/>
                    <a-tree :tree-data="workDatas" show-icon selectable @select="loadTopo" @expand="expend" @rightClick="onRightClick">
                        <!--<a-icon slot="switcherIcon" type="down" />
                        <a-icon  slot="smile" type="folder" theme="filled" style="font-size: larger;color: #00CDEA"/>
                        <a-icon slot="deployment-unit" type="deployment-unit" style="font-size: larger;color: #00CDEA"/>-->
                        <template slot="custom" slot-scope="item" >
                            <a-icon v-if="item.type!='work'" :type="item.icons" style="font-size: larger;color: #00CDEA"/>
                            <a-icon v-if="item.type=='work' && item.open" :type="item.iconsOpen" theme="filled" style="font-size: larger;color: #00CDEA"/>
                            <a-icon v-if="item.type=='work' && !item.open" :type="item.iconsClose" theme="filled" style="font-size: larger;color: #00CDEA"/>
                            <!--<span>{{ item.title }}</span>-->

                            <span v-if="item.title.indexOf(searchValue) > -1">{{ item.title.substr(0, item.title.indexOf(searchValue)) }}<span style="color: #f50">{{ searchValue }}</span>
                                {{ item.title.substr(item.title.indexOf(searchValue) + searchValue.length) }}
                            </span>
                            <span v-else>{{ item.title }}</span>


                            <v-contextmenu ref="dataContextmenu" style="width: 150px">
                                <v-contextmenu-item @click="editTask" ><a-icon type="edit" style="font-size: larger;color: #00CDEA"/>&nbsp;修改</v-contextmenu-item>
                                <v-contextmenu-item @click="editTaskName"><a-icon type="form" style="font-size: larger;color: #00CDEA"/>&nbsp;重命名</v-contextmenu-item>
                                <v-contextmenu-item @click="deleteTask" ><a-icon type="delete" style="font-size: larger;color: #00CDEA"/>&nbsp;删除</v-contextmenu-item>
                                <v-contextmenu-item divider></v-contextmenu-item>
                                <v-contextmenu-item @click="deleteTask" ><a-icon type="control" style="font-size: larger;color: #00CDEA"/>&nbsp;调度</v-contextmenu-item>
                            </v-contextmenu>

                            <v-contextmenu ref="workContextmenu" style="width: 150px">
                                <v-contextmenu-item @click="addWork" ><a-icon type="plus-square" style="font-size: larger;color: #00CDEA"/>&nbsp;新增任务</v-contextmenu-item>
                                <v-contextmenu-item @click="renameWork" ><a-icon type="edit" style="font-size: larger;color: #00CDEA"/>&nbsp;修改组名</v-contextmenu-item>
                                <v-contextmenu-item @click="deleteWork" ><a-icon type="delete" style="font-size: larger;color: #00CDEA"/>&nbsp;删除</v-contextmenu-item>
                            </v-contextmenu>
                        </template>
                    </a-tree>
                </div>

            </a-tab-pane>
            <a-tab-pane key="2" tab="模型组件">
                <div class="menu">
                <a-input-search style="margin-bottom: 8px" placeholder="Search"/>
                <a-menu mode="inline">
                    <a-sub-menu v-for="(item,index) in treeDatas">
                        <span slot="title"><a-icon :type="item.icon" style="font-size: large"/><span>{{item.label}}</span></span>
                        <a-menu-item v-for="child in item.children"
                                     :key="child.key"
                                     class="getItem"
                                     :data-shape="child.shape"
                                     :data-type="child.type"
                                     :data-size="child.size"
                                     draggable
                                     @dragstart="handleDragstart"
                                     @dragend="handleDragEnd($event,child)">
                             <a-icon :type="child.icon"/>
                            {{child.label}}
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
                </div>
            </a-tab-pane>

        </a-tabs>
    </div>


</template>

<script>
    import eventBus from "@/utils/eventBus";
    import okSvg from "@/assets/icons/ok.svg";
    import loadingSvg from "@/assets/icons/loading.gif";
    import bgImg from "@/assets/bg.jpg";
    import errorSvg from "@/assets/icons/error.svg";
    const treeData = [
        {
            label: '通用工具',
            key: '0-0',
            icon: "inbox",
            children: [
                {
                    label: 'SHELL工具', key: '0-0-0', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#FAAD15",
                    image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                    stateImage: errorSvg,
                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.4],[1,0.6]],

                },
                {
                    label: 'SUB_PROCESS', key: '0-0-1', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#FAAD15",
                    image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                    stateImage: loadingSvg,
                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]],


                },
                {label: 'PROCEDURE', key: '0-0-2', icon: 'deployment-unit'},
                {label: 'SQL工具', key: '0-0-3', icon: 'deployment-unit'},
                {label: 'SPARK', key: '0-0-4', icon: 'deployment-unit'},
                {label: 'SPARK2', key: '0-0-5', icon: 'deployment-unit'},
                {label: 'MapReduce', key: '0-0-6', icon: 'deployment-unit'},
                {label: 'PYTHON', key: '0-0-7', icon: 'deployment-unit'},
                {label: 'DEPENDENT', key: '0-0-8', icon: 'deployment-unit'},
            ],
        },
        {
            label: '输入输出',
            key: '1-0',
            icon: 'interaction',
            children: [
                {
                    label: '数据源输入', key: '0-1-0', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#13C2C2",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                    stateImage: okSvg,
                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]],
                },
                {
                    label: '数据输出', key: '0-1-1', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#13C2C2",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]],
                    isDoingEnd: true
                },
                {
                    label: 'SQL数据输出', key: '0-1-2',icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#13C2C2",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                    stateImage: okSvg,
                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
            ],
        },
        {
            label: '预处理组件',
            key: '2-0',
            icon: 'file-sync',
            children: [
                {
                    label: '数据过滤', key: '0-2-0',icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#28A0FF",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                    stateImage: loadingSvg,
                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]],
                    isDoingStart: true
                },
                {
                    label: '列过滤', key: '0-2-1',icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#28A0FF",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
                {
                    label: '分组聚合', key: '0-2-2', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#1890ff",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
            ],
        },
        {
            label: '统计分析',
            key: '3-0',
            icon: 'bar-chart',
            children: [
                {
                    label: '核密度分析', key: '0-3-0', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#5A6C81",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
                {
                    label: '相关系数矩阵', key: '0-3-1', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#5A6C81",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
            ],
        },
        {
            label: '机器学习',
            key: '4-0',

                icon: 'team',

            children: [
                {
                    label: '回归模型评估', key: '0-4-0', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#1FD6FF",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
                {
                    label: '时间序列分析', key: '0-4-1', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#1FD6FF",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
            ],
        },
        {
            label: '深度学习',
            key: '5-0',
            icon: 'smile',
            children: [
                {
                    label: 'LSTM算法', key: '0-5-0', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#9254DE",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
                {
                    label: 'LSTM预测', key: '0-5-1', icon: 'deployment-unit',
                    size: "170*34",
                    type: "node",
                    x: 0,
                    y: 0,
                    shape: "customNode",
                    color: "#9254DE",
                    image:
                        "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                    inPoints: [[0, 0.5]],
                    outPoints: [[1, 0.5]]
                },
            ],
        },
    ];
    const workData = [
        {
            title: '默认工作组',
            key: '0-0',
            type:"work",
            open:false,
            iconsOpen:"folder-open",
            iconsClose:"folder",
            scopedSlots: { title: 'custom' },
            selectable:false,
            children: [
                {title: '任务测试1-1',open:false, key: '0-0-0', icons:"apartment", scopedSlots: { title: 'custom' }},
                {title: '任务测试1-2',open:false, key: '0-0-1',icons:"apartment", scopedSlots: { title: 'custom' }},
                {title: '任务测试1-3',open:false, key: '0-0-2',icons:"apartment", scopedSlots: { title: 'custom' }},
            ],
        },
        {
            title: '默认工作组1',
            key: '1-0',
            open:false,
            scopedSlots: { title: 'custom' },
            selectable:false,
            iconsOpen:"folder-open",
            iconsClose:"folder",
            type:"work",
            icons:"folder",
            children: [
                {title: '任务测试2-1',open:false, key: '0-1-0',icons:"apartment", scopedSlots: { title: 'custom' }},
                {title: '任务测试2-2',open:false, key: '0-1-1', icons:"apartment",scopedSlots: { title: 'custom' }},
                {title: '任务测试2-3',open:false, key: '0-1-2', icons:"apartment",scopedSlots: { title: 'custom' }},
            ],
        },
        {
            title: '测试工作组',
            icons:"folder",
            type:"work",
            open:false,
            key: '0-3',
            iconsOpen:"folder-open",
            iconsClose:"folder",
            scopedSlots: { title: 'custom' },
            selectable:false,
            children:[]
        }
    ];

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
            tns.push({ title: key, key, scopedSlots: { title: 'title' } });
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
            dataList.push({ key, title: key });
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
        data() {
            return {
                treeDatas:treeData,
                workDatas:workData,
                page: null,
                command: null,
                offsetX: 0,
                offsetY: 0,
                list: [
                    {
                        name: "测试节点",
                        label: "测试节点",
                        size: "170*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image:
                            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.5]]
                    },
                    {
                        name: "背景图片节点",
                        label: "背景图片节点",
                        size: "170*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image:
                            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                        backImage: bgImg,
                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.5]]
                    },
                    {
                        name: "双输出节点",
                        label: "双输出节点",
                        size: "170*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image:
                            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.4], [1, 0.6]]
                    },
                    {
                        name: "大型节点",
                        label: "大型节点",
                        size: "340*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image:
                            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.5]]
                    },
                    {
                        name: "动画开始节点",
                        label: "动画开始",
                        size: "170*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image:
                            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",

                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.5]],
                        isDoingStart: true
                    },
                    {
                        name: "动画结束节点",
                        label: "动画结束",
                        size: "170*34",
                        type: "node",
                        x: 0,
                        y: 0,
                        shape: "customNode",
                        color: "#1890ff",
                        image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
                        inPoints: [[0, 0.5]],
                        outPoints: [[1, 0.5]],
                        isDoingEnd: true
                    }
                ],
                node:null,
                searchValue: '',
            };
        },
        created() {
            this.bindEvent();
            this.loadTree()
        },
        methods: {
            onChange(e){
                const value = e.target.value;
                const expandedKeys = dataList
                    .map(item => {
                        if (item.title.indexOf(value) > -1) {
                            return getParentKey(item.key, gData);
                        }
                        return null;
                    })
                    .filter((item, i, self) => item && self.indexOf(item) === i);
                Object.assign(this, {
                    expandedKeys,
                    searchValue: value,
                    autoExpandParent: true,
                });
            },
            editTask(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('编辑的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('编辑的是task节点为'+node.label+" key为："+node.key);
                }
            },
            editTaskName(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('重命名的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('重命名的是task节点为'+node.label+" key为："+node.key);
                }
            },
            deleteTask(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('删除的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('删除的是task节点为'+node.label+" key为："+node.key);
                }
            },
            addWork(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('新增的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('新增的是task节点为'+node.label+" key为："+node.key);
                }
            },
            renameWork(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('重命名的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('重命名的是task节点为'+node.label+" key为："+node.key);
                }
            },
            deleteWork(vm,event){
                let node = this.node;
                if(node.type=="work"){
                    this.$message.info('删除的是work节点为'+node.title+" key为："+node.key);
                }else{
                    this.$message.info('删除的是task节点为'+node.label+" key为："+node.key);
                }
            },
            /*tree右击事件*/
            onRightClick ({ event, node }) {
                this.node=node._props.dataRef
                /*先清除之前的弹窗*/
                this.NodeTreeItem = null;
                const answer = node._props.dataRef.anwer;
                if (answer) {
                    this.$refs.contextmenu.hide()
                    this.answer = answer;
                    return;
                };
                this.NodeTreeItem = {
                    id: node._props.eventKey,
                    title: node._props.title,
                    parentId: node._props.dataRef.parentId || null
                };
                const x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth + 10;
                // 因为我放在页面上的box有滚动条，所以需要减掉该盒子的scrollTop
                //const y = event.currentTarget.offsetTop - document.getElementById('left').scrollTop;
                const y = event.currentTarget.offsetTop
                const postition = {
                    top: y,
                    left: x
                };
                if(node._props.dataRef.type=="work"){
                    this.$refs.workContextmenu.show(postition);
                }else{
                    this.$refs.dataContextmenu.show(postition);
                }

            },
            // 用于点击空白处隐藏增删改菜单
            clearMenu () {
                this.NodeTreeItem = null;
            },

            expend(keys, event){
                keys=event.node.eventKey;
                for (let i = 0; i < this.workDatas.length; i++) {
                    if(this.workDatas[i].key==keys){
                        if(this.workDatas[i].open){
                            this.workDatas[i].open=false
                        }else{
                            this.workDatas[i].open=true
                        }
                    }
                }
            },
            /*加载topo图*/
            loadTopo(keys, event){
                //从树中获取topo信息
                let nodes = event.node.dataRef.nodes;
                let edges = event.node.dataRef.edges;
                this.$emit('loadTopo',nodes,edges)
            },
            loadTree(){
                var item = JSON.parse(localStorage.getItem("taskList"));
                if(item==null){
                    return
                }
                var children=[]
                for(var i=0;i<item.length;i++){
                    var child={
                        title:item[i].id,
                        key:item[i].id,
                        nodes:item[i].nodes,
                        edges:item[i].edges,
                        icons:"apartment",
                        open:false,
                        scopedSlots: { title: 'custom' }
                    };
                    children.push(child)
                }
                this.workDatas[2].children=children
            },
            handleDragstart(e) {
                this.offsetX = e.offsetX;
                this.offsetY = e.offsetY;
            },
            handleDragEnd(e, item) {
                let data = {};
                Object.assign(data, item);
                data.offsetX = this.offsetX;
                data.offsetY = this.offsetY;
                if (this.page) {
                    const graph = this.page.graph;
                    // const size = e.target.dataset.size.split("*");
                    const xy = graph.getPointByClient(e.x, e.y);
                    data.x = xy.x;
                    data.y = xy.y;
                    data.size = item.size.split("*");
                    data.type = "node";
                    this.command.executeCommand("add", [data]);
                }
            },
            bindEvent() {
                eventBus.$on("afterAddPage", page => {
                    this.page = page;
                    this.command = page.command;
                });
            }
        }
    };
</script>

<style scoped>
    .card-box {
        position: static;
    }

    .menu {
        margin-left: 20px;
    }
    .ant-tree-iconEle .ant-tree-icon__customize{
        display:none
    }

    .itempannel .pannel-type-icon {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }
</style>
