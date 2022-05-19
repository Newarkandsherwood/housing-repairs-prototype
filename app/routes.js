const express = require('express')
const router = express.Router()

router.all('/configure-prototype', (req, res) => {
	console.log(req.body)
// TO DO:  populate when creating completed form
	})


    // TO DO : Create rule for root folder, so I can keep the same routes for further iterations in their own folder.

router.post('/current/issue-category-answer', function (req, res) {
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

router.post('/current/area-type-answer', function (req, res) {
    var emergencyRepair = req.session.data['areaType']
    if(emergencyRepair == 'Shared area'){
        res.redirect('postcode');
    }
    else {
        res.redirect('endpoint/communal-repairs');
    }
})

router.post('/current/repair-location-answer', function (req, res) {
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
router.post('/current/bathroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Bath, including taps':
        res.redirect('tier2/bath-taps');
        case 'Shower, including the tray and shower door':
        res.redirect('tier2/shower');
        case 'Sink, including taps and drainage':
        res.redirect('tier2/sink');
        case 'Toilet':
        res.redirect('tier2/toilet');
        case 'Damaged or stuck doors':
        res.redirect('tier2/doors');
        case 'Electrical, including extractor fan and pull cords':
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damp or mould':
        res.redirect('tier2/damp-mould');
        case 'Damaged or stuck windows':
        res.redirect('tier2/windows');
        break;
    }
})

// BEDROOM
router.post('/current/bedroom/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Damaged or stuck doors':
        res.redirect('tier2/doors');
        case 'Electricals, including lights and switches':
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damaged or stuck windows':
        res.redirect('tier2/windows');
        case 'Damp or mould':
        res.redirect('tier2/damp-mould');       
        break;
    }
})

// KITCHEN
router.post('/current/kitchen/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Cupboards, including damaged cupboard doors':
        res.redirect('tier2/cupboards');
        case 'Damaged worktop':
        res.redirect('tier2/worktop');
        case 'Damp or mould':
        res.redirect('tier2/damp-mould');
        case 'Electrical, including extractor fans and lightbulbs':
        res.redirect('tier2/electrical');
        case 'Heating or hot water':
        res.redirect('tier2/heating');
        case 'Sink, including taps and drainage':
        res.redirect('tier2/sink');
        case 'Walls, floor or ceiling, excluding damp':
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damaged or stuck windows':
        res.redirect('tier2/windows');
        case 'Damaged or stuck doors':
        res.redirect('tier2/doors');
        break;
    }
})

// LIVING AREAS
router.post('/current/living-areas/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Damaged or stuck doors':
        res.redirect('tier2/doors');
        case 'Electricals, including lights and switches':
        res.redirect('tier2/electrical');
        case 'Walls, floor or ceiling, excluding damp':
        res.redirect('tier2/walls-floor-ceiling');
        case 'Damaged or stuck windows':
        res.redirect('tier2/windows');
        case 'Damp or mould':
        res.redirect('tier2/damp-mould');       
        break;
        case 'Stairs (including handrail)':
        res.redirect('tier2/stairs');       
        break;
    }
})

// OUTSIDE
router.post('/current/living-areas/repair-type-answer', function (req, res) {
    var repairType = req.session.data['repairType']
    switch (repairType) {
        case 'Door, including shed and outhouse':
        res.redirect('tier2/door');
        case 'Outdoor security lights':
        res.redirect('tier2/outside');
        case 'Garage, including roof and door':
        res.redirect('tier2/garage');
        case 'Gates and pathways':
        res.redirect('tier2/gates');
        case 'Roof, including insulation and shed roof':
        res.redirect('tier2/roof');       
        break;        
    }
})


module.exports = router
