const express = require('express')

const routes = require('./routes')
const app = express()
const PORT = 3040

app.use(routes)

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
