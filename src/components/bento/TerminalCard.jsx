import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const commands = [
  { cmd: 'ho va ten ', output: 'Vu Dinh Khu' },
  { cmd: 'ngay sinh', output: '07/11/2008' },
  { cmd: 'que quan ', output: 'Bac Ninh , Viet Nam' },
  { cmd: 'so thich', output: 'xem phim nghe nhac va choi game ' },
  { cmd: 'ls skills/', output: 'desgin website , html , idaprox64 ...' },
]

export default function TerminalCard() {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLine >= commands.length) return

    const command = commands[currentLine]
    const fullText = `$ ${command.cmd}\n${command.output}`
    
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    } else if (displayedText.length === fullText.length) {
      const timeout = setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setCurrentLine(prev => (prev + 1) % commands.length)
          setDisplayedText('')
          setIsTyping(true)
        }, 1000)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [displayedText, currentLine, isTyping])

  return (
    <div className="h-full bg-green-950/40 backdrop-blur-xl rounded-2xl p-5 border border-green-700/50 font-mono overflow-hidden hover:border-green-600 transition-all shadow-lg hover:shadow-xl hover:shadow-green-900/50 relative group">
      {/* Hiệu ứng chữ chảy từ trên xuống (Matrix style) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400 text-xs whitespace-nowrap"
            initial={{ y: -100, x: i * 30 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            {Array(20).fill('01').join(' ')}
          </motion.div>
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`special-${i}`}
            className="absolute text-green-300 text-xs whitespace-nowrap"
            initial={{ y: -50, x: 200 + i * 50 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: 8 + i * 3,
              repeat: Infinity,
              delay: i,
              ease: "linear"
            }}
          >
            {'>_'} {'{...}'} {'</>'} {'() =>'}
          </motion.div>
        ))}
      </div>

      {/* Thêm hiệu ứng sáng màu xanh */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"
        animate={{ 
          y: ['-100%', '100%'],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Terminal Content */}
      <div className="text-xs h-full flex flex-col relative z-10">
        <div className="text-green-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="tracking-wider">vudinhkhu@portfolio:~</span>
          <span className="text-green-600/50 text-[10px]">[MATRIX MODE]</span>
        </div>
        <pre className="text-green-300 whitespace-pre-wrap flex-1 font-mono">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1.5 h-3 bg-green-400 ml-0.5"
          />
        </pre>
      </div>
    </div>
  )
}