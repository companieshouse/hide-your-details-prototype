//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.use('/', require('./routes/v1-routes.js'))
router.use('/', require('./routes/v2-routes.js'))
router.use('/', require('./routes/v3-routes.js'))
router.use('/', require('./routes/v4-routes.js'))
