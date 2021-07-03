import { useState, useEffect } from 'react'

const useDebounceEffect = (value, timeout) => {
  const [state, setState] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setState(value), timeout)
    return () => {
      clearTimeout(timer)
    }
  }, [value, timeout])

  return state
}

export { useDebounceEffect }
