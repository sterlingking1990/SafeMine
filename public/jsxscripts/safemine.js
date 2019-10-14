const num = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const color={
    0:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:""
}
const enable={
    0:false,
    1:false,
    2:false,
    3:false,
    4:false,
    5:false,
    6:false,
    7:false,
    8:false
}

class SafeMine extends React.Component{
    constructor(props){
        super(props);

        this.state = { move:'' , num:[0, 1, 2, 3, 4, 5, 6, 7, 8], clicked:''}
    }
    readScroll(num){
        let num_mo=num+2
        this.setState(() => {
            return { move: num_mo }
        })
    }

    ComponentDidUpdate(PrevState){

    }

    setScroll(){
        let num=Math.floor(Math.random() * this.state.num.length);
        this.setState(()=>{
            return {move:num}
        })
    }

    render(){
        let color_box=this.state.move
        
        color[color_box]="btn-floating pulse red";
        enable[color_box]=true
        
        return(
            <div>
                <Button numbers={this.state.num} readScroll={this.readScroll.bind(this)} scroll={color} enables={enable}/>
                <ButtonPlay textVal="Name" setScroll={this.setScroll.bind(this)}/>
            </div>
        )
    }
}

const Button=(props)=>{
    return(
        <div>
                {props.numbers.map((number)=>
                    
                    <button key={number} disabled={!props.enables[number]} onClick={(e)=>{props.readScroll(number)}} className={props.scroll[number]}>{number}</button>
            )}
        </div>
    )
}

function ButtonPlay(props) {
    return(
        <div>
            <button onClick={props.setScroll}>{props.textVal}</button>
        </div>
    )
}

var out=document.getElementById('app');
ReactDOM.render(<SafeMine/>,out);