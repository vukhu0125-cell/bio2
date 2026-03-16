import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

export default function WeatherCard() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Tọa độ của Bắc Ninh, Việt Nam
        const BAC_NINH_LAT = '21.1861'  // Vĩ độ Bắc Ninh
        const BAC_NINH_LON = '106.0763' // Kinh độ Bắc Ninh
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${BAC_NINH_LAT}&longitude=${BAC_NINH_LON}&current=temperature_2m,weather_code&timezone=Asia%2FBangkok`
        )
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Weather code mapping (WMO Weather interpretation codes)
        const getWeatherDescription = (code) => {
          const weatherCodes = {
            0: 'Trời quang',
            1: 'Trời trong',
            2: 'Có mây nhẹ',
            3: 'Nhiều mây',
            45: 'Có sương mù',
            48: 'Sương muối',
            51: 'Mưa phùn nhẹ',
            53: 'Mưa phùn vừa',
            55: 'Mưa phùn nặng hạt',
            61: 'Mưa nhỏ',
            63: 'Mưa vừa',
            65: 'Mưa to',
            71: 'Tuyết nhẹ',
            73: 'Tuyết vừa',
            75: 'Tuyết dày',
            77: 'Tuyết hạt',
            80: 'Mưa rào nhẹ',
            81: 'Mưa rào vừa',
            82: 'Mưa rào to',
            85: 'Tuyết rào nhẹ',
            86: 'Tuyết rào dày',
            95: 'Có dông',
            96: 'Dông kèm mưa đá nhẹ',
            99: 'Dông kèm mưa đá to'
          }
          return weatherCodes[code] || 'Không xác định'
        }

        // Convert weather code to icon number
        const getWeatherIcon = (code) => {
          if (code === 0 || code === 1) return 800 // Clear
          if (code === 2 || code === 3) return 801 // Clouds
          if (code === 45 || code === 48) return 741 // Fog
          if (code >= 51 && code <= 55) return 300 // Drizzle
          if (code >= 61 && code <= 65) return 500 // Rain
          if (code >= 71 && code <= 77) return 600 // Snow (cho Bắc Ninh hiếm nhưng giữ)
          if (code >= 80 && code <= 82) return 521 // Rain showers
          if (code >= 85 && code <= 86) return 621 // Snow showers
          if (code >= 95 && code <= 99) return 200 // Thunderstorm
          return 801
        }

        const weatherCode = data.current.weather_code
        
        // Format to match expected structure
        const formatted = {
          Temperature: {
            Metric: {
              Value: Math.round(data.current.temperature_2m),
              Unit: 'C'
            }
          },
          WeatherText: getWeatherDescription(weatherCode),
          WeatherIcon: getWeatherIcon(weatherCode)
        }
        
        setWeather(formatted)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather:', error)
        setLoading(false)
      }
    }

    fetchWeather()
    // Cập nhật mỗi 30 phút
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconNumber) => {
    if (iconNumber >= 200 && iconNumber < 300) return <WiThunderstorm size={32} />
    if (iconNumber >= 300 && iconNumber < 600) return <WiRain size={32} />
    if (iconNumber >= 600 && iconNumber < 700) return <WiSnow size={32} />
    if (iconNumber >= 700 && iconNumber < 800) return <WiFog size={32} />
    if (iconNumber === 800) return <WiDaySunny size={32} />
    if (iconNumber > 800) return <WiCloudy size={32} />
    return <WiCloudy size={32} />
  }

  if (loading) {
    return (
      <div className="h-full bg-zinc-900/20 backdrop-blur-xl rounded-2xl p-4 border border-zinc-800/50 flex items-center justify-center shadow-lg">
        <div className="text-zinc-500 text-xs">Đang tải...</div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="h-full bg-zinc-900/20 backdrop-blur-xl rounded-2xl p-4 border border-zinc-800/50 flex items-center justify-center shadow-lg">
        <div className="text-zinc-500 text-xs">Không có dữ liệu</div>
      </div>
    )
  }

  return (
    <motion.div 
      className="h-full bg-zinc-900/20 backdrop-blur-xl rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-all shadow-lg hover:shadow-xl hover:shadow-zinc-900/50 flex items-center justify-between relative overflow-hidden group"
      whileHover={{ scale: 1.02 }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Weather-specific gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-50" />
      
      <div className="relative z-10 flex items-center justify-between w-full">
      <div>
        <p className="text-zinc-500 text-xs mb-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Bắc Ninh, Việt Nam
        </p>
        <motion.p 
          className="text-white text-2xl font-bold"
          key={weather.Temperature?.Metric?.Value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {Math.round(weather.Temperature?.Metric?.Value || 0)}°C
        </motion.p>
        <p className="text-zinc-400 text-xs mt-1">{weather.WeatherText}</p>
      </div>
      <motion.div 
        className="text-zinc-400"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {getWeatherIcon(weather.WeatherIcon)}
      </motion.div>
      </div>
    </motion.div>
  )
}