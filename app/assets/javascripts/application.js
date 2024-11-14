//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

function filter_table() {
  var row_visible = false;
  var some_rows_visible = false;
  var checked_boxes_list = [];
  var checkboxes = document.getElementsByClassName("govuk-checkboxes__input");
  var history_table = document.getElementById("documents_table");
  var no_results_paragraph = document.getElementById("no_results_paragraph");
  var pagination = document.getElementById("document_pagination");

  //loop around small checkboxes and if checked add name to list
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].name != 'doc_select') {
      if (checkboxes[i].checked) {
        checked_boxes_list.push(checkboxes[i].name);
      }
    }
  }

  //no checked boxes so all rows visible
  if (checked_boxes_list.length == 0 ) {
    row_visible = true;
    some_rows_visible = true;
  }

  //get all table rows
  var table_rows = document.getElementsByClassName("govuk-table__row");

  //loop through all rows
  for (let i = 0; i < table_rows.length; i++) {

    //loop around checked checkboxes list and see if row name matches any checked 
    for (let j = 0; j < checked_boxes_list.length; j++) {
      if (table_rows[i].getAttribute('name') == checked_boxes_list[j]) {
        row_visible = true;
        some_rows_visible = true;
        break;
      } else {
        row_visible = false;
      }
    }

    if (row_visible ) {
      table_rows[i].classList.remove('govuk-visually-hidden')
    } else {
      table_rows[i].classList.add('govuk-visually-hidden');
    }

    if (table_rows[i].getAttribute('name') == 'header'){
      table_rows[i].classList.remove('govuk-visually-hidden');
    }

  }

  //show 'no results' paragraph and hide table if no matching rows
  if (some_rows_visible) {
    history_table.classList.remove('govuk-visually-hidden')
    pagination.classList.remove('govuk-visually-hidden')
    no_results_paragraph.classList.add('govuk-visually-hidden')
  } else {
    history_table.classList.add('govuk-visually-hidden');
    pagination.classList.add('govuk-visually-hidden');
    no_results_paragraph.classList.remove('govuk-visually-hidden')
  }
}
