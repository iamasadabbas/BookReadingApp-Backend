const express = require('express');
const router = express.Router();
const manageTasksController = require('../controllers/manageTasksControllers');

router.post('/addmanagetasks', manageTasksController.addManageTasks);
router.put('/updatemanagetasks', manageTasksController.updateManageTask);
router.get('/getmanagetaskbyroleid/:roleId', manageTasksController.getManageTaskByRoleId);
router.put('/getmanagetaskbytaskid/:taskId/:roleId', manageTasksController.getManageTaskByTaskId);
router.post('/getstatusbytaskidandroleid', manageTasksController.getStatusByTaskIdAndRoleId);

module.exports = router;