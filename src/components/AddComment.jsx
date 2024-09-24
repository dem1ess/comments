import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAddComment } from '../store/slices/comments'

const AddComment = () => {
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()

	useEffect(() => {
		const savedComment = localStorage.getItem('unsavedComment')
		if (savedComment) {
			setComment(savedComment)
		}
	}, [])

	const handleCommentChange = e => {
		setComment(e.target.value)
		localStorage.setItem('unsavedComment', e.target.value)
	}
	const handleSubmit = () => {
		dispatch(fetchAddComment({ body: comment, postId: 6, userId: 1 }))
		setComment('')
		localStorage.removeItem('unsavedComment')
	}

	return (
		<div className='mt-4'>
			<textarea
				value={comment}
				onChange={handleCommentChange}
				placeholder='Add your comment'
				className='w-full p-2 border'
			/>
			<button
				onClick={handleSubmit}
				className='mt-2 bg-blue-500 text-white p-2'
			>
				Add Comment
			</button>
		</div>
	)
}

export default AddComment
