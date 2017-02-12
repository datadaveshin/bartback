"use strict";
/**
Needed by Materialize to implement <select> tags
*/
$(document).ready(function() {
    $('select').material_select();
});

console.log('###$$$$$$@@@********  IN SCRIPT preferences2.js *********@@@$$$$$$$###')

let loggedIn = $('.loggedIn')
console.log("\n\n\n\n ******** BEGIN LOGGED IN *********");
console.log(loggedIn);
console.log("\n\n\n\n ******** END LOGGED IN *********");

let navInjector = $('.nav-injector')
let loggedInToo = $('#loggedInToo')
if (loggedInToo.val() === "noname") {
    console.log("noname in the house!!!!!!!!!");
} else {
    console.log(loggedInToo.val() + "in the house!!!!!");
    let prefer = $("<li><a href='/preferences'>Preferences</a></li>")
    $(navInjector).append(prefer)
}

// Copyright David Shin 2017
// All Rights Reserved
