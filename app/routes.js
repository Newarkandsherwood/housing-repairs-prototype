const e = require('express')
const express = require('express')
const { set } = require('lodash')
const router = express.Router()
var fs = require("fs");

//  Sets error as false - this is for validation
router.all('*', (req, _, next) => {
    set(req.session.data, 'error', false)
    set(req.session.data, 'errorNotValid', false)
    set(req.session.data, 'errorNoInput', false)
    set(req.session.data, 'noAddress', false)
    set(req.session.data, 'errorNoText', false)
    set(req.session.data, 'errorNoEmail', false)
    set(req.session.data, 'errorNoNumber', false)
    set(req.session.data, 'errorNoRepairNumber', false)
    set(req.session.data, 'errorNoPostcodeSearch', false)
    set(req.session.data, 'next5', 'false'),
    set(req.session.data, 'fileType', false),
    set(req.session.data, 'fileSize', false),
    set(req.session.data, 'fromIssuePage', false),
    set(req.session.data, 'errorNoDescription', false)    
    set(req.session.data, 'errorNoLocation', false)    


    next()
})

router.all('/configure-prototype', (req, res) => {
    console.log(req.body)
    var firstPage = req.session.data['config--report-stage'] || req.query['config--report-stage']   
    if(firstPage.includes('/find-repair')){
        req.session.data = Object.assign(
            req.session.data.existingReport)
    }
    res.redirect(firstPage)
})


//  Validate user input. If no user input return page with error

function validation(data, req, res){
    if(typeof data == 'undefined' || data == ''){
        set(req.session.data, 'error', true) 
        res.redirect('back')
    }
}


//  Check if user has come from check your answers page and return there if they have
function fromSummary(data,res,directoryUp){

    if (data == 'true'){
        if (directoryUp == 'true'){
        res.redirect('../summary')
        }
        else
        res.redirect('./summary')
    }
}


// populate data so we can link straight to summary page
router.all( '/populate-summary', function (req, res) {
    req.session.data = Object.assign(
        req.session.data.existingReport)
        res.redirect('current/summary');
    })
    

    // NOTE: by using parameterisation :root will be dynamic for the folder you're in. You could call it whatever you want. 
    //
    
    
    router.post( '/:root/issue-category-answer', function (req, res) {
    var repairDetails = req.session.data['issueCategory']
    
    // Validate user input
   validation(repairDetails, req, res)

    switch (repairDetails) {
        case 'Something else':
        res.redirect('area-type');
        break;
        case 'I can smell gas in or near the property':
        res.redirect('endpoint/gas');
        break;            
        default:
            set(req.session.data, 'fromIssuePage', true)    
        res.redirect('endpoint/emergency');
        break;
    }
})

router.post('/:root/area-type-answer', function (req, res) {
    var version = req.params.root
    var areaType = req.session.data['areaType']
    validation(areaType, req, res)
    if(version == 'lincoln-mvp' || version == 'v1' || version == 'v2' || version =='v3' || version =='current'){
        switch (areaType) {
    case 'No':
        res.redirect('postcode');
    break;
    case 'Yes':
        res.redirect('endpoint/communal-repairs');
        break;
      }
    }
    res.redirect('postcode');
})

router.post('/:root/postcode-answer', function (req, res) {
      var postcode = req.session.data['postcode']
// extra validation for postcode
    if(typeof postcode == 'undefined' || postcode == '' ){
        set(req.session.data, 'error', true) 
        set(req.session.data, 'errorNoInput', true) 
        res.redirect('postcode')
    }
    
    if(postcode.length < 5){
        set(req.session.data, 'error', true) 
        set(req.session.data, 'errorNotValid', true) 
        res.redirect('postcode')
    }
    // show no addresses
    if(postcode == '111111'){
        res.redirect('endpoint/address-not-listed')
    }
    res.redirect('select-address')
})

router.post('/:root/select-address-answer', function (req, res) {
    fromSummary(req.session.data['complete'],res)
    var version = req.params.root
    var address = req.session.data['address']
    var areaType = req.session.data['areaType']
    console.log(areaType)
    validation(address, req, res)

     if(version == 'lincoln-mvp' ||version == 'v1' ||version == 'v2' || version =='v3' || version =='current'){
        res.redirect('repair-location');
    }
    
    if(areaType == 'communal'){
    res.redirect('existing-reports');
    }
    else {
    res.redirect('repair-location');
    }
})


