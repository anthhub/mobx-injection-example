import { Constructor } from './meta'

export const getUrlRelativePath = () => {
  const url = document.location.toString()
  const arrUrl = url.split('//')

  const start = arrUrl[1].indexOf('/')
  let relUrl = arrUrl[1].substring(start)

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl
}

export const hashCode = (str: string) => {
  if (Array.prototype.reduce) {
    return str.split('').reduce(function(a, b) {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)
  }
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i)
    hash = (hash << 5) - hash + character
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

export const getClassName = (clazz: Constructor<any>) => {
  const classStr = clazz.toString()

  const [, name1] = classStr.match(/class\s*(\w*).*{/) || []

  const [, name2] = classStr.match(/function\s*([^(]*)\(/) || []

  return name1 || name2 || ''
}
