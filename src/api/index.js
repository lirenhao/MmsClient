import Vue from 'vue'
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
    }
    return Promise.reject(err)
  })

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
            window.localStorage.setItem('token', resp.data.content)
            router.push({
              name: 'home'
            })
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
  getWorkInfoShow: function (id) {
    const params = new URLSearchParams()
    params.append('workId', id)
    return axios.post(consts.WORK_INFO_SHOW, params)
      .then(resp => {
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
          return data.content
        } else {
          Vue.$vux.toast.show({
            type: 'warn',
            position: 'default',
            text: data.respMsg
          })
        }
      })
  }
}
