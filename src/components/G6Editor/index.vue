<template>
  <div id="mountNode" :style="{width:width}" >
    <div class="editor" >
      <context-menu />
      <div class="bottom-container">
          <a-row>
              <a-col :span="4">
                  <!--itempannel-->
                  <item-panel :editor="editor" :command="command" ref="panelChild" @loadTopo="loadTopo"/>
              </a-col>
              <a-col :span="15">
                  <!--toolbar-->
                  <toolbar :editor="editor" :command="command" @initTreeData="initTreeData" @runTask="runTask"/>
                  <!--page-->
                  <page :height="height" :width="width"  :data="data" ref="pageChild" :editor="editor" :command="command"/>
              </a-col>

              <a-col :span="5">
                  <!--detailpannel-->
                  <detail-panel :editor="editor" :command="command"/>
                  <!--miniMap-->
                 <!-- <minimap :editor="editor" :command="command"/>-->
              </a-col>
          </a-row>
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from "../Toolbar";
import ItemPanel from "../ItemPanel";
import DetailPanel from "../DetailPanel";
import Minimap from "../Minimap";
import Page from "../Page";
import Flow from "../Flow"
import ContextMenu from "../ContextMenu";
import Editor from "@/components/Base/Editor";
import command from "@/command";
export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Minimap,
    Page,
    ContextMenu,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {
          return {
              nodes:[],
              edges:[]
          }
      }
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      editor: {},
      command: null
    };
  },
  methods: {
      loadTopo(nodes,edges){

          this.data.nodes=nodes;
          this.data.edges=edges;
      },
    init() {
      this.editor = new Editor();
      this.command = new command(this.editor);
    },
    initTreeData(){
        this.$refs.panelChild.loadTree();
    },
    runTask(){
        this.$refs.pageChild.runTask();
    }
  }
};
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
</style>
