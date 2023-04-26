import request from '@/utils/request'

export default {
  // 医院设置列表方法
  getHospSetList(current,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj  //使用json格式进行传递
    })
  },
  // 删除医院
  deleteHsopSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete',

    })

  },
  // 批量删除的方法
  batchHospSet(idList){
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data: idList
    })

  },
  //锁定和取消锁定
  lockHospSet(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospSet/${id}/${status}`,
      method: 'put',

    })
  },

  //添加医院设置
  saveHospitalSet(hosptialSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hosptialSet
    })
  },

  //医院设置id查询
  getHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: 'get'
    })
  },
  //修改医院设置
  updataHospSet(hospitalSet){
    return request({
      url: '/admin/hosp/hospitalSet/updateHospitalSet',
      method: 'post',
      data: hospitalSet
    })

  }




}

