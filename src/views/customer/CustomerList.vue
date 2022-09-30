<template>
    <div>
        <!-- 第一个div写工具栏 -->
        <div>
            <div style="display: flex;justify-content: space-between;">
                <div>
                    <el-input :disabled="controlSearch" v-model="searchValue.Name" style="width: 300px;margin-right: 10px;margin-top: 10px;" prefix-icon="el-icon-search"
                        placeholder="请输入会员名进行搜索"></el-input>
                    <el-button :disabled="controlSearch" type="primary" icon="el-icon-search" @click="initCustomerList('nameSearch')">搜索</el-button>
                    <el-button type="primary" icon="el-icon-search"
                        @click="showAdvanceSearchVisible =!showAdvanceSearchVisible;controlSearch=!controlSearch">
                        <i :class="showAdvanceSearchVisible?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                            aria-hidden="true"></i>
                        高级搜索
                    </el-button>
                </div>
                <div>
                    <!-- <el-button type="success"><i class="fa fa-level-up" aria-hidden="true"></i>导入数据</el-button> -->
                    <el-button type="success" @click="exportData"><i class="fa fa-level-down"
                            aria-hidden="true"></i>导出数据</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="showAddCustomerView">添加员工</el-button>
                </div>
            </div>
        </div>
        <transition  name="slide-fade">
            <div v-show="showAdvanceSearchVisible"
                style="border:1px solid #E9E9E8; border-radius:5px; box-sizing:border-box;padding:5px;margin:10px 0px">
                <el-row>
                    <!-- <el-col :span="5">
                    姓名:
                    <el-form-item label="会员姓名:" prop="Name" style="">
                        <el-input size="middle" style="width: 180px;" prefix-icon="el-icon-edit"
                            v-model="customerForm.Name" placeholder="请输入会员姓名"></el-input>
                    </el-form-item>
                </el-col> -->
                    <el-col :span="5">
                        门店:
                        <el-select filterable style="width: 180px;" v-model="searchValue.Shop" placeholder="请选择门店">
                            <el-option v-for="item in shopList" :key="item.Id" :label="item.Name"
                                :value="item.Shopname">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        手机号码:
                        <el-input size="middle" style="width: 150px;" prefix-icon="el-icon-phone"
                            v-model="searchValue.Phone" placeholder="请输入手机号码"></el-input>
                    </el-col>
                    <el-col :span="5">
                        咨询师:
                        <el-select filterable style="width: 150px;" v-model="searchValue.Consultteach"
                            placeholder="请选择咨询师">
                            <el-option v-for="item in consultteachList" :key="item.Id" :label="item.Name"
                                :value="item.Name">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4" :offset="5">
                        <el-button @click="resetSearchValue">重置</el-button>
                        <el-button @click="initCustomerList('advanced')" icon="el-icon-search" type="primary">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </transition>
        <!-- 第二个div写表格 -->
        <div style="margin-top:10px;">
            <el-table :data="customerList" stripe border v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" height="450"
                style="width: 100%; margin-top: 10px;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="Customerid" label="会员id" align="center" width="150">
                </el-table-column>
                <el-table-column fixed prop="Name" label="姓名" align="center" width="120">
                </el-table-column>
                <el-table-column fixed prop="Shop" label="门店" align="center" width="120">
                </el-table-column>
                <!-- <el-table-column fixed prop="Consumetype" label="消费类型" align="center" width="120">
        </el-table-column> -->
                <!-- <el-table-column prop="Item" label="项目" align="center" width="120">
        </el-table-column> -->
                <el-table-column prop="Gender" label="性别" align="center" width="120">
                </el-table-column>
                <el-table-column prop="Phone" label="号码" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Visittime" label="见诊日期" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Consultteach" label="所属咨询师" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Treatnum" label="疗程次数" align="center" width="120">
                </el-table-column>
                <el-table-column prop="Operanum" label="操作次数" align="center" width="120">
                </el-table-column>
                <el-table-column prop="Unoperanum" label="剩余次数" align="center" width="120">
                </el-table-column>

                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="showEditCustomerView(scope.row)">编辑</el-button>
                        <el-button @click="deleteCustomer(scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;">
                <el-pagination background @current-change="currentChange" @size-change="sizeChange"
                    layout="sizes,prev, pager, next, jumper, ->, total" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="70%">
            <div>
                <el-form ref="customerForm" :model="customerForm" :rules="rules" label-width="85px">
                    <!-- gutter是每个分栏之间的距离 -->
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="会员姓名:" prop="Name" style="">
                                <el-input size="middle" style="width: 180px;" prefix-icon="el-icon-edit"
                                    v-model="customerForm.Name" placeholder="请输入会员姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="性别:" prop="Gender">
                                <el-radio-group v-model="customerForm.Gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="手机号码:" prop="Phone">
                                <el-input size="middle" style="width: 150px;" prefix-icon="el-icon-phone"
                                    v-model="customerForm.Phone" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="见诊日期:" prop="Visittime">
                                <el-date-picker size="middle" style="width: 150px;" v-model="customerForm.Visittime"
                                    type="date" value-format="yyyy-MM-dd" placeholder="见诊日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="门店:" prop="Shop">
                                <el-select filterable style="width: 180px;" v-model="customerForm.Shop"
                                    placeholder="请选择门店">
                                    <el-option v-for="item in shopList" :key="item.Id" :label="item.Name"
                                        :value="item.Shopname">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="咨询师:" prop="Consultteach">
                                <el-select filterable style="width: 150px;" v-model="customerForm.Consultteach"
                                    placeholder="请选择咨询师">
                                    <el-option v-for="item in consultteachList" :key="item.Id" :label="item.Name"
                                        :value="item.Name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <!-- <el-form-item label="项目:" prop="item">
                <el-select filterable style="width: 150px;" v-model="customerForm.item" placeholder="请选择项目">
                  <el-option v-for="item in itemList" :key="item.Id" :label="item.Item" :value="item.Item">
                  </el-option>
                </el-select>
              </el-form-item> -->
                        </el-col>
                        <el-col :span="6">
                            <!-- <el-form-item label="消费类型:" prop="consumetype">
                <el-select filterable style="width: 150px;" v-model="customerForm.consumetype" placeholder="请选择消费类型">
                  <el-option v-for="item in consumetypeList" :key="item.Id" :label="item.Consumetype"
                    :value="item.Consumetype">
                  </el-option>
                </el-select>
              </el-form-item> -->
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddCustomer">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    name: "CustomerList",
    data() {
        return {
            controlSearch:false,
            searchValue:{
                Name:null,
                Shop:null,
                Phone:null,
                Consultteach:null,

            },
            showAdvanceSearchVisible: false,
            title: "",
            loading: false,
            total: 0,
            currentPage: 1,
            size: 10,
            dialogVisible: false,
            consultteachList: [],
            shopList: [],
            // itemList: [],
            // consumetypeList: [],
            customerList: [],
            customerForm: {
                "Customerid": null,
                "Name": "",
                "Gender": "",
                "Phone": "",
                "Shop": "",
                "Consultteach": "",
                "Visittime": "",
                // "item": "",
                // "consumetype": "",
            },
            rules: {
                Name: [{ required: true, message: "请输入会员名", trigger: 'blur' }],
                Gender: [{ required: true, message: "请选择姓名", trigger: 'blur' }],
                Phone: [{ required: true, message: "请输入手机号码", trigger: 'blur' },
                { pattern: /^1[34578]\d{9}$/, message: "请输入11位手机号码", trigger: 'blur' }],
                Shop: [{ required: true, message: "请选择门店", trigger: 'blur' }],
                Consultteach: [{ required: true, message: "请选择咨询师", trigger: 'blur' }],
                // item: [{ required: true, message: "请选择项目", trigger: 'blur' }],
                Visittime: [{ required: true, message: "请选择见诊日期", trigger: 'blur' }],
                // consumetype: [{ required: true, message: "请选择消费类型", trigger: 'blur' }],
            }

        }
    },
    mounted() {
        this.initCustomerList();
        this.initData();
    },
    methods: {
        initData() {
            //有些不会变的数据，可以在初始化后放到sessionStorage中，减少数据库查询(windows.sessionstorage.setitem())
            //初始化门店信息
            this.getRequest("/api/basic/shop").then(resp => {
                if (resp) {
                    this.shopList = resp.data
                }
            });
            //初始化咨询师信息
            this.getRequest("/api/basic/consultteach").then(resp => {
                if (resp) {
                    // console.log("咨询师信息:",resp)
                    this.consultteachList = resp.data
                }
            });
            //初始化项目信息
            // this.getRequest("/api/basic/item").then(resp => {
            //   if (resp) {
            //     // console.log("项目信息:",resp)
            //     this.itemList = resp.data
            //   }
            // });
            //初始化消费类型信息
            // this.getRequest("/api/basic/consumetype").then(resp => {
            //   if (resp) {
            //     // console.log("消费类型信息:",resp)
            //     this.consumetypeList = resp.data
            //   }
            // });
        },

        initCustomerList(type) {
            this.loading = true
            let url = "/api/customer/list?currentPage=" + this.currentPage.toString() + '&size=' + this.size.toString();
            if(type && type == "advanced"){
                if(this.searchValue.Consultteach){
                    url += '&consultteach=' + this.searchValue.Consultteach
                }
                if(this.searchValue.Phone){
                    url += '&phone=' + this.searchValue.Phone
                }
                if(this.searchValue.Shop){
                    url += '&shop=' + this.searchValue.Shop
                }

            }
            if(type && type == "nameSearch"){
                if(this.searchValue.Name){
                    url += '&name=' + this.searchValue.Name
                }
            }
            this.getRequest(url).then(resp => {
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
            this.title = "添加会员信息"
            this.customerForm = {
                "Customerid": null,
                "Name": "",
                "Gender": "",
                "Phone": "",
                "Shop": "",
                "Consultteach": "",
                "Visittime": "",
                // "item": "",
                // "consumetype": "",
            },
                this.initData()
            this.dialogVisible = true
        },
        showEditCustomerView(data) {
            console.log(data)
            this.title = "编辑会员信息";
            this.customerForm = data;
            console.log(this.customerForm)
            this.dialogVisible = true;

        },
        exportData() {
            this.downloadRequest('/api/customer/export');
        },
        //添加客户
        doAddCustomer() {
            //查看是否有id，如果有说明是编辑的动作
            if (this.customerForm.Customerid) {
                this.$refs['customerForm'].validate(valid => {
                    if (valid) {
                        this.customerForm.Customerid = this.customerForm.Name + this.customerForm.Visittime.replaceAll("-", "") + this.customerForm.Phone
                        // console.log(this.customerForm)
                        // this.$message.success("信息正确")
                        this.putRequest("/api/customer/update", this.customerForm).then(resp => {
                            if (resp) {
                                this.$message.success("更新会员信息成功")
                                this.dialogVisible = false
                                this.initCustomerList();

                            }
                        })


                    } else {
                        this.$message.error("信息输入有误，请检查")
                    }
                })
            } else {
                this.$refs['customerForm'].validate(valid => {
                    if (valid) {
                        this.customerForm.Customerid = this.customerForm.Name + this.customerForm.Visittime.replaceAll("-", "") + this.customerForm.Phone
                        // console.log(this.customerForm)
                        // this.$message.success("信息正确")
                        this.postRequest("/api/customer/add", this.customerForm).then(resp => {
                            if (resp) {
                                this.$message.success("新增会员成功")
                                this.dialogVisible = false
                                this.initCustomerList();

                            }
                        })


                    } else {
                        this.$message.error("信息输入有误，请检查")
                    }
                })
            }


        },
        //删除客户
        deleteCustomer(data) {
            console.log(data)
            this.$confirm('此操作将永久删除：' + data.Name + '  会员信息,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //删除信息
                this.deleteRequest('/api/customer/delete/' + data.Phone).then(resp => {
                    if (resp) {
                        this.$message.success("删除成功")
                        this.initCustomerList();
                    } else {
                        this.$message.error("删除失败")
                    }
                })




            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //重置高级筛选
        resetSearchValue(){
            this.searchValue = {
                Name:null,
                Shop:null,
                Phone:null,
                Consultteach:null,

            }
        },

    },

}



</script>
<style scoped>

</style>