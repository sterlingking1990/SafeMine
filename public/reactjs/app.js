"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fruitsAlpha = ["orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana"];
var filtered_fruit_marks = ["good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good", "good"];
var intuition_level = {
    0: "Intuitive",
    5: "Gut",
    10: "Hearty",
    15: "Visionary",
    20: "Connected Wisdom"
};
var disable_filtered_fruits_marks = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
var fruitType = ["orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana"];
var shuffled_fruits = shuffle(fruitsAlpha);
//save the shuffled_fruits to local storage
var saved_shuffled_fruits = JSON.parse(localStorage.getItem("shuffled_fruits"));
if (saved_shuffled_fruits == null) {
    var json_save_shuffle_fruit = JSON.stringify(shuffled_fruits);
    localStorage.setItem("shuffled_fruits", json_save_shuffle_fruit);
}
var shuffled_fruits_json = JSON.parse(localStorage.getItem("shuffled_fruits"));
var fruits = shuffled_fruits_json.map(function (each_fruit) {
    return "./images/" + each_fruit + ".png";
});
var removed_fruits_image = filtered_fruit_marks.map(function (each) {
    return "btn-float btn-pulse red";
});
var fruitsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

var groupedFruits = [];
var temp = [];
for (var i = 0; i < fruitType.length; i++) {
    for (var j = 0; j < shuffled_fruits_json.length; j++) {

        if (fruitType[i] === shuffled_fruits_json[j]) {
            temp.push(j);
        }
    }
    groupedFruits.push(temp);
    temp = [];
}
function checkFruit(fru) {
    var existing_fruits_deleted = JSON.parse(localStorage.getItem("removed_fruits"));
    if (existing_fruits_deleted == null) existing_fruits_deleted = [];
    var val = fru.filter(function (e) {
        return e !== null;
    });
    var fruitsPlayed = val.map(function (e) {
        return e * 1;
    });
    var returnFruits = [];
    var removedFruits = [];
    var counter = [];

    for (var p = 0; p < groupedFruits.length; p++) {
        for (var x = 0; x < groupedFruits[p].length; x++) {
            if (fruitsPlayed.includes(groupedFruits[p][x])) {
                counter.push(groupedFruits[p][x]);
            }
        }
        if (counter.length >= 2) {
            var new_fruits_left = fruitsPlayed.filter(function (e) {
                return !counter.includes(e);
            });
            var removed_fruits = fruitsPlayed.filter(function (e) {
                return counter.includes(e);
            });
            for (var m = 0; m < new_fruits_left.length; m++) {
                returnFruits[new_fruits_left[m]] = new_fruits_left[m];
            }
            for (var k = 0; k < removed_fruits.length; k++) {
                removedFruits[removed_fruits[k]] = removed_fruits[k];
                existing_fruits_deleted[removed_fruits[k]] = removed_fruits[k];
            }
            if (existing_fruits_deleted.length > 0) {
                var json_fruits = JSON.stringify(existing_fruits_deleted);
                localStorage.setItem("removed_fruits", json_fruits);
            }

            return returnFruits;
        }

        counter = [];
        returnFruits = [];
        removedFruits = [];
    }
    return fru;
}

var FruitButtons = function (_React$Component) {
    _inherits(FruitButtons, _React$Component);

    function FruitButtons(props) {
        _classCallCheck(this, FruitButtons);

        var _this = _possibleConstructorReturn(this, (FruitButtons.__proto__ || Object.getPrototypeOf(FruitButtons)).call(this, props));

        _this.openFruit = _this.openFruit.bind(_this);

        return _this;
    }

    _createClass(FruitButtons, [{
        key: "openFruit",
        value: function openFruit(event) {
            this.props.openFruit(event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var num_display = this.props.buttonIndex;
            var fruit_num = this.props.display;
            var removed_fruits = localStorage.getItem("removed_fruits");
            var removed_fruits_json = JSON.parse(removed_fruits);
            if (!removed_fruits_json) {
                removed_fruits_json = [];
            }

            return React.createElement(
                "div",
                null,
                num_display.map(function (e) {
                    return React.createElement(
                        "button",
                        { disabled: disable_filtered_fruits_marks[removed_fruits_json[e]], className: removed_fruits_image[removed_fruits_json[e]], key: e, value: e, onClick: _this2.openFruit },
                        React.createElement("img", { src: fruits[fruit_num[e]] })
                    );
                })
            );
        }
    }]);

    return FruitButtons;
}(React.Component);

var FruitFaceGame = function (_React$Component2) {
    _inherits(FruitFaceGame, _React$Component2);

    function FruitFaceGame(props) {
        _classCallCheck(this, FruitFaceGame);

        var _this3 = _possibleConstructorReturn(this, (FruitFaceGame.__proto__ || Object.getPrototypeOf(FruitFaceGame)).call(this, props));

        _this3.state = { fruits: [], played: 0, won: 0, intuition_level: '' };
        _this3.openFruit = _this3.openFruit.bind(_this3);
        return _this3;
    }

    _createClass(FruitFaceGame, [{
        key: "resetGame",
        value: function resetGame() {
            localStorage.clear("removed_fruits");
            localStorage.clear("shuffled_fruits");
            localStorage.clear("played");
            window.location.reload();
            console.log("fninshed loading");
        }
    }, {
        key: "openFruit",
        value: function openFruit(fruit_to_open) {
            //get the played from local storage, update and set state
            var played = localStorage.getItem("played");
            if (played == null) played = 0;
            var play_amount = parseInt(played, 10) + 1;
            localStorage.setItem("played", play_amount);

            //get removed_fruits from storage, filter off and get count of numbers won
            var fruits_removed = JSON.parse(localStorage.getItem("removed_fruits"));
            if (fruits_removed == null) fruits_removed = [];
            var count_removed = fruits_removed ? fruits_removed.filter(function (e) {
                return e !== null;
            }) : [];
            var won_fruits = count_removed.length;
            var intuition = intuition_level[won_fruits];
            //save the fruit_to_open num in fruits
            var open_fruit = this.state.fruits;
            open_fruit[fruit_to_open] = fruit_to_open;
            this.setState({ fruits: open_fruit, last: fruit_to_open, played: play_amount, won: won_fruits, intuition_level: intuition });
            var that = this;
            setTimeout(function () {
                //update the new fruits numbers after certain secs
                var answ = checkFruit(open_fruit);
                that.setState(function () {
                    return {
                        fruits: answ,
                        won: won_fruits
                    };
                });
            }, 1000);
        }
    }, {
        key: "render",
        value: function render() {
            var played = this.state.played;
            var won = this.state.won;
            var fruit_numbers = this.state.fruits;
            var intuition = this.state.intuition_level;
            var replay = "replay";

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    { className: "flow-text center-align" },
                    "Played: ",
                    played,
                    " Won: ",
                    won,
                    " Intuition: ",
                    intuition ? intuition : "Intuitive",
                    React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "button",
                            { onClick: this.resetGame.bind(this) },
                            React.createElement(
                                "i",
                                { className: "material-icons" },
                                "replay"
                            )
                        )
                    )
                ),
                React.createElement(FruitButtons, { buttonIndex: fruitsIndex, openFruit: this.openFruit, display: fruit_numbers })
            );
        }
    }]);

    return FruitFaceGame;
}(React.Component);

var out = document.getElementById('app');
ReactDOM.render(React.createElement(FruitFaceGame, null), out);
