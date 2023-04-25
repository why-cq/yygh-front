<template>
  <div>
    医院列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item >
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>





    <el-table
      :data="list"
      stripe
      style="width: 100%">

      <el-table-column type="index" width="50" label="序号"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini"
                     icon="el-icon-delete" @click="removeDataById(scope.row.id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding:30px 0; text-align: center;"
      layout="total,prev,pager,next,jumper"
      @current-change="getList"
    />

  </div>

</template>

<script>
import hospset from '@/api/hospset'

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {

      }, //
      list: [], //每页数据集合
      total: 0

    }
  },
  created() {
    this.getList()
  },
  methods: {

    // 医院设置列表
    getList(page = 1) {
      this.current = page
      hospset.getHospSetList(this.current, this.limit, this.searchObj)
        .then(resposen => {
          // 把返回集合赋值给list
          this.list = resposen.data.records
          this.total = resposen.data.total
          console.log(resposen)

        })
        .catch(error => {
          console.log(error)

        })

    },
    //删除医院设置的方法
    removeDataById(id){
      this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //确定执行then方法
        hospset.deleteHsopSet(id)
          .then(response =>{
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(1)

          })


      });
      // 在删除我们的数据前应该有一个弹窗



    }

  }
}
</script>

<style scoped>

</style>
