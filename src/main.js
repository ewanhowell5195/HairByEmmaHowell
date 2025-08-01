import { createApp, reactive } from "vue"
import settings from "./settings.json"
import App from "./App.vue"
import router from "./router"
import "./styles.css"
import "easy-tooltips/styles.css"
import "easy-tooltips"

const app = createApp(App)

app.config.globalProperties.$settings = settings
window.$settings = settings

app.use(router)
app.mount("#app")