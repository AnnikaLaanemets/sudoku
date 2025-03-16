import { atom } from 'jotai'
import { useAtom } from 'jotai'
import { useInterval } from './useInterval'

const isActiveAtom = atom(true)
const elapsedSecondsAtom = atom(0)

const useTimer = (id?: string) => {
  const [isActive, setIsActive] = useAtom(isActiveAtom)
  const [elapsedSeconds, setElapsedSeconds] = useAtom(elapsedSecondsAtom)

  useInterval(() => {
    if (isActive && id === 'main') {
      setElapsedSeconds(elapsedSeconds + 1)
    }
  }, 1000)

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resume = () => {
    setIsActive(true)
  }

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setIsActive(true)
    setElapsedSeconds(0)
  }

  return {
    isActive,
    elapsedSeconds,
    pauseTimer,
    resume,
    reset,
    toggle,
  }
}

export { useTimer }