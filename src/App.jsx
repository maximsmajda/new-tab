import { useState, useEffect } from "react"

import Time from "./components/Time"
import Weather from "./components/Weather"
import Notes from "./components/notes/Notes"
import Shortcuts from "./components/shortcuts/Shortcuts"
import ColorMode from "./components/ColorMode"

function App() {
	const [colorMode, setColorMode] = useState(localStorage.getItem("colorMode") || "light")

	useEffect(() => {
		localStorage.setItem("colorMode", colorMode)
	}, [colorMode])

	const handleColorMode = () => {
		if (colorMode === "light")
      setColorMode("dark")
		else
      setColorMode("light")
	}

	return (
		<div className={`app ${colorMode}`}>
			<div className="header">
				<Time />
				<ColorMode colorMode={colorMode} handleColorMode={handleColorMode} />
			</div>
			<div className="main">
				<div className="widgets">
					<Weather colorMode={colorMode} />
					<Notes colorMode={colorMode} />
				</div>
				<Shortcuts colorMode={colorMode} />
			</div>
		</div>
	)
}

export default App
