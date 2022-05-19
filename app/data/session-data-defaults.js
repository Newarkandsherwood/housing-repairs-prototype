/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/
var Data = {
  findResults: [
    {
        name: '25 Ferme Park Road',
        full: '25 FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '27 Ferme Park Road',
        full: '27 FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '28A Ferme Park Road',
        full: '28A FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '28B Ferme Park Road',
        full: '28B FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '29 Ferme Park Road',
        full: '29 FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '31 Ferme Park Road',
        full: '31 FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '32B Ferme Park Road',
        full: '32B FERME PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Eccles Care Home, Ferme Park Road',
        full: 'ECCLES CARE HOME, PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Copperpot Business Centre, Ferme Park Road',
        full: 'COPPERPOT BUSINESS CENTRE, PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '34 Ferme Park Road',
        full: '34 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '35 Ferme Park Road',
        full: '35 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '36 Ferme Park Road',
        full: '36 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '38A Ferme Park Road',
        full: '38A PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '38B Ferme Park Road',
        full: '38B PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '38C Ferme Park Road',
        full: '38C PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: '39 Ferme Park Road',
        full: '39 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Flat 1, 40 Ferme Park Road',
        full: 'FLAT 1, 40 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Flat 2, 40 Ferme Park Road',
        full: 'FLAT 2, 40 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Flat 3, 40 Ferme Park Road',
        full: 'FLAT 3, 40 PARK ROAD, LONDON, N4 4EB',
    },
    {
        name: 'Flat 4, 40 Ferme Park Road',
        full: 'FLAT 4, 40 PARK ROAD, LONDON, N4 4EB',
    }
]}

module.exports = Data
