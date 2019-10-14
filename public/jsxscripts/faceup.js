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
const fruitsIndex=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]

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

function checkFruit(fru){
    var val = fru.filter(e => e !== null);
    var fruitsPlayed = val.map(e => e * 1);
    var returnFruits=[]
    var counter = []
    for (let p = 0; p < groupedFruits.length; p++) {
        for (let x = 0; x < groupedFruits[p].length; x++) {
            if (fruitsPlayed.includes(groupedFruits[p][x])) {
                counter.push(groupedFruits[p][x])
            }
        }
        if (counter.length >= 2) {
            var new_fruits_left = fruitsPlayed.filter(e => !counter.includes(e))
            for(let m=0;m<new_fruits_left.length;m++){
                returnFruits[new_fruits_left[m]]=new_fruits_left[m];
            }
            
            return returnFruits;
            
        }
        
        counter = []
        returnFruits=[]
    }
    return fru;
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
        var num_display=this.props.buttonIndex;
        var fruit_num=this.props.display;
        return (
            <div>
                {num_display.map(e => <button key={e} value={e} className={className} onClick={this.openFruit} ><img src={fruits[fruit_num[e]]} /></button>)}
            </div>
        )
    }
    
}

class FruitFaceGame extends React.Component{
    constructor(props){
        super(props);
        this.state={fruits:[],last:'',start:0}
        this.openFruit=this.openFruit.bind(this);
    }

    // componentDidMount(){
    //     //if the component have been set on the DOM following several operations, retirve the new filtered fruits Num and set the state for the new fruits Num
    //     //only mount when the isnt a null item from local storage
    //     var json=localStorage.getItem("fruits_to_show")
    //     var obj_fruits=JSON.parse(json);
    //     if(obj_fruits){
    //         this.setState({ fruits: obj_fruits });
    //     }
        
        

    // }

    // componentDidUpdate(prevProps,prevState){
    //     //since the user has opened a fruit, lets filter off and save the value into a local storage 
    //     let val=this.state.fruits.filter(e=>e!==null);
    //     let fruitsPlayed=val.map(e=>e*1);
    //     var counter = []
    //     for (let p = 0; p < groupedFruits.length; p++) {
    //         for (let x = 0; x < groupedFruits[p].length; x++) {
    //             if (fruitsPlayed.includes(groupedFruits[p][x])) {
    //                 counter.push(groupedFruits[p][x])
    //             }
    //         }
    //         if (counter.length >= 2) {
    //             var new_fruits_left = fruitsPlayed.filter(e => !counter.includes(e))
    //             break;
    //         }
    //         counter = []
    //     }
        
    //     if(new_fruits_left){
    //         //save to local storage
    //         var json=JSON.stringify(new_fruits_left);
    //         localStorage.setItem("fruits_to_show",json);
    //         window.location.reload();
    //     }
        
    // }




    openFruit(fruit_to_open){
        //save the fruit_to_open num in fruits
        const open_fruit=this.state.fruits;
        open_fruit[fruit_to_open]=fruit_to_open;
        this.setState({ fruits: open_fruit, last: fruit_to_open })
        var that=this;
        setTimeout(function () {
            //do something once
            var answ = checkFruit(open_fruit);
            that.setState(()=>{
                return {
                    fruits: answ
                }})
        }, 1000);
    }

   



    render(){
        var lastPlayed=this.state.last;
        var fruit_numbers=this.state.fruits;
        
        return(
            <div>
                <FruitButtons buttonIndex={fruitsIndex} openFruit={this.openFruit} display={fruit_numbers} keep={fruit_numbers}/>
            </div>

        )
    }
}



var out=document.getElementById('app');
ReactDOM.render(<FruitFaceGame/>,out);