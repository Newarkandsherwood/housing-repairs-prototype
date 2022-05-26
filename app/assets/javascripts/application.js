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



// Make all links retain state when visited (for prototype purposes only!)

$('a[href]:not(.destructive)').addClass('govuk-link--no-visited-state')

// Suffix all root link paths with current iteration

const iterationRoute = (str, path) => {
    var pathParts = []
    while (path.length != 0) {
        pathParts.push(path.substring(path.lastIndexOf('/'), path.length))
        path = path.slice(0, -pathParts[pathParts.length - 1].length)
    }
    return str.replace(
        '#root#',
         pathParts[pathParts.length - 1] 
    )
}

const windowPath = window.location.pathname

// Apply to all links, forms and input values with #root# placeholder

$('a[href*=\\#root\\#]').each((_, link) => {
    $(link).attr('href', iterationRoute($(link).attr('href'), windowPath))
})

$('input[value*=\\#root\\#]').each((_, input) => {
    $(input).attr('value', iterationRoute($(input).attr('value'), windowPath))
})

$('form[action*=\\#root\\#]').each((_, form) => {
    $(form).attr('action', iterationRoute($(form).attr('action'), windowPath))
})

// Apply to all links, forms and input values with #currentUrl# placeholder

$('a[href*=\\#currentUrl\\#]').each((_, link) => {
    $(link).attr(
        'href',
        $(link)
            .attr('href')
            .replace('#currentUrl#', window.location.href)
    )
})

$('input[value*=\\#currentUrl\\#]').each((_, input) => {
    $(input).attr(
        'value',
        $(input)
            .attr('value')
            .replace('#currentUrl#', window.location.href)
    )
})

$('form[action*=\\#currentUrl\\#]').each((_, form) => {
    $(form).attr(
        'action',
        $(form)
            .attr('action')
            .replace('#currentUrl#', window.location.href)
    )
})

// stops error validation showing if user uses back button in browser
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});


$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
