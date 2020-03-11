import React from 'react'

// import React from 'react'
// import { storesQueueSymbol } from '../core/meta'

// import { storeCreaterMap } from '../core/Injector'

// export default <T extends new (...args: any[]) => React.Component>(WrappedComponent: T) => {
//   return class extends WrappedComponent {
//     componentWillUnmount() {
//       if (super.componentWillUnmount) {
//         super.componentWillUnmount()
//       }

//       const queue: any[] = (this as any)[storesQueueSymbol] || []

//       queue.forEach(item => {
//         const { InjectedStoreClass, scope, selfRef } = item
//         if (storeCreaterMap.get(InjectedStoreClass) === selfRef && scope === 'session') {
//           storeCreaterMap.delete(InjectedStoreClass)
//           item.selfRef = null
//         }
//       })
//     }
//   }
// }

export const pageHooker = (Comp: any) => (...props: any[]) => {
  console.log('%c%s', 'color: #26249b', 'ANTH LOG: pageHooker -> 路由渲染')

  return <Comp {...props} />
}
