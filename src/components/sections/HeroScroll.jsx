import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* ---------------- CONFIG ---------------- */

const TOTAL_FRAMES = 192

const FRAME_WINDOW = 24
const FRAME_RADIUS = FRAME_WINDOW / 2

const SCROLL_PER_FRAME = 16
const SCROLL_DISTANCE = TOTAL_FRAMES * SCROLL_PER_FRAME

const LERP = 0.15

const MAX_DPR = 1.25

const FRAME_PATH = (n) => `/frames/${String(n).padStart(5, "0")}.jpg`

/* ---------------- UTILITIES ---------------- */

function drawCover(ctx, img, cw, ch) {
  const iw = img.width || img.naturalWidth
  const ih = img.height || img.naturalHeight

  const ir = iw / ih
  const cr = cw / ch

  let dw, dh, dx, dy

  if (ir > cr) {
    dh = ch
    dw = dh * ir
  } else {
    dw = cw
    dh = dw / ir
  }

  dx = (cw - dw) / 2
  dy = (ch - dh) / 2

  ctx.drawImage(img, dx, dy, dw, dh)
}

const lerp = (a, b, t) => a + (b - a) * t

async function decodeBitmap(url) {
  const res = await fetch(url)
  const blob = await res.blob()
  return createImageBitmap(blob)
}

/* ---------------- COMPONENT ---------------- */

export default function HeroScroll({ children, badge, title, subtitle }) {

  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  const cacheRef = useRef(new Map())
  const loadingRef = useRef(new Set())

  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)

  const rafRef = useRef(null)
  const scrollRef = useRef(null)

  const canvasSizeRef = useRef({ w: window.innerWidth, h: window.innerHeight })

  const contentInnerRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const placeholderRef = useRef(null)

  const [ready, setReady] = useState(false)

  /* ---------------- FRAME LOADING ---------------- */

  const loadFrame = async (index) => {

    if (cacheRef.current.has(index)) return
    if (loadingRef.current.has(index)) return

    loadingRef.current.add(index)

    try {

      const bmp = await decodeBitmap(FRAME_PATH(index + 1))

      cacheRef.current.set(index, bmp)

    } catch {}

    loadingRef.current.delete(index)

  }

  const updateFrameWindow = (center) => {

    const start = Math.max(0, Math.floor(center - FRAME_RADIUS))
    const end = Math.min(TOTAL_FRAMES - 1, Math.floor(center + FRAME_RADIUS))

    for (let i = start; i <= end; i++) {
      loadFrame(i)
    }

    for (const [key, bmp] of cacheRef.current) {

      if (key < start || key > end) {

        if (bmp.close) bmp.close()

        cacheRef.current.delete(key)

      }

    }

  }

  const findNearest = (index) => {

    if (cacheRef.current.has(index)) return cacheRef.current.get(index)

    for (let i = 1; i < FRAME_RADIUS; i++) {

      if (cacheRef.current.has(index - i))
        return cacheRef.current.get(index - i)

      if (cacheRef.current.has(index + i))
        return cacheRef.current.get(index + i)

    }

    return null

  }

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {

    loadFrame(0).then(() => {

      setReady(true)

    })

  }, [])

  /* ---------------- CANVAS + SCROLL ---------------- */

  useEffect(() => {

    if (!ready) return

    const canvas = canvasRef.current

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

    const w = window.innerWidth
    const h = window.innerHeight

    canvas.width = w * dpr
    canvas.height = h * dpr

    canvas.style.width = w + "px"
    canvas.style.height = h + "px"

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
      willReadFrequently: false
    })

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    canvasSizeRef.current = { w, h }

    const firstFrame = findNearest(0)

    if (firstFrame) {
      drawCover(ctx, firstFrame, w, h)
    }

    if (placeholderRef.current) {

      placeholderRef.current.style.opacity = "0"

      setTimeout(() => {
        placeholderRef.current?.remove()
      }, 400)

    }

    scrollRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${SCROLL_DISTANCE}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        targetFrameRef.current = self.progress * (TOTAL_FRAMES - 1)
      }
    })

    const tick = () => {

      rafRef.current = requestAnimationFrame(tick)

      currentFrameRef.current = lerp(
        currentFrameRef.current,
        targetFrameRef.current,
        LERP
      )

      const frameIndex = Math.round(currentFrameRef.current)

      updateFrameWindow(frameIndex)

      const frame = findNearest(frameIndex)

      if (!frame) return

      const { w, h } = canvasSizeRef.current

      drawCover(ctx, frame, w, h)

      const progress = targetFrameRef.current / (TOTAL_FRAMES - 1)

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - progress * 6)
      }

      if (contentInnerRef.current) {

        const scale = 0.05 + progress * 0.95

        contentInnerRef.current.style.transform = `scale(${scale}) translateZ(0)`
        contentInnerRef.current.style.opacity = Math.min(1, progress * 4)

      }

    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {

      cancelAnimationFrame(rafRef.current)

      scrollRef.current?.kill()

    }

  }, [ready])

  /* ---------------- RESIZE ---------------- */

  useEffect(() => {

    const onResize = () => {

      const canvas = canvasRef.current

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr

      canvas.style.width = w + "px"
      canvas.style.height = h + "px"

      const ctx = canvas.getContext("2d")

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      canvasSizeRef.current = { w, h }

      ScrollTrigger.refresh()

    }

    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)

  }, [])

  /* ---------------- RENDER ---------------- */

  return (
    <section
      id="hero-scroll"
      aria-label="Homepage hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div
        ref={placeholderRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${FRAME_PATH(1)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(25px)",
          transform: "scale(1.1)",
          transition: "opacity 0.4s"
        }}
      />

      {/* Dark Readability Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_100%)] z-[5] pointer-events-none" />

     <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-10">

  <div
    ref={contentInnerRef}
    className="max-w-5xl w-full flex flex-col items-center text-center relative z-[20]"
    style={{
      transform: "scale(1)",
      opacity: 1,
      willChange: "transform, opacity"
    }}
  >

    {/* Badge */}
    {badge && (
      <div className="mb-8 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
        {badge}
      </div>
    )}

    {/* Title */}
    {title && (
      <h1 className="
        text-[2rem]
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        font-bold
        leading-[1.1]
        tracking-tight
        mb-8
        text-white
        drop-shadow-[0_6px_30px_rgba(0,0,0,0.8)]
      ">
        {title}
      </h1>
    )}

    {/* Subtitle */}
    {subtitle && (
      <p className="
        text-lg
        md:text-xl
        leading-relaxed
        text-white/80
        max-w-2xl
        mx-auto
        mb-12
        drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]
      ">
        {subtitle}
      </p>
    )}

    {/* CTA buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
      {children}
    </div>

  </div>

</div>
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center"
      >

        <ChevronDown className="animate-bounce" />

        <p className="text-xs uppercase tracking-widest mt-2">
          Scroll
        </p>

      </div>

    </section>
  )

}