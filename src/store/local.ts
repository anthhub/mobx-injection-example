import { observable } from 'mobx'

import { GlobalStore } from './global'
import { store } from '../lib'


// 业务store 作用scope为session 即用即销 即它的创建者销毁, 随之销毁; 下次再次使用不会留下上次使用残留的数据
@store('session')
export class LocalStore {
  // @injection(GlobalStore)
  // globalStore!: GlobalStore

  // 计数业务
  @observable counter = 0

  increment = () => {
    this.counter++
    // this.globalStore.plus()
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: LocalStore -> increment -> this.counter', this.counter)
  }
}
