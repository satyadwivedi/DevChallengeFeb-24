const cds = require('@sap/cds')
const { Books } = cds.entities ('sap.capire.bookshop')


class CatalogService extends cds.ApplicationService { init(){
  
  // Reduce stock of ordered books if available stock suffices
  this.on ('submitOrder', async req => {
    const {book,quantity} = req.data
    let {stock} = await SELECT `stock` .from (Books,book)
    if (stock >= quantity) {
      await UPDATE (Books,book) .with (`stock -=`, quantity)
      await this.emit ('OrderedBook', { book, quantity, buyer:req.user.id })
      return { stock }
    }
    else return req.error (409,`${quantity} exceeds stock for book #${book}`)
  })

  // Add some discount for overstocked books
  this.after ('READ','ListOfBooks', each => {
    //if (each.stock > 111) each.title += ` -- 11% discount!`
  })


    this.after ('READ', 'ListOfBooks', async (data, req) => {
     
      const alert = await cds.connect.to('notifications')
     
      console.log('Inside  ListOfBooks and ready to fire event======')

        alert.notify({
          NotificationTypeKey: 'IncidentCreated',
          NotificationTypeVersion: '1',
          Priority: 'NEUTRAL',
          Properties: [
            {
              Key: 'ID',
              IsSensitive: false,
              Language: 'en',
              Value: `${data[0].ID}`,
              Type: 'String'
            },
            {
              Key: 'user',
              IsSensitive: false,
              Language: 'en',
              Value: req.user.id,
              Type: 'String'
            },
            {
              Key: 'title',
              IsSensitive: false,
              Language: 'en',
              Value: data[0].title,
              Type: 'String'
            },
            {
              Key: 'stock',
              IsSensitive: false,
              Language: 'en',
              Value: data[0].stock,
              Type: 'String'
            }
          ],
          Recipients: [{ RecipientId: "supportuser1@mycompany.com" },{ RecipientId: "supportuser2@mycompany.com" }]
        });

    })

  return super.init()
}}

module.exports = { CatalogService }
