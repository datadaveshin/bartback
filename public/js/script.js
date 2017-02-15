"use strict";
//* Needed by Materialize to implement <select> tags
$(document).ready(function() {
    $('select').material_select();
});

console.log('###$$$$$$@@@********  IN SCRIPT script.js *********@@@$$$$$$$###')

//* Initialize Departure arrays and variables
let depVal = "default";
let arrVal = "default";
let reqDirection;
let returnCondition;


//* Define a Station Class
function Station(abbrev, fullname) {
    this.abbrev = abbrev || "";
    this.fullname = fullname || "";
}

//* Array that contains a Station instance for each Bart Station
var stationObjArray = [];
$$each(stationAbbrev, function(_dummy, idx) {
   let retArr = []
   let stationObj = new Station(stationAbbrev[idx], stationFull[idx])
   stationObjArray.push(stationObj)
})

console.log("stationObjArray:", stationObjArray);

// Setup Selectors
genSelector("Departure", "#point3")
genSelector("Arrival", "#point3")

//* Generates the <select> menu
function genSelector(selectorName, attachmentPoint) {
    // Build the elements
    let point1 = $(attachmentPoint);
    let selectorDiv = $('<div>');
    let selectorHeading = $('<h2>');
    var selectorSelect = $('<select>');
    let selectorDefaultOption = $('<option>');

    // Set attributes, names, values
    $(selectorDiv).attr("id", selectorName + "selector");
    $(selectorDiv).addClass("container");
    $(selectorSelect).attr("name", selectorName);
    $(selectorSelect).attr("id", selectorName);
    $(selectorDefaultOption).val("default");
    $(selectorDefaultOption).text(selectorName + " Station");

    // Use to remove styling from materialize for <select>
    // $(selectorSelect).addClass("browser-default");

    // Build Dom
    $(point1).append(selectorDiv);
    $(selectorDiv).append(selectorHeading);
    $(selectorDiv).append(selectorSelect);
    $(selectorSelect).append(selectorDefaultOption);

    // Fill in Options
    $$each(stationObjArray, function(statObj) {
        let selectorOption = $('<option>')
        $(selectorOption).val(statObj.abbrev);
        $(selectorOption).text(statObj.fullname);
        $(selectorSelect).append(selectorOption);
    })
    console.log("selectorSelect: ", selectorSelect);
}

// =============
// Setup Buttons
// =============
function addButton(aButtonID, buttonText, attachmentPoint, columns = 3) {
    if (columns === 3) {
        var numColumns = "waves-effect btn col s4"
    } else if (columns === 2) {
        var numColumns = "waves-effect btn col s6"
    }
    let newButton = $('<button>');
    $(newButton).addClass(numColumns);
    $(newButton).attr("id", aButtonID);
    $(newButton).text(buttonText);

    console.log("MY NEW BUTTON", newButton);
    let sectionPart = $(attachmentPoint);
    $(sectionPart).append(newButton);
    console.log("sectionPart", sectionPart);
    console.log("$(sectionPart)", $(sectionPart));
}

// Get stations
let userName = document.getElementById("userName").textContent;
let homeStation = document.getElementById("homeStation").textContent;
let awayStation = document.getElementById("awayStation").textContent;
let homeToAwayButtonText = homeStation + " to " + awayStation;
let awayToHomeButtonText = awayStation + " to " + homeStation;

console.log("\n\n\n\n USER AND HOME AND AWAY STATIONS~~~~~~~~~~~~~~~>");
console.log("userName:", userName);
console.log("homeStation:", homeStation);
console.log("awayStation:", awayStation);

let navInjector = $('.nav-injector');
let navInjector2 = $('.nav-injector2');

let loggedInToo = $('#loggedInToo');

