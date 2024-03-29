const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksControllers');

router.post('/addtasks', tasksController.addTasks);
router.get('/getalltasks', tasksController.getAllTask);
router.get('/gettaskbytaskname/:task', tasksController.getTaskByTaskName);

module.exports = router;