import { action, observable } from 'mobx'
import { PlainObject, storeOptionsSymbol, Options } from '../core/meta'
import { ignore } from 'mobx-sync'

type PickProps<T, K extends keyof T> = {
  [P in K]: T[P] extends Function ? never : T[P]
}

type KVProps<K extends keyof T, T> = PickProps<T, K> & PlainObject

type Payload<K extends keyof T, T> = ((store: T) => KVProps<K, T>) | KVProps<K, T>

type Action<K extends keyof T, T> = { type: string; payload: Payload<K, T> }

type PropsAction<K extends keyof T, T> = { type: string; payload: KVProps<K, T> }

let actionsMergedQueue: any[] = []

const MAX_THERHOLD = 20

export default abstract class StoreBase<T = PlainObject, U extends string = string, K extends keyof T = any> {
  @ignore
  private isBatchingUpdates = false

  @observable private actionStack: PropsAction<K, T>[] = []

  @observable private cursor = 0

  @action.bound
  private handleTimeTravel(action: PropsAction<K, T>) {
    const { timeTravel = false }: Options = (this as any)[storeOptionsSymbol]
    if (timeTravel) {
      if (this.actionStack.length >= MAX_THERHOLD) {
        this.actionStack.shift()
      }

      if (this.cursor < 0) {
        const index = this.actionStack.length + this.cursor

        this.actionStack = this.actionStack.slice(0, index)
        this.cursor = 0
      }

      this.actionStack.push(action)
    }
  }

  get canBack() {
    return this.cursor > 1 - this.actionStack.length
  }

  get canForward() {
    return this.cursor < 0
  }

  @action.bound
  private doStep() {
    const index = this.actionStack.length - 1 + this.cursor
    const { payload } = this.actionStack[index]
    this.updater(payload)
  }

  @action.bound
  backStep() {
    if (!this.canBack) {
      return
    }
    this.cursor--
    this.doStep()
  }

  @action.bound
  forwardStep() {
    if (!this.canForward) {
      return
    }
    this.cursor++
    this.doStep()
  }

  @action.bound
  setPropsForce(payload: Payload<K, T>, type?: U): KVProps<K, T> {
    const self = (this as unknown) as T
    const rs = typeof payload === 'function' ? payload(self) : payload
    this.updater(rs)

    this.handleTimeTravel({
      payload: rs,
      type:
        type ||
        `change_${Object.keys(rs)
          .map(key => key)
          .join('_')}`,
    })
    return rs
  }

  @action.bound
  setProps(payload: Payload<K, T>, type?: U): Promise<KVProps<K, T>> {
    this.isBatchingUpdates = true
    const action = { type, payload }

    actionsMergedQueue.push(action)

    const self = (this as unknown) as T

    return new Promise(resolve => {
      setTimeout(() => {
        if (!this.isBatchingUpdates) {
          return
        }
        this.isBatchingUpdates = false

        const propsMergedObject = actionsMergedQueue.reduce((res: KVProps<K, T>, cur: Action<K, T>, index: number) => {
          const { payload, type } = cur

          if (typeof payload === 'function' && index !== 0) {
            this.updater(res)
          }

          const rs = typeof payload === 'function' ? payload(self) : payload

          const payload1 = { ...res, ...rs }

          this.handleTimeTravel({
            payload: payload1,
            type:
              type ||
              `change_${Object.keys(rs)
                .map(key => key)
                .join('_')}`,
          })

          if (typeof payload === 'function' && index !== actionsMergedQueue.length - 1) {
            this.updater(payload1)
          }
          return payload1
        }, {})

        this.updater(propsMergedObject)

        actionsMergedQueue = []
        resolve(propsMergedObject)
      })
    })
  }

  @action.bound
  private updater(updaterObject: KVProps<K, T>) {
    const indexer = (this as unknown) as PlainObject
    Object.keys(updaterObject).forEach(key => {
      const value = updaterObject[key]
      if (!key) {
        throw new Error('Unuseful object!')
      }
      if (typeof value === 'function') {
        throw new Error('Forbid reseting member method of class!')
      }
      indexer[key] = value
    })
  }
}
