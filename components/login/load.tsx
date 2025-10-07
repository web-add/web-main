"use client"

export default function Load() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      {/* Rotating dots animation */}
      <div className="relative w-24 h-24">
        {[...Array(8)].map((_, i) => {
          const angle = i * 45
          return (
            <div
              key={i}
              className="absolute w-3 h-3 bg-cyan-400 rounded-full animate-spin-dot"
              style={{
                top: "50%",
                left: "50%",
                margin: "-6px",
                transform: `rotate(${angle}deg) translate(40px)`,
                animationDelay: `${i * 0.15}s`,
              }}
            ></div>
          )
        })}
      </div>

      <h1 className="absolute bottom-32 text-white text-xl font-bold">Loading...</h1>

      <style jsx>{`
        @keyframes spin-dot {
          0% { transform: rotate(0deg) translate(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translate(40px) rotate(-360deg); }
        }
        .animate-spin-dot {
          animation: spin-dot 1.2s linear infinite;
        }
      `}</style>
    </div>
  )
}
