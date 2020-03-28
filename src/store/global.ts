import 'reflect-metadata'

import { observable } from 'mobx'
import { store } from '../src'
import StoreBase from '../src/api/StoreBase'

enum GlobalStoreActions {
  change_username = 'change_username',
  change_operateCounter = 'change_operateCounter',
}

// 全局store 作用scope为application 即全局有效
@store('application', { persist: true, timeTravel: true })
export class GlobalStore extends StoreBase<GlobalStore, GlobalStoreActions> {
  @observable username = 'Jack'

  // 记录操作次数 全局使用
  @observable operateCounter = 0

  plus = async () => {
    this.setProps({ operateCounter: ++this.operateCounter }, GlobalStoreActions.change_operateCounter)
    this.setProps({ operateCounter: ++this.operateCounter })
    this.setProps({ operateCounter: ++this.operateCounter, username: this.username + '1' })
  }
}
