# task-blu

# Objective:
write a function to find expiry datetime. expiry datetime is 3 working hours from "now".
the working hours is defined in "schedule" input parameter.
You can write the function in java or javascript.
# input parameters:
now: datetime, current datetime. e.g: '2019-10-11T08:13:07+0800'
schedule: an arraylist of map object. which specified the day open or close and also the start and end of working hours
[
	{"open": false, "open_at": "", close_at: ""}, // sunday
	{"open": true, "open_at": "09:00", close_at: "18:00"}, // monday
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "18:00"},
	{"open": true, "open_at": "09:00", close_at: "17:00"},
	{"open": false, "open_at": "", close_at: ""},
]
# example:
now is friday 4pm. whith the above schedule, the expiry date should be next monday 10am. because on friday office close
at 5pm and office is closed on weekend.
output: datetime, 3 working hour from input date ("now")

# Answer
API Call URL :
http://localhost:3400/api/jobExecutionDateTime

Application Designed: 

Application is designed based on the input value of the hours calculation only, it has configure in the jobExecution.service.js line no 17, as like below,

var duration = 3; // can give n number of hours. it will work based on O(n)

# Input should be as below, 

{
	"schedule": [
		{ "open": false, "open_at": "", "close_at": "" },
    	{ "open": true, "open_at": "09:00", "close_at": "17:00" },
    	{ "open": false, "open_at": "09:00", "close_at": "18:00" },
    	{ "open": true, "open_at": "09:00", "close_at": "18:00" },
    	{ "open": true, "open_at": "09:00", "close_at": "18:00" },
    	{ "open": false, "open_at": "09:00", "close_at": "14:00" },
    	{ "open": false, "open_at": "", "close_at": "" }],
	"custRequestDate": "2020-01-23 14:50"
}


# Output  

{
    "error": false,
    "msg": "23/01/2020 17:50:0 - Day is Thursday"
}

