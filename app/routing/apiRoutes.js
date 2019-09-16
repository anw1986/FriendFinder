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
        var minArrayIndex=[]
        console.log(scoreArray)
        // get the minimum score in the array 
        minScore = Math.min.apply(null, scoreArray)
        // indexLocation = scoreArray.indexOf(minScore)
        // check if there are multiple instances of minimum score
        
        for (var x=0;x<scoreArray.length;x++){
            if (scoreArray[x]===minScore){
                minArrayIndex.push(x)
            }
        }
        console.log(minArrayIndex)
        // minArrayIndex stores the index location of the friends matches in the API
        for (var z=0;z<minArrayIndex.length;z++){
            for (var k = 0; k < friends.length - 1; k++) {
                if (friends[k].indexPosition === minArrayIndex[z]) {
                    friendMatchArray.push(friends[k])  
                }
            }

        }
        console.log(friendMatchArray)
        res.json(friendMatchArray)
    });

};