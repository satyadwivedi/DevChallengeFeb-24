const cds = require('@sap/cds/lib')

module.exports = class AdminService extends cds.ApplicationService { init(){
  this.before ('NEW','Books.drafts', genid)
  return super.init()
}}

/** Generate primary keys for target entity in request */
async function genid (req) {
  const {ID} = await cds.tx(req).run (SELECT.one.from(req.target.actives).columns('max(ID) as ID'))
  req.data.ID = ID - ID % 100 + 100 + 1
}


/*
//=================================================================
//                 Authentication 
// link: https://github.com/gregorwolf/central-launchpad-cap/tree/add-authentication
//=================================================================
const cds = require("@sap/cds");
const { retrieveJwt, verifyJwt } = require("@sap-cloud-sdk/core");

module.exports = async function (srv) {
  srv.on("READ", "UserScopes", async (req) => {
    let user = {
      username: req.user.id,
      is_authenticated_user: req.user.is("authenticated-user"),
    };
    let jwt = retrieveJwt(req);
    if (jwt) {
      let decodedJwt = await verifyJwt(jwt);
      user = {
        ...user,
        email: decodedJwt.email,
        firstname: decodedJwt.given_name,
        lastname: decodedJwt.family_name,
      };
    }
    const users = [user];
    users.$count = 1;
    return users;
  });
}
*/
