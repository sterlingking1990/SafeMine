const fruitsAlpha = ["orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana", "orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana"]
function shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;

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
const fruitType = ["orange", "apple", "watermelon", "pineapple", "mango", "pawpaw", "strawberry", "guava", "melon", "banana"]
var shuffled_fruits=shuffle(fruitsAlpha);
const fruits = shuffled_fruits.map(each_fruit => "./images/" + each_fruit + ".png")
const fruitsIndex=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]

var groupedFruits = [];
var temp = [];
        for (let i = 0; i < fruitType.length; i++) {
            for (let j = 0; j < shuffled_fruits.length; j++) {

                if (fruitType[i] === shuffled_fruits[j]){
                    temp.push(j)
                }
            }
            groupedFruits.push(temp)
            temp = []
        }

const className="btn btn-pulse white";


class FruitButtons extends React.Component {

    constructor(props){
        super(props);
        this.openFruit=this.openFruit.bind(this)

    }

    openFruit(event){
        this.props.openFruit(event.target.value);
    }

    render(){

        let fruitNum=this.props.fruitNum;
        let num_display=this.props.display;
        return (
            <div>
                {num_display.map(e => <button key={e} value={e} className={className} onClick={this.openFruit} ><img src={fruits[fruitNum[e]]} /></button>)}
            </div>
        )
    }
    
}

class FruitFaceGame extends React.Component{
    constructor(props){
        super(props);
        this.state={fruits:[],last:''}
        this.openFruit=this.openFruit.bind(this);
    }

    // componentDidMount(){
    //     //if the component have been set on the DOM following several operations, retirve the new filtered fruits Num and set the state for the new fruits Num
    //     //only mount when the isnt a null item from local storage
    // }

    componentDidUpdate(prevProps,prevState){
        //since the user has opened a fruit, lets filter off and save the value into a local storage 
        let val=this.state.fruits.filter(e=>e!==null);
        let fruitsPlayed=val.map(e=>e*1);
        var counter = []
        for (let p = 0; p < groupedFruits.length; p++) {
            for (let x = 0; x < groupedFruits[p].length; x++) {
                if (fruitsPlayed.includes(groupedFruits[p][x])) {
                    counter.push(groupedFruits[p][x])
                }
            }
            if (counter.length >= 2) {
                var new_fruits_left = fruitsPlayed.filter(e => !counter.includes(e))
                break;
            }
            counter = []
        }
        
        if(new_fruits_left){
            //save to local storage
            var json=JSON.stringify(new_fruits_left);
            localStorage.setItem("fruits_to_show",json);
        }

        //filter off the fruits which has similar marking -making sure to check the fruits array as target groupedFruits
        //save the new filter to localStorage,...



        // let nn = this.state.display.filter((e) => !value.includes(e));
        // console.log(nn);
    }




    openFruit(fruit_to_open){
        //save the fruit_to_open num in fruits
        let open_fruit=this.state.fruits;
        open_fruit[fruit_to_open]=fruit_to_open;
        this.setState({fruits:open_fruit,last:fruit_to_open})

    }

   



    render(){
        let fruitNum=this.state.fruits;
        let lastPlayed=this.state.last;


        return(
            <div>
                <FruitButtons fruitNum={fruitNum} openFruit={this.openFruit} display={fruitsIndex}/>
            </div>

        )
    }
}



var out=document.getElementById('app');
ReactDOM.render(<FruitFaceGame/>,out);