"use strict";

/**
Bart Station Abbreviations used by api
*/
var stationAbbrev = ["12th","16th","19th","24th","ashb","balb","bayf","cast","civc","cols","colm","conc","daly","dbrk","dubl","deln","plza","embr","frmt","ftvl","glen","hayw","lafy","lake","mcar","mlbr","mont","nbrk","ncon","oakl","orin","pitt","phil","powl","rich","rock","sbrn","sfia","sanl","shay","ssan","ucty","warm","wcrk","wdub","woak"]

/**
Bar Station Full Names used by api
*/
var stationFull = ["12th St. Oakland City Center","16th St. Mission (SF)","19th St. Oakland","24th St. Mission (SF)","Ashby (Berkeley)","Balboa Park (SF)","Bay Fair (San Leandro)","Castro Valley","Civic Center (SF)","Coliseum","Colma","Concord","Daly City","Downtown Berkeley","Dublin/Pleasanton","El Cerrito del Norte","El Cerrito Plaza","Embarcadero (SF)","Fremont","Fruitvale (Oakland)","Glen Park (SF)","Hayward","Lafayette","Lake Merritt (Oakland)","MacArthur (Oakland)","Millbrae","Montgomery St. (SF)","North Berkeley","North Concord/Martinez","Oakland Int'l Airport","Orinda","Pittsburg/Bay Point","Pleasant Hill","Powell St. (SF)","Richmond","Rockridge (Oakland)","San Bruno","San Francisco Int'l Airport","San Leandro","South Hayward","South San Francisco","Union City","Warm Springs/South Fremont","Walnut Creek","West Dublin","West Oakland"]


function upperToLower(upperArr) {
    return upperArr.map(function(item) {
        return item.toLowerCase();
    });
}

// Define Routes
let route1upper = [
    "PITT", "NCON", "CONC", "PHIL", "WCRK", "LAFY", "ORIN", "ROCK", "MCAR", "19TH", "12TH", "WOAK", "EMBR", "MONT", "POWL", "CIVC", "16TH", "24TH", "GLEN", "BALB", "DALY", "COLM", "SSAN", "SBRN", "SFIA", "MLBR"
];
let route1lower = upperToLower(route1upper);
console.log("\nroute1upper", route1upper);
console.log("\nroute1lower", route1lower);

let route2upper = [
    "MLBR", "SFIA", "SBRN", "SSAN", "COLM", "DALY", "BALB", "GLEN", "24TH", "16TH", "CIVC", "POWL", "MONT", "EMBR", "WOAK", "12TH", "19TH", "MCAR", "ROCK", "ORIN", "LAFY", "WCRK", "PHIL", "CONC", "NCON", "PITT"
];
let route2lower = upperToLower(route2upper);
console.log("\nroute2upper", route2upper);
console.log("\nroute2lower", route2lower);

let route3upper = [
    "WARM", "FRMT", "UCTY", "SHAY", "HAYW", "BAYF", "SANL", "COLS", "FTVL", "LAKE", "12TH", "19TH", "MCAR", "ASHB", "DBRK", "NBRK", "PLZA", "DELN", "RICH"
];
let route3lower = upperToLower(route3upper);
console.log("\nroute3upper", route3upper);
console.log("\nroute3lower", route3lower);

let route4upper = [
    "RICH", "DELN", "PLZA", "NBRK", "DBRK", "ASHB", "MCAR", "19TH", "12TH", "LAKE", "FTVL", "COLS", "SANL", "BAYF", "HAYW", "SHAY", "UCTY", "FRMT", "WARM"
];
let route4lower = upperToLower(route4upper);
console.log("\nroute4upper", route4upper);
console.log("\nroute4lower", route4lower);

let route5upper = [
    "WARM", "FRMT", "UCTY", "SHAY", "HAYW", "BAYF", "SANL", "COLS", "FTVL", "LAKE", "WOAK", "EMBR", "MONT", "POWL", "CIVC", "16TH", "24TH", "GLEN", "BALB", "DALY"
];
let route5lower = upperToLower(route5upper);
console.log("\nroute5upper", route5upper);
console.log("\nroute5lower", route5lower);

let route6upper = [
    "DALY", "BALB", "GLEN", "24TH", "16TH", "CIVC", "POWL", "MONT", "EMBR", "WOAK", "LAKE", "FTVL", "COLS", "SANL", "BAYF", "HAYW", "SHAY", "UCTY", "FRMT", "WARM"
];
let route6lower = upperToLower(route6upper);
console.log("\nroute6upper", route6upper);
console.log("\nroute6lower", route6lower);

let route7upper = [
    "RICH", "DELN", "PLZA", "NBRK", "DBRK", "ASHB", "MCAR", "19TH", "12TH", "WOAK", "EMBR", "MONT", "POWL", "CIVC", "16TH", "24TH", "GLEN", "BALB", "DALY", "COLM", "SSAN", "SBRN", "MLBR"
];
let route7lower = upperToLower(route7upper);
console.log("\nroute7upper", route7upper);
console.log("\nroute7lower", route7lower);

let route8upper = [
    "MLBR", "SBRN", "SSAN", "COLM", "DALY", "BALB", "GLEN", "24TH", "16TH", "CIVC", "POWL", "MONT", "EMBR", "WOAK", "12TH", "19TH", "MCAR", "ASHB", "DBRK", "NBRK", "PLZA", "DELN", "RICH"
];
let route8lower = upperToLower(route8upper);
console.log("\nroute8upper", route8upper);
console.log("\nroute8lower", route8lower);

let route8 = route8lower;

let route11upper = [
    "DUBL", "WDUB", "CAST", "BAYF", "SANL", "COLS", "FTVL", "LAKE", "WOAK", "EMBR", "MONT", "POWL", "CIVC", "16TH", "24TH", "GLEN", "BALB", "DALY"
];
let route11lower = upperToLower(route11upper);
console.log("\nroute11upper", route11upper);
console.log("\nroute11lower", route11lower);

let route12upper = [
    "DALY", "BALB", "GLEN", "24TH", "16TH", "CIVC", "POWL", "MONT", "EMBR", "WOAK", "LAKE", "FTVL", "COLS", "SANL", "BAYF", "CAST", "WDUB", "DUBL"
];
let route12lower = upperToLower(route12upper);
console.log("\nroute12upper", route12upper);
console.log("\nroute12lower", route12lower);

let route19upper = [
    "COLS", "OAKL"
];
let route19lower = upperToLower(route19upper);
console.log("\nroute19upper", route19upper);
console.log("\nroute19lower", route19lower);

let route20upper = [
    "OAKL", "COLS"
];
let route20lower = upperToLower(route20upper);
console.log("\nroute20upper", route20upper);
console.log("\nroute20lower", route20lower);

let allRoutesLower = [
    route1lower,
    route2lower,
    route3lower,
    route4lower,
    route5lower,
    route6lower,
    route7lower,
    route8lower,
    route11lower,
    route12lower,
    route19lower,
    route20lower,
];

// Make Clusters
var clusterRICH = ["ASHB", "DBRK", "NBRK", "PLZA", "DELN", "RICH"]

var clusterSFIA = ["MLBR", "SFIA", "SBRN", "SSAN", "COLM"]

var clusterSanFran = ["DALY", "BALB", "GLEN", "24TH", "16TH", "CIVC", "POWL", "MONT", "EMBR"]
