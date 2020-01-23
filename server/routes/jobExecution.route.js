module.exports = function (server) {
    const { check } = require('../../node_modules/express-validator/check')
    const { validationResult } = require('express-validator')
    require('../controllers/jobExecution.controller')(server)

    /**
     * call job execution timing Controller. 
     */
    server.post('/api/jobExecutionDateTime',
    [check('schedule').not().isEmpty().withMessage('Schedule week array data is empty'),
    check('custRequestDate').not().isEmpty().withMessage('Customer Request Date is empty')], (request, response) => {
        let errors = validationResult(request)
        if (!errors.isEmpty()) {
            var errorArray = errors.array()
            var errorResponse = {}
            errorResponse.error = true
            errorResponse.message = errorArray
            return response.send(errorResponse)
        } else {

            console.log('came to inside else')
            this.jobExecutionTimingController(request.body, function (results) {
                console.log(results)
                return response.send(results)
            })
            //return response.send("deployment success  version 6.0 SIT");
        }

        //return response.send("deployment success  version 6.0 SIT");
    })
}