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
})

let protocol_adapter = 'rest'
express.use ( () => { console.log('middleware')} )