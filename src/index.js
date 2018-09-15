import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

const Index = () => {
	return (
		<div>
			<Header/>
			<Main/>
			<Sidebar/>
			<Footer/>
		</div>
	)
}

ReactDOM.render(<Index />, document.getElementById('root'));
