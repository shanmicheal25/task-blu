module.exports = function (server) {

    var startDateTimeObject = new Date();
    var endDateTimeObject = new Date();
    //var custRequestTiming = new Date();
  

    /**
     * job Execution Timing service.
     */
    this.jobExecutionTimingService = async function (params) {
        var jobCompletionDateTime = findAss(params.custRequestDate,params.schedule)
        return jobCompletionDateTime
    }

    function findAss(custRequestTiming, schedule) {
        var duration = 3;
        custRequestTiming = new Date(custRequestTiming);
        custRequestTiming.setUTCHours(custRequestTiming.getUTCHours(), custRequestTiming.getUTCMinutes(), 0);
        console.log('Customer Request Time ', getDateStringCustom(custRequestTiming));

        var satify = true;
        var findDay = custRequestTiming.getDay();
        var remainHour = 0;
        startDateTimeObject = new Date();
        endDateTimeObject = new Date();
        var sameDay = true;
        while (satify) {
            if (schedule[findDay].open) {
                var officeOpenTiming = schedule[findDay].open_at.split(":");
                startDateTimeObject.setHours(officeOpenTiming[0], officeOpenTiming[1], 0);

                var officeCloseTiming = schedule[findDay].close_at.split(":");
                endDateTimeObject.setHours(officeCloseTiming[0], officeCloseTiming[1], 0);

                var diffHours;
                if (sameDay) {
                    console.log(endDateTimeObject.getHours(), ' : ', custRequestTiming.getHours())
                    diffHours = endDateTimeObject.getHours() - (custRequestTiming.getHours())
                    sameDay = false;
                } else {
                    console.log(endDateTimeObject.getHours(), ' : ', startDateTimeObject.getHours())
                    diffHours = endDateTimeObject.getHours() - startDateTimeObject.getHours()
                }

                remainHour = diffHours - duration;
                console.log('remain hour left : ', -(remainHour))

                if (remainHour >= 0) {
                    var jobCompletionHours = endDateTimeObject.getHours() - remainHour;
                    if(remainHour === 0 && custRequestTiming.getUTCMinutes() > 0 ){
                        nextDate()
                        startDateTimeObject.setHours(startDateTimeObject.getHours(), custRequestTiming.getUTCMinutes(), 0);
                    }else{
                        startDateTimeObject.setHours(jobCompletionHours, custRequestTiming.getUTCMinutes(), 0);
                    }
                    satify = false;
                    return getDateStringCustom(startDateTimeObject);
                } else {
                    nextDate()
                    duration = -(remainHour)
                }
            } else {
                nextDate()
            }

            if (findDay === 6) {
                findDay = -1;
            }
            ++findDay;
        }

    }

    function nextDate() {
        startDateTimeObject.setUTCDate(startDateTimeObject.getUTCDate() + 1)
        endDateTimeObject.setUTCDate(endDateTimeObject.getUTCDate() + 1)
    }

    function getDayFormat(dayParam) {
        var day
        switch (dayParam) {
            case 0:
                day = "Sunday";
                break;
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
        }
        return day
    }


    function getDateStringCustom(oDate) {
        var sDate;
        if (oDate instanceof Date) {
            sDate = oDate.getDate()
                + '/'
                + ((oDate.getMonth() + 1 < 10) ? '0' + (oDate.getMonth() + 1) : oDate.getMonth() + 1)
                + '/' + (oDate.getYear() + 1900)
                + ' ' + oDate.getHours()
                + ':' + (oDate.getMinutes() )
                + ':' + (oDate.getSeconds() )
                + ' - Day is ' + getDayFormat(oDate.getDay());
        } else {
            throw new Error("oDate is not an instance of Date");
        }
        return sDate;
    }

}