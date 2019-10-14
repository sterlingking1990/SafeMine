"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fruitsAlpha = ["orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana"];
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
var fruits = shuffled_fruits.map(function (each_fruit) {
    return "./images/" + each_fruit + ".png";
});
var fruitsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41];

var groupedFruits = [];
var temp = [];
for (var i = 0; i < fruitType.length; i++) {
    for (var j = 0; j < shuffled_fruits.length; j++) {

        if (fruitType[i] === shuffled_fruits[j]) {
            temp.push(j);
        }
    }
    groupedFruits.push(temp);
    temp = [];
}

var className = "btn btn-pulse white";

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

            var fruitNum = this.props.fruitNum;
            var num_display = this.props.display;
            return React.createElement(
                "div",
                null,
                num_display.map(function (e) {
                    return React.createElement(
                        "button",
                        { key: e, value: e, className: className, onClick: _this2.openFruit },
                        React.createElement("img", { src: fruits[fruitNum[e]] })
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

        _this3.state = { fruits: [], last: '' };
        _this3.openFruit = _this3.openFruit.bind(_this3);
        return _this3;
    }

    // componentDidMount(){
    //     //if the component have been set on the DOM following several operations, retirve the new filtered fruits Num and set the state for the new fruits Num
    //     //only mount when the isnt a null item from local storage
    // }

    _createClass(FruitFaceGame, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            //since the user has opened a fruit, lets filter off and save the value into a local storage 
            var val = this.state.fruits.filter(function (e) {
                return e !== null;
            });
            var fruitsPlayed = val.map(function (e) {
                return e * 1;
            });
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
                    break;
                }
                counter = [];
            }

            if (new_fruits_left) {
                //save to local storage
                var json = JSON.stringify(new_fruits_left);
                localStorage.setItem("fruits_to_show", json);
            }

            //filter off the fruits which has similar marking -making sure to check the fruits array as target groupedFruits
            //save the new filter to localStorage,...


            // let nn = this.state.display.filter((e) => !value.includes(e));
            // console.log(nn);
        }
    }, {
        key: "openFruit",
        value: function openFruit(fruit_to_open) {
            //save the fruit_to_open num in fruits
            var open_fruit = this.state.fruits;
            open_fruit[fruit_to_open] = fruit_to_open;
            this.setState({ fruits: open_fruit, last: fruit_to_open });
        }
    }, {
        key: "render",
        value: function render() {
            var fruitNum = this.state.fruits;
            var lastPlayed = this.state.last;

            return React.createElement(
                "div",
                null,
                React.createElement(FruitButtons, { fruitNum: fruitNum, openFruit: this.openFruit, display: fruitsIndex })
            );
        }
    }]);

    return FruitFaceGame;
}(React.Component);

var out = document.getElementById('app');
ReactDOM.render(React.createElement(FruitFaceGame, null), out);
