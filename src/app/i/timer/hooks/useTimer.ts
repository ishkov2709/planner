import { useEffect, useState } from 'react'

import { IPomodoroRoundResponse } from '@/types/pomodoro.types'

import { useLoadSettings } from './useLoadSettings'

export function useTimer() {
	const { workInterval, breakInterval } = useLoadSettings()

	const [isRunning, setIsRunning] = useState(false)
	const [isBreakTime, setIsBreakTime] = useState(false)

	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null
		setSecondsLeft(secondsLeft => secondsLeft - 1)
		if (isRunning) {
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return

		setIsBreakTime(!isBreakTime)
		setSecondsLeft(isBreakTime ? workInterval : breakInterval * 60)
	}, [secondsLeft, isBreakTime, workInterval, breakInterval])

	return {}
}
