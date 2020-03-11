import { Constructor, PlainObject } from './meta'

export type Scope = 'application' | 'session'

export type InjectionOptions = {
  name: string
  scope: Scope
}

// store 创建者占位map
export const storeCreaterMap = new WeakMap()

let cachedInjector: Injector

export function getInjector() {
  return cachedInjector || (cachedInjector = Injector.newInstance())
}

class Injector {
  private readonly container: WeakMap<any, any>

  private constructor(container?: WeakMap<any, any>) {
    this.container = container || new WeakMap()
  }

  static newInstance(container?: WeakMap<any, any>) {
    return new Injector(container)
  }

  get<T>(InjectedStoreClass: Constructor<T>, scope: Scope = 'application', arg: PlainObject = {}): T {
    let instance: any

    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> this.container,', this.container)
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: storeCreaterMap', storeCreaterMap)

    switch (scope) {
      case 'application':
        instance = this.container.get(InjectedStoreClass)
        if (!instance) {
          instance = new InjectedStoreClass(arg)
          Object.keys(arg).forEach((key: string) => {
            instance[key] = arg[key]
          })
          this.container.set(InjectedStoreClass, instance)
        }
        break

      case 'session':
        const comp = storeCreaterMap.get(InjectedStoreClass)
        console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> comp', { comp })

        instance = this.container.get(comp)
        if (!instance) {
          instance = new InjectedStoreClass(arg)
          Object.keys(arg).forEach((key: string) => {
            instance[key] = arg[key]
          })
          this.container.set(comp, instance)
        }
        break
    }
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: storeCreaterMap', storeCreaterMap)
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> this.container,', this.container)

    return instance
  }
}
