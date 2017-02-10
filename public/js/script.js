"use strict";
/**
Needed by Materialize to implement <select> tags
*/
$(document).ready(function() {
    $('select').material_select();
});

console.log('###$$$$$$@@@********  IN SCRIPT script.js *********@@@$$$$$$$###')

/**
Initialize Departure arrays and variables
destArrBack0 is your station
destArrBack1 is one station back, etc.
*/
var depVal;
var arrVal;
var reqDirection;
var destArrBack0 = [];
var destArrBack1 = [];
var destArrBack2 = [];
var destArrBack3 = [];

/**
Initialize returnCondition
0 = no options
1 = realtime full list for the Departure station
2 = realtime filtered list for Departure station based on direction
3 = get seat filters for direct trip, reverse directions
*/
var returnCondition = 0;


/**
Define a Station Class
*/
function Station(abbrev, fullname) {
    this.abbrev = abbrev || "";
    this.fullname = fullname || "";
}

/**
Array that contains a Station instance for each Bart Station
*/
var stationObjArray = [];
$$each(stationAbbrev, function(_dummy, idx) {
   let retArr = []
   let stationObj = new Station(stationAbbrev[idx], stationFull[idx])
   stationObjArray.push(stationObj)
})

console.log("stationObjArray:", stationObjArray)

// Setup Selectors
genSelector("Departure", "#point2")
genSelector("Arrival", "#point2")

/**
Generates and injects <select> tags to body
i: Name for the <select> `id` and `name` for reference
o: Selector attached to element with each station as option
TODO: inject these to a specific <div> in html
TODO: use array as parameter to generalize
*/
function genSelector(selectorName, attachmentPoint) {
    // let body = $('body')
    // let body = $('body')
    let point1 = $(attachmentPoint)
    let selectorDiv = $('<div>')
    let selectorHeading = $('<h2>')
    var selectorSelect = $('<select>')
    let selectorDefaultOption = $('<option>')

    // Set attributes, names, values
    $(selectorDiv).attr("id", selectorName + "selector")
    $(selectorDiv).attr("id", selectorName + "selector")
    $(selectorDiv).addClass("container")
    $(selectorSelect).attr("name", selectorName)
    $(selectorSelect).attr("id", selectorName)
    // $(selectorSelect).addClass("browser-default")
    $(selectorDefaultOption).val("default")
    $(selectorDefaultOption).text(selectorName + " Station")

    // Build Dom
    $(point1).append(selectorDiv)
    $(selectorDiv).append(selectorHeading)
    $(selectorDiv).append(selectorSelect)
    $(selectorSelect).append(selectorDefaultOption)

    $$each(stationObjArray, function(statObj) {
        let selectorOption = $('<option>')
        $(selectorOption).val(statObj.abbrev)
        $(selectorOption).text(statObj.fullname)
        $(selectorSelect).append(selectorOption)
    })
    console.log("selectorSelect: ", selectorSelect)
}

// =======================
// Check if user logged in
// =======================

/**
Setup Buttons
*/
function addButton(aButtonID, buttonText, attachmentPoint, columns = 3) {
    if (columns === 3) {
        var numColumns = "waves-effect btn col s4"
    } else if (columns === 2) {
        var numColumns = "waves-effect btn col s6"
    }
    let newButton = $('<button>')
    $(newButton).addClass(numColumns)
    $(newButton).attr("id", aButtonID)
    $(newButton).text(buttonText)

    console.log("MY NEW BUTTON", newButton);
    let sectionPart = $(attachmentPoint)
    $(sectionPart).append(newButton)
    console.log("sectionPart", sectionPart);
    console.log("$(sectionPart)", $(sectionPart));
}


let loggedIn = $('.loggedIn')
console.log("\n\n\n\n ******** BEGIN LOGGED IN *********");
console.log(loggedIn);
console.log("\n\n\n\n ******** END LOGGED IN *********");

let loggedInToo = $('#loggedInToo')
if (loggedInToo.val() === "noname") {
    console.log("noname in the house!!!!!!!!!");
    addButton("login", "Log In", "#point0", 2);
    addButton("register", "Register", "#point0", 2);
    addButton("allTrains", "All Trains", "#point1", 2);
    addButton("routeAll", "My Route", "#point1", 2);
} else {
    console.log(loggedInToo.val() + "in the house!!!!!");
    addButton("allTrains", "All Trains", "#point1", 3);
    addButton("routeAll", "My Route", "#point1", 3);
    addButton("direct", "Direct", "#point1", 3);
}

function test1() {
    console.log("\nFUNCITON TEST1 IS WORKING!!!!!!!!!!!!!!!!!\n")
}
test1();

function checkDirection(here, there) {
    /* TODO use a full route array and check for here and there in it all of them, return a subArray, then do the calculation. For now, using route8 for a test*/
    let routeArr = route8 // THE TEST ARRAY TO BE REMOVED
    let hereIdx = routeArr.indexOf(here)
    let thereIdx = routeArr.indexOf(there)
    console.log("hereIdx", hereIdx, "thereIdx", thereIdx);
    if (thereIdx > hereIdx) {
        return "North"
    } else if (thereIdx < hereIdx) {
        return "South"
    } else if (thereIdx === hereIdx) {
        return "Same"
    }
}

