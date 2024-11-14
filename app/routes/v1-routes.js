const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


module.exports=router;

// Show session data and URLs in the terminal  
router.use((req, res, next) => {  
  const log = {  
    method: req.method,  
    url: req.originalUrl,  
    data: req.session.data  
  }  
  console.log(JSON.stringify(log, null, 2))  
  next()  
}) 

// ******* Sign in validation ********************************
router.get('/v1/sign-in', function (req, res) {
  // Set URl
  res.render('v1/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/sign-in', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  // Check if user has filled out a email
  if (req.session.data['emailAddress'] === '') {
    // No value so add error to array
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#emailAddress'
    })
  }

  // Check if user has filled out a password
  if (req.session.data['password'] === '') {
    // No value so add error to array
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password'
    })
  }

  // Check if eother filed not filled out
  if (emailHasError || passwordHasError) {
    // Re-show page with error value as true so errors will show
    res.render('v1/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v1/company-number')
  }
})


// ******* company-number javascript *********************
router.get('/v1/company-number', function (req, res) {
  // Set URl
  res.render('v1/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v1/confirm-company', function (req, res) {
  // Set URl
  res.render('v1/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/confirm-company', function (req, res) {
    res.redirect('/v1/applicant-details')
})


// ******* applicant-details javascript ******************************
router.get('/v1/applicant-details', function (req, res) {
  // Set URl
  res.render('v1/applicant-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/applicant-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var firstNameError = false
  var lastNameError = false
  var emailError = false
  var dayHasError = false
  var monthHasError = false
  var yearHasError = false
  var detailsError = false

  // Check if user has filled out first name
  if (req.session.data['firstName'] === '') {
    // No value so add error to array
    firstNameError = true
    detailsError = true
    errors.push({
      text: 'Enter your first name in full',
      href: '#firstName'
    })
  }

  // Check if user has filled out last name
  if (req.session.data['lastName'] === '') {
    // No value so add error to array
    lastNameError = true
    detailsError = true
    errors.push({
      text: 'Enter your last name in full',
      href: '#lastName'
    })
  }

    // Check if user has filled out last name
    if (req.session.data['applicantEmailAddress'] === '') {
      // No value so add error to array
      emailError = true
      detailsError = true
      errors.push({
        text: 'Enter your email address',
        href: '#applicantEmailAddress'
      })
    }

        // Check if user has filled out a day
  if (req.session.data['dob-day'] === '') {
    // No value so add error to array
    dayHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a day',
      href: '#dob-day'
    })
  }

  // Check if user has filled out a month
  if (req.session.data['dob-month'] === '') {
    // No value so add error to array
    monthHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a month',
      href: '#dob-day'
    })
  }

  // Check if user has filled out a year
  if (req.session.data['dob-year'] === '') {
    // No value so add error to array
    yearHasError = true
    detailsError = true
    errors.push({
      text: 'The date must include a year',
      href: '#dob-day'
    })
  }

  // Check if eother filed not filled out
  if (detailsError) {
    // Re-show page with error value as true so errors will show
    res.render('v1/applicant-details', {
      errorFirstName: firstNameError,
      errorLastName: lastNameError,
      errorEmail: emailError,
      errorDobDay: dayHasError,
      errorDobMonth: monthHasError,
      errorDobYear: yearHasError,
      errorApplicantDetails: detailsError,
      errorList: errors
    })
  } 
  else  
  {
    res.redirect('/v1/applicant-status')
  }
})


// ******* applicant status javascript ********************************
router.get('/v1/applicant-status', function (req, res) {
  // Set URl
  res.render('v1/applicant-status', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/applicant-status', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['applicantStatus'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if the applicant is active in the company',
      href: '#applicantStatus'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/applicant-status', {
      errorApplicantStatus: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/roa-interruption')
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v1/is-address-roa', function (req, res) {
  // Set URl
  res.render('v1/is-address-roa', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/is-address-roa', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['addressRoa'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select if the address is the Registered Office Address',
      href: '#addressRoa'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/is-address-roa', {
      errorAddressRoa: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/address-lookup')
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v1/address-lookup', function (req, res) {
  // Set URl
  res.render('v1/address-lookup', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/address-lookup', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['postcode'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the postcode of the address to hide',
      href: '#postcode'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/address-lookup', {
      errorPostcode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/address-confirm')
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v1/address-confirm', function (req, res) {
  // Set URl
  res.render('v1/address-confirm', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/address-confirm', function (req, res) {
  if (req.session.data['applicantStatus'] === 'no') {
    res.redirect('/v1/select-documents')
  } else {
    res.redirect('/v1/replacement-address-lookup')
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v1/replacement-address-lookup', function (req, res) {
  // Set URl
  res.render('v1/replacement-address-lookup', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/replacement-address-lookup', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['replacementPostcode'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the postcode of the replacement address',
      href: '#replacementPostcode'
    })

    // Re-show page with error value as true so errors will show
    res.render('v1/replacement-address-lookup', {
      errorReplacementPostcode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v1/replacement-address-confirm')
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v1/replacement-address-confirm', function (req, res) {
  // Set URl
  res.render('v1/replacement-address-confirm', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/replacement-address-confirm', function (req, res) {
    res.redirect('/v1/select-documents')
})


// ******* is-address-roa javascript ********************************
router.get('/v1/roa-interruption', function (req, res) {
  // Set URl
  res.render('v1/roa-interruption', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/roa-interruption', function (req, res) {
    res.redirect('/v1/address-lookup')
})


// ******* is-address-roa javascript ********************************
router.get('/v1/select-documents', function (req, res) {
  // Set URl
  res.render('v1/select-documents', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/select-documents', function (req, res) {
    res.redirect('/v1/check-answers')
})