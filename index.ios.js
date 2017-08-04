import React from 'react';
import {
  AppRegistry,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
const {height, width} = Dimensions.get('window')
export default class legatiplay extends React.Component {
  constructor() {
    super();
    this.createChallengePoints = this.createChallengePoints.bind(this)
    this.state = {
      goalPoints: [
          5,
         {x: width*0.3, y: height*1.7},
         {x: width*0.9, y: height*1.6},
         {x: width*1, y: height*1.3},
         {x: width*0.1, y: height*1.2}
      ],
      challengesPoints : [],
      p0 : {x: 10, y: 10},
      p1 : {x: 50, y: 100},
      p2 : {x: 150, y: 100},
      p3 : {x: 200, y: 10}
    }
    
  }

  componentWillMount(){
  this.createChallengePoints(5)
  } 

 componentDidMount(){

  
  }

  bezier(t, p0, p1, p2, p3){
      const cX = 3 * (p1.x - p0.x)
      const bX = 3 * (p2.x - p1.x) - cX
      const aX = p3.x - p0.x - cX - bX;
      const cY = 3 * (p1.y - p0.y);
      const bY = 3 * (p2.y - p1.y) - cY;
      const aY = p3.y - p0.y - cY - bY;
      const x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
      const y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
      return {x, y};
  } 
  
  createChallengePoints(numberOfChallenges){
    let challengesPoints = [];
    console.warn(JSON.stringify(this.state));
    const initialValue = 1/(this.state.goalPoints[0]+1);
    let currentPoint = 1/(this.state.goalPoints[0]+1);
    while(currentPoint < 0.98) {
      challengesPoints.push(this.bezier(this.state.goalPoints[0], this.state.goalPoints[1], this.state.goalPoints[2], this.state.goalPoints[3], this.state.goalPoints[4])) 
      currentPoint = currentPoint + initialValue;
    } 
   this.setState({challengesPoints})
  }
  
      
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.backgroundImage} resizeMode={"cover"}
      source={require('./img/legatiMap.jpeg')}/>
      
     
          {this.state.challengesPoints.map((cordinate) => {
            return (
                <View style={[styles.goal, {top: cordinate.y, left: cordinate.x} ]} />
             )
            } 
          )}
        <View style={[styles.goal, {top: this.state.goalPoints[0].y, left: this.state.goalPoints[0].x} ]} /> 
        <View style={[styles.goal, {top: this.state.goalPoints[1].y, left: this.state.goalPoints[1].x} ]} />                   
      </ScrollView>
    ); 

  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: height*2 - 70
  },
  goal : {
    position : "absolute",
    backgroundColor: 'red',
    height: 40,
    width: 40
  },
  backgroundImage: {
    position: "absolute",
    top:-50,
    left:0,
    width:"100%",
    height: height*2,
    backgroundColor: 'green'
    
  }
});


AppRegistry.registerComponent('legatiplay', () => legatiplay);