router.post('/:root/repair-location-answer', function (req, res) {
    var repairLocation = req.session.data['repairLocation']
    validation(repairLocation, req, res)
    switch (repairLocation) {
        case 'Kitchen':
        res.redirect('./kitchen/repair-type');
        case 'Bathroom':
        res.redirect('./bathroom/repair-type');
        case 'Bedroom':
        res.redirect('./bedroom/repair-type');
        case 'Living areas':
        res.redirect('./living-areas/repair-type');
        case 'Outside':
        res.redirect('./outside/repair-type');

    }
})



router.post('/:root/communal-repair-location-answer', function (req, res) {
    var repairLocation = req.session.data['repairLocation']
    validation(repairLocation, req, res)
    switch (repairLocation) {
        case 'Communal area':
        res.redirect('./communal-area/repair-type');
        case 'Kitchen':
        res.redirect('./kitchen/repair-type');
        case 'Outside':
        res.redirect('./outside/repair-type');

       
    }
})

// COMMUNAL AREA 
router.post('/:root/communal-area/repair-type-answer', function( req, res) {
var repairType = req.session.data['repairType']
validation(repairType, req, res)
switch(repairType){
    case 'Door, including back door':
    set(req.session.data, 'type', 'doors') 
    res.redirect('./tier2/doors')
    case 'Window':
    set(req.session.data, 'type', 'windows') 
    res.redirect('./tier2/windows')
    case 'Electricals, including lights and switches and extractor fan':
    set(req.session.data, 'type', 'electrical') 
    res.redirect('./tier2/electrical')
    case 'Smoke or carbon monoxide detector':
    res.redirect('../endpoint/contact-us');
    case 'Flooring':
    res.redirect('../repair-description')
    case 'Walls, floor or ceiling, excluding damp':
    set(req.session.data, 'type', 'walls-floor-ceiling') 
    res.redirect('./tier2/walls-floor-ceiling')
    case 'Stairs including handrail':
    set(req.session.data, 'type', 'stairs') 
    res.redirect('./tier2/stairs')
    case 'Heating or hot water':
    set(req.session.data, 'type', 'heating') 
    res.redirect('./tier2/heating')
    case 'Toilet':
    set(req.session.data, 'type', 'toilet') 
    res.redirect('./tier2/toilet')
    case 'Toilet sink':
    res.redirect('../repair-description')
}
})


// BATHROOM
router.post('/:root/bathroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    validation(repairType, req, res)
    switch (repairType) {
        case 'Bath, including taps':
            // I set this variable here for the summary change links.I should probably extrapolate this out to somewhere else - TO DO.
        set(req.session.data, 'type', 'bath') 
        res.redirect('tier2/bath-taps');
        case 'Shower, including the tray and shower door':
        set(req.session.data, 'type', 'shower') 
        res.redirect('tier2/shower');
        case 'Sink, including taps and drainage':
        set(req.session.data, 'type', 'sink') 
        res.redirect('tier2/sink');
        case 'Heating':
        set(req.session.data, 'type', 'heating') 
        res.redirect('tier2/heating');
        case 'Toilet':
        set(req.session.data, 'type', 'toilet') 
        res.redirect('tier2/toilet');
        // newark only door
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        // lincoln door
        case 'Door':
        set(req.session.data, 'type', 'doors') 
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');        
        case 'Electrical, including extractor fan and pull cords':
        set(req.session.data, 'type', 'eletrical') 
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damp or mould':
        set(req.session.data, 'type', 'damp-mould') 
        res.redirect('tier2/damp-mould');
        case 'Damaged or stuck windows':
        set(req.session.data, 'type', 'windows') 
        res.redirect('tier2/windows');
        case 'Windows':
            set(req.session.data, 'type', 'windows') 
            res.redirect('tier2/windows');
        break;
    }
})

router.post('/:root/:location/bath-taps-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
})


router.post('/:root/:location/shower-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    switch(repairDetails){
        case 'Electric shower unit':
            res.redirect('../endpoint/emergency');
        break;
        case 'Shower drain blocked':
            res.redirect('../endpoint/emergency');
        break;
        default:
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
        break;
    }   
})

router.post('/:root/:location/toilet-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    if(repairDetails == 'Cracked'){
        res.redirect('../endpoint/contact-us');
    }
    else {
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
    }
})

