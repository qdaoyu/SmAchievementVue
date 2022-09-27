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
        <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
      </div>
    </div>
    <!-- 第二个div写表格 -->
    <div>
      <el-table :data="customerList" stripe border v-loading="loading" element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" height="450"
        style="width: 100%; margin-top: 10px;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column fixed prop="customerid" label="会员id" align="center" width="150">
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名" align="center" width="150">
        </el-table-column>
        <el-table-column prop="item" label="项目" align="center" width="150">
        </el-table-column>
        <el-table-column prop="gender" label="性别" align="center" width="150">
        </el-table-column>
        <el-table-column prop="phone" label="号码" align="center" width="150">
        </el-table-column>
        <el-table-column prop="consultteach" label="所属咨询师" align="center" width="150">
        </el-table-column>
        <el-table-column prop="treatnum" label="疗程次数" align="center" width="150">
        </el-table-column>
        <el-table-column prop="operanum" label="操作次数" align="center" width="150">
        </el-table-column>
        <el-table-column prop="unoperanum" label="剩余次数" align="center" width="150">
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
      customerList: [
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰",
          "item": "祛斑",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
        {
          "customerid": "202208123",
          "name": "江昌杰2",
          "item": "四维",
          "gender": "男",
          "phone": "123123",
          "consultteach": "测试",
        },
      ]
    }
  },
  mounted() {
    this.initCustomerList();
  },
  methods: {
    initCustomerList() {
      this.loading = true
      this.getRequest("/api/customer/list/?currentPage=" + this.currentPage.toString() + '&size=' + this.size.toString()).then(resp => {
      this.loading = false
        if (resp) {
          var arr = [];
          arr.push(resp.data);
          this.tableData = arr[0];
          this.total = resp.total;
          console.log("this.tableData", this.tableData[0]);
        }
      })
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initSyAchieveInfo();


    },
    sizeChange(currentSize) {
      this.size = currentSize;
      this.initSyAchieveInfo();
    },
  },

}



</script>
<style scoped>

</style>