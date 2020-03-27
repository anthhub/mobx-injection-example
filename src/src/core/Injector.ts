import { Constructor, PlainObject, storeScopeTypeSymbol, storeOptionsSymbol, Options } from './meta'
import { AsyncTrunk } from 'mobx-sync'
import { getUrlRelativePath, getClassName, hashCode } from './utils'

export type Scope = 'application' | 'session'

const MAX_THRESHOLD = 5

let cachedInjector: Injector

const keyPrefix = hashCode('mobx-injection')

export const getInjector = () => {
  return cachedInjector || (cachedInjector = Injector.newInstance())
}

class Injector {
  private readonly appContainer = new Map()

  private readonly sessContainer = new Map()

  private storeKeyList: string[] = []

  private constructor() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) //获取本地存储的Key
      if (key && key.includes(String(keyPrefix))) {
        this.storeKeyList.push(key)
      }
    }
  }

  static newInstance() {
    return new Injector()
  }

  clearSession() {
    this.sessContainer.clear()
  }

  get<T>(InjectedStoreClass: Constructor<T>, arg: PlainObject = {}): T {
    const scope: Scope = (InjectedStoreClass as any)[storeScopeTypeSymbol]
    const { persist = false, timeTravel = false }: Options = (InjectedStoreClass as any)[storeOptionsSymbol]

    let instance: any

    let container = scope === 'session' ? this.sessContainer : this.appContainer

    const curPath = getUrlRelativePath()

    const className = getClassName(InjectedStoreClass)

    const keyPostfix = scope === 'session' ? curPath : ''

    let key = `${keyPrefix}@${className}@${hashCode(InjectedStoreClass.toString())}@${keyPostfix}`

    instance = container.get(key)
    if (!instance) {
      instance = new InjectedStoreClass(arg)

      instance[storeOptionsSymbol] = { persist, timeTravel }
      instance[storeScopeTypeSymbol] = scope

      // 删除旧版本
      const reg = new RegExp(`${keyPrefix}@${className}@.*?@${keyPostfix}`, 'g')
      this.storeKeyList = this.storeKeyList
        .map(keyStr => {
          if (reg.test(keyStr) && keyStr !== key) {
            localStorage.removeItem(keyStr)
            keyStr = ''
          }
          return keyStr
        })
        .filter(Boolean)

      let expKey = ''
      const storeCount = [...this.storeKeyList].reverse().reduce((res, cur) => {
        const reg = new RegExp(`${keyPrefix}@${className}@${hashCode(InjectedStoreClass.toString())}@.*`, 'g')
        if (reg.test(cur)) {
          res++
          expKey = cur
        }
        return res
      }, 0)

      if (persist) {
        if (storeCount >= MAX_THRESHOLD) {
          // 删除最前面的
          localStorage.removeItem(expKey)

          this.storeKeyList = this.storeKeyList.filter(keyStr => expKey !== keyStr)
        }

        const trunk = new AsyncTrunk(instance, { storage: localStorage, storageKey: key })

        trunk.init().then(() => {
          Object.keys(arg).forEach((key: string) => {
            instance[key] = arg[key]
          })
        })

        trunk.onError((err: any) => {
          console.error('%c%s', 'color: red', err)
        })

        if (!this.storeKeyList.includes(key)) {
          this.storeKeyList.push(key)
        }
      } else {
        Object.keys(arg).forEach((key: string) => {
          instance[key] = arg[key]
        })
      }

      container.set(key, instance)
    }

    return instance
  }
}