/**
Application Loop
*/
(function() {
    console.log("\n\n\n##### ANONYMOUS LOOP FUNCTION WORKING!!!  #######\n")

    // Set up
    $('#login').click(function() {
        window.location.href = "http://localhost:3031/auth/login"
    });

    $('#register').click(function() {
        window.location.href = "http://localhost:3031/register"
    });

    // Global resets
    function getUserLocations() {
        let departure = $('#Departure');
        let arrival = $('#Arrival')
        depVal = $(departure).val()
        arrVal = $(arrival).val()
        console.log("\n\n\n\nDeparture Val~~~~~~~~~~~~~~~~~>", depVal)
        console.log("Arrival Val~~~~~~~~~~~~~~~~~>", arrVal)
    }

    // =============================================
    // allTrains: Get ETD for All trains at stations
    // =============================================
    $('#allTrains').click(function() {
        getUserLocations();
        sendRequest(depVal);
    });

    // Request Departure Object for AJAX
    function sendRequest(search) {
        let departureObj = {
            url: `http://localhost:3031/getinfo/alltrains/${search}`,
            method: "GET",
            success: SuccessAllTrains
        };
        // Start the AJAX request
        $.ajax(departureObj);
    };

    function SuccessAllTrains(data) {
        console.log("\n\n\n\n\n $$$$$$ All Train data $$$$$$$$$")
        console.log(data);
        let dataETD = data[0]

        $( "div" ).remove( "#results" );
        let departureObjArr = [];
        if (Array.isArray(dataETD.root.station.etd)) {
            $$each(dataETD.root.station.etd, function(departureObj) {
                departureObjArr.push(departureObj)
            });
        } else if (typeof dataETD.root.station.etd === 'object') {
            departureObjArr.push(dataETD.root.station.etd)
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArr", departureObjArr);

        output1()
        /*
        OUTPUT1 - shows all trains for departure stop
        */
        function output1() {
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

                var point3 = $('#point3')
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

                $(point3).append(div2container);
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
                    let val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                    if (val === 1) {
                        $(div2colA).css("backgroundColor", 'red');
                    } else if (val === 2) {
                        $(div2colA).css("backgroundColor", 'yellow');
                    } else {
                        $(div2colA).css("backgroundColor", 'green');
                    }

                    $(div2row).append(div2col);
                    $(div2col).append(div2colA);
                    $(div2col).append(div2colB);
                })
            })
        }
    };

    // ==================================================================
    // routeAll: Get ETD for all trains for selected start and end points
    // ==================================================================

    $('#routeAll').click(function() {
        getUserLocations();
        if (depVal === "default" && arrVal === "default") {
            returnCondition = 1;
        }
        else if (depVal !== "default" && arrVal === "default") {
            returnCondition = 1;
            // sendDepRealReq(depVal);
        }
        else if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 1;
            reqDirection = checkDirection(depVal, arrVal) // Will return array later with all related lines to account for multiple trains
            console.log("both in the house - reqDirection is", reqDirection);
            sendRequest2(depVal, arrVal);
        }
    });

    // Request Departure Object for AJAX
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

    function SuccessRouteAll(data) {
        let dataETD = data[0];
        let dataPlanner = data[1]
        console.log("\n\n\n\n\n $$$$$$ All Train ETD data $$$$$$$$$")
        console.log(dataETD);
        console.log("\n\n\n\n\n $$$$$$ All Train Planner data $$$$$$$$$")
        console.log(dataPlanner);

        $( "div" ).remove( "#results" );

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

        output2(departureObjArrRouteAll)
        /*
        OUTPUT1 - shows all trains for departure stop
        */
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

                var point3 = $('#point3')
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

                $(point3).append(div2container);
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
                    let val = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                    if (val === 1) {
                        $(div2colA).css("backgroundColor", 'red');
                    } else if (val === 2) {
                        $(div2colA).css("backgroundColor", 'yellow');
                    } else {
                        $(div2colA).css("backgroundColor", 'green');
                    }

                    $(div2row).append(div2col);
                    $(div2col).append(div2colA);
                    $(div2col).append(div2colB);
                })
            })
        }
    };

    // ====================================================================
    // direct: Get ETD for Direcct trains for selected start and end points
    // ====================================================================

    $('#directTrains').click(function() {
        if (depVal === "default" && arrVal === "default") {
            returnCondition = 1;
        }
        else if (depVal !== "default" && arrVal === "default") {
            returnCondition = 1;
            // sendDepRealReq(depVal);
        }
        else if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 2;
            reqDirection = checkDirection(depVal, arrVal) // Will return array later with all related lines to account for multiple trains
            console.log("both in the house - reqDirection is", reqDirection);
            sendDepRealReq(depVal);
        }

    });

    $('#getSeat').click(function() {
        if (depVal === "default" && arrVal === "default") {
            returnCondition = 1;
        }
        else if (depVal !== "default" && arrVal === "default") {
            returnCondition = 1;
        }
        else if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 3;
            reqDirection = checkDirection(depVal, arrVal) // Will return array later with all related lines to account for multiple trains
            console.log("both in the house - reqDirection is", reqDirection);
            sendDepRealReq(depVal);
        }
    });

})();


// Copyright David Shin 2016
// All Rights Reserved
