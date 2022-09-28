<template>
    <div>
        <!-- 第一个div写工具栏 -->
        <div style="display: flex;justify-content: space-between;">
            <div>
                <el-input style="width: 300px;margin-right: 10px;margin-top: 10px;" prefix-icon="el-icon-search"
                    placeholder="请输入会员名进行搜索"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-search">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success"><i class="fa fa-level-up" aria-hidden="true"></i>导入数据</el-button>
                <el-button type="success"><i class="fa fa-level-down" aria-hidden="true"></i>导出数据</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showAddCustomerView">添加员工</el-button>
            </div>
        </div>
        <!-- 第二个div写表格 -->
        <div>
            <el-table :data="customerList" stripe border v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" height="450"
                style="width: 100%; margin-top: 10px;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="Customerid" label="会员id" align="center" width="150">
                </el-table-column>
                <el-table-column fixed prop="Name" label="姓名" align="center" width="150">
                </el-table-column>
                <el-table-column fixed prop="Consumetype" label="消费类型" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Item" label="项目" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Gender" label="性别" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Phone" label="号码" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Consultteach" label="所属咨询师" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Treatnum" label="疗程次数" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Operanum" label="操作次数" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Unoperanum" label="剩余次数" align="center" width="150">
                </el-table-column>

                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button>编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;">
                <el-pagination background @current-change="currentChange" @size-change="sizeChange"
                    layout="sizes,prev, pager, next, jumper, ->, total" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="添加员工" :visible.sync="dialogVisible" width="60%">
            <div>
                <el-form ref="customerForm" :model="customerForm" label-width="80px">
                    <!-- gutter是每个分栏之间的距离 -->
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="会员姓名:" prop="name">
                                <el-input size="middle" style="width: 180px;" prefix-icon="el-icon-edit"
                                    v-model="customerForm.name" placeholder="请输入会员姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="customerForm.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="手机号码:" prop="phone">
                                <el-input size="middle" style="width: 150px;" prefix-icon="el-icon-phone"
                                    v-model="customerForm.phone" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="见诊日期:" prop="visittime">
                                <el-date-picker size="middle" style="width: 150px;" v-model="customerForm.visittime"
                                    type="date" value-format="yyyy-MM-dd" placeholder="见诊日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="门店:" prop="shop">
                                <el-select filterable style="width: 180px;" v-model="customerForm.shop" placeholder="请选择门店">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="咨询师:" prop="shop">
                                <el-select filterable style="width: 150px;" v-model="customerForm.consultteach" placeholder="请选择咨询师">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目:" prop="item">
                                <el-select filterable style="width: 150px;" v-model="customerForm.item" placeholder="请选择项目">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="消费类型:" prop="consumetype">
                                <el-select filterable style="width: 150px;" v-model="customerForm.consumetype" placeholder="请选择消费类型">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    name: "CustomerList",
    data() {
        return {
            loading: false,
            total: 0,
            currentPage: 1,
            size: 10,
            dialogVisible: false,
            options: [{
                value: '选项1',
                label: '福州店'
            }, {
                value: '选项2',
                label: '五一店'
            }, {
                value: '选项3',
                label: '安溪店'
            }, {
                value: '选项4',
                label: '泉州店'
            }, {
                value: '选项5',
                label: '北京店'
            }],
            customerForm: {
                "name": "",
                "gender": "",
                "phone": "",
                "shop": "",
                "consultteach": "",
                "item": "",
                "visittime": "",
                "consumetype": ""
            },
            customerList: [],
        }
    },
    mounted() {
        this.initCustomerList();
    },
    methods: {
        initCustomerList() {
            this.loading = true
            this.getRequest("/api/customer/list?currentPage=" + this.currentPage.toString() + '&size=' + this.size.toString()).then(resp => {
                this.loading = false
                if (resp) {
                    console.log("data:", resp)
                    var arr = [];
                    arr.push(resp.data);
                    this.customerList = arr[0];
                    this.total = resp.total;
                    console.log("this.tableData", this.customerList[0]);
                }
            })
        },
        currentChange(currentPage) {
            this.currentPage = currentPage;
            this.initCustomerList();


        },
        sizeChange(currentSize) {
            this.size = currentSize;
            this.initCustomerList();
        },
        showAddCustomerView() {
            this.dialogVisible = true
        },
    },

}



</script>
<style scoped>

</style>