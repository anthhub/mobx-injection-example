import { action, observable } from 'mobx'
import { PlainObject, storeOptionsSymbol, Options } from '../core/meta'
import { ignore } from 'mobx-sync'

type KVProps<K extends keyof T, T> = Pick<T, K> & PlainObject

type PropsCb<K extends keyof T, T> = ((store: T) => KVProps<K, T>) | KVProps<K, T>

let propsMergedQueue: any = []

const MAX_THERHOLD = 20

export default abstract class StoreBase<T = PlainObject> {
  @ignore
  private isBatchingUpdates = false

  @observable private actionStack: any[] = []

  @observable private cursor = 0

  @action.bound
  private handleTimeTravel(propsCb: any) {
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

      this.actionStack.push(propsCb)
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
    const step = this.actionStack[index]
    this.updater(step)
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
  setPropsForce<K extends keyof T>(propsCb: PropsCb<K, T>): KVProps<K, T> {
    const self = (this as unknown) as T
    const rs = typeof propsCb === 'function' ? propsCb(self) : propsCb
    this.updater(rs)
    this.handleTimeTravel(rs)
    return rs
  }

  @action.bound
  setProps<K extends keyof T>(propsCb: PropsCb<K, T>): Promise<KVProps<K, T>> {
    this.isBatchingUpdates = true
    propsMergedQueue.push(propsCb)

    const self = (this as unknown) as T

    return new Promise(resolve => {
      setTimeout(() => {
        if (!this.isBatchingUpdates) {
          return
        }
        this.isBatchingUpdates = false

        const propsMergedObject = propsMergedQueue.reduce((res: PlainObject, cur: PropsCb<K, T>, index: number) => {
          if (typeof cur === 'function' && index !== 0) {
            this.updater(res)
            this.handleTimeTravel(res)
          }
          const rs = { ...res, ...(typeof cur === 'function' ? cur(self) : cur) }

          if (typeof cur === 'function' && index !== propsMergedQueue.length - 1) {
            this.updater(rs)
            this.handleTimeTravel(rs)
          }
          return rs
        }, {})

        this.updater(propsMergedObject)

        propsMergedQueue = []
        resolve(propsMergedObject)
      })
    })
  }

  @action.bound
  private updater(updaterObject: PlainObject) {
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
