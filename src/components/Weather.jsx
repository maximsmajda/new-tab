import React, { useState, useEffect } from "react"

function Weather(props) {
	const [lat, setLat] = useState(null)
	const [lon, setLon] = useState(null)
	const [data, setData] = useState(JSON.parse(localStorage.getItem("weatherData")) || null)
	const [lastUpdate, setLastUpdate] = useState(localStorage.getItem("lastUpdate") || null)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLat(position.coords.latitude)
			setLon(position.coords.longitude)
		})
	}, [])

	useEffect(() => {
		localStorage.setItem("lastUpdate", lastUpdate)
		localStorage.setItem("weatherData", JSON.stringify(data))
	}, [data, lastUpdate])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal
		
		const fetchData = async () => {
			await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
				{ signal }
			)
				.then((res) => res.json())
				.then((data) => {
					setData(data)
					setLastUpdate(new Date())
				})
				.catch(err => {
					console.log(err)
				})
		}
		console.log("hhhh")
		if (lat !== null && (!lastUpdate || (lastUpdate && (Math.abs(new Date() - new Date(lastUpdate)) > (30 * 60 * 1000)))))
			fetchData()

		return () => {
			controller.abort()
		}

	}, [lat, lon, lastUpdate])

	return (
		<div className={`weather component ${props.colorMode}`}>
			{data !== null ? (
				<>
					<div className={`current ${props.colorMode}`}>
						<div>
							<h1>{data.city.name}</h1>
							<h3>
								<span>{Math.round(data.list[0].main.temp)}ºC</span>
								{data.list[0].weather[0].description}
							</h3>
						</div>
						<img
							id="wicon"
							src={`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`}
							alt="Weather icon"
						></img>
					</div>
					<ul className="forecast">
						{data.list.slice(1).map((item, i) => {
							const d = new Date(item.dt_txt)
							return (
								<li key={i} className="forecast-item">
									<span className="day">
										{d.toLocaleString("en-us", { weekday: "short" })}
									</span>
									<span className="time">
										{d.getHours() + ":" + d.getMinutes() + "0"}
									</span>
									<span className="temp">{Math.round(item.main.temp)}ºC</span>
								</li>
							)
						})}
					</ul>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	)
}

export default Weather
