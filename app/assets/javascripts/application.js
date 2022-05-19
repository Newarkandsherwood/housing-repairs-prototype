/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}



if ($('#dev-notes').text().trim() != 'Developer notes') {
  $('footer.govuk-footer').append($('#dev-notes'));
  var devNotesAreVisible = false;

  if ($('#dev-notes').is(':visible')) {
    devNotesAreVisible = true;
    $('.toggleDevNotes').text('Hide developer notes');
  }

  var toggleDevNotes = function toggleDevNotes() {
    if (devNotesAreVisible) {
      $('#dev-notes').hide('fast');
      devNotesAreVisible = false;
      $('.toggleDevNotes').text('Show developer notes');
    } else {
      $('#dev-notes').show('fast');
      devNotesAreVisible = true;
      $('.toggleDevNotes').text('Hide developer notes');
    }
  };
} else {
  $('.toggleDevNotes').remove();
}

if ($('#ur-notes').text().trim() != 'User research notes') {
  $('footer.govuk-footer').append($('#ur-notes'));
  var urNotesAreVisible = false;

  if ($('#ur-notes').is(':visible')) {
    urNotesAreVisible = true;
    $('.toggleURNotes').text('Hide UR notes');
  }

  var toggleURNotes = function toggleURNotes() {
    if (urNotesAreVisible) {
      $('#ur-notes').hide('fast');
      urNotesAreVisible = false;
      $('.toggleURNotes').text('Show UR notes');
    } else {
      $('#ur-notes').show('fast');
      urNotesAreVisible = true;
      $('.toggleURNotes').text('Hide UR notes');
    }
  };
} else {
  $('.toggleURNotes').remove();
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
