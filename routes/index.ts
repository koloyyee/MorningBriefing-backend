import NewscatcherService from "../service/newcatcher"
import NewsCatcherRouter from "./newscatcher"

// Services
const newscatcherService = new NewscatcherService()

// Routers
// Dependency Injection
const newscatcher = new NewsCatcherRouter(newscatcherService)


export { newscatcher }
