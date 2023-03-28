import * as React from 'react'

const Clock = () => {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const hour = time.getHours()
  const clockNumber = hour > 12 ? hour - 12 : hour

  const radius = Math.min(window.innerWidth, window.innerHeight) / 2
  const diameter = radius * 2
  const cx = radius
  const cy = radius

  const secondHandLength = radius * 0.85
  const minuteHandLength = radius * 0.7
  const hourHandLength = radius * 0.6

  const secondHandRotation = time.getSeconds() * 6
  const minuteHandRotation = time.getMinutes() * 6 + secondHandRotation / 60
  const hourHandRotation = (time.getHours() % 12) * 30 + minuteHandRotation / 12
  const fontSize = 52

  return (
    <svg width={diameter} height={diameter}>
      <circle cx={cx} cy={cy} r={radius} fill="#fff" stroke="#000" />
      {[...Array(12)].map((_, i) => {
        const clockHour = i + 1
        const angle = (i + 1) * (Math.PI / 6)
        const distance = radius * 0.8

        return (
          <>
            <line
              x1={cx}
              y1={cy}
              x2={cx + Math.sin(angle) * distance}
              y2={cy - Math.cos(angle) * distance}
              stroke="gray"
              strokeDasharray={i % 3 === 2 ? '0' : '10, 10'}
              strokeWidth={i % 3 === 2 ? 5 : 2}
              strokeLinecap="round"
            />
            <text
              x={cx + Math.sin(angle) * (radius - fontSize)}
              y={cy - Math.cos(angle) * (radius - fontSize)}
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize={clockNumber === clockHour ? fontSize * 2 : fontSize}
              fill={clockNumber === clockHour ? '#000080' : 'gray'}
              fontFamily="Courier New, Courier, monospace"
              fontWeight="bold">
              {clockHour}
            </text>
          </>
        )
      })}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.sin((hourHandRotation * Math.PI) / 180) * hourHandLength}
        y2={cy - Math.cos((hourHandRotation * Math.PI) / 180) * hourHandLength}
        stroke="#000080"
        strokeWidth={20}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.sin((minuteHandRotation * Math.PI) / 180) * minuteHandLength}
        y2={cy - Math.cos((minuteHandRotation * Math.PI) / 180) * minuteHandLength}
        stroke="#40E0D0"
        strokeWidth={20}
        strokeLinecap="round"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.sin((secondHandRotation * Math.PI) / 180) * secondHandLength}
        y2={cy - Math.cos((secondHandRotation * Math.PI) / 180) * secondHandLength}
        stroke="#f00"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Clock
