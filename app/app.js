'use strict'

require("./server")().then(function(resolve) {}, function(err) {
    console.log("Couldn't connect to database, server not started");
    console.log("Error", err);
});