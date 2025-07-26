const GITHUB_API = "https://api.github.com"
const OWNER = "ewanhowell5195"
const REPO = "HairByEmmaHowell"
const BRANCH = "master"

function getHeaders() {
  const token = localStorage.getItem("gh_token")
  if (!token) throw new Error("No GitHub token in localStorage")

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "HairByEmmaHowell-OAuth"
  }
}

export function hashDataUrl(dataUrl) {
  const encoder = new TextEncoder()
  const data = encoder.encode(dataUrl)
  return crypto.subtle.digest("SHA-256", data).then(buffer => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32)
  })
}

export function getExtension(dataUrl) {
  const match = dataUrl.match(/^data:image\/(webp|png|jpeg)/)
  return match ? `.${match[1].replace("jpeg", "jpg")}` : ".png"
}

function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}

async function makeBlob(content) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/blobs`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: content.startsWith("data:") ? content.split(",")[1] : content,
      encoding: "base64"
    })
  })
  return (await res.json()).sha
}

export async function getJSON(path) {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    headers: getHeaders()
  })
  if (!res.ok) throw new Error("Failed to fetch file")

  const { content, sha } = await res.json()
  const dataUrl = `data:application/json;base64,${content}`
  const fileRes = await fetch(dataUrl)
  const data = await fileRes.json()

  return { data, sha }
}

export async function updateFile(path, content, sha, message) {
  const body = {
    message: message ?? `Update ${path.split("/").at(-1)}`,
    content: toBase64(content),
    sha,
    branch: BRANCH
  }

  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) throw new Error("Failed to update file")
  return (await res.json()).content.sha
}

export async function prepareImageChanges(dir, newImages, imageNames) {
  const changes = []
  const headers = getHeaders()

  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${dir}`, { headers })
  if (!res.ok) throw new Error("Failed to fetch directory contents")

  const files = await res.json()
  const existingFiles = new Map(files.map(f => [f.name, f.sha]))

  for (const [dataUrl, name] of newImages.entries()) {
    if (existingFiles.has(name)) {
      const existing = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${dir}/${name}`, { headers })
      const existingData = await existing.json()
      const base64Data = dataUrl.split(",")[1]
      if (existingData.content.replace(/\n/g, "") === base64Data) continue
    }

    changes.push({
      path: `${dir}/${name}`,
      sha: await makeBlob(dataUrl),
      mode: "100644",
      type: "blob"
    })
  }

  for (const [name] of existingFiles) {
    if (!imageNames.includes(name)) {
      changes.push({
        path: `${dir}/${name}`,
        sha: null,
        mode: "100644",
        type: "blob"
      })
    }
  }

  return changes
}

export async function prepareFileUpdate(path, content) {
  return {
    path,
    mode: "100644",
    type: "blob",
    sha: await makeBlob(toBase64(content))
  }
}

export async function makeCommit(treeItems, message = "Update content") {
  const headers = getHeaders()

  const refRes = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/ref/heads/${BRANCH}`, { headers })
  const latestCommitSha = (await refRes.json()).object.sha

  const commitRes = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/commits/${latestCommitSha}`, { headers })
  const baseTreeSha = (await commitRes.json()).tree.sha

  const treeRes = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/trees`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeItems
    })
  })

  const commitRes2 = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/commits`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      tree: (await treeRes.json()).sha,
      parents: [latestCommitSha]
    })
  })

  const commitSha = (await commitRes2.json()).sha

  await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sha: commitSha })
  })
}