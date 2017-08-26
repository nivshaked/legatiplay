import React from 'react';
import {
  AppRegistry,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Dimensions
} from 'react-native';
import * as _ from 'lodash';
import Modal from 'react-native-modal'
import niv from './index2.js'

const GoalImage = ({x, y, imageType, chooseGoal, openGoal}) => {
  // console.warn({x, y, imageType})
  let image;
  const emptyImage = require('./img/plus_gray.png');
  const undoneImage = require('./img/gray_play.png');
  const completeImage = require("./img/golden_play.png");
  if (imageType === 'empty') {
    image = emptyImage
    pressFunction=chooseGoal
  } else if (imageType == 'undone') {
    image = undoneImage
    pressFunction=openGoal
  } else {
    image = completeImage
    pressFunction=openGoal
  }
  return (
    <View style={{position : "absolute", zIndex: 3, height: height*0.09 ,width: height*0.09*1.4, top: y-(width*0.11), left: x-(width*0.066667)}}>
    <TouchableOpacity onPress={pressFunction}><Image style = {{height: height*0.09 ,width: height*0.09*1.4}}
    source={image}/></TouchableOpacity></View>
  )
}

const {height, width} = Dimensions.get('window')
export default class legatiplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testKit : 1,
      isModalVisible: false,      
      goalList : [
        {
          goalId : 1,
          goalStatus : "done",
          initialPoint: {x: width*0.1+(width*0.15), y: height*1.85},
          curvePoints : [{x: width*0.5, y: height*1.8},
                         {x: width*0.6, y: height*1.65}],
          targetPoint : {x: width*0.3+(width*0.15), y: height*1.5+40},
          challenges : [{id : 11, done: true, cordinate:{x: 1, y: 1}},{id : 11, done: true, cordinate:{x: 1, y: 1}}, {id : 12, done: true, cordinate:{x: 1, y: 1}}, {id : 13, done: true, cordinate:{x: 1, y: 1}}, {id : 14, done: true, cordinate:{x: 1, y: 1}} ]
        }, 
        {
          goalId : 2,
          goalStatus : "done",
          initialPoint: {x: width*0.35+(width*0.067), y: height*1.5},
          curvePoints : [{x: width*0.5, y: height*1.4},
                         {x: width*0.6, y: height*1.28}],
          targetPoint : {x: width*0.45+(width*0.067), y: height*1.12+(width*0.11)},
          challenges : [{id : 10, done: true, cordinate:{x: 1, y: 1}}, {id : 11, done: true, cordinate:{x: 1, y: 1}}, {id : 12, done: true, cordinate:{x: 1, y: 1}}, {id : 13, done: true, cordinate:{x: 1, y: 1}}, {id : 14, done: true, cordinate:{x: 1, y: 1}} ]
        }, 
        {
          goalId : 3,
          goalStatus : "undone",
          initialPoint: {x: width*0.45+(width*0.067), y: height*1.12},
          curvePoints : [{x: width*0.2, y: height*1.1},
                          {x: width*0.2, y: height*0.92}],
          targetPoint : {x: width*0.15+(width*0.067), y: height*0.78+(width*0.11)},
          challenges : [{id : 17, done: true, cordinate:{x: 1, y: 1}}, {id : 18, done: true, cordinate:{x: 1, y: 1}}, {id : 19, done: true},{id : 20, done: true, cordinate:{x: 1, y: 1}}, {id : 21, done: true, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        },
        {
          goalId : 4,
          goalStatus : "empty",
          initialPoint: {x: width*0.2+(width*0.067), y: height*0.78},
          curvePoints : [{x: width*0.53, y: height*0.8},
                          {x: width*0.65, y: height*0.64}],
          targetPoint : {x: width*0.5+(width*0.067), y: height*0.5+(width*0.11)},
          challenges : [{id : 18, done: false, cordinate:{x: 1, y: 1}},{id : 18, done: false, cordinate:{x: 1, y: 1}}, {id : 19, done: false},{id : 20, done: false, cordinate:{x: 1, y: 1}}, {id : 21, done: false, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        },
        {
          goalId : 5,
          goalStatus : "empty",
          initialPoint: {x: width*0.5+(width*0.067), y: height*0.5},
          curvePoints : [{x: width*0.25, y: height*0.5},
                          {x: width*0.2, y: height*0.25}],
          targetPoint : {x: width*0.4+(width*0.067), y: height*0.16+(width*0.11)},
          challenges : [{id : 18, done: false, cordinate:{x: 1, y: 1}},{id : 17, done: false, cordinate:{x: 1, y: 1}}, {id : 18, done: false, cordinate:{x: 1, y: 1}}, {id : 19, done: false},{id : 20, done: false, cordinate:{x: 1, y: 1}}, {id : 21, done: false, cordinate:{x: 1, y: 1}} ],
          challengeDimentions : 0
        }
      ]
    }
    this._showModal = this._showModal.bind(this)
    this._hideModal = this._hideModal.bind(this)
    this.openGoal = this.openGoal.bind(this)    
    
  }
  componentWillMount(){
    this.createChallengePoints()
  } 
  _showModal(){
    this.setState({isModalVisible:true})
  }
  _hideModal(){
    this.setState({isModalVisible:false})
  } 
  openGoal(){
    console.warn("Goal opens")
  }
  setDimentions(x) {
        let challengeDimentions = 0.11*width;
        if(x<6){
         challengeDimentions = (0.12*width)*(1-(x*0.05))
        } else {
         challengeDimentions= (0.085*width)*(1-(x*0.05)) ;
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
          let challengedimentions = this.state.goalList[goalNumber].challengeDimentions;
         // degreeFinder(this.state.goalList[goalNumber],index,  )
            if(index!== this.state.goalList[goalNumber].challenges.length-1){
            m =  Math.atan2((this.state.goalList[goalNumber].challenges[index+1].cordinate.y - (challengedimentions*0.2)) - challengePoint.cordinate.y ,
                                (this.state.goalList[goalNumber].challenges[index+1].cordinate.x - (challengedimentions*0.2)) - challengePoint.cordinate.x) *  180 / Math.PI -110;
          } else {
            m = 250+ Math.atan2((this.state.goalList[goalNumber].targetPoint.y-20) - challengePoint.cordinate.y ,
                           (this.state.goalList[goalNumber].targetPoint.x-10) - challengePoint.cordinate.x) *  180 / Math.PI;
          }
          if(challengePoint.done==false){
            return (
                <View style={{transform: [{rotate:`${180+m}deg`}],position : "absolute", height: challengedimentions ,width: challengedimentions, top: challengePoint.cordinate.y, left: challengePoint.cordinate.x}} ><TouchableOpacity key={(1 + index) + (10 * goalNumber)}>
                <Image style={{height: challengedimentions ,width: challengedimentions}}
                              source= {require('./img/challenge_gray.png')}/></TouchableOpacity></View>
          )} else{ return(
              <View style={{transform: [{rotate:`${180+m}deg`}],position : "absolute", height: challengedimentions ,width: challengedimentions, top: challengePoint.cordinate.y, left: challengePoint.cordinate.x}}><TouchableOpacity key={(1 + index) + (10 * goalNumber)}>
               <Image style={{height: challengedimentions ,width: challengedimentions}}
                              source= {require('./img/challenge_purple.png')}/></TouchableOpacity></View>
          )}
         
    })}
    </View>
    )
  } 
  printGoals(goalNumber){
    return (
      <View>
        {this.state.goalList.map((goal, index) => {
         return (
           <GoalImage key={(index + 1) * 1000} x={goal.targetPoint.x} y={goal.targetPoint.y} imageType={goal.goalStatus} chooseGoal={this._showModal} openGoal={this.openGoal}/>
         )
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
  clouds(){
    let i = 10
    let clouds = []
    while(i<128) {
      clouds.push((
        <View>
          <Image style={{marginTop:height*(i/100), marginLeft:-height*0.13, height:height*0.35, width:height*0.35*2.37 , position: 'absolute'}} source={require('./img/threeClouds.png')}/>  
        </View>
      )) 
    i = i+ 15
    }
    return clouds
      
  }
  
      
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.backgroundImage} resizeMode={"cover"}
      source={require('./img/testmap.jpeg')}/>
        {this.printChallnges(0)}
        {this.printChallnges(1)}
        {this.printChallnges(2)}
        {this.printChallnges(3)}
        {this.printChallnges(4)}
        {this.printGoals()}
        {/* {this.clouds()} */}

        <Modal style={{alignItems:'center'}} isVisible={this.state.isModalVisible} onBackdropPress={this._hideModal}>
          <View style={{}} style={{borderRadius:15, flex:0, flexWrap:'wrap' ,flexDirection:'row-reverse', justifyContent: 'flex-start',padding:((width*0.88)-(width/4.1*3))/8, paddingVertical:20, backgroundColor:'rgba(225,225,225, 0.85)', height:width*1.3, width:width*0.88}}>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>פרח נתתי לנורית</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>לא עוזב את העיר</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <View style={styles.goalPick}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', alignSelf:'center', textAlign:'center'}}>תמי יחכו לך תמיד יחכוד</Text></View>
            <TouchableOpacity onPress={this._hideModal} style={{position:'absolute', left:width*0.44- 12, top:width*1.3*0.92}}><Text style={{color:'rgb(80,80,80)', fontFamily: 'Rubik', fontSize:width*0.045}}>סגור</Text></TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    ); 

  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    height: height*2 - 70  },
  goal : {
    position : "absolute",
    backgroundColor: 'red',
    height: 40,
    width: 40
  },
  goalPick:{
    backgroundColor:'rgb(245, 245, 245)',
    borderRadius:100,
    borderColor:'rgb(180,180,180)',
    borderWidth:1,
    margin:((width*0.88)-(width/4.1*3))/8,
    height:width/4.1,
    width:width/4.1,
    alignContent:'center',
    justifyContent:'center'
  },
  backgroundImage: {
    position: "absolute",
    top:-50,
    left:0,
    width:"100%",
    height: height*2,
  }
});


AppRegistry.registerComponent('legatiplay', () => niv);