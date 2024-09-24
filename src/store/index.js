import { configureStore } from '@reduxjs/toolkit'
import { commentsReducer } from './slices/comments'

const persistedState = localStorage.getItem('comments')
	? JSON.parse(localStorage.getItem('comments'))
	: undefined

const store = configureStore({
	preloadedState: persistedState ? { comments: persistedState } : {},
	reducer: {
		comments: commentsReducer,
	},
})

store.subscribe(() => {
	localStorage.setItem('comments', JSON.stringify(store.getState().comments))
})

export default store
