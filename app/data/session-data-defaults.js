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

//  "issueCategory":"Something else","areaType":"Shared area","postcode":"ln2 5dx","address":"Flat 2, Shoreditch House","repairLocation":"Kitchen","repairType":"Sink, including taps and drainage","type":"sink","moreDetails":"Tap(s)","repairDescription":"My hot water tap has fallen off, it has been like this for a week. I have tried to fix it but I could not do it. ","repairImage":"","contactNumber":"07737797102","contactDetails":"text","text":"07737797102","email":"","next5":"false","repairAvailability":"16th November 2021 between 8:00am and 12:00pm"
var Data = {

  existingReport: 
      { 
        "issueCategory":"Something else",
        "areaType":"Shared area",
        "postcode":"NG24 2AA",
        "address":"17, Winthopre Rd, Newark",
        "repairLocation":"Kitchen",
        "repairType":"Sink, including taps and drainage",
        "type":"sink",
        "moreDetails":"Tap(s)",
        "repairDescription":"My hot water tap has fallen off, it has been like this for a week. I have tried to fix it but I could not do it. ",
        "repairImage":"",
        "contactNumber":"01636 002288",
        "contactDetails":"text",
        "text":"07766554433",
        "email":"",
        "next5":"false",
        "repairAvailability":"16th November 2021 between 8:00am and 12:00pm"
      }
   ,

  findResults: [
    {
        name: '25 Ferme Park Road',
        full: '25 FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '27 Ferme Park Road',
        full: '27 FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '28A Ferme Park Road',
        full: '28A FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '28B Ferme Park Road',
        full: '28B FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '29 Ferme Park Road',
        full: '29 FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '31 Ferme Park Road',
        full: '31 FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '32B Ferme Park Road',
        full: '32B FERME PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '34 Ferme Park Road',
        full: '34 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '35 Ferme Park Road',
        full: '35 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '36 Ferme Park Road',
        full: '36 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '38A Ferme Park Road',
        full: '38A PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '38B Ferme Park Road',
        full: '38B PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '38C Ferme Park Road',
        full: '38C PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: '39 Ferme Park Road',
        full: '39 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: 'Flat 1, 40 Ferme Park Road',
        full: 'FLAT 1, 40 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: 'Flat 2, 40 Ferme Park Road',
        full: 'FLAT 2, 40 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: 'Flat 3, 40 Ferme Park Road',
        full: 'FLAT 3, 40 PARK ROAD, NEWARK, NG24 2AA',
    },
    {
        name: 'Flat 4, 40 Ferme Park Road',
        full: 'FLAT 4, 40 PARK ROAD, NEWARK, NG24 2AA',
    }
]}

module.exports = Data
