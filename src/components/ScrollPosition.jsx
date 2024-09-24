import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ScrollPosition = () => {
	const { status } = useSelector(state => state.comments)

	useEffect(() => {
		if (status === 'succeeded') {
			const savedScrollPosition = localStorage.getItem('scrollPosition')
			if (savedScrollPosition) {
				requestAnimationFrame(() => {
					const maxScroll =
						document.documentElement.scrollHeight - window.innerHeight
					const scrollPosition = Math.min(
						parseInt(savedScrollPosition, 10),
						maxScroll
					)
					window.scrollTo(0, scrollPosition)
				})
			}
		}
	}, [status])

	useEffect(() => {
		const handleScroll = () => {
			localStorage.setItem('scrollPosition', window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return null
}

export default ScrollPosition
