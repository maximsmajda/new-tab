import {ReactComponent as DayIcon} from '../assets/day-icon.svg'
import {ReactComponent as NightIcon} from '../assets/night-icon.svg'

function ColorMode(props) {
  return (
	<div className='color-toggle-wrapper' onClick={() => {props.handleColorMode()}}>
		{props.colorMode === 'light' ? <DayIcon /> : <NightIcon />}
	</div>
  )
}

export default ColorMode