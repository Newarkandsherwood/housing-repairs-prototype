const express = require('express')
const { set } = require('lodash')
const router = express.Router()
let rootLocation;


router.all('/configure-prototype', (req, res) => {
    console.log(req.body)
    var firstPage = req.session.data['config--report-stage'] || req.query['config--report-stage']   
    rootLocation = req.session.data['config--root'] || req.query['config--root']  
    console.log(rootLocation)
    res.redirect(firstPage)
})


// NOTE: I don't know how this :root works. It doesn't have to be 'root' either, it can be anything but it keeps the current folder which allows the same post functions for all files.
//  

router.post( '/:root/issue-category-answer', function (req, res) {
    var emergencyRepair = req.session.data['issueCategory']
    switch (emergencyRepair) {
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
    var emergencyRepair = req.session.data['areaType']
    if(emergencyRepair == 'Shared area'){
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
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
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
            if(rootLocation = '/lincoln-mvp'){
                set(req.session.data, 'type', 'false')   
            }
        res.redirect('../repair-description');
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
        case 'Damaged or stuck doors':
        set(req.session.data, 'type', 'doors') 
        res.redirect('tier2/doors');
        break;
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
            if(rootLocation = '/lincoln-mvp'){
                set(req.session.data, 'type', 'false')   
            }
        res.redirect('../repair-description');
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


module.exports = router