// BEDROOM
router.post('/:root/bedroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    var version = req.params.root
    validation(repairType, req, res)   
    switch (repairType) {
        case 'Damaged or stuck doors':
            // if statement for lincolns different SOR routes
            if(version == 'lincoln-mvp'){
             set(req.session.data, 'type', 'doors') 
            res.redirect('tier2/doors');
        }
        else {
            set(req.session.data, 'type', false) 
            fromSummary(req.session.data['complete'],res,'true')
            res.redirect('../repair-description');
        }
        res.redirect('tier2/doors');
        case 'Electrical, including lights and switches':
        set(req.session.data, 'type', 'electrical') 
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
        case 'Heating':
        set(req.session.data, 'type', 'heating') 
        res.redirect('tier2/heating');
        case 'Damaged or stuck windows':
        set(req.session.data, 'type', 'windows') 
        res.redirect('tier2/windows');
        case 'Damp or mould':
        set(req.session.data, 'type', 'damp-mould') 
        res.redirect('tier2/damp-mould');       
        break;
    }
})

// KITCHEN
router.post('/:root/kitchen/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    var version = req.params.root
    validation(repairType, req, res)   
    switch (repairType) {
        case 'Cupboards, including damaged cupboard doors':
        set(req.session.data, 'type', 'cupboards') 
        res.redirect('tier2/cupboards');
        case 'Damaged worktop':
            // if statement for lincolns different SOR routes
            if(version == 'lincoln-mvp'){
                set(req.session.data, 'type', 'false')   
                fromSummary(req.session.data['complete'],res)
                res.redirect('../repair-description');
            }
            else {
                set(req.session.data, 'type', 'worktop')   
                res.redirect('.././endpoint/contact-us');
            }
        case 'Damp or mould':
        set(req.session.data, 'type', 'damp-mould') 
        res.redirect('tier2/damp-mould');
        case 'Electrical, including extractor fans and lightbulbs':
        set(req.session.data, 'type', 'electrical') 
        res.redirect('tier2/electrical');
        case 'Heating or hot water':
        set(req.session.data, 'type', 'heating') 
        res.redirect('tier2/heating');
        case 'Sink, including taps and drainage':
        set(req.session.data, 'type', 'sink') 
        res.redirect('tier2/sink');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damaged or stuck windows':
        set(req.session.data, 'type', 'windows') 
        res.redirect('tier2/windows');
        //  Lincoln only door
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        //  Newark Doors
        case 'Door, including back door':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        case 'Stop tap':
            res.redirect('../repair-description');
        case 'Smoke or carbon monoxide detector':
            res.redirect('../endpoint/contact-us');
        break;
    }
})

router.post('/:root/:location/cupboards-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
})



router.post('/:root/:location/heating-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)             
    if(repairDetails == 'Boiler'){
        res.redirect('../endpoint/emergency');
    }
    if(repairDetails == 'Radiator'){
        res.redirect('../endpoint/contact-us');
    }
    if(repairDetails == 'Gas fire not working'){
        res.redirect('../endpoint/contact-us');
    } 
    else {
        res.redirect('../repair-description');
    }
})



// LIVING AREAS
router.post('/:root/living-areas/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    validation(repairType, req, res)   
    switch (repairType) {
        case 'Front door':
            res.redirect('../endpoint/emergency');
        case 'Damaged or stuck internal doors':
        set(req.session.data, 'type', 'doors') 
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
        case 'Electrical, including lights and switches':
        set(req.session.data, 'type', 'electrical') 
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
        case 'Heating':
            set(req.session.data, 'type', 'heating') 
            res.redirect('tier2/heating');
        case 'Damaged or stuck windows':
        set(req.session.data, 'type', 'windows')
        res.redirect('tier2/windows');
        case 'Damp or mould':
        set(req.session.data, 'type', 'damp-mould')  
        res.redirect('tier2/damp-mould');     
        break;
        case 'Stairs (including handrail)':
        set(req.session.data, 'type', 'windows')
        res.redirect('tier2/stairs');     
        case 'Smoke or carbon monoxide detector':
            res.redirect('../endpoint/emergency');
        break;  
        break;
    }
})


router.post('/:root/:location/stairs-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)           
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
})

