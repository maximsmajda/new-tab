import React from 'react'

function Shortcut(props) {

	const checkLink = (link) => {
		if (link.slice(0, 4) === 'http')
			return link

		return "http://" + link
	}

	return (
		<div className='shortcut-item-wrapper'>
			<span className={`delete-button ${props.colorMode}`} onClick={() => {props.deleteShortcut(props.id)}}>
				+
			</span>
			<a href={checkLink(props.link)} className={`shortcut-item ${props.colorMode}`}>
				<h1>{props.name[0].toUpperCase()}</h1>
				<p>{props.name}</p>
			</a>
		</div>
	)
}

export default Shortcut