export function GridOverlay({
  size = "24px",
  color = "#80808012",
  offsetX = "12px",
  offsetY = "12px",
}: {
  size?: string
  color?: string
  offsetX?: string
  offsetY?: string
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundSize: `${size} ${size}`,
        backgroundPosition: `${offsetX} ${offsetY}`,
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
      }}
    />
  )
}
