import { observable } from 'mobx'
import { store } from 'mobx-injection'


@store('session')
export class CounterStore2 {
  @observable counter = 0

  increment = () => {
    this.counter += 100
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: CounterStore -> increment ->  this.counter', this.counter)
  }
  decrement = () => {
    this.counter -= 100
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: CounterStore -> decrement -> this.counter', this.counter)
  }
  incrementAsync = () => {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }

  __destroy() {}
}
