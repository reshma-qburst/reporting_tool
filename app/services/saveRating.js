(function() {
    'use strict';
    app.service('saveRating', function() {
        var ratingArray = [];
        return {
            saveActivity: function(selectedTrip,
                ratingBreak, ratingAcceleration,
                ratingTurn) {
                ratingArray.push({
                    trip: selectedTrip,
                    break: ratingBreak,
                    acceleration: ratingAcceleration,
                    turn: ratingTurn
                });
                return ratingArray;
            }
        }
    });
})();
