//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

addFilter('displayMonth', function (month) {
    switch (parseInt(month, 10)) {
      case 1:
        return 'January'
        break
      case 2:
        return 'February'
        break
      case 3:
        return 'March'
        break
      case 4:
        return 'April'
        break
      case 5:
        return 'May'
        break
      case 6:
        return 'June'
        break
      case 7:
        return 'July'
        break
      case 8:
        return 'August'
        break
      case 9:
        return 'September'
        break
      case 10:
        return 'October'
        break
      case 11:
        return 'November'
        break
      case 12:
        return 'December'
        break
    }
  }) 