// if (loggedInToo.val() === "noname") {
if (userName === "") {
    console.log("noname in the house!!!!!!!!!");
    addButton("login", "Log In", "#point0", 2);
    addButton("register", "Register", "#point0", 2);
    addButton("allTrains", "All Trains", "#point1", 2);
    addButton("routeAll", "Routes", "#point1", 2);
} else {
    console.log(loggedInToo.val() + "in the house!!!!!");
    addButton("homeToAway", homeToAwayButtonText, "#point0", 2);
    addButton("awayToHome", awayToHomeButtonText, "#point0", 2);
    addButton("allTrains", "All Trains", "#point1", 3);
    addButton("routeAll", "Routes", "#point1", 3);
    addButton("direct", "Direct", "#point1", 3);
    addButton("bartBack", "BARTBack", "#point2", 2);
    addButton("report", "Report", "#point2", 2);

    let preferenceLink = $('<li><a href="/preferences" class="white-text">Preferences</a></li>')
    $(navInjector).append(preferenceLink)

    let preferenceLink2 = $("<li><a href='/preferences'>Preferences</a></li>")
    $(navInjector2).append(preferenceLink2)

    let logoutLink = $('<li><a href="/auth/logout" class="white-text">Log Out</a></li>')
    $(navInjector).append(logoutLink)

    let logoutLink2 = $("<li><a href='/auth/logout'>Log Out</a></li>")
    $(navInjector2).append(logoutLink2)
}
//
// function checkDirection(here, there) {
//     /* TODO use a full route array and check for here and there in it all of them, return a subArray, then do the calculation. For now, using route8 for a test*/
//     let routeArr = route8 // THE TEST ARRAY TO BE REMOVED
//     let hereIdx = routeArr.indexOf(here);
//     let thereIdx = routeArr.indexOf(there);
//     console.log("hereIdx", hereIdx, "thereIdx", thereIdx);
//     if (thereIdx > hereIdx) {
//         return "North"
//     } else if (thereIdx < hereIdx) {
//         return "South"
//     } else if (thereIdx === hereIdx) {
//         return "Same"
//     }
// }
function checkDirection(here, there) {
    /* TODO use a full route array and check for here and there in it all of them, return a subArray, then do the calculation. For now, using route8 for a test*/
    // let routeArr = route8 // THE TEST ARRAY TO BE REMOVED
    // let hereIdx = routeArr.indexOf(here);
    // let thereIdx = routeArr.indexOf(there);

    let routeCandidates = sfRoutes.filter(route => {
        console.log("routz", route);
        console.log("here", here, "there", there);
        if (route.indexOf(here) > -1 && route.indexOf(there) > -1) {
            return route
        }
    })

    let backStations = {
        back1: [],
        back2: [],
        back3: [],
        back4: [],
    }

    let hereIdx;
    let thereIdx;
    routeCandidates.forEach(route => {
        hereIdx = route.indexOf(here);
        thereIdx = route.indexOf(there);
        if (hereIdx < thereIdx) {
            backStations.back1.push(route[hereIdx - 1])
            backStations.back2.push(route[hereIdx - 2])
            backStations.back3.push(route[hereIdx - 3])
            backStations.back4.push(route[hereIdx - 4])
        } else if (hereIdx > thereIdx) {
            backStations.back1.push(route[hereIdx + 1])
            backStations.back2.push(route[hereIdx + 2])
            backStations.back3.push(route[hereIdx + 3])
            backStations.back4.push(route[hereIdx + 4])
        }
    })

    console.log("routeCandidates", routeCandidates);
    console.log("backStations", backStations);

    let backStations2 = [];
    $$each(backStations, backArray => {
        let filtered = backArray.filter(item => {
            if (item) {
                console.log("item:", item);
                return item
            };
        });
        console.log("filtered", filtered);
        let backArr = Array.from(new Set(filtered))
        backStations2.push(backArr)
    })

    console.log("backStations2", backStations2);

    console.log("hereIdx", hereIdx, "thereIdx", thereIdx);
    if (thereIdx > hereIdx) {
        return "North"
    } else if (thereIdx < hereIdx) {
        return "South"
    } else if (thereIdx === hereIdx) {
        return "Same"
    }
}

