export default {
  	name: 'store',
  	save (key, val) {																//保存
	    window.localStorage.setItem(key, JSON.stringify(val))
	},
	fetch (key) {																	//抓取
		return JSON.parse(window.localStorage.getItem(key) || '[]')
	},
	remove (key) {																	//删除
	    window.localStorage.removeItem(key)
	},
	clear () {																		//清空
	    window.localStorage.clear()
	},

//	sessionStorage 临时会话保存
	sessionSave (key, val) {														//保存
	    window.sessionStorage.setItem(key, JSON.stringify(val))
	},
	sessionFetch (key) {															//抓取
		return JSON.parse(window.sessionStorage.getItem(key) || '[]')
	},
	sessionRemove (key) {															//删除
	    window.sessionStorage.removeItem(key)
	},
	sessionClear () {																//清空
	    window.sessionStorage.clear()
	},
}