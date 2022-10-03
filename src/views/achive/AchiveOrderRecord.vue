<template>
    <div>
        <!-- 第一个div写工具栏 -->
        <div>
            <div style="display: flex;justify-content: space-between;">
                <div>
                    <el-input :disabled="controlSearch" v-model="searchValue.Name"
                        style="width: 300px;margin-right: 10px;margin-top: 10px;" prefix-icon="el-icon-search"
                        placeholder="请输入会员名进行搜索"></el-input>
                    <el-button :disabled="controlSearch" type="primary" icon="el-icon-search"
                        @click="initOrderList('nameSearch')">搜索</el-button>
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
                    <el-button type="primary" icon="el-icon-plus" @click="showAddOrderView">添加操作记录</el-button>
                </div>
            </div>
        </div>
        <transition name="slide-fade">
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
                        门店名:
                        <el-select filterable style="width: 180px;" v-model="searchValue.Shopname" placeholder="请选择项目">
                            <el-option v-for="item in shopList" :key="item.Id" :label="item.Shopname" :value="item.Shopname">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        操作老师:
                            <el-input size="middle" style="width: 180px;" prefix-icon="el-icon-edit"
                            v-model="searchValue.Operateach" placeholder="请输入操作老师姓名"></el-input>
                    </el-col>
                    <el-col :span="6">
                        咨询师:
                        <el-select filterable style="width: 150px;" v-model="searchValue.Consultteach"
                            placeholder="请选择咨询师">
                            <el-option v-for="item in consultteachList" :key="item.Id" :label="item.Name"
                                :value="item.Name">
                            </el-option>
                        </el-select>
                    </el-col>
                    <!-- <el-col :span="5">
                        操作剩余次数≥:
                        <el-input size="middle" style="width: 180px;" prefix-icon="el-icon-edit"
                            v-model="searchValue.Unoperanum" placeholder="请输入剩余次数"></el-input>
                    </el-col> -->
                    <el-col :span="4" :offset="3">
                        <el-button @click="resetSearchValue">重置</el-button>
                        <el-button @click="initOrderList('advanced')" icon="el-icon-search" type="primary">搜索
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </transition>
        <!-- 第二个div写表格 -->
        <div style="margin-top:10px;">
            <el-table :data="orderList" stripe border v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" height="600"
                style="width: 100%; margin-top: 10px;" :default-sort="{prop: 'Operatime', order: 'descending'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="Operaid" label="操作编号" align="center" width="130">
                </el-table-column>
                <el-table-column fixed prop="Operatime" label="操作日期" align="center" width="130">
                </el-table-column>
                <el-table-column fixed prop="Customerid" label="会员id" style="font-size:1px" align="center" width="200">
                </el-table-column>
                <el-table-column  prop="Shopname" label="门店" style="font-size:1px" align="center" width="130">
                </el-table-column>
                <el-table-column fixed prop="Operacontent" label="操作内容" align="center" width="200">
                </el-table-column>
                <el-table-column prop="Operateach" label="操作老师" align="center" width="130">
                </el-table-column>
                <el-table-column prop="Comment" label="备注" align="center" width="200">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" >
                    <template slot-scope="scope">
                        <el-button @click="showEditOrderView(scope.row)">编辑</el-button>
                        <el-button @click="deleteOrder(scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end;">
                <el-pagination background @current-change="currentChange" @size-change="sizeChange"
                    layout="sizes,prev, pager, next, jumper, ->, total" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog @close="dialogVisible = false;initOrderList();" :title="title" :visible.sync="dialogVisible"
            width="75%">
            <div>
                <el-form ref="orderForm" :model="orderForm" :rules="rules" label-width="120px">
                    <!-- gutter是每个分栏之间的距离 -->
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="会员id:" prop="Customerid">
                                <el-select filterable style="width: 180px;" v-model="orderForm.Customerid"
                                    placeholder="请输入会员名选择">
                                    <el-option v-for="item in customeridList" :key="item.Id" :label="item.Name"
                                        :value="item.Customerid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="见诊日期:" prop="Visittime">
                                <el-date-picker size="middle" style="width: 150px;" v-model="orderForm.Visittime"
                                    type="date" value-format="yyyy-MM-dd" placeholder="见诊日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="消费类型:" prop="Consumetype">
                                <el-input size="middle" style="width: 150px;" prefix-icon="el-icon-phone"
                                    v-model="orderForm.Phone" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="6">
                            <el-form-item label="消费类型:" prop="Consumetype">
                                <el-select filterable style="width: 150px;" v-model="orderForm.Consumetype"
                                    placeholder="请选择消费类型">
                                    <el-option v-for="item in consumetypeList" :key="item.Id" :label="item.Name"
                                        :value="item.Consumetype">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="项目:" prop="Item">
                                <el-select filterable style="width: 150px;" v-model="orderForm.Item"
                                    placeholder="请选择项目">
                                    <el-option v-for="item in itemList" :key="item.Id" :label="item.Name"
                                        :value="item.Item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="疗程次数:" prop="Treatnum">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model.number="orderForm.Treatnum" placeholder="请输入疗程次数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="四维美雕金额:" prop="Swmdmoney">
                                <el-input size="middle" style="width: 150px;font-size: small;" prefix-icon=""
                                    v-model="orderForm.Swmdmoney" placeholder="请输入四维美雕金额">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="祛斑金额:" prop="Qbmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon="" v-model="orderForm.Qbmoney"
                                    placeholder="请输入祛斑金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="面膜金额:" prop="Mmmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon="" v-model="orderForm.Mmmoney"
                                    placeholder="请输入面膜金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="面膜盒数:" prop="Mmboxnum">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model.number="orderForm.Mmboxnum" placeholder="请输入面膜盒数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="捐赠盒数:" prop="Donateboxnum">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model.number="orderForm.Donateboxnum" placeholder="请输入捐赠盒数"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="冻干粉金额:" prop="Dgfmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model="orderForm.Dgfmoney" placeholder="请输入冻干粉金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="修复液金额:" prop="Xfymoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model="orderForm.Xfymoney" placeholder="请输入修复液金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="合计成交金额:" prop="Totalmoney">
                                <el-input size="middle" style="width: 150px;font-size: small;" prefix-icon=""
                                    v-model="orderForm.Totalmoney" placeholder="请输入合计成交金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="回款金额:" prop="Returnmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model="orderForm.Returnmoney" placeholder="请输入回款金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="卡扣金额:" prop="Kkmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon="" v-model="orderForm.Kkmoney"
                                    placeholder="请输入卡扣金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="欠款金额:" prop="Owedmoney">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model="orderForm.Owedmoney" placeholder="请输入欠款金额"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="实付金额:" prop="Paidmoney">
                                <el-input size="middle" style="width: 150px;font-size: small;" prefix-icon=""
                                    v-model="orderForm.Paidmoney" placeholder="请输入实付金额"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="咨询师:" prop="Consultteach">
                                <el-select filterable style="width: 150px;" v-model="orderForm.Consultteach"
                                    placeholder="请选择咨询师">
                                    <el-option v-for="item in consultteachList" :key="item.Id" :label="item.Name"
                                        :value="item.Name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="导前师:" prop="Dqteach">
                                <el-input size="middle" style="width: 150px;" prefix-icon="" v-model="orderForm.Dqteach"
                                    placeholder="请输入导前师"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="操作师:" prop="Operateach">
                                <el-input size="middle" style="width: 150px;" prefix-icon=""
                                    v-model="orderForm.Operateach" placeholder="请输入操作师"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="备注:" prop="Comment">
                                <el-input size="middle" style="width: 456px;" prefix-icon="" v-model="orderForm.Comment"
                                    placeholder="备注内容"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;initOrderList();">取 消</el-button>
                <el-button type="primary" @click="doAddCustomer">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    name: "AchiveOrderRecord",
    data() {
        //  限制element-ui表单中input框只能输入数字和小数点
        var validatePrice = (rule, value, callback) => {
            value = String(value);
            if (value && value.split(".").length > 2) {
                callback(new Error("请输入正确格式的金额")); //防止输入多个小数点
            } else if (value && value.split(".").length == 2) {
                value = Math.round(value * Math.pow(10, 2)) / Math.pow(10, 2); //有小数点时
                value = Number(value).toFixed(2); //不足补位
                // this.formInline.contractMoney = value;
                callback();
            } else {
                callback();
            }
        };
        //定义规则NumberPattern，限制输入0-100的整数，将在cfg_rules中引用
        const NumberPattern = new RegExp(/^([0-9]?[0-9]?\d|1000)$/);
        return {
            // controlUpdateOrAdd:"add",
            controlSearch: false,
            searchValue: {
                Name: null,
                Consumetype: null,
                Item: null,
                Consultteach: null,
                Unoperanum: null,
            },
            showAdvanceSearchVisible: false,
            title: "",
            loading: false,
            total: 0,
            nDialogState: 0,
            currentPage: 1,
            size: 10,
            dialogVisible: false,
            consultteachList: [],
            shopList: [],
            itemList: [],
            consumetypeList: [],
            orderList: [],
            customeridList: [],
            orderForm: {
                "Orderid": null,
                "Visittime": null,
                "Customerid": null,
                "Consumetype": null,
                "Item": null,
                "Treatnum": null,
                "Swmdmoney": 0,
                "Qbmoney": 0,
                "Mmmoney": 0,
                "Mmboxnum": null,
                "Donateboxnum": null,
                "Dgfmoney": 0,
                "Xfymoney": 0,
                "Totalmoney": 0,
                "Returnmoney": 0,
                "Kkmoney": 0,
                "Owedmoney": 0,
                "Paidmoney": 0,
                "Consultteach": null,
                "Dqteach": null,
                "Operateach": null,
                "Operanum": null,
                "Unoperanum": null,
                "Comment": null,

                // "item": "",
                // "consumetype": "",
            },

            rules: {
                Customerid: [{ required: true, message: "请选择会员", trigger: 'blur' }],
                Consumetype: [{ required: true, message: "请选择消费类型", trigger: 'blur' }],
                Visittime: [{ required: true, message: "请选择见诊日期", trigger: 'blur' }],
                // consumetype: [{ required: true, message: "请选择消费类型", trigger: 'blur' }],
                Item: [{ required: true, message: "请选择项目", trigger: 'blur' }],
                // { pattern: /^1[34578]\d{9}$/, message: "请输入11位手机号码", trigger: 'blur' }],
                Treatnum: [{ required: true, type: "number", message: "必须为数字", trigger: 'blur' }, { type: "number", message: "必须为数字", trigger: "change" },
                {
                    pattern: NumberPattern,
                    message: "0-1000之间的整数",
                    trigger: "blur",
                }],
                Swmdmoney: [
                    // { type: "float", message: '请输入正确格式,可保留两位小数', trigger: 'blur' },
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                    // { required:false,validator:validatePrice,message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Qbmoney: [
                    // { type:"string", message: '请输入正确格式,可保留两位小数' , trigger: 'blur'  },
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Mmmoney: [
                    // { type:"string",trigger: 'blur' },
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Mmboxnum: [{ type: "number", message: "必须为数字", trigger: 'blur' }, { type: "number", message: "必须为数字", trigger: "change" },
                {
                    pattern: NumberPattern,
                    message: "0-1000之间的整数",
                    trigger: "blur",
                }],
                Donateboxnum: [{ type: "number", message: "必须为数字", trigger: 'blur' }, { type: "number", message: "必须为数字", trigger: "change" },
                {
                    pattern: NumberPattern,
                    message: "0-1000之间的整数",
                    trigger: "blur",
                }],
                Dgfmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数' }
                ],
                Xfymoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Totalmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Returnmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Kkmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Owedmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],
                Paidmoney: [
                    { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确格式,可保留两位小数', trigger: 'blur' }
                ],

                Consultteach: [{ required: true, min: 0, max: 11, message: "请选择咨询师", trigger: 'blur' }],
                Dqteach: [{ min: 0, max: 6, message: "字数超出限制", trigger: 'blur' }],
                Operateach: [{ min: 0, max: 6, message: "字数超出限制", trigger: 'blur' }],
                Comment: [{ min: 0, max: 50, message: "字数超出限制", trigger: 'blur' }],
                // item: [{ required: true, message: "请选择项目", trigger: 'blur' }],

            }

        }
    },
    mounted() {
        this.initOrderList();
        this.initData();
    },
    methods: {
        getCurrentTimeStr() {
            var randomInt = Math.round(Math.random() * 100, 0)
            var currentDate = new Date();
            var year = currentDate.getFullYear().toString();
            var month = (currentDate.getMonth() + 1).toString();
            if (month.length === 1) {
                month = "0" + month;
            }
            var date = currentDate.getDate().toString();
            if (date.length === 1) {
                date = "0" + date;
            }
            var hour = currentDate.getHours().toString();
            if (hour.length === 1) {
                hour = "0" + hour;
            }
            var minute = currentDate.getMinutes().toString();
            if (minute.length === 1) {
                minute = "0" + minute;
            }
            var second = currentDate.getSeconds().toString();
            if (second.length === 1) {
                second = "0" + second;
            }

            return year + month + date + hour + minute + second + randomInt.toString();
        },
        initData() {
            //有些不会变的数据，可以在初始化后放到sessionStorage中，减少数据库查询(windows.sessionstorage.setitem())
            //初始化门店信息
            this.getRequest("/api/basic/customerid").then(resp => {
                if (resp) {
                    this.customeridList = resp.data
                }
            });
            //初始化门店信息
            this.getRequest("/api/basic/shop").then(resp => {
                if (resp) {
                    this.shopList = resp.data
                }
            });
            //初始化咨询师信息
            this.getRequest("/api/basic/consultteach").then(resp => {
                if (resp) {
                    this.consultteachList = resp.data
                }
            });
            //初始化项目信息
            this.getRequest("/api/basic/item").then(resp => {
                if (resp) {
                    this.itemList = resp.data
                }
            });
            //初始化消费类型信息
            this.getRequest("/api/basic/consumetype").then(resp => {
                if (resp) {
                    this.consumetypeList = resp.data
                }
            });
        },

        initOrderList(type) {
            this.loading = true
            let url = "/api/orderRecord/list?currentPage=" + this.currentPage.toString() + '&size=' + this.size.toString();
            if (type && type == "advanced") {
                if (this.searchValue.Consultteach) {
                    url += '&consultteach=' + this.searchValue.Consultteach
                }
                if (this.searchValue.Item) {
                    url += '&item=' + this.searchValue.Item
                }
                if (this.searchValue.Consumetype) {
                    url += '&consumetype=' + this.searchValue.Consumetype
                }
                if (this.searchValue.Unoperanum) {
                    url += '&unoperanum=' + this.searchValue.Unoperanum
                }
                if (this.searchValue.Name) {
                    url += '&name=' + this.searchValue.Name
                }
                console.log(this.searchValue)

            }
            if (type && type == "nameSearch") {
                if (this.searchValue.Name) {
                    url += '&name=' + this.searchValue.Name
                }
            }
            this.getRequest(url).then(resp => {
                this.loading = false
                if (resp) {
                    if (resp.data != null) {
                        console.log("data:", resp)
                        var arr = [];
                        arr.push(resp.data);
                        this.orderList = arr[0];
                        this.total = resp.total;
                        if (this.orderList != null && this.orderList.length > 0) {
                            for (var i = 0; i < this.orderList.length; i++) {
                                this.orderList[i]["Visittime"] = this.orderList[i]["Visittime"].split("T")[0]
                            }
                        }
                    }else{
                        this.orderList = []
                    }

                }
            })
        },
        currentChange(currentPage) {
            this.currentPage = currentPage;
            this.initOrderList();


        },
        sizeChange(currentSize) {
            this.size = currentSize;
            this.initOrderList();
        },
        showAddOrderView() {
            this.nDialogState = 1,
                this.title = "添加订单信息"
            this.orderForm = {
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
        showEditOrderView(data) {
            this.nDialogState = 0,
                console.log(data)
            this.title = "编辑会员信息";
            this.orderForm = data;
            console.log(this.orderForm)
            this.dialogVisible = true;

        },
        exportData() {
            this.downloadRequest('/api/orderRecord/export');
        },
        //添加客户
        doAddCustomer() {
            //查看是否有id，如果有说明是编辑的动作
            if (this.nDialogState == 0) {
                this.$refs['orderForm'].validate(valid => {
                    if (valid) {
                        this.orderForm.Swmdmoney = this.orderForm.Swmdmoney != null ? parseFloat(this.orderForm.Swmdmoney) : null
                        this.orderForm.Qbmoney = this.orderForm.Qbmoney != null ? parseFloat(this.orderForm.Qbmoney) : null
                        this.orderForm.Mmmoney = this.orderForm.Mmmoney != null ? parseFloat(this.orderForm.Mmmoney) : null
                        this.orderForm.Dgfmoney = this.orderForm.Dgfmoney != null ? parseFloat(this.orderForm.Dgfmoney) : null
                        this.orderForm.Qbmoney = this.orderForm.Qbmoney != null ? parseFloat(this.orderForm.Qbmoney) : null
                        this.orderForm.Xfymoney = this.orderForm.Xfymoney != null ? parseFloat(this.orderForm.Xfymoney) : null
                        this.orderForm.Totalmoney = this.orderForm.Totalmoney != null ? parseFloat(this.orderForm.Totalmoney) : null
                        this.orderForm.Returnmoney = this.orderForm.Returnmoney != null ? parseFloat(this.orderForm.Returnmoney) : null
                        this.orderForm.Kkmoney = this.orderForm.Kkmoney != null ? parseFloat(this.orderForm.Kkmoney) : null
                        this.orderForm.Owedmoney = this.orderForm.Owedmoney != null ? parseFloat(this.orderForm.Owedmoney) : null
                        this.orderForm.Paidmoney = this.orderForm.Paidmoney != null ? parseFloat(this.orderForm.Paidmoney) : null
                        this.putRequest("/api/orderRecord/update", this.orderForm).then(resp => {
                            if (resp) {
                                this.$message.success("更新订单信息成功")
                                this.dialogVisible = false
                                this.initOrderList();

                            }
                        })


                    } else {
                        this.$message.error("信息输入有误，请检查")
                    }
                })
            } else {
                // var temp = this.getCurrentTimeStr()

                this.$refs['orderForm'].validate(valid => {
                    if (valid) {
                        this.orderForm.Swmdmoney = this.orderForm.Swmdmoney != null ? parseFloat(this.orderForm.Swmdmoney) : null
                        this.orderForm.Qbmoney = this.orderForm.Qbmoney != null ? parseFloat(this.orderForm.Qbmoney) : null
                        this.orderForm.Mmmoney = this.orderForm.Mmmoney != null ? parseFloat(this.orderForm.Mmmoney) : null
                        this.orderForm.Dgfmoney = this.orderForm.Dgfmoney != null ? parseFloat(this.orderForm.Dgfmoney) : null
                        this.orderForm.Qbmoney = this.orderForm.Qbmoney != null ? parseFloat(this.orderForm.Qbmoney) : null
                        this.orderForm.Xfymoney = this.orderForm.Xfymoney != null ? parseFloat(this.orderForm.Xfymoney) : null
                        this.orderForm.Totalmoney = this.orderForm.Totalmoney != null ? parseFloat(this.orderForm.Totalmoney) : null
                        this.orderForm.Returnmoney = this.orderForm.Returnmoney != null ? parseFloat(this.orderForm.Returnmoney) : null
                        this.orderForm.Kkmoney = this.orderForm.Kkmoney != null ? parseFloat(this.orderForm.Kkmoney) : null
                        this.orderForm.Owedmoney = this.orderForm.Owedmoney != null ? parseFloat(this.orderForm.Owedmoney) : null
                        this.orderForm.Paidmoney = this.orderForm.Paidmoney != null ? parseFloat(this.orderForm.Paidmoney) : null
                        this.orderForm.Orderid = this.getCurrentTimeStr()
                        console.log("this.orderForm:", this.orderForm)
                        this.postRequest("/api/orderRecord/add", this.orderForm).then(resp => {
                            if (resp) {
                                this.$message.success("新增订单成功")
                                this.dialogVisible = false
                                this.initOrderList();

                            }
                        })


                    } else {
                        this.$message.error("信息输入有误，请检查")
                    }
                })
            }


        },
        //删除客户
        deleteOrder(data) {
            console.log(data)
            this.$confirm('此操作将永久删除：' + data.Customerid + '  订单信息,是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //删除信息
                this.deleteRequest('/api/orderRecord/delete/' + data.Orderid).then(resp => {
                    if (resp) {
                        this.$message.success("删除成功")
                        this.initOrderList();
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
        resetSearchValue() {
            this.searchValue = {
                Name: null,
                Shop: null,
                Phone: null,
                Consultteach: null,

            }
        },

    },

}



</script>
<style scoped>

</style>