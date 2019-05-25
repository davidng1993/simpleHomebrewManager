var express = require('express');
var router = express.Router();
const {exec} = require('child_process');

/* GET home page. */

var convertBrewServicesListToObjectArray = function(servicesStringFromCmd){

	 TAB_INDEX = ['name','status','user','plist'];
	 var lines = servicesStringFromCmd.split('\n');
	 var brewServices = [];
	 for(i = 1 ; i < lines.length;i++){
	 	line = lines[i];
	 	if(line.length>0){
	 		obj = {};
	 		objs = line.split(' ');
	 		objCount = 0;
	 		for(y = 0 ; y < objs.length ;y++){
	 			if(objs[y].length>0){
	 				obj[TAB_INDEX[objCount]] = objs[y]
	 				objCount++;

	 			}
	 		}
	 		brewServices.push(obj);
	 	}

	 }
	 return  brewServices;
 		
}



router.get('/', function(req, res, next) {
	exec('brew services list', (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
	    return;
	  }
	 var result = `${stdout}`;
	 homeBrewServices = convertBrewServicesListToObjectArray(result);
	 console.log(homeBrewServices);
	  // the *entire* stdout and stderr (buffered)
	  res.render('index', { title: 'Services Page', homeBrewServices :homeBrewServices});
	});


});


router.get('/:action/:serviceName', function(req, res, next) {
	cmd= 'brew services -action- -name-';
	cmd =cmd.replace('-action-',req.params.action);
	cmd =cmd.replace('-name-',req.params.serviceName);

	exec(cmd, (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command

	 	console.log("err"+err);
	    return;
	  }
	 console.log("stdout"+stdout);
	 console.log("stderr"+stderr);
	 var result = `${stdout}`;
	 console.log(result);
	  // the *entire* stdout and stderr (buffered)\
	  res.redirect('/') ;
	});


});

module.exports = router;
