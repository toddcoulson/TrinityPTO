angular.module("ptoApp",["ptoApp.services","ptoApp.controller","ptoApp.employeeTestFactory","ui.router","ngResource","ui.bootstrap","colorpicker.module","googleplus"]).config(["GooglePlusProvider",function(e){e.init({clientId:"977491754644-954b83j2evmq65v6kchq4dsd9j0ud4vg.apps.googleusercontent.com",apiKey:"AIzaSyDaMf0eviuFygt1hzwQz03a2k2lrLDnpIc"})}]).service("gapiService",function(){this.initGapi=function(e){gapi.client.load("helloWorld","v1",e,restURL)}}).config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("app",{url:"/",views:{header:{templateUrl:"./views/header.html",controller:"HeaderController"},info:{templateUrl:"./views/login.html",controller:"LoginController"},body:{templateUrl:"./views/loginBody.html",controller:""},secondBody:{templateUrl:"./views/loginSecondBody.html",controller:""}}}).state("app.employee",{url:"employee",views:{"info@":{templateUrl:"./views/info.html",controller:"InfoController"},"body@":{templateUrl:"./views/request.html",controller:"RequestController"},"secondBody@":{templateUrl:"./views/secondRequest.html",controller:"SecondRequestController"}}}).state("app.approver",{url:"approver",views:{"info@":{templateUrl:"./views/infoApprover.html",controller:"InfoApproverController"},"body@":{templateUrl:"./views/bodyApprover.html",controller:"BodyApproverController"},"secondBody@":{templateUrl:"./views/secondBodyApprover.html",controller:"SecondBodyApproverController"}}}).state("app.admin",{url:"admin",views:{"info@":{templateUrl:"./views/infoAdmin.html",controller:"InfoAdminController"},"body@":{templateUrl:"./views/bodyAdmin.html",controller:"UsersAdminController"},"secondBody@":{templateUrl:"./views/secondBodyAdmin.html",controller:""}}}).state("app.adminTimeState",{url:"admin/timestate",views:{"info@":{templateUrl:"./views/infoAdmin.html",controller:"InfoAdminController"},"body@":{templateUrl:"./views/body_time_state.html",controller:"TimeStateAdminController"},"secondBody@":{templateUrl:"./views/secondBodyAdmin.html",controller:"BodyAdminController"}}}).state("app.adminTimeOffGroup",{url:"admin/timeOffGroup",views:{"info@":{templateUrl:"./views/infoAdmin.html",controller:"InfoAdminController"},"body@":{templateUrl:"./views/body_time_off_group.html",controller:"TimeOffGroupAdminController"},"secondBody@":{templateUrl:"./views/secondBodyAdmin.html",controller:"TimeOffGroupAdminController"}}});t.otherwise("/")}]);angular.module("ptoApp.services",["ngResource"]);angular.module("ptoApp.controller",[]);angular.module("ptoApp.employeeTestFactory",[]);angular.module("ptoApp").filter("capitalize",function(){return function(e){return!!e?e.charAt(0).toUpperCase()+e.substr(1).toLowerCase():""}}).filter("capitalizeTitle",function(){return function(e){return e.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})}});angular.module("ptoApp").directive("cardView",["$filter",function(e){return{restrict:"E",scope:{cardobj:"=fcardobj",updatedb:"&update",deletedb:"&delete",adddb:"&add"},link:function(e,t,o,r){e.$watch(e.cardobj,function(){var t=new Date(e.cardobj.startDateTime);var o=new Date(e.cardobj.endDateTime);if(e.cardobj.cardState!=="edit"&&e.cardobj.cardState!=="add"){e.cardobj.timeDuration=r.determineDays(t,o,t,o)}},true)},controller:["$scope","$element","$attrs","$location","$injector","timeOffGroupTestFactory","timeStateTestFactory",function(e,t,o,r,a,i,n){e.timeOffGroups=[];e.timeOffGroupSelect={};e.timeStates=[];e.timeStatesSelect={};e.dates={};e.dates.dt1=new Date;e.dates.dt2=new Date;e.times={};e.times.startTime=new Date(1970,0,1,8,30,0);e.times.endTime=new Date(1970,0,1,9,30,0);e.hstep=1;e.mstep=15;e.ismeridian=true;e.determineDays=this.determineDays=function(t,o,r,a){var i=new Date(t);var n=new Date(o);var s=new Date(r);var u=new Date(a);var d=[new Date("2017-01-01T00:00:00Z"),new Date("2017-01-16T00:00:00Z"),new Date("2017-02-20T00:00:00Z"),new Date("2017-05-29T00:00:00Z"),new Date("2017-07-04T00:00:00Z"),new Date("2017-09-04T00:00:00Z"),new Date("2017-10-09T00:00:00Z"),new Date("2017-11-10T00:00:00Z"),new Date("2017-11-23T00:00:00Z"),new Date("2017-12-25T00:00:00Z")];var c=d.length;var l=0;var m=0;while(c--){if(d[c]>=i)if(d[c]<=n)l=l-1}while(i<=n){if(i.getUTCDay()!=0&&i.getUTCDay()!=6)l=l+1;i.setUTCHours(24)}console.log("days: "+l);if(l>1){var p=new Date(s);p.setHours(17,30,0);var f=p-s;f=f/1e3/60/60;m+=f;var y=new Date(u);y.setHours(8,30,0);var g=u-y;g=g/1e3/60/60;m+=g}else{console.log(u-s);console.log(u,s);var v=u.getHours()-s.getHours();v+=u.getMinutes()/60;v-=s.getMinutes()/60;m+=v}if(l>2){l=l-2;m+=l*8}e.n_hours=m;return m};e.changeTime=function(){if(e.times.startTime.getHours()>17){e.times.startTime=new Date(1970,0,1,17,0,0)}if(e.times.endTime.getHours()>17){e.times.endTime=new Date(1970,0,1,17,0,0)}if(e.times.startTime.getHours()<8){e.times.startTime=new Date(1970,0,1,8,0,0)}if(e.times.endTime.getHours()<8){e.times.endTime=new Date(1970,0,1,8,0,0)}e.determineDays(e.dates.dt1,e.dates.dt2,e.times.startTime,e.times.endTime);if(e.n_hours<0){e.times.endTime=e.times.startTime}};i.query().then(function(t){e.timeOffGroups=t}).then(function(t){n.query().then(function(t){e.timeStates=t})});e.$watch("dates.dt1",function(t,o,r){if(typeof e.cardobj!="undefined")e.cardobj.timeDuration=e.determineDays(e.dates.dt1,e.dates.dt2,e.times.startTime,e.times.endTime)});e.$watch("dates.dt2",function(t,o,r){if(typeof e.cardobj!="undefined")e.cardobj.timeDuration=e.determineDays(e.dates.dt1,e.dates.dt2,e.times.startTime,e.times.endTime)});e.$watch("times.endTime",function(t,o,r){if(typeof e.cardobj!="undefined")e.cardobj.timeDuration=e.determineDays(e.dates.dt1,e.dates.dt2,e.times.startTime,e.times.endTime)});e.$watch("times.startTime",function(t,o,r){if(typeof e.cardobj!="undefined")e.cardobj.timeDuration=e.determineDays(e.dates.dt1,e.dates.dt2,e.times.startTime,e.times.endTime)});e.changeTimeType=function(){e.cardobj.timeType=e.timeTypeSelect.timeType};e.changeTimeOffGroup=function(){e.cardobj.timeOffGroup=e.timeOffGroupSelect.timeOffGroup};function s(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds())}e.onApprove=function(){e.cardobj.timeState="approved";e.updatedb({value:e.cardobj})};e.onDeny=function(){e.cardobj.timeState="denied";e.updatedb({value:e.cardobj})};e.close=function(){e.deletedb({value:e.cardobj})};e.edit=function(){e.dates.dt1=new Date(e.cardobj.startDateTime);e.dates.dt2=new Date(e.cardobj.endDateTime);e.times.startTime=new Date(e.cardobj.startDateTime);e.times.endTime=new Date(e.cardobj.endDateTime);document.getElementById("selectTimeOffGroup").value=e.cardobj.timeOffGroup;if(e.cardobj.cardState=="review"){e.cardobj.cardState="reviewedit"}else{e.cardobj.cardState="edit"}};e.submit=function(){if(e.cardobj.cardState==="edit"||e.cardobj.cardState==="add"){e.cardobj.startDateTime=s(e.dates.dt1,e.times.startTime);e.cardobj.endDateTime=s(e.dates.dt2,e.times.endTime)}else if(e.cardobj.cardState==="reviewedit"){e.cardobj.startDateTime=s(e.dates.dt1,e.times.startTime);e.cardobj.endDateTime=s(e.dates.dt2,e.times.endTime)}if(e.cardobj.cardState==="edit"){e.updatedb({value:e.cardobj})}else if(e.cardobj.cardState==="add"){e.adddb({value:e.cardobj})}else if(e.cardobj.cardState==="review"){e.updatedb({value:e.cardobj})}e.timeOffGroups.forEach(function(t,o){if(e.cardobj.timeOffGroup.toLowerCase()==t.timeOffGroup.toLowerCase()){e.cardobj.timeOffGroupColor=t.timeOffGroupColor}});e.timeStates.forEach(function(t,o){if(e.cardobj.timeState.toLowerCase()==t.timeState.toLowerCase()){e.cardobj.timeStateColor=t.timeStateColor}});if(e.cardobj.cardState==="edit"||e.cardobj.cardState==="add"){e.cardobj.cardState="view"}else if(e.cardobj.cardState==="reviewedit"){e.cardobj.cardState="review"}};e.today=function(){e.dates.dt1=new Date;e.dates.dt2=new Date};e.today();e.clear=function(){e.dates.dt1=null;e.dates.dt2=null};e.inlineOptions={customClass:l,minDate:new Date,showWeeks:true};e.dateOptions={dateDisabled:u,formatYear:"yy",maxDate:new Date(2020,1,1),minDate:new Date,startingDay:1};e.dateOptions2={dateDisabled:u,formatYear:"yy",maxDate:new Date(2020,1,1),minDate:new Date,startingDay:1};function u(e){var t=e.date,o=e.mode;return o==="day"&&(t.getDay()===0||t.getDay()===6)}e.toggleMin=function(){e.inlineOptions.minDate=e.inlineOptions.minDate?null:new Date;e.dateOptions.minDate=e.inlineOptions.minDate};e.toggleMin();e.checkDates=function(){if(e.dates.dt2<e.dates.dt1){e.dates.dt2=e.dates.dt1}};e.open=function(t,o){t.preventDefault();t.stopPropagation();e[o]=true;e.dateOptions.minDate=new Date;e.dateOptions2.minDate=new Date};e.minDate=function(){return new Date(e.dates.dt1)};e.maxDate=function(){return new Date(e.dates.dt2)};e.setDate=function(t,o,r){e.dates.dt1=new Date(t,o,r)};e.setDate2=function(t,o,r){e.dates.dt2=new Date(t,o,r)};e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"];e.format=e.formats[0];e.altInputFormats=["M!/d!/yyyy"];e.popup1={opened:false};e.popup2={opened:false};var d=new Date;d.setDate(d.getDate()+1);var c=new Date;c.setDate(d.getDate()+1);e.events=[{date:d,status:"full"},{date:c,status:"partially"}];function l(t){var o=t.date,r=t.mode;if(r==="day"){var a=new Date(o).setHours(0,0,0,0);for(var i=0;i<e.events.length;i++){var n=new Date(e.events[i].date).setHours(0,0,0,0);if(a===n){return e.events[i].status}}}return""}}],replace:true,templateUrl:"views/card_view.html"}}]);angular.module("ptoApp").directive("colorChangeCard",["$filter",function(e){return{restrict:"E",scope:{cardtitle:"@",cardobj:"=",updatedb:"&update",deletedb:"&delete",adddb:"&add"},controller:["$scope","$element","$attrs","$location","$injector",function(e,t,o,r,a){e.colorChange={color:"#FFF"};e.delete=function(){e.deletedb({value:e.cardobj.id})};e.submit=function(){if(e.cardobj.cardState==="edit"){e.updatedb({value:e.cardobj})}else if(e.cardobj.cardState==="add"){e.adddb({value:e.cardobj})}e.cardobj.cardState="view"};e.editColor=function(){e.cardobj.cardState==="edit"?e.cardobj.cardState="view":e.cardobj.cardState="edit";if(e.cardobj.cardState==="view"){e.updatedb({value:e.cardobj})}}}],replace:true,templateUrl:"views/color_change_card.html"}}]);$(function(){$("#cp2").colorpicker()});"use strict";angular.module("ptoApp.controller").controller("InfoController",["$scope","$state","$rootScope","employeeTestFactory",function(e,t,o,r){e.loggedIn={};e.displaySection=true;o.callInfo=function(){r.get(o.email).then(function(t){e.loggedIn=t})};e.getPercentUsed=function(){if(typeof o.employee==="undefined"||typeof o.employee.totalTimeUsed==="undefined"||typeof o.employee.totalTimeAccrued==="undefined")return 0;var e=o.employee.totalTimeUsed/o.employee.totalTimeAccrued*100;return e>100?100:e};e.hideSession=function(){e.displaySection=!e.displaySection}}]).controller("ContainerController",["$scope","$rootScope","$state","$window","$location","employeeFactory","employeeTestFactory",function(e,t,o,r,a,i,n){t.callRequests=function(){};t.callInfo=function(){};if(typeof t.gapi!=="undefined")gapi.load("client:auth2",s);t.$on("$stateChangeStart",function(e,o,r,a,i){if(typeof t.gapi==="undefined")return;gapi.load("client:auth2",s)});e.$state=o;r.initGapi=function(){gapi.load("client:auth2",s);t.gapi=gapi};t.calculateUsed=function(e){t.employee.timePending=t.employee.timePending=0;var o=0;angular.forEach(e,function(e,r){var a=e.timeDuration;if(e.timeState==="pending"){t.employee.timePending+=Number(a)}else{o+=Number(a)}});t.employee.totalTimeUsed=o};e.employeeType=t.email="";function s(){gapi.client.init({apiKey:"AIzaSyDaMf0eviuFygt1hzwQz03a2k2lrLDnpIc",discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1"],clientId:"977491754644-954b83j2evmq65v6kchq4dsd9j0ud4vg.apps.googleusercontent.com",scope:"profile"}).then(function(){gapi.auth2.getAuthInstance().isSignedIn.listen(u);u(gapi.auth2.getAuthInstance().isSignedIn.get());e.employee=[]})}function u(e){if(e){d()}else{o.go("app")}}e.handleSignInClick=function(e){if(!gapi.auth2.getAuthInstance().isSignedIn.get()){gapi.auth2.getAuthInstance().signIn()}};e.handleSignOutClick=function(e){if(gapi.auth2.getAuthInstance().isSignedIn.get()){gapi.auth2.getAuthInstance().signOut()}};function d(){gapi.client.people.people.get({resourceName:"people/me"}).then(function(e){t.email=e.result.emailAddresses[0].value;t.callRequests();t.callInfo();n.get(t.email).then(function(e){if(typeof e.employeeid==="undefined"){o.go("app")}else if(a.path()==="/"){o.go("app.employee");t.employee=e;console.log("Coming from root!:!:!:!:"+e.firstName,e.employeeid)}else{t.employee=e;console.log("direct link!:!:!:!:"+e.firstName,e.employeeid)}})},function(e){console.log("Error: "+e.result.error.message)})}}]).controller("LoginController",["$scope","$state","$window","$http","$rootScope","$timeout","GooglePlus","gapiService",function(e,t,o,r,a,i,n,s){e.$state=t;e.callme=function(){e.handleSignInClick()};var u;var d;r.get("url").then(function(e){u=e.data});e.login=function(){d=o.open(u,"Please sign in with Google","width=500px,height=700px")};window.onmessage=function(e){if(d)d.close();var t=e.data;var o=t.lastIndexOf("code=");if(o===-1)return;var a=t.substring(o+5).replace("#","");r.get("token?code="+a).then(function(e){var t="https://www.googleapis.com/plus/v1/people/me?access_token="+e.data.access_token;r.get(t).then(function(e){console.log("user info: "+JSON.stringify(e.data))})})}}]).controller("RequestController",["$scope","$state","$rootScope","$stateParams","requestFactory","employeeRequestFactory","timeOffGroupTestFactory","timeStateTestFactory","approverProperties",function(e,t,o,r,a,i,n,s,u){e.requests=[];e.timeStates=[];e.timeOffGroups=[];if(o.gapi){e.requests=[];e.timeStates=[];e.timeOffGroups=[];o.callRequests()}o.callRequests=function(){n.query().then(function(t){e.timeOffGroups=t}).then(function(t){s.query().then(function(t){e.timeStates=t}).then(function(t){i.query({employeeid:o.email},function(t){t.forEach(function(t,o){var r={requestid:t.requestid,requestedBy:t.requestedBy,approvedBy:t.approvedBy,startDateTime:t.startDateTime,endDateTime:t.endDateTime,timeDuration:t.timeDuration,message:t.message,approverMessage:t.approverMessage,locked:t.locked,timeState:t.timeState,timeOffGroup:t.timeOffGroup,cardState:"view"};e.timeOffGroups.forEach(function(e,o){if(t.timeOffGroup.toLowerCase()==e.timeOffGroup.toLowerCase()){r.timeOffGroupColor=e.timeOffGroupColor}});e.timeStates.forEach(function(e,o){if(t.timeState.toLowerCase()==e.timeState.toLowerCase()){r.timeStateColor=e.timeStateColor}});e.requests.push(r)});u.setRequests(e.requests);o.calculateUsed(e.requests)},function(t){console.log(t);e.message="Error: "+t.status+" "+t.statusText})})})};e.deleteDB=function(e){a.delete({requestid:e.requestid})};e.addDB=function(t){e.timeOffGroups.forEach(function(e,o){if(t.timeOffGroup.toLowerCase()==e.timeOffGroup.toLowerCase()){t.timeOffGroupColor=e.timeOffGroupColor}});e.timeStates.forEach(function(e,o){if(t.timeState.toLowerCase()==e.timeState.toLowerCase()){t.timeStateColor=e.timeStateColor}});a.save({},{requestedBy:o.email,approvedBy:" ",startDateTime:t.startDateTime,endDateTime:t.endDateTime,timeDuration:t.timeDuration,message:t.message,approverMessage:" ",locked:"false",timeState:"pending",timeOffGroup:t.timeOffGroup})};e.updateDB=function(e){a.update({requestid:e.requestid},{requestedBy:o.email,approvedBy:e.approvedBy,startDateTime:e.startDateTime,endDateTime:e.endDateTime,timeDuration:e.timeDuration,message:e.message,approverMessage:e.approverMessage,locked:e.locked,timeState:e.timeState,timeOffGroup:e.timeOffGroup})};e.addRequest=function(){e.requests.unshift({requestedBy:o.email,approvedBy:"",startDateTime:"05-April-2017",endDateTime:new Date,timeDuration:8,message:"",approverMessage:"",locked:"false",timeState:"pending",timeOffGroup:"",cardState:"add"})}}]).controller("SecondRequestController",["$scope","$rootScope","$state","timeOffGroupTestFactory","timeStateTestFactory","requestFactory","approverProperties",function(e,t,o,r,a,i,n){e.tab=1;e.filtText="";e.showDetails=false;e.showDelete=false;e.showMenu=false;e.displaySection=true;e.message="Loading ...";e.requests=[];e.timeStates=[];e.timeOffGroups=[];e.$watch(n.getRequests,function(t){e.requests=t}.bind(this));e.updateDB=function(e){i.update({requestid:e.requestid},{requestedBy:t.email,approvedBy:e.approvedBy,startDateTime:e.startDateTime,endDateTime:e.endDateTime,timeDuration:e.timeDuration,message:e.message,approverMessage:e.approverMessage,locked:e.locked,timeState:e.timeState,timeOffGroup:e.timeOffGroup})}}]).controller("InfoApproverController",["$scope","$state","$rootScope","requestFactory","employeeFactory","timeOffGroupTestFactory","timeStateTestFactory","approverProperties",function(e,t,o,r,a,i,n,s){e.employees=[];e.timeStates=[];e.timeOffGroups=[];e.employeeSelect="none";e.displaySection=true;e.changeEmployee=function(){s.setEmployeeSelect(e.employeeSelect.employeeid)};e.hideSession=function(){e.displaySection=!e.displaySection};o.callRequests=function(){i.query().then(function(t){e.timeOffGroups=t}).then(function(t){n.query().then(function(t){e.timeStates=t})}).then(function(t){a.query(function(t){t.forEach(function(t,o){e.employees.push({cardState:"view",employeeid:t.employeeid,firstName:t.firstName,lastName:t.lastName,totalTimeAccrued:t.totalTimeAccrued,totalTimeUsed:t.totalTimeUsed,employeeType:t.employeeType})})},function(t){console.log(t);e.message="Error: "+t.status+" "+t.statusText})})};o.callRequests()}]).controller("BodyApproverController",["$scope","$state","$rootScope","requestFactory","employeeRequestFactory","timeOffGroupTestFactory","timeStateTestFactory","approverProperties",function(e,t,o,r,a,i,n,s){e.displaySection=true;e.$watch(s.getEmployeeSelect,function(e){console.log("Get Change:"+e)}.bind(this));e.hideSession=function(){e.displaySection=!e.displaySection};e.getEmployee=function(){return s.getEmployeeSelect()};e.requests=[];e.timeStates=[];e.timeOffGroups=[];o.callRequests=function(){i.query().then(function(t){console.log("time off group:"+t);e.timeOffGroups=t}).then(function(t){n.query().then(function(t){console.log("time state test:"+t);e.timeStates=t})}).then(function(t){r.query({},function(t){t.forEach(function(t,o){var r={requestid:t.requestid,requestedBy:t.requestedBy,approvedBy:t.approvedBy,startDateTime:t.startDateTime,endDateTime:t.endDateTime,timeDuration:Number(t.timeDuration),message:t.message,approverMessage:t.approverMessage,locked:t.locked,timeState:t.timeState,timeOffGroup:t.timeOffGroup,cardState:"review"};e.timeOffGroups.forEach(function(e,o){if(t.timeOffGroup.toLowerCase()==e.timeOffGroup.toLowerCase()){r.timeOffGroupColor=e.timeOffGroupColor}});e.timeStates.forEach(function(e,o){if(t.timeState.toLowerCase()==e.timeState.toLowerCase()){r.timeStateColor=e.timeStateColor}});e.requests.push(r)});s.setRequests(e.requests)},function(t){console.log(t);e.message="Error: "+t.status+" "+t.statusText})})};e.updateDB=function(t){r.update({requestid:t.requestid},{requestedBy:t.requestedBy,approvedBy:t.approvedBy,startDateTime:t.startDateTime,endDateTime:t.endDateTime,timeDuration:t.timeDuration,message:t.message,approverMessage:t.approverMessage,locked:t.locked,timeState:t.timeState,timeOffGroup:t.timeOffGroup});s.setRequests(e.requests)}}]).controller("SecondBodyApproverController",["$scope","$rootScope","$state","timeOffGroupTestFactory","timeStateTestFactory","requestFactory","approverProperties",function(e,t,o,r,a,i,n){e.tab=1;e.filtText="";e.showDetails=false;e.displaySection=true;e.showDelete=false;e.showMenu=false;e.displaySection=true;e.message="Loading ...";e.requests=[];e.timeStates=[];e.timeOffGroups=[];e.selectEmpID="";e.selectEmpIDMatch=function(e){return function(t){if(e==="none"&&t.timeState!="pending")return true;return t.requestedBy===e&&t.timeState!="pending"}};e.$watch(n.getEmployeeSelect,function(t){e.selectEmpID=t}.bind(this));e.hideSession=function(){e.displaySection=!e.displaySection};e.$watch(n.getRequests,function(t){e.requests=t}.bind(this));e.getEmployee=function(){return n.getEmployeeSelect()};e.updateDB=function(e){i.update({requestid:e.requestid},{requestedBy:e.requestedBy,approvedBy:e.approvedBy,startDateTime:e.startDateTime,endDateTime:e.endDateTime,timeDuration:e.timeDuration,message:e.message,approverMessage:e.approverMessage,locked:e.locked,timeState:e.timeState,timeOffGroup:e.timeOffGroup})}}]).controller("InfoAdminController",["$scope","$state","$rootScope","employeeTestFactory",function(e,t,o,r){e.loggedIn={};e.displaySection=true;e.hideSession=function(){e.displaySection=!e.displaySection};o.callInfo=function(){r.get(o.email).then(function(t){e.loggedIn=t})};e.stateis=function(e){return t.is(e)}}]).controller("BodyAdminController",["$scope","$state",function(e,t){e.testUserAdminData={name:"Todd Coulson",employeeStartDate:"15-OCT-2016",carryoverHours:0,allocatedHoursYear:80,remainingHours:35};e.testUserAdminSetting={cardType:"view"};e.testAdminSetting={cardType:"view"}}]).controller("TimeStateAdminController",["$scope","$state","timeStateFactory",function(e,t,o){e.timeState=[];o.query(function(t){t.forEach(function(t,o){e.timeState.push({id:t.timestateid,entityValue:t.timeState,entityColor:t.timeStateColor,cardState:"view"})})},function(t){console.log(t);e.message="Error: "+t.status+" "+t.statusText});e.addNew=function(){e.timeState.unshift({entityValue:"",entityColor:"#FFFFFF",cardState:"add"})};e.deleteDB=function(t){o.delete({timestateid:t});e.timeState.forEach(function(o,r){if(e.timeState[r].id===t)e.timeState.splice(r,1)})};e.addDB=function(e){o.save({},{timeState:e.entityValue,timeStateColor:e.entityColor})};e.updateDB=function(e){o.update({timestateid:e.id},{timeState:e.entityValue,timeStateColor:e.entityColor})}}]).controller("TimeOffGroupAdminController",["$scope","$rootScope","$state","timeOffGroupTestFactory","timeOffGroupFactory",function(e,t,o,r,a){e.timeOffGroup=[];r.query().then(function(t){t.forEach(function(t,o){e.timeOffGroup.push({id:t.timeoffgroupid,entityValue:t.timeOffGroup,entityColor:t.timeOffGroupColor,cardState:"view"})})});e.addNew=function(){e.timeOffGroup.unshift({entityValue:"",entityColor:"#FFFFFF",cardState:"add"})};e.deleteDB=function(t){a.delete({timeoffgroupid:t});e.timeOffGroup.forEach(function(o,r){if(e.timeOffGroup[r].id===t)e.timeOffGroup.splice(r,1)})};e.updateDB=function(e){a.update({timeoffgroupid:e.id},{timeOffGroup:e.entityValue,timeOffGroupColor:e.entityColor})};e.addDB=function(e){a.save({},{timeOffGroup:e.entityValue,timeOffGroupColor:e.entityColor})}}]).controller("UsersAdminController",["$scope","$state","employeeFactory","employeeTestFactory",function(e,t,o,r){e.employees=[];o.query(function(t){t.forEach(function(t,o){e.employees.push({cardState:"view",employeeid:t.employeeid,firstName:t.firstName,lastName:t.lastName,totalTimeAccrued:t.totalTimeAccrued,totalTimeUsed:t.totalTimeUsed,employeeType:t.employeeType,employeeStartDate:t.employeeStartDate})})},function(t){console.log(t);e.message="Error: "+t.status+" "+t.statusText});e.addNew=function(){e.employees.unshift({cardState:"add",employeeid:"",firstName:"",lastName:"",totalTimeAccrued:0,totalTimeUsed:0})};e.deleteDB=function(t){e.employees.forEach(function(o,r){if(o.employeeid==t)e.employees.splice(r,1)});o.delete({employeeid:t})};e.updateDB=function(e){o.update({employeeid:e.employeeid},{firstName:e.firstName,lastName:e.lastName,totalTimeAccrued:e.totalTimeAccrued,totalTimeUsed:e.totalTimeUsed,employeeType:e.employeeType,employeeStartDate:e.employeeStartDate})}}]).controller("HeaderController",["$scope","$state","$rootScope","employeeFactory",function(e,t,o,r){e.stateis=function(e){return t.is(e)};e.stateincludes=function(e){return t.current.name.includes(e)}}]);angular.module("ptoApp").directive("selectDate",function(){return{scope:{value:"=",record:"=",record2:"=",inputname:"@",servicename:"@",dateFormat:"=?",action:"@",max:"=?",min:"=?"},controller:function(e,t,o,r,a,i,n){$(document).keydown(function(t){if(e.editing&&t.keyCode=="13")e.submit()});var s=a.get(e.servicename);e.editing=false;e.oldval="";e.edit=function(){e.oldval=e.value;e.editing=true};e.submit=function(){e.editing=false;if(e.record2==undefined){s[e.action](e.record,e.value)}else{s[e.action](e.record,e.record2,e.value)}};e.cancel=function(){e.value=e.oldval;e.editing=false};e.datepickers={};e.open=function(){i(function(){e.opened=true})};e.openDatePicker=function(o){i(function(){e.datepickers[o]=true;t[e.inputname].open($event)})}},restrict:"E",replace:true,templateUrl:obj+"tm_template_select_date.html"}});angular.module("ptoApp").directive("editInput",function(){return{scope:{value:"=",record:"=",record2:"=",servicename:"@",action:"@",currencyOn:"@",inputtype:"@?",minValue:"=?",maxValue:"@?"},controller:function(e,t,o,r,a){o.hasOwnProperty("currencyOn")?e.currencyOn=true:e.currencyOn=false;var i=a.get(e.servicename);e.editing=false;e.oldval="";e.edit=function(){e.oldval=e.value;e.editing=true};e.submit=function(){if(e.record2==undefined){i[e.action](e.record,e.value);console.log("no second record")}else{i[e.action](e.record,e.record2,e.value);console.log(" second record exists")}e.editing=false};e.cancel=function(){e.value=e.oldval;e.editing=false}},restrict:"E",replace:true,templateUrl:"template_editable_input.html"}});"use strict";angular.module("ptoApp.employeeTestFactory").constant("baseURLEmployee","https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/").factory("employeeTestFactory",["$resource","baseURLEmployee",function(e,t){var o=e(t+"employee/:employeeid",{employeeid:"@employeeid"},{get:{method:"GET"}});var r;return{get:function(e){if(!r){r=o.get({employeeid:e}).$promise.then(function(e){return e})}return r},findByName:function(e){return e}}}]);angular.module("ptoApp").directive("groupCard",["$filter",function(e){return{restrict:"E",scope:{cardobj:"=cardobj",settings:"=settings"},controller:["$scope","$element","$attrs","$location","$injector",function(e,t,o,r,a){console.log(e.cardobj.timeOffGroup)}],replace:true,templateUrl:"views/group_card.html"}}]);"use strict";angular.module("ptoApp").constant("baseURLRequest","https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/").factory("requestTestFactory",["$resource","baseURLRequest",function(e,t){var o=e(t+"request/:requestid",{requestid:"@requestid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}});var r;return{get:function(e){if(!r){r=o.get({requestid:e}).$promise.then(function(e){return e})}return r},save:function(){if(!r){r=o.save().$promise.then(function(e){return e})}return r},query:function(){if(!r){r=o.query().$promise.then(function(e){return e})}return r},remove:function(e){if(!r){r=o.delete({requestid:e}).$promise.then(function(e){return e})}return r},delete:function(e){if(!r){r=o.delete({requestid:e}).$promise.then(function(e){return e})}return r},update:function(e){if(!r){r=o.update({requestid:e.requestid},{requestedBy:e.requestedBy,approvedBy:e.approvedBy,startDateTime:e.startDateTime,endDateTime:e.endDateTime,timeDuration:Number(e.timeDuration),message:e.message,approverMessage:e.approverMessage,locked:e.locked,timeState:e.timeState,timeType:e.timeType,timeOffGroup:e.timeOffGroup}).$promise.then(function(e){return e})}return r}}}]);angular.module("ptoApp").directive("ruleCard",["$filter",function(e){return{restrict:"E",scope:{cardobj:"=cardobj",settings:"=settings"},controller:["$scope","$element","$attrs","$location","$injector",function(e,t,o,r,a){console.log(e.cardobj.timeOffGroup)}],replace:true,templateUrl:"views/rule_card.html"}}]);(function(){"use strict";angular.module("ptoApp.services").constant("baseURLEmployee","https://tbgspm8rvi.execute-api.us-east-1.amazonaws.com/dev/").constant("baseURLEmployeeType","https://313eil8vh4.execute-api.us-east-1.amazonaws.com/dev/").constant("baseURLRequest","https://wou53nmy62.execute-api.us-east-1.amazonaws.com/dev/").constant("baseURLTimeOffGroup","https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/").constant("baseURLTimeState","https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/").factory("employeeFactory",["$resource","baseURLEmployee",function(e,t){return e(t+"employee/:employeeid",{employeeid:"@employeeid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}})}]).factory("employeeTypeFactory",["$resource","baseURLEmployeeType",function(e,t){return e(t+"employeetype/:employeetypeid",{employeetypeid:"@employeetypeid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}})}]).factory("requestFactory",["$resource","baseURLRequest",function(e,t){return e(t+"request/:requestid",{requestid:"@requestid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}})}]).factory("employeeRequestFactory",["$resource","baseURLRequest",function(e,t){return e(t+"request/employee/:employeeid",{employeeid:"@employeeid"},{query:{method:"GET",isArray:true}})}]).factory("approverRequestFactory",["$resource","baseURLRequest",function(e,t){return e(t+"request/approver/:employeeid",{employeeid:"@employeeid"},{query:{method:"GET",isArray:true}})}]).factory("timeOffGroupFactory",["$resource","baseURLTimeOffGroup",function(e,t){return e(t+"timeoffgroup/:timeoffgroupid",{timeoffgroupid:"@timeoffgroupid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}})}]).factory("timeStateFactory",["$resource","baseURLTimeState",function(e,t){return e(t+"timestate/:timestateid",{timestateid:"@timestateid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}})}]).service("approverProperties",["$rootScope",function(e){var t="none";var o=false;var r=[];return{getRequests:function(){return r},setRequests:function(t){r=t;e.$broadcast("requests:updated",r)},getEmployeeSelect:function(){return t},setEmployeeSelect:function(o){t=o;e.$broadcast("select:updated",t)},getUpdateItem:function(){return o},setUpdateItem:function(t){o=t;e.$broadcast("select:approvals",o)}}}])})();"use strict";angular.module("ptoApp").constant("baseURLTimeOffGroup","https://pwqlomgq89.execute-api.us-east-1.amazonaws.com/dev/").factory("timeOffGroupTestFactory",["$resource","baseURLTimeOffGroup",function(e,t){var o=e(t+"timeoffgroup/:timeoffgroupid",{timeoffgroupid:"@timeoffgroupid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}});var r;return{get:function(e){if(!r){r=o.get({timeoffgroupid:e}).$promise.then(function(e){return e})}return r},save:function(){if(!r){r=o.save().$promise.then(function(e){return e})}return r},query:function(){if(!r){r=o.query().$promise.then(function(e){return e})}return r},remove:function(e){if(!r){r=o.delete({timeoffgroupid:e}).$promise.then(function(e){return e})}return r},delete:function(e){if(!r){r=o.delete({timeoffgroupid:e}).$promise.then(function(e){return e})}return r},update:function(e){if(!r){r=o.update({timeoffgroupid:e.id},{timeOffGroup:e.entityValue,timeOffGroupColor:e.entityColor}).$promise.then(function(e){return e})}return r}}}]);"use strict";angular.module("ptoApp").constant("baseURLTimeState","https://hmmoye191c.execute-api.us-east-1.amazonaws.com/dev/").factory("timeStateTestFactory",["$resource","baseURLTimeState",function(e,t){var o=e(t+"timestate/:timestateid",{timestateid:"@timestateid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}});var r;return{get:function(e){if(!r){r=o.get({timestateid:e}).$promise.then(function(e){return e})}return r},save:function(){if(!r){
r=o.save().$promise.then(function(e){return e})}return r},query:function(){if(!r){r=o.query().$promise.then(function(e){return e})}return r},remove:function(e){if(!r){r=o.delete({timestateid:e}).$promise.then(function(e){return e})}return r},delete:function(e){if(!r){r=o.delete({timestateid:e}).$promise.then(function(e){return e})}return r},update:function(e){if(!r){r=o.update({timestateid:e.id},{timeState:e.entityValue,timeStateColor:e.entityColor}).$promise.then(function(e){return e})}return r}}}]);"use strict";angular.module("ptoApp").constant("baseURLTimeType","https://jq2npw66ai.execute-api.us-east-1.amazonaws.com/dev/").factory("timeTypeTestFactory",["$resource","baseURLTimeType",function(e,t){var o=e(t+"timetype/:timetypeid",{timetypeid:"@timetypeid"},{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:true},remove:{method:"DELETE"},delete:{method:"DELETE"},update:{method:"PUT"}});var r;return{get:function(e){if(!r){r=o.get({timetypeid:e}).$promise.then(function(e){return e})}return r},save:function(){if(!r){r=o.save().$promise.then(function(e){return e})}return r},query:function(){if(!r){r=o.query().$promise.then(function(e){return e})}return r},remove:function(e){if(!r){r=o.delete({timetypeid:e}).$promise.then(function(e){return e})}return r},delete:function(e){if(!r){r=o.delete({timetypeid:e}).$promise.then(function(e){return e})}return r},update:function(e){if(!r){r=o.update({timetypeid:e.id},{timeType:e.entityValue}).$promise.then(function(e){return e})}return r}}}]);angular.module("ptoApp").directive("userCard",["$filter",function(e){return{restrict:"E",scope:{cardobj:"=cardobj",updatedb:"&update",deletedb:"&delete",adddb:"&add"},controller:["$scope","$element","$attrs","$location","$injector",function(e,t,o,r,a){e.edit=function(){e.cardobj.cardState==="edit"?e.cardobj.cardState="view":e.cardobj.cardState="edit";if(e.cardobj.cardState==="view"){e.updatedb({value:e.cardobj})}};e.delete=function(){e.deletedb({value:e.cardobj.employeeid})};e.cardobj.employeeStartDate=new Date(e.cardobj.employeeStartDate);e.submit=function(){if(e.cardobj.cardState==="edit"){e.updatedb({value:e.cardobj})}else if(e.cardobj.cardState==="add"){e.adddb({value:e.cardobj})}e.cardobj.cardState="view"};e.inlineOptions={customClass:u,minDate:new Date,showWeeks:true};e.dateOptions={dateDisabled:i,formatYear:"yy",maxDate:new Date(2020,5,22),minDate:new Date,startingDay:1};function i(e){var t=e.date,o=e.mode;return o==="day"&&(t.getDay()===0||t.getDay()===6)}e.toggleMin=function(){e.inlineOptions.minDate=e.inlineOptions.minDate?null:new Date;e.dateOptions.minDate=e.inlineOptions.minDate};e.toggleMin();e.open=function(t){console.log("open1:"+e.popup1.opened);e.popup1.opened=true};e.setDate=function(t,o,r){e.dt=new Date(t,o,r)};e.formats=["dd-MMMM-yyyy","yyyy/MM/dd","dd.MM.yyyy","shortDate"];e.format=e.formats[0];e.altInputFormats=["M!/d!/yyyy"];e.popup1={opened:false};var n=new Date;n.setDate(n.getDate()+1);var s=new Date;s.setDate(n.getDate()+1);e.events=[{date:n,status:"full"},{date:s,status:"partially"}];function u(t){var o=t.date,r=t.mode;if(r==="day"){var a=new Date(o).setHours(0,0,0,0);for(var i=0;i<e.events.length;i++){var n=new Date(e.events[i].date).setHours(0,0,0,0);if(a===n){return e.events[i].status}}}return""}}],replace:true,templateUrl:"views/user_card.html"}}]);