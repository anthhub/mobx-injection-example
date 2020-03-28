import { storeScopeTypeSymbol, Options, storeOptionsSymbol } from '../core/meta'
import { Scope } from '../core/Injector'

export default (scope: Scope = 'application', options: Options = { persist: false, timeTravel: false }) => <T extends new (...args: any[]) => any>(target: T): T => {
  ;(target as any)[storeScopeTypeSymbol] = scope
  ;(target as any)[storeOptionsSymbol] = options

  console.log('%c%s', 'color: #259b24', 'ANTH LOG: target.prototype', target.prototype)
  for (let key in target.prototype) {
    console.log('%c%s', 'color: #259b24', 'ANTH LOG: key', key)
    if (key) {
      const injectedStores: any[] = Reflect.getMetadata('injectedStores', target.prototype, key)
      console.log('%c%s', 'color: #259b24', 'ANTH LOG: injectedStores store store store', injectedStores)
    }
  }

  return target
}
