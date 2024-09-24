import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddComment from './components/AddComment'
import CommentsList from './components/CommentsList'
import ScrollPosition from './components/ScrollPosition'
import store from './store/index'

const App = () => {
	return (
		<Provider store={store}>
			<ScrollPosition />
			<div className='container mx-auto p-4'>
				<h1 className='text-2xl font-bold mb-4'>Comments</h1>
				<AddComment />
				<CommentsList />
				<ToastContainer />
			</div>
		</Provider>
	)
}

export default App
