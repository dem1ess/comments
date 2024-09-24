import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { instance } from '../../services/api'

export const fetchAddComment = createAsyncThunk(
	'comments/addComment',
	async ({ body, postId, userId }) => {
		const { data } = await instance.post('/comments/add', {
			body,
			postId,
			userId,
		})
		console.log(data)
		return data
	}
)

export const fetchComments = createAsyncThunk(
	'comments/getComments',
	async () => {
		const { data } = await instance.get('/comments')
		console.log(data)
		return data
	}
)

export const fetchDeleteComment = createAsyncThunk(
	'comments/deleteComment',
	async commentId => {
		const { data } = await instance.delete(`/comments/${commentId}`)
		console.log(data)
		return data
	}
)

const initialState = {
	comments: [],
	status: 'idle',
	error: null,
}

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAddComment.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchAddComment.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.comments.push(action.payload)
				toast.success('Comment added successfully!')
			})
			.addCase(fetchAddComment.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
				toast.error('Failed to add comment')
			})
			.addCase(fetchComments.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.comments = action.payload.comments
			})
			.addCase(fetchComments.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(fetchDeleteComment.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchDeleteComment.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.comments = state.comments.filter(
					comment => comment.id !== action.meta.arg
				)
				toast.success('Comment deleted successfully!')
			})
			.addCase(fetchDeleteComment.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
				toast.error('Failed to delete comment')
			})
	},
})

export const commentsReducer = commentsSlice.reducer