// ========================
// Start Application Loop
// ========================
(function() {
    console.log("\n\n\n##### ANONYMOUS LOOP FUNCTION WORKING!!!  #######\n")

    // Set up
    $('#login').click(function() {
        window.location.href = "http://localhost:3031/auth/login"
    });

    $('#register').click(function() {
        window.location.href = "http://localhost:3031/register"
    });

    // ================================================
    // Global resets for departure and arrival stations
    // ================================================
    function getUserLocations() {
        let departure = $('#Departure');
        let arrival = $('#Arrival');
        depVal = $(departure).val();
        arrVal = $(arrival).val();
        console.log("\n\n\n\nDeparture Val~~~~~~~~~~~~~~~~~>", depVal);
        console.log("Arrival Val~~~~~~~~~~~~~~~~~>", arrVal);
    }

    // =============================================
    // Buttons for requesting calls
    // =============================================
    $('#allTrains').click(function() {
        getUserLocations();
        console.log("WHAT IS DEPVAL NOW>>>>>>>>>", depVal);
        if (depVal !== "default") {
            returnCondition = 'all-trains'
            let dummyArrival;
            if (depVal === 'mont') {
                dummyArrival = "plza"
            } else {
                dummyArrival = 'mont'
            }
            sendRequest2(depVal, dummyArrival);
        }
    });

    $('#routeAll').click(function() {
        getUserLocations();
        if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 'route-all';
            sendRequest2(depVal, arrVal);
        }
    });

    $('#direct').click(function() {
        getUserLocations();
        if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 'direct';
            sendRequest2(depVal, arrVal);
        }
    });

    $('#homeToAway').click(function() {
        returnCondition = 'direct';
        sendRequest2(homeStation, awayStation);
    });


    $('#awayToHome').click(function() {
        returnCondition = 'direct';
        sendRequest2(awayStation, homeStation);
    });

    $('#bartBack').click(function() {
        getUserLocations();
        returnCondition = 'direct';
        if (depVal !== arrVal) {
            checkDirection(depVal, arrVal)
            sendRequest3(depVal, arrVal);
        }
    });

    // =============================================
    // Request Object for AJAX call to backend
    // =============================================
    function sendRequest2(depLocation, arrLocation) {
        console.log("\n\n\n LOCATIONS !!!!!", depLocation, arrLocation);
        let departureObj = {
            url: `http://localhost:3031/getinfo/routeall/${depLocation}/${arrLocation}`,
            method: "GET",
            success: SuccessRouteAll
        };
        // Start the AJAX request
        $.ajax(departureObj);
    };

    // =============================================
    // Request Object for AJAX call to backend
    // =============================================
    function sendRequest3(depLocation, arrLocation) {
        console.log("\n\n\n LOCATIONS !!!!!", depLocation, arrLocation);
        let departureObj = {
            url: `http://localhost:3031/getinfo/bartback/${depLocation}/${arrLocation}`,
            method: "GET",
            success: SuccessRouteAll2
        };
        // Start the AJAX request
        $.ajax(departureObj);
    };

    // =============================================
    // Fire upon Successful Call
    // =============================================

    function SuccessRouteAll(data) {
        // Remove previous etd data from view
        $( "div" ).remove( "#results" );

        let dataETD = data[0];
        let dataPlanner = data[1]
        console.log("\n\n\n\n\n $$$$$$ All Train ETD data $$$$$$$$$")
        console.log(dataETD);
        console.log("\n\n\n\n\n $$$$$$ All Train Planner data $$$$$$$$$")
        console.log(dataPlanner);

        let tripArr = dataPlanner.root.schedule.request.trip
        let tripArr2 = tripArr.map(function(item){
            if (Array.isArray(item.leg)) {
                return {
                    'direct': false,
                    'line': item.leg[0].line,
                    'trainHeadStation': item.leg[0].trainHeadStation,
                    'destination': item.leg[0].destination,
                    'transfercode': item.leg[0].transfercode
                }
            } else if (typeof item.leg === 'object') {
                return {
                    'direct': true,
                    'line': item.leg.line,
                    'trainHeadStation' : item.leg.trainHeadStation,
                    'destination': item.leg.destination,
                    'transfercode': item.leg.transfercode
                }
            }
        })

        var mySet = new Set();
        tripArr2.forEach(function(item) {
            mySet.add(JSON.stringify(item))
        })

        let tripArr3 = [];
        mySet.forEach(function(item) {
            tripArr3.push(JSON.parse(item))
        })

        let tripArr3direct = tripArr3.filter(function(item){
            if (item.direct) { return item }
        })

        console.log("\n\ntripArr2: ~~~~~~~~~~~*")
        console.log(tripArr2)
        console.log("\n\nmySet: ~~~~~~~~~~~*")
        console.log(mySet)
        console.log("\n\ntripArr3: ~~~~~~~~~~~*")
        console.log(tripArr3)
        console.log("\n\ntripArr3direct: ~~~~~~~~~~~*")
        console.log(tripArr3direct)

        let trip3trainHeads = tripArr3.map(function(item) {
            return item.trainHeadStation
        });
        let trip3directTrainHeads = tripArr3direct.map(function(item) {
            return item.trainHeadStation
        });
        console.log("\n\trip3trainHeads: ~~~~~~~~~~~*")
        console.log(trip3trainHeads)
        console.log("\n\trip3directTrainHeads: ~~~~~~~~~~~*")
        console.log(trip3directTrainHeads)

        let departureObjArrAllTrains = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                departureObjArrAllTrains.push(departureObj)
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            departureObjArrAllTrains.push(dataETD.root.station.etd)
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrAllTrains", departureObjArrAllTrains);

        let departureObjArrRouteAll = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                if (trip3trainHeads.indexOf(departureObj.abbreviation) > -1) {
                    departureObjArrRouteAll.push(departureObj)
                }
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            if (trip3trainHeads.indexOf(dataETD.root.station.etd.abbreviation) > -1) {
                departureObjArrRouteAll.push(dataETD.root.station.etd)
            }
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrRouteAll", departureObjArrRouteAll);

        let departureObjArrDirect = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                if (trip3directTrainHeads.indexOf(departureObj.abbreviation) > -1) {
                    departureObjArrDirect.push(departureObj)
                }
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            if (trip3directTrainHeads.indexOf(dataETD.root.station.etd.abbreviation) > -1) {
                departureObjArrDirect.push(dataETD.root.station.etd)
            }
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrDirect", departureObjArrDirect);

        if (returnCondition === 'all-trains') {
            output2(departureObjArrAllTrains)
        } else if (returnCondition === 'route-all') {
            console.log("IS ROUTE ALL SELECTED?");
            output2(departureObjArrRouteAll)
        } else if (returnCondition === 'direct') {
            output2(departureObjArrDirect)
        }

        // OUTPUT2 - Generates the output to view
        function output2(departureObjArr) {
            $$each(departureObjArr, function(departureObj) {
                var dest = departureObj.destination
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination)

                var est = departureObj.estimate;
                console.log("THE est:", est)

                if (Array.isArray(est)) {
                    var times = est.map(function(item){return item.minutes})
                    var routeColor = departureObj.estimate[0].color
                } else if (typeof est === 'object') {
                    console.log("typeof est:", est)
                    var times = [departureObj.estimate.minutes]
                    var routeColor = departureObj.estimate.color
                }

                var point4 = $('#point4')
                var div2 = $('<div id="results" class="container">')
                var destinationResultsDiv = $('<div class="destination">')
                var destinationResults = $("<h5>")
                var timeResults = $('<h6>')
                var div2container = $('<div id="results" class="container">')
                var div2row = $('<div class="row report">')

                console.log("$(timeResults)", $(timeResults))
                $(destinationResults).text(dest);

                // *** Toggle to bring back bart colors to destination
                // $(destinationResults).css("backgroundColor", routeColor)
                //
                // if (["RED", "GREEN", "BLUE"].indexOf(routeColor) !== -1) {
                //     $(destinationResults).css("color", "white");
                // }

                $(point4).append(div2container);
                $(div2container).append(destinationResultsDiv);
                $(destinationResultsDiv).append(destinationResults);
                $(div2container).append(div2row);
                console.log("*********** times *********");
                console.log(times);
                console.log("div2container", div2container);
                console.log("div2row", div2row);
                times.forEach(function(time){
                    var div2col = $('<div class="col l2 m3 s4">')
                    var div2colA = $('<div class="forSquare">')
                    var div2colB = $('<div class="forTime">')
                    let processedTime;
                    if (time === "Leaving") {
                        processedTime = time;
                    } else if (time === "1") {
                        processedTime = time + " min";
                    } else {
                        processedTime = time + " mins";
                    }
                    div2colB.text(processedTime);


                    // *** Toggle for routeColor for squares
                    $(div2colA).css("backgroundColor", routeColor);

                    // *** Toggle for random "busy" color for square
                    // let val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                    // if (val === 1) {
                    //     $(div2colA).css("backgroundColor", 'red');
                    // } else if (val === 2) {
                    //     $(div2colA).css("backgroundColor", 'yellow');
                    // } else {
                    //     $(div2colA).css("backgroundColor", 'green');
                    // }

                    if (userName === "") {
                        $(div2colA).css("backgroundColor", routeColor);
                    } else {
                        let val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                        if (val === 1) {
                            $(div2colA).css("backgroundColor", 'red');
                        } else if (val === 2) {
                            $(div2colA).css("backgroundColor", 'yellow');
                        } else {
                            $(div2colA).css("backgroundColor", 'green');
                        }
                    }

                    $(div2row).append(div2col);
                    $(div2col).append(div2colA);
                    $(div2col).append(div2colB);
                })
            })
        }
    };

    function SuccessRouteAll2(data) {
        // Remove previous etd data from view
        $( "div" ).remove( "#results" );

        let dataETD = data[0][0];
        let dataPlanner = data[0][1];
        console.log("\n\n\n\n\n $$$$$$ All Train ETD data $$$$$$$$$")
        console.log(dataETD);
        console.log("\n\n\n\n\n $$$$$$ All Train Planner data $$$$$$$$$")
        console.log(dataPlanner);
        console.log("\n\n\n\n\n $$$$$$ All Train Planner data.root $$$$$$$$$")
        console.log(dataPlanner.root);
        console.log("\n\n\n\n\n $$$$$$ All Train Planner data.root.schedule $$$$$$$$$")
        console.log(dataPlanner.root.schedule);

        setup()
        function setup() {

        let tripArr = dataPlanner.root.schedule.request.trip
        let tripArr2 = tripArr.map(function(item){
            if (Array.isArray(item.leg)) {
                return {
                    'direct': false,
                    'line': item.leg[0].line,
                    'trainHeadStation': item.leg[0].trainHeadStation,
                    'destination': item.leg[0].destination,
                    'transfercode': item.leg[0].transfercode
                }
            } else if (typeof item.leg === 'object') {
                return {
                    'direct': true,
                    'line': item.leg.line,
                    'trainHeadStation' : item.leg.trainHeadStation,
                    'destination': item.leg.destination,
                    'transfercode': item.leg.transfercode
                }
            }
        })

        var mySet = new Set();
        tripArr2.forEach(function(item) {
            mySet.add(JSON.stringify(item))
        })

        let tripArr3 = [];
        mySet.forEach(function(item) {
            tripArr3.push(JSON.parse(item))
        })

        let tripArr3direct = tripArr3.filter(function(item){
            if (item.direct) { return item }
        })

        console.log("\n\ntripArr2: ~~~~~~~~~~~*")
        console.log(tripArr2)
        console.log("\n\nmySet: ~~~~~~~~~~~*")
        console.log(mySet)
        console.log("\n\ntripArr3: ~~~~~~~~~~~*")
        console.log(tripArr3)
        console.log("\n\ntripArr3direct: ~~~~~~~~~~~*")
        console.log(tripArr3direct)

        let trip3trainHeads = tripArr3.map(function(item) {
            return item.trainHeadStation
        });
        let trip3directTrainHeads = tripArr3direct.map(function(item) {
            return item.trainHeadStation
        });
        console.log("\n\trip3trainHeads: ~~~~~~~~~~~*")
        console.log(trip3trainHeads)
        console.log("\n\trip3directTrainHeads: ~~~~~~~~~~~*")
        console.log(trip3directTrainHeads)

        let departureObjArrAllTrains = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                departureObjArrAllTrains.push(departureObj)
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            departureObjArrAllTrains.push(dataETD.root.station.etd)
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrAllTrains", departureObjArrAllTrains);

        let departureObjArrRouteAll = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                if (trip3trainHeads.indexOf(departureObj.abbreviation) > -1) {
                    departureObjArrRouteAll.push(departureObj)
                }
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            if (trip3trainHeads.indexOf(dataETD.root.station.etd.abbreviation) > -1) {
                departureObjArrRouteAll.push(dataETD.root.station.etd)
            }
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrRouteAll", departureObjArrRouteAll);

        let departureObjArrDirect = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                if (trip3directTrainHeads.indexOf(departureObj.abbreviation) > -1) {
                    departureObjArrDirect.push(departureObj)
                }
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            if (trip3directTrainHeads.indexOf(dataETD.root.station.etd.abbreviation) > -1) {
                departureObjArrDirect.push(dataETD.root.station.etd)
            }
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArrDirect", departureObjArrDirect);


        if (returnCondition === 'all-trains') {
            output3(departureObjArrAllTrains)
        } else if (returnCondition === 'route-all') {
            console.log("IS ROUTE ALL SELECTED?");
            output3(departureObjArrRouteAll)
        } else if (returnCondition === 'direct') {
            output3(departureObjArrDirect)
        }
    }

        // OUTPUT3 - Generates the output to view
        function output3(departureObjArr) {
            var point4 = $('#point4')
            $$each(departureObjArr, function(departureObj) {
                var dest = departureObj.destination
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination)

                var est = departureObj.estimate;
                console.log("THE est:", est)

                if (Array.isArray(est)) {
                    var times = est.map(function(item){return item.minutes})
                    var routeColor = departureObj.estimate[0].color
                } else if (typeof est === 'object') {
                    console.log("typeof est:", est)
                    var times = [departureObj.estimate.minutes]
                    var routeColor = departureObj.estimate.color
                }

                // var point3 = $('#point3')
                // var div2 = $('<div id="results" class="container">')

                var station = dataETD.root.station.name

                var div2container = $('<div id="results" class="container">')

                var stationResultsDiv = $('<div class="station">')
                var stationResults = $("<h6 class='station-results'>")
                $(stationResults).text(station);


                var destinationResultsDiv = $('<div class="destination">')
                var destinationResults = $("<h5>")
                $(destinationResults).text(dest);


                var div2row = $('<div class="row report">')
                var timeResults = $('<h6>')

                console.log("$(timeResults)", $(timeResults))


                $(point4).append(div2container);

                $(div2container).append(stationResultsDiv);
                $(stationResultsDiv).append(stationResults);

                $(div2container).append(destinationResultsDiv);
                $(destinationResultsDiv).append(destinationResults);

                $(div2container).append(div2row);
                console.log("*********** times *********");
                console.log(times);
                console.log("div2container", div2container);
                console.log("div2row", div2row);
                times.forEach(function(time){
                    var div2col = $('<div class="col l2 m3 s4">')
                    var div2colA = $('<div class="forSquare">')
                    var div2colB = $('<div class="forTime">')
                    let processedTime;
                    if (time === "Leaving") {
                        processedTime = time;
                    } else if (time === "1") {
                        processedTime = time + " min";
                    } else {
                        processedTime = time + " mins";
                    }
                    div2colB.text(processedTime);

                    // *** Toggle for routeColor for squares
                    // $(div2colA).css("backgroundColor", routeColor);

                    if (userName === "") {
                        $(div2colA).css("backgroundColor", routeColor);
                    } else {
                        let val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                        if (val === 1) {
                            $(div2colA).css("backgroundColor", 'red');
                        } else if (val === 2) {
                            $(div2colA).css("backgroundColor", 'yellow');
                        } else {
                            $(div2colA).css("backgroundColor", 'green');
                        }
                    }

                    $(div2row).append(div2col);
                    $(div2col).append(div2colA);
                    $(div2col).append(div2colB);
                })
            })
        }
    };
})();


// Copyright David Shin 2017
// All Rights Reserved
