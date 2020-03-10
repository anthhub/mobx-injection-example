import { observable } from 'mobx'
import { store } from 'mobx-injection'


@store('application')
export class CounterStore {
  @observable counter = 0
  counterStore = () => {
    this.counter++
  }
  increment = () => {
    this.counter++
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: CounterStore -> increment ->  this.counter', this.counter)
  }
  decrement = () => {
    this.counter--
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: CounterStore -> decrement -> this.counter', this.counter)
  }
  incrementAsync = () => {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }

  __destroy() {}
}
