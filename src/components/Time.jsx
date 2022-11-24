import { useState, useEffect } from "react"

function Time() {
	const [nowdate, setDate] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => setDate(new Date()), 1000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="time">
			<h1>
				{"Good " +
					((nowdate.getHours() < 12 && "Morning") ||
						(nowdate.getHours() < 18 && "Afternoon") ||
						"Evening") +
					"!"}
			</h1>
			<h2>
				<span>
					{nowdate.getHours() +
						":" +
						(nowdate.getMinutes() < 10
							? "0" + nowdate.getMinutes()
							: nowdate.getMinutes())}
				</span>
				{nowdate.getDate() + ". " + nowdate.toLocaleString("en-us", { month: "long" })}
			</h2>
		</div>
	)
}

export default Time
