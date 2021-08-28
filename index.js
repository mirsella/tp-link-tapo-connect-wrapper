const tapo = require('tp-link-tapo-connect');
const bearerToken = require('express-bearer-token');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config()
const app = express()
app.use(morgan('common'))
app.use(bearerToken())

let device
(async () => device = await tapo.loginDeviceByIp(process.env.email, process.env.passwd, '192.168.1.10'))()

app.use((req,res,next) => {
  if (req.token !== process.env.token) {
    res.sendStatus(401)
  } else {
    next()
  }
})

app.all('/tapo/on', async (req,res) => {
  await tapo.turnOn(device)
  .then(() => res.sendStatus(200))
  .catch(e => {
    res.statusMessage = e
    res.sendStatus(500)
  })
})

app.all('/tapo/off', async (req,res) => {
  await tapo.turnOff(device)
    .then(() => res.sendStatus(200))
    .catch(e => {
      res.statusMessage = e
      res.sendStatus(500)
    })
})

app.all('/tapo/status', async (req,res) => {
  await tapo.getDeviceInfo(device)
    .then(info => res.send(info))
    .catch(e => {
      res.statusMessage = e
      res.sendStatus(500)
    })
})

app.listen(process.env.port)
