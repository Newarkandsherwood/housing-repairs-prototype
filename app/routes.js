const express = require('express')
const { set } = require('lodash')
const router = express.Router()



router.all('/configure-prototype', (req, res) => {
    console.log(req.body)
    var firstPage = req.session.data['config--report-stage'] || req.query['config--report-stage']   
    console.log(firstPage)
    if(firstPage.includes('/find-repair')){
        req.session.data = Object.assign(
            req.session.data.existingReport)
    }
    console.log(req.session)
    res.redirect(firstPage)
})


// NOTE: by using parameterisation :root will be dynamic for the folder you're in. You could call it whatever you want. 
//  

router.post( '/:root/issue-category-answer', function (req, res) {
    var repairDetails = req.session.data['issueCategory']
    switch (repairDetails) {
        case 'Something else':
        res.redirect('area-type');
        break;
        case 'I can smell gas in or near the property':
        res.redirect('endpoint/gas');
        break;
        default:
        res.redirect('endpoint/emergency');
        break;
    }
})

router.post('/:root/area-type-answer', function (req, res) {
    var repairDetails = req.session.data['areaType']
    if(repairDetails == 'Shared area'){
        res.redirect('postcode');
    }
    else {
        res.redirect('endpoint/communal-repairs');
    }
})

router.post('/:root/repair-location-answer', function (req, res) {
    var repairLocation = req.session.data['repairLocation']
    switch (repairLocation) {
        case 'Kitchen':
        res.redirect('./kitchen/repair-type');
        break;
        case 'Bathroom':
        res.redirect('./bathroom/repair-type');
        break;
        case 'Bedroom':
        res.redirect('./bedroom/repair-type');
        break;
        case 'Living areas':
        res.redirect('./living-areas/repair-type');
        break;
        case 'Outside':
        res.redirect('./outside/repair-type');
        break;
    }
})

// BATHROOM
router.post('/:root/bathroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Bath, including taps':
            // I set this variable here for the summary change links. Further work to extrapolate this out to filters.
        set(req.session.data, 'type', 'bath') 
        res.redirect('tier2/bath-taps');
        case 'Shower, including the tray and shower door':
        set(req.session.data, 'type', 'shower') 
        res.redirect('tier2/shower');
        case 'Sink, including taps and drainage':
        set(req.session.data, 'type', 'sink') 
        res.redirect('tier2/sink');
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
        break;
    }
})

router.post('/:root/shower-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Electric shower unit' || repairDetails == 'Shower drain blocked'){
        res.redirect('endpoint/emergency');
    }
    else if(repairDetails == 'Shower tray broken'){
        res.redirect('endpoint/contact-us');
    }
    else {
        res.redirect('repair-description');
    }
})

router.post('/:root/toilet-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Cracked'){
        res.redirect('endpoint/contact-us');
    }
    else {
        res.redirect('repair-description');
    }
})

// BEDROOM
router.post('/:root/bedroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        case 'Electrical, including lights and switches':
        set(req.session.data, 'type', 'electrical') 
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
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
    switch (repairType) {
        case 'Cupboards, including damaged cupboard doors':
        set(req.session.data, 'type', 'cupboards') 
        res.redirect('tier2/cupboards');
        case 'Damaged worktop':
            // if statement for lincolns different SOR routes
            if(req.params.root == '/lincoln-mvp'){
                set(req.session.data, 'type', 'false')   
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
        break;
    }
})


router.post('/:root/damp-mould-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Yes'){
        res.redirect('endpoint/emergency');
    }
    else {
        res.redirect('endpoint/contact-us');
    }
})


router.post('/:root/heating-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Boiler'){
        res.redirect('endpoint/emergency');
    }
    else {
        res.redirect('endpoint/contact-us');
    }
})



// LIVING AREAS
router.post('/:root/living-areas/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        case 'Electrical, including lights and switches':
        set(req.session.data, 'type', 'electrical') 
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        set(req.session.data, 'type', 'walls-floor-ceiling') 
        res.redirect('tier2/walls-floor-ceiling');
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
        break;
    }
})

// OUTSIDE
router.post('/:root/outside/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Door, including shed and outhouse':
        set(req.session.data, 'type', 'door')
        res.redirect('tier2/door');
        case 'Outdoor security lights':
            // if statement for lincolns different SOR routes
            if(req.params.root == '/lincoln-mvp'){
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
        break;        
    }
})

router.post('/:root/garage-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    console.log(repairDetails)
    if(repairDetails == 'Broken into'){
        res.redirect('endpoint/emergency');
    }
    else {
        res.redirect('repair-description');
    }
})

router.post('/:root/gates-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    console.log(repairDetails)
    if(repairDetails == 'Concrete path around the property'){
        res.redirect('repair-description');
    }
    else {
        res.redirect('endpoint/contact-us');
    }
})



// MULTIPLE LOCATIONS

router.post('/:root/sink-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Damage to the sink'){
        res.redirect('endpoint/contact-us');
    }
    else {
        res.redirect('repair-description');
    }
})

router.post('/:root/walls-floor-ceiling-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Plastering on the ceiling' || repairDetails == 'Plastering on the walls'){
        res.redirect('endpoint/contact-us');
    }
    else if(repairDetails == 'Leak through ceiling'){
        res.redirect('endpoint/emergency');
    }
    else {
        res.redirect('repair-description');
    }
})

router.post('/:root/windows-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Smashed window(s)' || repairDetails == 'Window stuck open'){
        res.redirect('endpoint/emergency');
    }
    else {
        res.redirect('repair-description');
    }
})

router.post('/:root/doors-answer', function (req, res) {
    var repairDetails = req.session.data['moreDetails']
    if(repairDetails == 'Outhouse cupboard door' || repairDetails == 'Wooden back door'){
        res.redirect('endpoint/contact-us');
    }
    else {
        res.redirect('repair-description');
    }
})


// REPAIR APPOINTMENT CHANGE 

router.post('/:root/change-type-answer', function (req, res) {
    var changeType = req.session.data['changeType']
    switch (changeType) {
        case 'Change the time slot of the repair appointment':
        res.redirect('repair-availability?next5=false&fromEdit=true');
        break;
        case 'Change the contact number for the repair appointment':
        res.redirect('contact-number?fromEdit=true');
        break;
        case 'Cancel the repair appointment':
        res.redirect('change-repair/cancel-confirmation');
        break;
    }

})

router.post('/:root/cancel-confirmation-answer', function (req, res) {
    var confirmCancel = req.session.data['cancelAppointment']
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
