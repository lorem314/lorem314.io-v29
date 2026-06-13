const rtf = new Intl.RelativeTimeFormat("zh", { numeric: "always" })

const units = [
  { unit: "year", seconds: 1 * 60 * 60 * 24 * 7 * 4 * 12 },
  { unit: "month", seconds: 1 * 60 * 60 * 24 * 7 * 4 },
  { unit: "week", seconds: 1 * 60 * 60 * 24 * 7 },
  { unit: "day", seconds: 1 * 60 * 60 * 24 },
  { unit: "hour", seconds: 1 * 60 * 60 },
  { unit: "minute", seconds: 1 * 60 },
  { unit: "second", seconds: 1 },
] as const

export function getRelativeTime(d1: Date, d2: Date = new Date()) {
  const diffInMs = d1.getTime() - d2.getTime()
  const diffInSeconds = Math.round(diffInMs / 1000)

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds || unit === "second") {
      const value = Math.round(diffInSeconds / seconds)
      return rtf.format(value, unit)
    }
  }
}
