import { createRouter, createWebHistory } from "vue-router"

const pages = import.meta.glob("./components/pages/**/*.vue")

const routes = {}
for (const page of Object.keys(pages)) {
  let name = page.match(/\.\/components\/pages\/(.+)\.vue$/)[1]
  if (name.endsWith("/index") || name === "index") {
    name = name.slice(0, -6)
  }
  routes[name || "index"] = {
    path: `/${name.toLowerCase()}`,
    name: name || "index",
    component: pages[page]
  }
}

routes[404] = {
  path: "/:pathMatch(.*)*",
  name: "404",
  title: "Page Not Found",
  component: routes[404].component
}

const router = createRouter({
  history: createWebHistory(),
  routes: Object.values(routes)
})

router.beforeEach(async (to, from, next) => {
  const expiry = parseInt(localStorage.getItem("gh_token_expiry") || "0")
  if (Date.now() > expiry) {
    localStorage.removeItem("gh_token")
    localStorage.removeItem("gh_token_expiry")
  }

  const tokenInStorage = localStorage.getItem("gh_token")
  const isAdminRoute = to.path.startsWith("/admin")
  const hashParams = new URLSearchParams(window.location.hash.slice(1))
  const tokenFromHash = hashParams.get("token")

  if (isAdminRoute && tokenFromHash) {
    if (tokenFromHash) {
      window.history.replaceState({}, "", window.location.pathname + window.location.search)
      localStorage.setItem("gh_token", tokenFromHash)
      localStorage.setItem("gh_token_expiry", Date.now() + 1000 * 60 * 60 * 24)
      next({
        path: to.path,
        query: to.query,
        replace: true
      })
      return
    }
  }

  if (isAdminRoute && !tokenInStorage && !to.path.match(/^\/admin\/denied\/?$/)) {
    location = `https://github.com/login/oauth/authorize?client_id=Ov23liiD3sMKxZYdRJRW&redirect_uri=${encodeURIComponent("https://hairbyemmahowell.co.uk/api/auth/callback")}`
    return
  }

  if (isAdminRoute && to.path.match(/^\/admin\/denied\/?$/) && tokenInStorage) {
    return next({
      path: "/admin",
      query: to.query
    })
  }

  const components = to.matched[to.matched.length - 1].components
  if (typeof components.default === "function") {
    components.default = (await components.default()).default
  }
  const title = components.default.title ?? to.name.split("/").at(-1).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase())
  document.title = title !== "Index" ? `${title} | Hair by Emma Howell` : "Hair by Emma Howell"
  
  if (typeof gtag === "function") {
    gtag("event", "page_view", {
      page_path: to.fullPath
    })
  }

  next()
})

export default router