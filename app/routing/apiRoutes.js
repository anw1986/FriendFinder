// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends
// ===============================================================================

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey request... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {

        var newFriend = req.body
        friends.push(newFriend)
        // res.json(newFriend)
        console.log(newFriend)

        console.log("Number of friends:" + friends.length)

        var scoreArray = []
        for (var i = 0; i < friends.length - 1; i++) {
            friends[i].indexPosition = i;
            var arrayScore = 0
            for (var j = 0; j < friends[i].score.length; j++) {

                arrayScore = arrayScore + Math.abs(parseInt(friends[i].score[j]) - parseInt(newFriend.score[j]))

            }
            scoreArray.push(arrayScore)
        }
        var minScore
        var indexLocation
        var friendMatchArray = []
        console.log(scoreArray)
        minScore = Math.min.apply(null, scoreArray)
        indexLocation = scoreArray.indexOf(minScore)
        console.log("minimum score: " + minScore + " Index location: " + indexLocation)
        for (var k = 0; k < friends.length - 1; k++) {
            if (friends[k].indexPosition === indexLocation) {
                friendMatchArray.push(friends[k])
                
            }
        }
        console.log(friendMatchArray)
        res.json(friendMatchArray)
    });

};