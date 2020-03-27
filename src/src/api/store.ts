import { storeScopeTypeSymbol, Options, storeOptionsSymbol } from '../core/meta'
import { Scope } from '../core/Injector'

export default (scope: Scope = 'application', options: Options = { persist: false, timeTravel: false }) => <T>(target: T): T => {
  ;(target as any)[storeScopeTypeSymbol] = scope
  ;(target as any)[storeOptionsSymbol] = options
  console.log('%c%s', 'color: #259b24', 'ANTH LOG: target store', target)

  return target
}
