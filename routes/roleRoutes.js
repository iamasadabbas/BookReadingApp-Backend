const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesControllers');

router.post('/addroles', rolesController.addRoles);
router.get('/getallroles', rolesController.getAllRole);
router.get('/getrolebyrolename/:role', rolesController.getRoleIdByRoleName);

module.exports = router;