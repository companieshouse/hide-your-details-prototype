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
router.get('/v3/sign-in', function (req, res) {
  // Set URl
  res.render('v3/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/sign-in', function (req, res) {
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
    res.render('v3/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v3/company-number')
  }
})


// ******* company-number javascript *********************
router.get('/v3/company-number', function (req, res) {
  // Set URl
  res.render('v3/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/company-number', function (req, res) {
  // Create empty array and set error variables to false
  var errors = [];

  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter the company number',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/company-number', {
      errorCompanyNumber: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/confirm-company')
  }
})


// ******* confirm-company javascript **********************
router.get('/v3/confirm-company', function (req, res) {
  // Set URl
  res.render('v3/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/confirm-company', function (req, res) {
    res.redirect('/v3/applicant-details')
})


// ******* applicant-details javascript ******************************
router.get('/v3/applicant-details', function (req, res) {
  // Set URl
  res.render('v3/applicant-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/applicant-details', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var fullNameError = false
  var dayHasError = false
  var monthHasError = false
  var yearHasError = false
  var differentNameError = false
  var detailsError = false

  // Check if user has filled out first name
  if (req.session.data['fullName'] === '') {
    // No value so add error to array
    fullNameError = true
    detailsError = true
    errors.push({
      text: 'Enter your name in full',
      href: '#fullName'
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

  // Check if user has filled out different name
  if (typeof req.session.data['differentName'] === 'undefined') {
    // No value so add error to array
    differentNameError = true
    detailsError = true
    errors.push({
      text: 'Select if the applicant has used a different name for business purposes',
      href: '#differentName'
    })
  }


  // Check if eother filed not filled out
  if (detailsError) {
    // Re-show page with error value as true so errors will show
    res.render('v3/applicant-details', {
      errorName: fullNameError,
      errorDobDay: dayHasError,
      errorDobMonth: monthHasError,
      errorDobYear: yearHasError,
      errorDifferentName: differentNameError,
      errorApplicantDetails: detailsError,
      errorList: errors
    })
  } 
  else  
  {
    if (req.session.data['companyNumber'] === '12345678')  {
      res.redirect('/v3/applicant-status')
    } else {
      res.redirect('/v3/contact-email')
    } 
  }
})


// ******* applicant status javascript ********************************
router.get('/v3/applicant-status', function (req, res) {
  // Set URl
  res.render('v3/applicant-status', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/applicant-status', function (req, res) {
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
    res.render('v3/applicant-status', {
      errorApplicantStatus: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/contact-email')
  }
})


// ******* contact-email javascript ********************************
router.get('/v3/contact-email', function (req, res) {
  // Set URl
  res.render('v3/contact-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/contact-email', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['contactEmail'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter an email address for this application',
      href: '#contactEmail'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/contact-email', {
      errorContactEmail: true,
      errorList: errors
    })
  } else {
    res.redirect('/v3/suppress-list')
  }
})


// ******* suppress-list javascript ********************************
router.get('/v3/suppress-list', function (req, res) {
  // Set URl
  res.render('v3/suppress-list', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/suppress-list', function (req, res) {
  // Create empty array
  var errors = [];

  // Check if user has filled out a value
  if (typeof req.session.data['suppressList'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select everything you want to suppress',
      href: '#suppressList'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/suppress-list', {
      errorSuppressList: true,
      errorList: errors
    })
  } else {
    if (req.session.data['suppressList'].includes('Home address')) {
      res.redirect('/v3/address-lookup')
    } else {
      res.redirect('/v3/select-documents')
    }
  }
})


// ******* address-lookup javascript ********************************
router.get('/v3/address-lookup', function (req, res) {
  // Set URl
  res.render('v3/address-lookup', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/address-lookup', function (req, res) {
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
    res.render('v3/address-lookup', {
      errorPostcode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/address-confirm')
  }
})


// ******* address-manual javascript ********************************
router.get('/v3/address-manual', function (req, res) {
  // Set URl
  res.render('v3/address-manual', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/address-manual', function (req, res) {
    res.redirect('/v3/address-confirm')
})


// ******* address-confirm javascript ********************************
router.get('/v3/address-confirm', function (req, res) {
  // Set URl
  res.render('v3/address-confirm', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/address-confirm', function (req, res) {
  if ((req.session.data['companyNumber'] === '22446688') 
  || (req.session.data['applicantStatus'] === 'no')) {
    // dissolved company or inactive applicant
    res.redirect('/v3/select-documents')
  }  else {
    res.redirect('/v3/is-address-roa')
  }   
})

// ******* is-address-roa javascript ********************************
router.get('/v3/is-address-roa', function (req, res) {
  // Set URl
  res.render('v3/is-address-roa', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/is-address-roa', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['isAddressRoa'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if the home address is the registered office address',
      href: '#isAddressRoa'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/is-address-roa', {
      errorIsAddressRoa: true,
      errorList: errors
    })
  } else {
    if (req.session.data['isAddressRoa'] === 'no') {
      res.redirect('/v3/need-replacement-address')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/address-roa-stop')
    }
  }
})


// ******* need-replacement-address javascript ********************************
router.get('/v3/need-replacement-address', function (req, res) {
  // Set URl
  res.render('v3/need-replacement-address', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/need-replacement-address', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['needReplacementAddress'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select yes if you need to add a replacement address',
      href: '#needReplacementAddress'
    })

    // Re-show page with error value as true so errors will show
    res.render('v3/need-replacement-address', {
      errorNeedReplacementAddress: true,
      errorList: errors
    })
  } else {
    if (req.session.data['needReplacementAddress'] === 'yes') {
      res.redirect('/v3/replacement-address-lookup')
    } else {
      // User inputted value so move to next page
      res.redirect('/v3/select-documents')
    }
  }
})


// ******* is-address-roa javascript ********************************
router.get('/v3/replacement-address-lookup', function (req, res) {
  // Set URl
  res.render('v3/replacement-address-lookup', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/replacement-address-lookup', function (req, res) {
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
    res.render('v3/replacement-address-lookup', {
      errorReplacementPostcode: true,
      errorList: errors
    })
  } else {
      res.redirect('/v3/replacement-address-confirm')
  }
})


// ******* address-manual javascript ********************************
router.get('/v3/replacement-address-manual', function (req, res) {
  // Set URl
  res.render('v3/replacement-address-manual', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/replacement-address-manual', function (req, res) {
    res.redirect('/v3/replacement-address-confirm')
})


// ******* is-address-roa javascript ********************************
router.get('/v3/replacement-address-confirm', function (req, res) {
  // Set URl
  res.render('v3/replacement-address-confirm', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/replacement-address-confirm', function (req, res) {
    res.redirect('/v3/select-documents')
})


// ******* select-documents javascript ********************************
router.get('/v3/select-documents', function (req, res) {
  // Set URl
  res.render('v3/select-documents', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/select-documents', function (req, res) {
    res.redirect('/v3/check-answers')
})


// ******* select-documents-2 javascript ********************************
router.get('/v3/select-documents-2', function (req, res) {
  // Set URl
  res.render('v3/select-documents-2', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/select-documents-2', function (req, res) {
    res.redirect('/v3/check-answers')
})


// ******* payment-one javascript ********************************
router.get('/v3/check-answers', function (req, res) {
  // Set URl
  res.render('v3/check-answers', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/check-answers', function (req, res) {
    res.redirect('/v3/payment-one')
})


// ******* payment-one javascript ********************************
router.get('/v3/payment-one', function (req, res) {
  // Set URl
  res.render('v3/payment-one', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/payment-one', function (req, res) {
    res.redirect('/v3/payment-two')
})


// ******* payment-two javascript ********************************
router.get('/v3/payment-two', function (req, res) {
  // Set URl
  res.render('v3/payment-two', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/payment-two', function (req, res) {
    res.redirect('/v3/payment-three')
})

// ******* payment-three javascript ********************************
router.get('/v3/payment-three', function (req, res) {
  // Set URl
  res.render('v3/payment-three', {
    currentUrl: req.originalUrl
  })
})

router.post('/v3/payment-three', function (req, res) {
    res.redirect('/v3/success')
})

