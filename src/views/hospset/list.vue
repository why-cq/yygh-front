<template>
  <div>
    医院列表
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      </el-form-item>
    </el-form>

    <!--批量删除-->
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>


    <el-table
      :data="list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
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
                     icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>

          <el-button v-if="scope.row.status ==1 " type="danger" size="mini"
                     icon="el-icon-delete" @click="lockHospSet(scope.row.id,0)">锁定
          </el-button>

          <el-button v-if="scope.row.status ==0" type="primary" size="mini"
                     icon="el-icon-delete" @click="lockHospSet(scope.row.id,1)">解锁
          </el-button>

          <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
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
import id from 'element-ui/src/locale/lang/id'

export default {
  // 定义变量和初始值
  data() {
    return {
      current: 1,
      limit: 3,
      searchObj: {}, //
      list: [], //每页数据集合
      total: 0,
      multipleSelection: []

    }
  },
  created() {
    this.getList()
  },
  methods: {
    //用于获取已选择复选框的内容
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },

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
    removeDataById(id) {
      this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //确定执行then方法
        hospset.deleteHsopSet(id)
          .then(response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(1)

          })

      })
      // 在删除我们的数据前应该有一个弹窗

    },
    //批量删除
    removeRows() {
      this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { //确定执行then方法
        var idList = []

        for (var i = 0; i < this.multipleSelection.length; i++) {

          idList.push(this.multipleSelection[i].id)

        }
        console.log(idList)

        hospset.batchHospSet(idList)
          .then(response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新页面
            this.getList(1)

          })

      })

    },
    //锁定和取消锁定
    lockHospSet(id, status) {
      //改变状态
      hospset.lockHospSet(id, status)
        .then(response => {
          //重新刷新页面
          this.getList(this.current)
        })

    }

  }
}
</script>

<style scoped>

</style>
