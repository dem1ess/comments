import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, fetchDeleteComment } from '../store/slices/comments'

const CommentsList = () => {
	const dispatch = useDispatch()
	const { comments, status, error } = useSelector(state => state.comments)
	useEffect(() => {
		dispatch(fetchComments())
	}, [dispatch])

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'failed') return <div>Error: {error}</div>

	return (
		<div>
			{comments?.map(comment => (
				<div key={comment.id} className='p-4 mb-2 border-b'>
					<p>{comment.body}</p>
					<button
						onClick={() => dispatch(fetchDeleteComment(comment.id))}
						className='text-red-500'
					>
						Delete
					</button>
				</div>
			))}
		</div>
	)
}

export default CommentsList
