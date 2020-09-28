<template>
    <div class="detailpannel">
        <div>
            <div v-if="status=='node-selected'" class="pannel" id="node_detailpannel">
                <div class="pannel-title">模型详情</div>
                <div class="block-container">
                    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                        <a-form-item label="Note">
                            <a-input v-model="node.label" @change="handleChangeName"/>
                        </a-form-item>
                        <a-form-item label="Note">
                            <a-input v-model="node.xxx"/>
                        </a-form-item>
                        <a-form-item label="Select" has-feedback>
                            <a-select
                                    v-decorator="[
          'select',
          { rules: [{ required: true, message: 'Please select your country!' }] },
        ]"
                                    placeholder="Please select a country"
                            >
                                <a-select-option value="china">
                                    China
                                </a-select-option>
                                <a-select-option value="usa">
                                    U.S.A
                                </a-select-option>
                            </a-select>
                        </a-form-item>


                        <a-form-item label="InputNumber">
                            <a-input-number v-decorator="['input-number', { initialValue: 3 }]" :min="1" :max="10"/>
                            <span class="ant-form-text">
        machines
      </span>
                        </a-form-item>

                        <a-form-item label="Switch">
                            <a-switch v-decorator="['switch', { valuePropName: 'checked' }]"/>
                        </a-form-item>

                        <a-form-item label="Slider">
                            <a-slider
                                    v-decorator="['slider']"
                                    :marks="{ 0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F' }"
                            />
                        </a-form-item>

                        <a-form-item label="Radio.Group">
                            <a-radio-group v-decorator="['radio-group']">
                                <a-radio value="a">
                                    item 1
                                </a-radio>
                                <a-radio value="b">
                                    item 2
                                </a-radio>
                                <a-radio value="c">
                                    item 3
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>

                        <a-form-item label="Checkbox.Group">
                            <a-checkbox-group
                                    v-decorator="['checkbox-group', { initialValue: ['A', 'B'] }]"
                                    style="width: 100%;"
                            >
                                <a-row>
                                    <a-col :span="8">
                                        <a-checkbox value="A">
                                            A
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-checkbox disabled value="B">
                                            B
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-checkbox value="C">
                                            C
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-checkbox value="D">
                                            D
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-checkbox value="E">
                                            E
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </a-form-item>

                        <a-form-item label="Rate">
                            <a-rate v-decorator="['rate', { initialValue: 3.5 }]" allow-half/>
                        </a-form-item>
                        <a-form-item label="Dragger">
                            <div class="dropbox">
                                <a-upload-dragger
                                        v-decorator="[
            'dragger',
            {
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            },
          ]"
                                        name="files"
                                        action="/upload.do"
                                >
                                    <p class="ant-upload-drag-icon">
                                        <a-icon type="inbox"/>
                                    </p>
                                    <p class="ant-upload-text">
                                        Click or drag file to this area to upload
                                    </p>
                                    <p class="ant-upload-hint">
                                        Support for a single or bulk upload.
                                    </p>
                                </a-upload-dragger>
                            </div>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div v-if="status==='canvas-selected'" class="pannel" id="canvas_detailpannel">
                <div class="pannel-title">画布</div>
                <div class="block-container">
                    <a-checkbox v-model="showGrid" @change="changeGridState">网格对齐</a-checkbox>
                </div>
            </div>
            <!-- <div v-if="status==='group-selected'" class="pannel" id="node_detailpannel">
              <div class="pannel-title">群组详情</div>
              <div class="block-container">
                <div class="p">
                  名称：
                  <el-input v-model="name" />
                </div>
                <div class="p">
                  任意属性：
                  <el-input v-model="color" />
                </div>
              </div>
            </div>
            -->
        </div>
    </div>
</template>

<script>
    import eventBus from "@/utils/eventBus";
    import Grid from "@antv/g6/build/grid";

    export default {
        data() {
            return {
                status: "canvas-selected",
                showGrid: false,
                page: {},
                graph: {},
                item: {},
                node: {},
                grid: null
            };
        },
        created() {
            this.init();
            this.bindEvent();
        },
        methods: {
            init() {
            },
            bindEvent() {
                let self = this;
                eventBus.$on("afterAddPage", page => {
                    self.page = page;
                    self.graph = self.page.graph;
                    /*默认显示网格线*/
                    /*this.grid = new Grid();
                    this.graph.addPlugin(this.grid);*/
                    eventBus.$on("nodeselectchange", item => {
                        if (item.select === true && item.target.getType() === "node") {
                            self.status = "node-selected";
                            self.item = item.target;
                            self.node = item.target.getModel();
                        } else {
                            self.status = "canvas-selected";
                            self.item = null;
                            self.node = null;
                        }
                    });
                });
            },
            handleChangeName(e) {
                const model = {
                    label: e
                };

                this.graph.update(this.item, model);
            },
            changeGridState(value) {
                if (value) {
                    this.grid = new Grid();
                    this.graph.addPlugin(this.grid);
                } else {
                    this.graph.removePlugin(this.grid);
                }
            }
        }
    };
</script>

<style scoped>
    .detailpannel {
        min-height: 100vh;
        right: 0px;
        z-index: 2;
        background: #f7f9fb;
        border-left: 1px solid #e6e9ed;
    }

    .detailpannel .block-container {
        padding: 16px 8px;
    }

    .block-container .el-col {
        height: 28px;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .pannel-title {
        height: 32px;
        border-top: 1px solid #dce3e8;
        border-bottom: 1px solid #dce3e8;
        background: #ebeef2;
        color: #000;
        line-height: 28px;
        padding-left: 12px;
    }
</style>