// OUTSIDE
router.post('/:root/outside/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    var version = req.params.root 
    validation(repairType, req, res)   
    switch (repairType) {
        case 'Doors, including shed and outhouse':
            set(req.session.data, 'type', 'door')
            res.redirect('tier2/door');
        case 'Outdoor security lights':
            // if statement for lincolns different SOR routes
            if(version == 'lincoln-mvp'){
            fromSummary(req.session.data['complete'],res,'true')
            res.redirect('../repair-description');
            }
            else {
                res.redirect('../endpoint/contact-us');
            }       
        case 'Garage, including roof and door':
            set(req.session.data, 'type', 'garage') 
            res.redirect('tier2/garage');
        case 'Gates and pathways':
            set(req.session.data, 'type', 'gates') 
            res.redirect('tier2/gates');
        case 'Roof, including insulation and shed roof':
            set(req.session.data, 'type', 'roof') 
            res.redirect('tier2/roof');    
        case 'Property walls':
            set(req.session.data, 'type', 'property-walls') 
            res.redirect('tier2/property-walls');  
        case 'Drain':
            set(req.session.data, 'type', 'property-walls') 
            res.redirect('../repair-description');      
        case 'Guttering':
            set(req.session.data, 'type', 'property-walls') 
            res.redirect('tier2/guttering');       
        case 'Soffit or fascias':
            set(req.session.data, 'type', 'property-walls') 
            res.redirect('../repair-description');       
        case 'Playpark':
            res.redirect('../endpoint/contact-us');   
        case 'Garage':
            res.redirect('../endpoint/contact-us'); 
        case 'Playpark':
            res.redirect('../endpoint/contact-us');   
        break;        
    }
})

router.post('/:root/:location/garage-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    if(repairDetails == 'Broken into'){
        res.redirect('../endpoint/emergency');
    }
    else {
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
    }
})

router.post('/:root/:location/gates-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    if(repairDetails == 'Concrete path around the property'){
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
    }
    else {
        res.redirect('../endpoint/contact-us');
    }
})

router.post('/:root/:location/roof-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
})


// MULTIPLE LOCATIONS


router.post('/:root/:location/damp-mould-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    if(repairDetails == 'Yes'){
        res.redirect('../endpoint/emergency');
    }
    else {
        res.redirect('../endpoint/contact-us');
    }
})

router.post('/:root/:location/electrical-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)     
    fromSummary(req.session.data['complete'],res,'true')
    res.redirect('../repair-description');
})


router.post('/:root/:location/sink-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
     if(repairDetails == 'Damage to the sink' || repairDetails == 'Pipework leak' || repairDetails == 'Leak or blockage' ){
        res.redirect('../endpoint/contact-us');
    }
    else {
          fromSummary(req.session.data['complete'],res,'true')
            res.redirect('../repair-description');
    }
})

router.post('/:root/:location/walls-floor-ceiling-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    switch(repairDetails){
        case 'Plastering on the ceiling':
            res.redirect('../endpoint/contact-us');
        break;
        case 'Plastering on the walls':
            res.redirect('../endpoint/contact-us');
        break;
        case 'Leak through ceiling':
            res.redirect('../endpoint/emergency');
        default: 
          fromSummary(req.session.data['complete'],res, 'true')
res.redirect('../repair-description');
        break;
    }   
})

router.post('/:root/:location/windows-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)   
    if(repairDetails == 'Smashed window(s)' || repairDetails == 'Window stuck open'){
        res.redirect('../endpoint/emergency');
    }
    else {
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
    }
})

router.post('/:root/:location/doors-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    validation(repairDetails, req, res)  
     if(repairDetails == 'Outhouse cupboard door' || repairDetails == 'Wooden back door'){
        res.redirect('../endpoint/contact-us');
    }
    else if (repairDetails == 'Front door' || repairDetails == 'External entrance or exit door will not lock or unlock'){
        res.redirect('../endpoint/emergency');
    }
    else {
        fromSummary(req.session.data['complete'],res,'true')
        res.redirect('../repair-description');
    }
})

// REPAIR DESC

