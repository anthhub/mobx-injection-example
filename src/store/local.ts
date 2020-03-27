import 'reflect-metadata'

import { observable } from 'mobx'

import { GlobalStore } from './global'

import StoreBase from '../src/api/StoreBase'
import { store, injection } from '../src'

// 业务store 作用scope为session 即用即销 即它的创建者销毁, 随之销毁; 下次再次使用不会留下上次使用残留的数据

@store('session', { persist: true })
export class LocalStore extends StoreBase<LocalStore> {
  @injection(GlobalStore, () => {
    debugger
    return {}
  })
  globalStore!: GlobalStore

  // 计数业务
  @observable
  counter = 0

  increment = () => {
    this.counter++
    this.globalStore.plus()
  }

  init() {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: LocalStore -> init -> init 类的初始化')
  }

  constructor() {
    super()
    this.init()
  }
}
