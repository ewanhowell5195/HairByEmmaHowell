import.meta.hot?.on("vite:afterUpdate", () => {
  requestAnimationFrame(() => {
    refreshFadeIns()
  })
})

function computeVisible(el) {
  const r = el.getBoundingClientRect()
  if (r.height <= 0 || r.width <= 0) return false

  const vh = window.innerHeight
  const intersects = r.top < vh && r.bottom > 0
  if (!intersects) return false

  if (r.top < 0) return true
  return r.top <= vh * 0.8
}

const elements = new Set()
const pending = new WeakMap()
let raf = 0

function scan() {
  document.querySelectorAll(".fade-in:not(.fade-in-visible)").forEach(el => {
    elements.add(el)
  })
}

function reveal(el) {
  el.classList.add("fade-in-visible")
  const t = pending.get(el)
  if (t) {
    clearTimeout(t)
    pending.delete(el)
  }
}

function update() {
  elements.forEach(el => {
    if (el.classList.contains("fade-in-visible")) return
    if (!computeVisible(el)) return

    const delayAttr = el.getAttribute("delay")
    const delay = delayAttr ? Number(delayAttr) || 0 : 0

    if (delay <= 0) {
      reveal(el)
      return
    }

    if (pending.has(el)) return

    const timer = setTimeout(() => {
      pending.delete(el)
      if (!computeVisible(el)) return
      reveal(el)
    }, delay)

    pending.set(el, timer)
  })
}

function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(update)
}

window.addEventListener("scroll", onScroll, { passive: true })
window.addEventListener("resize", onScroll)

export function refreshFadeIns() {
  scan()
  update()
}