router.post('/:root/repair-description-answer', function (req, res) {
    var repairDescription = req.session.data['repairDescription']
    var repairSpecificLocation = req.session.data['repairSpecificLocation'] 
    var areaType = req.session.data['areaType']
    var version = req.params.root
    if (areaType == 'communal'){
        if(repairSpecificLocation == 'undefined' || repairSpecificLocation == ''){
        set(req.session.data, 'error', true)
        set(req.session.data, 'errorNoLocation', true)
        }
        if(repairDescription == 'undefined' || repairDescription == ''){
            set(req.session.data, 'error', true)
            set(req.session.data, 'errorNoDescription', true)
        }
    } 
    validation(repairDescription, req, res)
    if(version == 'lincoln-mvp'){
    res.redirect('contact-number');
} 
    else if(version == 'v2'){
        fromSummary(req.session.data['complete'],res)
        res.redirect('repair-availability');
    }
    else {
        fromSummary(req.session.data['complete'],res)
        res.redirect('repair-picture');
    }
  
})

// REPAIR DESC

router.post('/:root/repair-description-communal-answer', function (req, res) {
    var repairDescription = req.session.data['repairDescription']
    var repairSpecificLocation = req.session.data['repairSpecificLocation'] 

        if(repairSpecificLocation == 'undefined' || repairSpecificLocation == ''){
        set(req.session.data, 'error', true)
        set(req.session.data, 'errorNoLocation', true)
        }
        if(repairDescription == 'undefined' || repairDescription == ''){
            set(req.session.data, 'error', true)
            set(req.session.data, 'errorNoDescription', true)
        }
        if(req.session.data.error == true){
        res.redirect('back')
        }

        fromSummary(req.session.data['complete'],res)
        res.redirect('repair-picture');
  
})

//  REPAIR PICTURE
router.post('/:root/repair-picture-answer', function (req, res) {
    var version = req.params.root
    var areaType = req.session.data['areaType']
    var fileTypeError = req.session.data['typeError']
    var fileSizeError = req.session.data['sizeError']
    var fileSize = req.session.data['fileSizeInMB']
    console.log(fileTypeError + '   ' + fileSizeError)
    if(fileTypeError == 'true' || fileSizeError == 'true'){
        set(req.session.data, 'error', true) 
        set(req.session.data, 'fileSize', fileSize)
        set(req.session.data, 'errorFileType', fileTypeError)
        set(req.session.data, 'errorFileSize', fileSizeError) 
        res.redirect('back')
    }

     if(version == 'lincoln-mvp' ||version == 'v1' ||version == 'v2' || version =='v3' || version =='current'){
      res.redirect('repair-availability');
    }

    if(areaType == 'communal'){
      res.redirect('contact-details');
    }
    else {
      res.redirect('repair-availability');
    }
})

//  CONTACT NUMBER
router.post('/:root/contact-number-answer', function (req, res) {
    fromSummary(req.session.data['complete'],res)

    var contactNumber = req.session.data['contactNumber']

    validation(contactNumber, req, res)
        if(req.session.data['fromEdit'] == 'true' )
        res.redirect('change-repair/number-change-confirmed');
        else {
        res.redirect('contact-details');
        }
})

router.post('/:root/contact-number-answer-alt', function (req, res) {
    fromSummary(req.session.data['complete'],res)

    var contactNumber = req.session.data['contactNumber']

    validation(contactNumber, req, res)
        if(req.session.data['fromEdit'] == 'true' )
        res.redirect('change-repair/number-change-confirmed');
        else {
        res.redirect('summary');
        }
})

//  CONTACT DETAILS 

    router.post('/:root/contact-details-answer-alt', function (req, res) {
        var version = req.params.root
        fromSummary(req.session.data['complete'],res)
        var contactDetails = req.session.data['contactDetails']
        var email = req.session.data['email']
        var mobile = req.session.data['text']

        if(typeof contactDetails == 'undefined'){
            set(req.session.data, 'error', true) 
            set(req.session.data, 'errorNoInput', true) 
            res.redirect('back')

        }
    
                if(contactDetails == 'text'){
                    if(typeof mobile == 'undefined' || mobile == ''){
                        set(req.session.data, 'error', true) 
                        set(req.session.data, 'errorNoText', true) 
                        res.redirect('back')
                    }   
                    res.redirect('contact-number-confirmation');                 
                }

                if(contactDetails == 'email'){      
                        if(typeof email == 'undefined' || email == ''){
                        set(req.session.data, 'error', true) 
                        set(req.session.data, 'errorNoEmail', true) 
                        res.redirect('back')
                    } 
                    res.redirect('contact-number');
                }                  
            })


        router.post('/:root/contact-details-answer', function (req, res) {
            fromSummary(req.session.data['complete'],res)
            var contactDetails = req.session.data['contactDetails']
            var email = req.session.data['email']
            var mobile = req.session.data['text']
        
            if(typeof contactDetails == 'undefined'){
                set(req.session.data, 'error', true) 
                set(req.session.data, 'errorNoInput', true) 
                res.redirect('back')
        
            }
           
                    if(contactDetails == 'text'){
                        if(typeof mobile == 'undefined' || mobile == ''){
                            set(req.session.data, 'error', true) 
                            set(req.session.data, 'errorNoText', true) 
                            res.redirect('back')
                        }   
                    }
        
                    if(contactDetails == 'email'){      
                             if(typeof email == 'undefined' || email == ''){
                            set(req.session.data, 'error', true) 
                            set(req.session.data, 'errorNoEmail', true) 
                            res.redirect('back')
                        }  
                    }        
                        res.redirect('repair-availability');
        
                })

