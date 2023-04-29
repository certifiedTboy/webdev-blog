import http from "http"
import app from "./app"
import mongoConnect from "./utils/database/dbConnector"
import config from "./config/config"

const server = http.createServer(app)

const PORT = config.APP_PORT || 3000




const startServer = async() => {
    await mongoConnect()
    server.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`)
    })
}


startServer()