import React from 'react';
import {
  AppRegistry,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';
import * as _ from 'lodash';

import niv from './index2.js'
const {height, width} = Dimensions.get('window')
export default class legatiplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testKit : 1,
      goalList : [
        {
          goalId : 1,
          goalStatus : "done",
          initialPoint: {x: width*0.25+25, y: height*1.85},
          curvePoints : [{x: width*0.5, y: height*1.8},
                         {x: width*0.6, y: height*1.6}],
          targetPoint : {x: width*0.35+25, y: height*1.5+40},
          challenges : [{id : 11, done: true, cordinate:{x: 1, y: 1}},{id : 11, done: true, cordinate:{x: 1, y: 1}}, {id : 12, done: true, cordinate:{x: 1, y: 1}}, {id : 13, done: true, cordinate:{x: 1, y: 1}}, {id : 14, done: true, cordinate:{x: 1, y: 1}} ]
        }, 
        {
          goalId : 2,
          goalStatus : "done",
          initialPoint: {x: width*0.35+25, y: height*1.5},
          curvePoints : [{x: width*0.5, y: height*1.4},
                         {x: width*0.6, y: height*1.25}],
          targetPoint : {x: width*0.45+25, y: height*1.12+40},
          challenges : [{id : 10, done: true, cordinate:{x: 1, y: 1}}, {id : 11, done: true, cordinate:{x: 1, y: 1}}, {id : 12, done: true, cordinate:{x: 1, y: 1}}, {id : 13, done: true, cordinate:{x: 1, y: 1}}, {id : 14, done: true, cordinate:{x: 1, y: 1}} ]
        }, 
        {
          goalId : 3,
          goalStatus : "undone",
          initialPoint: {x: width*0.45+25, y: height*1.12},
          curvePoints : [{x: width*0.2, y: height*1.1},
                          {x: width*0.2, y: height*0.9}],
          targetPoint : {x: width*0.15+25, y: height*0.78+40},
          challenges : [ {id : 17, done: true, cordinate:{x: 1, y: 1}},{id : 17, done: true, cordinate:{x: 1, y: 1}},{id : 17, done: true, cordinate:{x: 1, y: 1}},{id : 17, done: true, cordinate:{x: 1, y: 1}}, {id : 18, done: true, cordinate:{x: 1, y: 1}}, {id : 19, done: true},{id : 20, done: true, cordinate:{x: 1, y: 1}}, {id : 21, done: true, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        },
        {
          goalId : 4,
          goalStatus : "empty",
          initialPoint: {x: width*0.15+25, y: height*0.78},
          curvePoints : [{x: width*0.6, y: height*0.76},
                          {x: width*0.7, y: height*0.65}],
          targetPoint : {x: width*0.65+25, y: height*0.48+40},
          challenges : [ {id : 17, done: false, cordinate:{x: 1, y: 1}},{id : 17, done: false, cordinate:{x: 1, y: 1}}, {id : 18, done: false, cordinate:{x: 1, y: 1}}, {id : 19, done: false},{id : 20, done: false, cordinate:{x: 1, y: 1}}, {id : 21, done: false, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        },
        {
          goalId : 5,
          goalStatus : "empty",
          initialPoint: {x: width*0.65+15, y: height*0.48},
          curvePoints : [{x: width*0.35, y: height*0.52},
                          {x: width*0.3, y: height*0.25}],
          targetPoint : {x: width*0.4+25, y: height*0.15+40},
          challenges : [{id : 17, done: false, cordinate:{x: 1, y: 1}}, {id : 18, done: false, cordinate:{x: 1, y: 1}}, {id : 19, done: false},{id : 20, done: false, cordinate:{x: 1, y: 1}}, {id : 21, done: false, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        }
      ]
    }
    
  }
  componentWillMount(){
    this.createChallengePoints()
  } 

 componentDidMount(){
  }
  setDimentions(x) {
         let challengeDimentions = 40;
        if(x<6){
         challengeDimentions = 40*(1-(x*0.05))
        } else {
         challengeDimentions= 32*(1-(x*0.05)) ;
        }
        return(challengeDimentions)
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
  printChallnges(goalNumber){
    return (
      <View>
        {this.state.goalList[goalNumber].challenges.map((challengePoint, index) => {
          let m = 0
          let challengeDimention
            if(index!== this.state.goalList[goalNumber].challenges.length-1){
            m =  Math.atan2((this.state.goalList[goalNumber].challenges[index+1].cordinate.y - (this.state.goalList[goalNumber].challengeDimentions*0.2)) - challengePoint.cordinate.y ,
                                (this.state.goalList[goalNumber].challenges[index+1].cordinate.x - (this.state.goalList[goalNumber].challengeDimentions*0.2)) - challengePoint.cordinate.x) *  180 / Math.PI -110;
          } else {
            m = 250+ Math.atan2((this.state.goalList[goalNumber].targetPoint.y-20) - challengePoint.cordinate.y ,
                           (this.state.goalList[goalNumber].targetPoint.x-10) - challengePoint.cordinate.x) *  180 / Math.PI;
          }
          if(challengePoint.done==false){
            return (
          <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{alignContent:'center', alignItems:'center', position : "absolute", height: this.state.goalList[goalNumber].challengeDimentions*1.3 ,width: this.state.goalList[goalNumber].challengeDimentions*1.3, top: challengePoint.cordinate.y- this.state.goalList[goalNumber].challengeDimentions*0.2, left: challengePoint.cordinate.x- this.state.goalList[goalNumber].challengeDimentions*0.2}} onPress = {() => 1}><Image 
                               style={{margin:this.state.goalList[goalNumber].challengeDimentions*0.2, height: this.state.goalList[goalNumber].challengeDimentions,width: this.state.goalList[goalNumber].challengeDimentions,transform: [{rotate:`${180+m}deg`}]}} source= {require('./img/challenge_gray.png')}/></TouchableHighlight>
          )} else{ return(
          <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{alignContent:'center', alignItems:'center', position : "absolute", height: this.state.goalList[goalNumber].challengeDimentions*1.3 ,width: this.state.goalList[goalNumber].challengeDimentions*1.3, top: challengePoint.cordinate.y- this.state.goalList[goalNumber].challengeDimentions*0.2, left: challengePoint.cordinate.x- this.state.goalList[goalNumber].challengeDimentions*0.2}} onPress = {() => 1}><Image 
                               style={{margin:this.state.goalList[goalNumber].challengeDimentions*0.2, height: this.state.goalList[goalNumber].challengeDimentions,width: this.state.goalList[goalNumber].challengeDimentions,transform: [{rotate:`${180+m}deg`}]}} source= {require('./img/challenge_purple.png')}/></TouchableHighlight>
          )}
         
    })}
    </View>
    )
  } 
  printGoals(goalNumber){
    return (
      <View>
        {this.state.goalList.map((goal, index) => {
       if (goal.goalStatus == "undone"){
          return (
        <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{ position : "absolute",  height: 60 ,width: 85, top: goal.targetPoint.y-40, left: goal.targetPoint.x-25}} onPress = {() => 1}><Image 
                               style={{height: 60 ,width: 85}} source= {require('./img/gray_play.png')}/></TouchableHighlight>
        )}
        if(goal.goalStatus == "done") {
        return(
          <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{ position : "absolute",  height: 60 ,width: 85, top: goal.targetPoint.y-40, left: goal.targetPoint.x-25}} onPress = {() => 1}><Image 
                      style={{height: 60 ,width: 85}} source= {require('./img/golden_play.png')}/></TouchableHighlight>
        )}
        if(goal.goalStatus == "empty") {
          return(
              <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{ position : "absolute",  height: 60 ,width: 85, top: goal.targetPoint.y-40, left: goal.targetPoint.x-25}} onPress = {() => 1}><Image 
                       style={{height: 60 ,width: 85}} source= {require('./img/plus_gray.png')}/></TouchableHighlight>

        )} 
       }
    )}
    </View>
    )
  } 
  createChallengePoints(){
    let goalPosition = 0;
    let newGoalList =  _.cloneDeep(this.state.goalList)
    while(goalPosition < newGoalList.length){
      let challengeNumber=0
      const initialValue = 1/(newGoalList[goalPosition].challenges.length+1);
      let currentPoint = 1/(newGoalList[goalPosition].challenges.length+1);
      while(currentPoint < 0.98) {
        newGoalList[goalPosition].challenges[challengeNumber].cordinate  = this.bezier(currentPoint,
                                                        newGoalList[goalPosition].initialPoint,
                                                        newGoalList[goalPosition].curvePoints[0],
                                                        newGoalList[goalPosition].curvePoints[1],
                                                        newGoalList[goalPosition].targetPoint)
        currentPoint = currentPoint + initialValue;
        challengeNumber=challengeNumber+1;
      }
      newGoalList[goalPosition].challengeDimentions = this.setDimentions(newGoalList[goalPosition].challenges.length)
      goalPosition= goalPosition+1;
       
    }
    this.setState({goalList: newGoalList})
  }
  
      
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
         <Image style={styles.backgroundImage} resizeMode={"cover"}
      source={require('./img/testmap.jpeg')}/>   
       {/* <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{ position : "absolute", height: 50 ,width: 70, top: 200, left: 200}} onPress = {() => 1}><Image 
                             style={{height: 50 ,width: 50}} source= {require('./img/challenge_gray.png')}/></TouchableHighlight> 
       <TouchableHighlight underlayColor={'rgba(52, 52, 52, 0)'} activeOpacity={ 0.4 } style={{ position : "absolute", height: 50 ,width: 50, top: 100, left: 100}} onPress = {() => console.log()}><Image
                             style={{height: 50 ,width: 50}} source= {require('./img/challenge_gray.png')}/></TouchableHighlight> */}
        {this.printChallnges(0)}
        {this.printChallnges(1)}
        {this.printChallnges(2)}
        {this.printChallnges(3)}
        {this.printChallnges(4)}
        {this.printGoals()}
      </ScrollView>
    ); 

  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    height: height*2
  },
  backgroundImage: {
    position: "absolute",
    top:-50,
    left:0,
    width:"100%",
    height: height*2,
  }
});


AppRegistry.registerComponent('legatiplay', () => legatiplay);