// CONTACT CONFIRMATION 

router.post('/:root/contact-number-confirmation-answer', function (req, res) {

    var contactConfirmation = req.session.data['contactConfirm']
    var number = req.session.data['contactNumber']

    if(typeof contactConfirmation == 'undefined'){
        set(req.session.data, 'error', true) 
        set(req.session.data, 'errorNoInput', true) 
        res.redirect('back')
    }
   
        if(contactConfirmation == 'No'){
            if(typeof number == 'undefined' || number == ''){
                set(req.session.data, 'error', true) 
                set(req.session.data, 'errorNoNumber', true) 
                res.redirect('back')
            }   
        }
        res.redirect('summary');

        })

//  WHEN ARE YOU AVAILABLE. SET APPOINTMENT

router.post('/:root/repair-availability-answer', function (req, res) {
    if (req.session.data['fromEdit'] == 'true'){
        res.redirect('change-repair/appointment-time-confirmed');
    } 
    var appointment = req.session.data['repairAvailability']
    validation(appointment, req, res)   
        res.redirect('summary');
    
})

router.post('/:root/repair-availability-answer-alt', function (req, res) {
    
    if (req.session.data['fromEdit'] == 'true'){
        res.redirect('change-repair/appointment-time-confirmed');
    } 
    fromSummary(req.session.data['complete'],res,'false')
    var appointment = req.session.data['repairAvailability']
    validation(appointment, req, res)   
        res.redirect('contact-details');
    
})


// REPAIR APPOINTMENT CHANGE 

router.post('/:root/find-repair-answer', function (req, res) {
    var repairNumber = req.session.data['repairNumber']
    var postcodeSearch = req.session.data['postcodeSearch']
    var version = req.params.root
    if(repairNumber == '' || postcodeSearch == '' ){
        set(req.session.data, 'error', true)  
        if(repairNumber == ''){
            set(req.session.data, 'errorNoRepairNumber', true) 
        }
        
        if(postcodeSearch == ''){
            set(req.session.data, 'errorNoPostcodeSearch', true) 
        }
        res.redirect('back')
    }
    if(repairNumber == '111111') {
        res.redirect('change-repair/no-repair-found')
    }
    if(repairNumber == '222222') {
        res.redirect('change-repair/repair-completed')
    }
    else {
        if (version == 'v2'){
        res.redirect('change-repair/passcode');
        }
        else {
        res.redirect('change-repair/change-type');
        }
    }

        })


        router.post('/:root/:folder/passcode-answer', function (req, res) {
            var passcode = req.session.data['passcode']
            validation(passcode, req, res)
            res.redirect('change-type');   
        })


router.post('/:root/change-type-answer', function (req, res) {
    var changeType = req.session.data['changeType']
    validation(changeType,req,res)
    switch (changeType) {
        case 'Change the time slot of the repair appointment':
        res.redirect('repair-availability?next5=false');
        break;
        case 'Change the contact number for the repair appointment':
        res.redirect('contact-number');
        break;
        case 'Cancel the repair appointment':
        res.redirect('change-repair/cancel-confirmation');
        break;
    }

})

router.post('/:root/cancel-confirmation-answer', function (req, res) {
    var confirmCancel = req.session.data['cancelAppointment']
    validation(confirmCancel,req,res)
    switch (confirmCancel){
      case 'Yes':
        res.redirect('change-repair/appointment-cancelled');
        break;
        case 'No':
        res.redirect('change-repair/change-type');
        break;
    }
})



module.exports = router
