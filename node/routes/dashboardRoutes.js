const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Dashboard statistics routes
router.get('/:user_id/:period?', dashboardController.getDashboardStatistics); // Optional period

// Monthly declaration routes
router.post('/monthly-declaration/:user_id', dashboardController.submitMonthlyDeclaration);
router.put('/monthly-declaration/:user_id/:declaration_id', dashboardController.updateMonthlyDeclaration);
router.delete('/monthly-declaration/:user_id/:declaration_id', dashboardController.deleteMonthlyDeclaration);
router.get('/monthly-declaration/:user_id/:declaration_id', dashboardController.getMonthlyDeclaration);

//
router.get('/social-security-contributions/:user_id', dashboardController.getTotalSocialSecurityContributions);


// Annual declaration routes
router.get('/annual-declaration/:user_id', dashboardController.getAnnualDeclaration);

module.exports = router;
