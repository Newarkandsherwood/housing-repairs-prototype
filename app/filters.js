module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var _ = require('lodash');
  var filters = {}

  filters.debug = (obj) => {
		return JSON.stringify(obj)
	}

  filters.includes = (arrayOfStrings, testString) => {
		if (Array.isArray(arrayOfStrings)) {
			if (arrayOfStrings.indexOf(testString) != -1) {
				return true
			}
		}
		return false
	}

  filters.addressResultsToOptions = (addressResults) => {
		if (Array.isArray(addressResults)) {
			var outputArray = [{ text: 'Select the address', value: '' }]
			addressResults.map((result, i) => {
				outputArray[i + 1] = {
					text: filters.titleCase(result.name),
					value: result.full,
				}
			})
			return outputArray
		}
		return null
	}

	filters.objectToListItems = (arrayLikeObject) => {
		var output = ''
		if (typeof arrayLikeObject === 'object' && arrayLikeObject !== null) {
			const keys = Object.keys(arrayLikeObject)
			if (keys) {
				for (const key of keys) {
					let string = arrayLikeObject[key]
					if (string != '') {
						output += `<li>${string}</li>`
					}
				}
			}
		}
		return output
	}

  filters.lowerCase = (str) => (str ? str.toLowerCase() : '')

	filters.upperCase = (str) => (str ? str.toUpperCase() : '')

	filters.titleCase = (str) => {
		if (str) {
			return str.replace(/\w\S*/g, (txt) => {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			})
		} else {
			return ''
		}
	}

	// id, and add value and checked for each item

filters.decorateAttributes = (obj, data, value) => {

  // Map dot or bracket notation to path parts
  pathParts = _.toPath(value)
  // Path parts includes the string name of data, which we don't need
  let storedValue = _.get(data, [...pathParts].splice(1) )

  // Strip data from path as autodata store auto-adds it.
  if (pathParts[0] === 'data'){
    pathParts.shift(1)
  }

  if (obj.items !== undefined) {
    obj.items = obj.items.map(item => {
      if (item.divider) return item

      var checked = storedValue ? '' : item.checked
      var selected = storedValue ? '' : item.selected
      if (typeof item.value === 'undefined') {
        item.value = item.text
      }

      // If data is an array, check it exists in the array
      if (Array.isArray(storedValue)) {
        if (storedValue.indexOf(item.value) !== -1) {
          checked = 'checked'
          selected = 'selected'
        }
      } else {
        // The data is just a simple value, check it matches
        if (storedValue === item.value) {
          checked = 'checked'
          selected = 'selected'
        }
      }

      item.checked = (item.checked !== undefined) ? item.checked : checked
      item.selected = (item.selected !== undefined) ? item.selected : selected
      return item
    })

    obj.idPrefix = pathParts.join('-')
  } else {
    // Check for undefined because the value may exist and be intentionally blank
    if (typeof obj.value === 'undefined') {
      obj.value = storedValue
    }
  }
  obj.id = (obj.id) ? obj.id : pathParts.join('-')
  obj.name = (obj.name) ? obj.name: pathParts.map(s => `[${s}]`).join('')
  return obj
}


  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
