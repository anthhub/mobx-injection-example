import { Constructor, PlainObject } from './meta'

export type Scope = 'application' | 'session'

let cachedInjector: Injector

export function getInjector() {
  return cachedInjector || (cachedInjector = Injector.newInstance())
}

class Injector {
  private readonly appContainer = new Map()

  private readonly sessContainer = new Map()

  static newInstance() {
    return new Injector()
  }

  clearSession() {
    this.sessContainer.clear()
  }

  get<T>(InjectedStoreClass: Constructor<T>, scope: Scope = 'application', arg: PlainObject = {}): T {
    let instance: any

    let container = scope === 'session' ? this.sessContainer : this.appContainer

    instance = container.get(InjectedStoreClass)
    if (!instance) {
      instance = new InjectedStoreClass(arg)
      Object.keys(arg).forEach((key: string) => {
        instance[key] = arg[key]
      })
      container.set(InjectedStoreClass, instance)
    }
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> this.appContainer', this.appContainer)
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> this.sessContainer', this.sessContainer)
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: Injector -> instance', instance)

    return instance
  }
}
