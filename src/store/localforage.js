import localforage from 'localforage'
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

localforage.defineDriver(cordovaSQLiteDriver)
  .then(() => {
    localforage.setDriver([
      cordovaSQLiteDriver._driver,
      localforage.LOCALSTORAGE
    ])
  })

export default (userId = 'system') => localforage.createInstance({
  name: userId
})
