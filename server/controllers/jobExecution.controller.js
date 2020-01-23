
module.exports = function (server) {
    require('../services/jobExecution.service')(server)

    /**
     * @ProductModel higherorderfunction() start CRUD
     * @Controller add/post catalogs 
     * 
     * @param
     * @callback return 
     */
    this.jobExecutionTimingController = async (param, callback) => {
        var resp = {}
        try {
            var results = await this.jobExecutionTimingService(param);
            resp = {
                error: false,
                msg: results
            }
            callback(resp);
        } catch (e) {
            resp = {
                error: true,
                msg: e
            }
            callback(resp) 
        }

    }

}
