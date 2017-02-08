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

addButton("login", "Log In", "#point0", 2);
addButton("register", "Register", "#point0", 2);
addButton("realTime", "All Trains", "#point1", 2);
addButton("directTrains", "Direct", "#point1", 2);
// addButton("getSeat", "Get Seat", "#point1", 2);
// addButton("aButtonID", "buttonText", "attachmentPoint");

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

    // console.log("$(departure):", $(departure))

    // Set up
    $('#login').click(function() {
        window.location.href = "http://localhost:3031/auth/login"
    });

    $('#register').click(function() {
        window.location.href = "http://localhost:3031/register"
    });


    $('#realTime').click(function() {
        let departure = $('#Departure');
        let arrival = $('#Arrival')
        depVal = $(departure).val()
        arrVal = $(arrival).val()
        console.log("\n\n\n\nDeparture Val~~~~~~~~~~~~~~~~~>", depVal)
        console.log("Arrival Val~~~~~~~~~~~~~~~~~>", arrVal)
        if (depVal === "default" && arrVal === "default") {
            returnCondition = 1;
        }
        else if (depVal !== "default" && arrVal === "default") {
            returnCondition = 1;
            sendDepRealReq(depVal);
        }
        else if (depVal !== "default" && arrVal !== "default") {
            returnCondition = 1;
            reqDirection = checkDirection(depVal, arrVal) // Will return array later with all related lines to account for multiple trains
            console.log("both in the house - reqDirection is", reqDirection);
            sendDepRealReq(depVal);
        }

    });

    $('#directTrains').click(function() {
        let departure = $('#Departure');
        let arrival = $('#Arrival')
        depVal = $(departure).val()
        arrVal = $(arrival).val()
        console.log("\n\n\n\nDeparture Val~~~~~~~~~~~~~~~~~>", depVal)
        console.log("Arrival Val~~~~~~~~~~~~~~~~~>", arrVal)
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
        let departure = $('#Departure');
        let arrival = $('#Arrival')
        depVal = $(departure).val()
        arrVal = $(arrival).val()
        console.log("\n\n\n\nDeparture Val~~~~~~~~~~~~~~~~~>", depVal)
        console.log("Arrival Val~~~~~~~~~~~~~~~~~>", arrVal)
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

    // console.log("$$ THE returnCondition $$", returnCondition);

    function sendDepRealReq(search) {
    // Request Departure Object for AJAX
        const getin = 'MW9S-E7SL-26DU-VV8V'
        // let departureObj = {
        //     url: `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${search}&key=${getin}`,
        //     method: "GET",
        //     success: depRealSuccess
        // };
        let departureObj = {
            url: `http://localhost:3031/getinfo/${search}`,
            method: "GET",
            success: depRealSuccess
        };
        // Start the AJAX request
        $.ajax(departureObj);
    };

    function depRealSuccess(data) {
        console.log("data:", data)
        $( "div" ).remove( "#results" );
        // var xmlDoc = xmlToJson(data)
        var xmlDoc = data;
        console.log("xmlDoc", xmlDoc)
        let departureObjArr = [];
        if (Array.isArray(xmlDoc.root.station.etd)) {
            $$each(xmlDoc.root.station.etd, function(departureObj) {
                departureObjArr.push(departureObj)
            });
        } else if (typeof xmlDoc.root.station.etd === 'object') {
            departureObjArr.push(xmlDoc.root.station.etd)
        }
        console.log("$$ THE returnCondition $$", returnCondition);
        console.log("OUR NEW departureObjArr", departureObjArr);

        /* PRINT RESULTS FOR RETURN CONDITION 1) */
        if (returnCondition === 1) {
            output1();
        }
        else if (returnCondition === 2) {
            output2();
        }
        else if (returnCondition === 3) {
            output3();
        }

        /*
        OUTPUT1 - shows all trains for departure stop
        */
        function output1() {
            $$each(departureObjArr, function(departureObj) {
                let minsArr = [];
                var dest = departureObj.destination
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination['#text'])

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
                // var body2 = $('body')
                var point3 = $('#point3')
                var div2 = $('<div id="results" class="container">')
                var destinationResultsDiv = $('<div class="destination">')
                var destinationResults = $("<h5>")
                var timeResults = $('<h6>')

                var div2container = $('<div id="results" class="container">')
                var div2row = $('<div class="row report">')

                console.log("$(timeResults)", $(timeResults))
                $(destinationResults).text(dest);

                // Toggle to bring back bart colors to destination
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

                    // Toggle for routeColor for squares
                    $(div2colA).css("backgroundColor", routeColor);

                    // Toggle for random "busy" color for square
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


        function output2() {
            departureObjArr = $$filter(departureObjArr, function(departureObj) {
                let depAbbr = departureObj.abbreviation
                console.log("Filter candidates", depAbbr['#text']);
                // Change PREDICATE to reflect all trains going to abbreviation
                if (reqDirection === "North") {
                    return depAbbr['#text'] === "RICH"
                } else if (clusterSanFran.indexOf(arrVal.toUpperCase()) !== -1) {
                    return (clusterSanFran.indexOf(depAbbr['#text']) !== -1 || clusterSFIA.indexOf(depAbbr['#text']) !== -1)
                } else if (clusterSFIA.indexOf(arrVal.toUpperCase()) !== -1) {
                    return (clusterSFIA.indexOf(depAbbr['#text']) !== -1)
                }
            })
            $$each(departureObjArr, function(departureObj) {
                var dest = departureObj.destination['#text']
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination['#text'])

                var est = departureObj.estimate;
                console.log("est:", est)
                if (Array.isArray(est)) {
                    $$each(est, function(anEst) {

                    // var mins = departureObj.estimate[0].minutes['#text']
                    // console.log(departureObj.estimate[0].minutes['#text'])
                    // var routeColor = departureObj.estimate[0].color['#text']
                    var mins = anEst.minutes['#text']
                    console.log(anEst.minutes['#text'])
                    var routeColor = anEst.color['#text']

                    //### Repeated code
                    var point3 = $('#point3')

                    var div2 = $('<div id="results" class="container">')
                    var destinationResults = $('<h5>')
                    var timeResults = $('<h6>')
                    console.log("$(timeResults)", $(timeResults))
                    $(destinationResults).text(dest + " Train")
                    $(destinationResults).css("backgroundColor", routeColor)

                    if (["RED", "GREEN", "BLUE"].indexOf(routeColor) !== -1) {
                        $(destinationResults).css("color", "white");
                    }

                    if (mins === "Leaving") {
                        $(timeResults).text(mins);
                    } else if (mins === "1") {
                        $(timeResults).text(mins + " min");
                    } else {
                        $(timeResults).text(mins + " mins");
                    }
                    $(point3).append(div2);
                    $(div2).append(destinationResults);
                    $(div2).append(timeResults);
                    //### Repeated code

                })


                } else if (typeof est === 'object') {
                    console.log("typeof est:", est)
                    var mins = departureObj.estimate.minutes['#text']
                    console.log(departureObj.estimate.minutes['#text'])
                    var routeColor = departureObj.estimate.color['#text']

                    //### Repeated code
                    var point3 = $('#point3')

                    var div2 = $('<div id="results" class="container">')
                    var destinationResults = $('<h5>')
                    var timeResults = $('<h6>')
                    console.log("$(timeResults)", $(timeResults))
                    $(destinationResults).text(dest + " Train")
                    $(destinationResults).css("backgroundColor", routeColor)

                    if (["RED", "GREEN", "BLUE"].indexOf(routeColor) !== -1) {
                        $(destinationResults).css("color", "white");
                    }

                    if (mins === "Leaving") {
                        $(timeResults).text(mins);
                    } else if (mins === "1") {
                        $(timeResults).text(mins + " min");
                    } else {
                        $(timeResults).text(mins + " mins");
                    }
                    $(point3).append(div2);
                    $(div2).append(destinationResults);
                    $(div2).append(timeResults);
                    //### Repeated code

                }

            });

        }

        function output3() {
            console.log("IN OUTPUT 3 BLOCK 1");
            var departureObjArr1 = $$filter(departureObjArr, function(departureObj) {
                let depAbbr = departureObj.abbreviation
                console.log("Filter candidates", depAbbr['#text']);
                // Change PREDICATE to reflect all trains going to abbreviation
                if (reqDirection === "North") {
                    return depAbbr['#text'] === "RICH"
                } else if (clusterSanFran.indexOf(arrVal.toUpperCase()) !== -1) {
                    return (clusterSanFran.indexOf(depAbbr['#text']) !== -1 || clusterSFIA.indexOf(depAbbr['#text']) !== -1)
                } else if (clusterSFIA.indexOf(arrVal.toUpperCase()) !== -1) {
                    return (clusterSFIA.indexOf(depAbbr['#text']) !== -1)
                }
            })
            $$each(departureObjArr1, function(departureObj) {
                var dest = departureObj.destination['#text']
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination['#text'])

                var est = departureObj.estimate;
                console.log("est:", est)
                if (Array.isArray(est) === false) {
                    est = [est];
                }
                // if (Array.isArray(est)) {
                // $$each(est, function(anEst) {

                    // var mins = departureObj.estimate[0].minutes['#text']
                    // console.log(departureObj.estimate[0].minutes['#text'])
                    // var routeColor = departureObj.estimate[0].color['#text']
                    var mins = est[0].minutes['#text']
                    console.log(est[0].minutes['#text'])
                    var routeColor = est[0].color['#text']

                    //### Repeated code
                    var point3 = $('#point3')

                    var div2 = $('<div id="results" class="container">')
                    var destinationResults = $('<h5>')
                    var timeResults = $('<h6>')
                    console.log("$(timeResults)", $(timeResults))
                    $(destinationResults).text(dest + " Train")
                    $(destinationResults).css("backgroundColor", routeColor)

                    if (["RED", "GREEN", "BLUE"].indexOf(routeColor) !== -1) {
                        $(destinationResults).css("color", "white");
                    }

                    $(timeResults).text(mins + " minutes");
                    $(point3).append(div2);
                    $(div2).append(destinationResults);
                    $(div2).append(timeResults);
                    //### Repeated code

                // })

            })


            //########## Backwards block
            console.log("IN OUTPUT 3 BLOCK 2");
            var departureObjArr2 = $$filter(departureObjArr, function(departureObj) {
                let depAbbr = departureObj.abbreviation
                console.log("Filter candidates", depAbbr['#text']);
                // Change PREDICATE to reflect all trains going to abbreviation
                // if (reqDirection === "North") {
                //     return depAbbr['#text'] === "RICH"
                // } else

                var testCase = "DALY"

                if (clusterSanFran.indexOf(testCase) !== -1) {
                    return (clusterSanFran.indexOf(testCase) !== -1 || clusterSFIA.indexOf(testCase) !== -1)
                } else if (clusterSFIA.indexOf(testCase) !== -1) {
                    return (clusterSFIA.indexOf(testCase) !== -1)
                }
            })
            $$each(departureObjArr2, function(departureObj) {
                var dest = departureObj.destination['#text']
                console.log("\n#### DESTINATION!!!!!!", dest, "\n")
                console.log("departureObj", departureObj)
                console.log(departureObj.destination['#text'])

                var est = departureObj.estimate;
                console.log("est:", est)
                if (Array.isArray(est) === false) {
                    est = [est];
                }
                // if (Array.isArray(est)) {
                // $$each(est, function(anEst) {

                    // var mins = departureObj.estimate[0].minutes['#text']
                    // console.log(departureObj.estimate[0].minutes['#text'])
                    // var routeColor = departureObj.estimate[0].color['#text']
                    var mins = est[0].minutes['#text']
                    console.log(est[0].minutes['#text'])
                    var routeColor = est[0].color['#text']

                    //### Repeated code
                    var point3 = $('#point3')

                    var div2b = $('<div id="results" class="container">')
                    var destinationResults = $('<h5>')
                    var timeResults = $('<h6>')
                    console.log("$(timeResults)", $(timeResults))
                    $(destinationResults).text(dest + " Train")
                    $(destinationResults).css("backgroundColor", routeColor)

                    if (["RED", "GREEN", "BLUE"].indexOf(routeColor) !== -1) {
                        $(destinationResults).css("color", "white");
                    }

                    $(timeResults).text(mins + " minutes");
                    $(point3).append(div2b);
                    $(div2b).append(destinationResults);
                    $(div2b).append(timeResults);
                    //### Repeated code
                // })
            })
            // ########## Backwards block end
        }
    };
})();


// Copyright David Shin 2016
// All Rights Reserved
