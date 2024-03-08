const cds = require('@sap/cds')
const express = require('express')()
//const app = express()
cds.on('bootstrap', app => {
    console.log('bootstrappign====')
})
cds.on('served', () => {
    console.log('served===')
   // let { tenant, user } = cds.context
    //console('tenant', tenant)
    console.log('user=', cds.context)
})

cds.on('listening', (app) => {
    console.log('customer server listining')
    console.log("process.env.NODE_ENV", process.env.NODE_ENV)
    console.log("cds.env.profiles", cds.env.profiles)
})

let protocol_adapter = 'rest'
express.use ( () => { console.log('middleware')} )