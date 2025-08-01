import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import path from "node:path"
import fs from "node:fs"

const getFiles = async function*(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

export default defineConfig({
  server: {
    allowedHosts: ["0d1a-82-2-66-121.ngrok-free.app"]
  },
  plugins: [
    vue(),
    {
      name: "build-finished-hook",
      async closeBundle() {
        console.log("Build finished. Running custom post-build function...")
        return buildOpenGraph()
      }
    }
  ],
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})

function loadVueFile(filePath) {
  const match = fs.readFileSync(filePath, "utf-8").match(/(?<=<script>\s*)export default\s*({[\s\S]*?})(?=\s*<\/script>)/)
  if (!match) {
    return {}
  }
  try {
    return new Function(`return ${match[1]}`)()
  } catch (error) {
    console.error(`Error parsing export default in ${filePath}:`, error)
    return null
  }
}

const defaults = {
  title: "Hair by Emma Howell",
  colour: "#2C2D2A",
  description: "Hairdresser and Bridal Stylist based in Row Town, Surrey",
  image: "logo/logo.webp"
}

async function buildOpenGraph() {
  console.log("Building open graph data…")

  const main = fs.readFileSync("./dist/index.html","utf-8")
  const files = main.match(/<head>([\s\S]*?)<\/head>/)[1].trim().split("\n").slice(-2).join("\n")

  for await (const f of getFiles("./src/components/pages")) {
    const file = path.relative("./src/components/pages", f)
    if (file === "index.vue") {
      continue
    }
    console.log(`Processing: ${file}`)
    const data = loadVueFile(f)

    let id = path.basename(f, ".vue")
    if (id === "index") {
      id = path.basename(path.dirname(f))
    }

    const title = (data.title ?? id.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase())) + " | " + defaults.title

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
    <link rel="icon" type="image/webp" sizes="16x16" href="/assets/images/logo/favicon_16.webp">
    <link rel="icon" type="image/webp" sizes="32x32" href="/assets/images/logo/favicon_32.webp">
    <meta name="viewport" content="width=device-width">
    <meta name="theme-color" content="${data.colour ?? defaults.colour}">
    <meta name="description" content="${data.description ?? defaults.description}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${data.description ?? defaults.description}">
    <meta property="og:image" content="https://hairbyemmahowell.co.uk/assets/images/${data.image ?? defaults.image}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/brands.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@1" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9Y9M8J9MCY"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments)}
      gtag("js", new Date())
      gtag("config", "G-9Y9M8J9MCY")
    </script>
${files}
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>`
    
    const fileName = path.basename(file, ".vue")
    const outDir = path.join("dist", path.dirname(file))
    let outputPath
    if (fileName === "index") {
      outputPath = path.join(outDir, "index.html")
    } else {
      outputPath = path.join(outDir, fileName, "index.html")
    }
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, html)
  }

  console.log("Built open graph data")
}