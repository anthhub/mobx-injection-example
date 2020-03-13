import { observable } from 'mobx'
import { store } from 'mobx-injection'

// 全局store 作用scope为application 即全局有效
@store('application')
export class GlobalStore {
  @observable username = 'Jack'

  // 记录操作次数 全局使用
  @observable operateCounter = 0

  plus = () => {
    this.operateCounter++
  }
}
