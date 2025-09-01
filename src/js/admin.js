import { hashDataUrl, getExtension, prepareImageChanges } from "@/js/github.js"

async function resizeDataUrl(dataUrl, maxSize = 1024) {
  return new Promise(fulfil => {
    const img = new Image()
    img.onload = () => {
      let { width, height } = img

      if (width > maxSize || height > maxSize) {
        const scale = Math.min(maxSize / width, maxSize / height)
        width = Math.round(width * scale)
        height = Math.round(height * scale)
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0, width, height)

      fulfil(canvas.toDataURL("image/webp", 0.95))
    }
    img.src = dataUrl
  })
}

export async function processImage(obj, key, dir) {
  const newImages = new Map()

  if (obj[key].startsWith("data:")) {
    const resized = await resizeDataUrl(obj[key], 1024)

    const hash = await hashDataUrl(resized)
    const ext = getExtension(resized)
    const name = `${hash}${ext}`

    newImages.set(resized, name)
    obj[key] = name
  }

  return prepareImageChanges(dir, newImages, [obj[key]])
}

export async function processImages(obj, keys, dir) {
  const newImages = new Map()

  for (const key of keys) {
    if (obj[key].startsWith("data:")) {
      const resized = await resizeDataUrl(obj[key], 1024)
      const hash = await hashDataUrl(resized)
      const ext = getExtension(resized)
      const name = `${hash}${ext}`
      newImages.set(resized, name)
      obj[key] = name
    }
  }

  return prepareImageChanges(dir, newImages, keys.map(k => obj[k]))
}

export async function processImageLists(imageLists, imageSet, imageDir) {
  const newImages = new Map()

  for (const list of imageLists) {
    for (let i = 0; i < list.length; i++) {
      const img = list[i]
      if (img?.startsWith("data:")) {
        const resized = await resizeDataUrl(img, 1024)

        if (!newImages.has(resized)) {
          const hash = await hashDataUrl(resized)
          const ext = getExtension(resized)
          newImages.set(resized, `${hash}${ext}`)
        }

        list[i] = newImages.get(resized)
      }
    }
  }

  const finalNames = imageLists.flat().filter(Boolean)
  const newSet = new Set(finalNames)

  const changed = finalNames.length !== imageSet.size || finalNames.some(name => !imageSet.has(name))

  if (!changed) return

  const tree = await prepareImageChanges(imageDir, newImages, finalNames)

  imageSet.clear()
  for (const name of finalNames) imageSet.add(name)

  return tree
}