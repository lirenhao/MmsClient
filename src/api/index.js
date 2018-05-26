import Vue from 'vue'
import 'es6-promise/auto'
import axios from 'axios'
import store from '../vuex/store'
import router from '../router'
import * as consts from './constants'
import localforage from '../store/localforage'

axios.interceptors.request.use(
  config => {
    store.commit('UPDATE_LOADING', true)
    if (window.localStorage.token)
      config.headers.common['token'] = window.localStorage.token
    return config
  },
  err => {
    console.log('request', err)
    store.commit('UPDATE_LOADING', false)
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    store.commit('UPDATE_LOADING', false)
    return response
  },
  err => {
    store.commit('UPDATE_LOADING', false)
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.push({
            name: 'login'
          })
          break
        case 403:
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: err.response.data.respMsg
          })
          break
        default:
          console.log(err.response.status, err.response.data)
      }
    } else {
      Vue.$vux.toast.show({
        type: 'warn',
        position: 'default',
        text: '网络异常'
      })
    }
    return Promise.reject(err)
  })

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {type: mimeString})
}

export default {
  login: function (userName, passWord) {
    const params = new URLSearchParams()
    params.append('loginName', userName)
    params.append('pwd', passWord)
    store.commit('UPDATE_LOADING', true)
    axios.post(consts.LOGIN, params)
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data.respCode === '00') {
            window.localStorage.setItem('id', resp.data.content.id)
            window.localStorage.setItem('token', resp.data.content.token)
            router.go(-1)
            this.getParams()
          } else {
            store.commit('UPDATE_LOADING', false)
            Vue.$vux.toast.show({
              type: 'warn',
              position: 'default',
              text: resp.data.respMsg
            })
          }
        } else {
          store.commit('UPDATE_LOADING', false)
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: resp.status
          })
        }
      })
      .catch(() => {
        store.commit('UPDATE_LOADING', false)
        Vue.$vux.toast.show({
          type: 'warn',
          position: 'default',
          text: '发送失败'
        })
      })
  },
  getParams: function () {
    return axios.post(consts.PARAMS)
      .then((resp) => {
        const data = resp.data
        if (data.respCode === '00') {
          localforage().setItem('params', data.content)
            .then(() => {
              Vue.$vux.toast.show({
                type: 'success',
                position: 'default',
                text: '参数更新完成'
              })
            })
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: data.respMsg
          })
        }
      })
  },
  getWorkInfoList: function () {
    return axios.post(consts.WORK_INFO_LIST)
      .then((resp) => {
        console.log(resp)
        const data = resp.data
        if (data.respCode === '00') {
          return data.content
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: data.respMsg
          })
        }
      })
  },
  getAlTermList: function (workId) {
    const params = new URLSearchParams()
    params.append('workId', workId)
    return axios.post(consts.WORK_TERM_LIST, params)
      .then(resp => {
        console.log(resp)
        if (resp.data.respCode === '00') {
          return resp.data.content
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: resp.data.respMsg
          })
        }
      })
  },
  getAlUserList: function () {
    return axios.post(consts.WORK_USER_LIST)
      .then(resp => {
        console.log(resp)
        if (resp.data.respCode === '00') {
          return resp.data.content
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: resp.data.respMsg
          })
        }
      })
  },
  workAllocate: function (workId, userId, termNos) {
    const params = new URLSearchParams()
    params.append('workId', workId)
    params.append('userId', userId)
    params.append('termNos', termNos)
    return axios.post(consts.WORK_INFO_ALLOCATE, params)
      .then(resp => {
        console.log(resp)
      })
  },
  getWorkReList: function () {
    return axios.post(consts.WORK_RECEIPT_LIST)
      .then((resp) => {
        console.log(resp)
        const data = resp.data
        if (data.respCode === '00') {
          const work = {}
          data.content.forEach(item => {
            work[item.workId + item.termNo] = item
          })
          localforage(window.localStorage.id).setItem('work', work)
            .then(() => {
              Vue.$vux.toast.show({
                type: 'success',
                position: 'default',
                text: '下载成功'
              })
            })
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: data.respMsg
          })
        }
      })
  },
  workReceipt: function (data, images = [], devNos = {}) {
    const params = new FormData();
    Object.keys(data).forEach(key => {
      params.append(key, data[key])
    })
    images.forEach((img, index) => {
      params.append('images', dataURItoBlob(img), data.termNo + '-' + index)
    })
    Object.keys(devNos).forEach(key => {
      params.append('devTypes', key)
      params.append('devNos', devNos[key])
    })
    return axios.post(consts.WORK_INFO_RECEIPT, params)
      .then(resp => {
        console.log(resp)
        if (resp.data.respCode === '00') {
          // 成功后删除本地
          localforage(window.localStorage.id).getItem('receipt')
            .then(ld => {
              ld = ld || {}
              delete ld[data.workId + data.termNo]
              localforage(window.localStorage.id).setItem('receipt', ld)
            })
            .then(() => {
              Vue.$vux.toast.show({
                type: 'success',
                position: 'default',
                text: '回执成功'
              })
            })
            .catch(() => {
              Vue.$vux.toast.show({
                type: 'success',
                position: 'default',
                text: '回执失败'
              })
            })
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: resp.data.respMsg
          })
        }
      })
  },
  saveReceipt: function (params, images = [], devNos = {}) {
    const id = window.localStorage.id
    localforage(id).getItem('receipt')
      .then(ld => {
        ld = ld || {}
        ld[params.workId + params.termNo] = {params, images, devNos}
        localforage(id).setItem('receipt', ld)
      })
      .then(() => {
        Vue.$vux.toast.show({
          type: 'success',
          position: 'default',
          text: '保存成功'
        })
      })
      .catch(() => {
        Vue.$vux.toast.show({
          type: 'success',
          position: 'default',
          text: '保存失败'
        })
      })
  }
}
