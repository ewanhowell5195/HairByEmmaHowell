import { hashDataUrl, getExtension, prepareImageChanges } from "@/js/github.js"

export async function processImage(obj, key, original, dir) {
  const newImages = new Map()

  if (obj[key] && obj[key] !== original && obj[key].startsWith("data:")) {
    const hash = await hashDataUrl(obj[key])
    const ext = getExtension(obj[key])
    const name = `${hash}${ext}`
    newImages.set(obj[key], name)
    obj[key] = name
  }

  return prepareImageChanges(dir, newImages, [obj[key]])
}

export async function processImageLists(imageLists, imageSet, imageDir) {
  const newImages = new Map()

  for (const list of imageLists) {
    for (let i = 0; i < list.length; i++) {
      const img = list[i]
      if (img?.startsWith("data:")) {
        if (!newImages.has(img)) {
          const hash = await hashDataUrl(img)
          const ext = getExtension(img)
          newImages.set(img, `${hash}${ext}`)
        }
        list[i] = newImages.get(img)
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
