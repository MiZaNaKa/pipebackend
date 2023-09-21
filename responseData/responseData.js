class ResponseData {

    constructor() {
        this.status = 0 //success = 1, error = 0,
        this.success = {
            message: '',
            data: []
        }
        this.error = {
            type: 0, //success = 0, client request error= 1, server process error = 2
            clientRequestError: [],
            serverProcessError: {}
        }
    }

    
    

    getSuccessResponseData(data) {
        if (data != null) {
            this.status = 1;
            this.success = {
                message: 'ok',
                data: data
            }
        }
        else {
            this.status = 0;
            this.success = {
                message: "no data",
                data: data
            }
        }
    }

    getServerErrorResponseData(errors) {
        this.status = 0 //success = 1, error = 0,
        this.success = {
            message: errors,
            data: []
        }
    }

    
}

module.exports = ResponseData