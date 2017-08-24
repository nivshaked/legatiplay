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
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons'



const {height, width} = Dimensions.get('window')
export default class ChallengesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesPoints: [
        {done:false},
        {done:false},
        {done:false},
        {done:true},
        {done:true},
        {done:true}
      ],
      challengeDimentions : 25,
      goalDimentions : 35
    }
    this.renderPagination = this.renderPagination.bind(this)
    this.setProgressBarDimentions = this.setProgressBarDimentions.bind(this)
  }
  
    componentWillMount(){
        this.setProgressBarDimentions(this.state.challengesPoints.length)
     }
    renderPagination(index, total, context) {
        let goalImage;
        if(this.state.challengesPoints[0].done==false){
            goalImage = <Image style={styles.grayPlay}
                        source= {require('./img/gray_play.png')}/> 
        } else {
            goalImage =
             <Image style={styles.grayPlay}
                    source= {require('./img/golden_play.png')}/> 
        }
    return (
    <View style={styles.progressBar}>
              <TouchableOpacity onPress={() =>{if(index!=0) this.swiper.scrollBy(0-index, true)}}>
                {goalImage}</TouchableOpacity>
               {this.state.challengesPoints.slice(1).map((challenge, challengeIndex) => {
                  if (challenge.done == false) {
                      return (
                      <TouchableOpacity onPress={() =>{if(index!=challengeIndex + 1) this.swiper.scrollBy((challengeIndex+1)-index, true)}}>
                         <Image style={{marginHorizontal:this.state.challengeDimentions*0.3, width:this.state.challengeDimentions, height:this.state.challengeDimentions}}
                              source= {require('./img/challenge_gray.png')}/> 
                        </TouchableOpacity>
                              ) 
                   } else {
                    return (
                      <TouchableOpacity onPress={() =>{if(index!=challengeIndex + 1) this.swiper.scrollBy((challengeIndex+1)-index, true)}}>
                                <Image style={{marginHorizontal:this.state.challengeDimentions*0.3, width:this.state.challengeDimentions, height:this.state.challengeDimentions}}
                              source= {require('./img/challenge_purple.png')}/>
                      </TouchableOpacity>  )
                   }
            }

          )}
    </View>
    )

    }

    setProgressBarDimentions(x) {
        const variable = 1-(x*0.05)
        const challengeDimentions= width*0.09*variable ;
        this.setState({challengeDimentions});
    }
    render() {
    return (

      <Swiper index={this.state.challengesPoints.length - 1} ref={(ref) => {this.swiper = ref}} renderPagination={this.renderPagination} loop = {false}>
      <ScrollView contentContainerStyle={{height:height}}>
          <View style={styles.navigationBar}></View>
          <View style={styles.challengeName}>
            <Text style={{fontSize: height*0.05, textAlign:'center'}}>{'מעבר בין האקורדים'}</Text>
          </View>
          <View style={styles.challengeGoal}>
            <Text style={{fontSize: height*0.035, textAlign:'center'}}>{'נגן את האקורדים הבאים, שלוש פעמים ברצץ'}</Text>
          </View>
          <View style={styles.space}>
          </View>
          <View style={styles.content}>
              <View style={styles.notes}>
                 <Image style={{height:35, width:48, position:'absolute', top:-17, left:(width*0.425)-24}} source= {require('./img/note_purple.png')}/>  
                  <Text style={{fontSize: height*0.025, textAlign:'center'}}>| Am       | Em         | F           | G          | {"\n"}| F           |      %      | G          |      %     |</Text>
              </View>
          </View>
       
      </ScrollView>
      <ScrollView contentContainerStyle={{height:height}}>
          <View style={styles.navigationBar}></View>
          <View style={styles.challengeName}>
            <Text style={{fontSize: height*0.05, textAlign:'center'}}>{'מעבר בין האקורדים'}</Text>
          </View>
          <View style={styles.challengeGoal}>
            <Text style={{fontSize: height*0.035, textAlign:'center'}}>{'נגן את האקורדים הבאים, שלוש פעמים ברצץ'}</Text>
          </View>
          <View style={styles.space}>
          </View>
          <View style={styles.content}>
              <View style={styles.notes}>
                 <Image style={{height:35, width:48, position:'absolute', top:-17, left:(width*0.425)-24}} source= {require('./img/note_purple.png')}/>  
                  <Text style={{fontSize: height*0.025, textAlign:'center'}}>| Am       | Em         | F           | G          | {"\n"}| F           |      %      | G          |      %     |</Text>
              </View>
          </View>
       
      </ScrollView>
      <ScrollView contentContainerStyle={{height:height}}>
          <View style={styles.navigationBar}></View>
          <View style={styles.challengeName}>
            <Text style={{fontSize: height*0.05, textAlign:'center'}}>{'פתיחת היצירה'}</Text>
          </View>
          <View style={styles.challengeGoal}>
            <Text style={{fontSize: height*0.035, textAlign:'center'}}>{'נגן את הקטע הבא שלוש פעמים ברצץ'}</Text>
          </View>
          <View style={styles.space}></View>
          <View style={styles.content}>
           <View style={styles.notes}>
            <TouchableOpacity ><Image style={{flex:1, width: width*0.83}} source= {require('./img/somewhere.jpg')}/></TouchableOpacity> 
          </View>
          </View>
       </ScrollView>
       <ScrollView contentContainerStyle={{height:height}}>
          <View style={styles.navigationBar}></View>
          <View style={styles.challengeName}>
            <Text style={{fontSize: height*0.05, textAlign:'center'}}>{'פתיחת היצירה'}</Text>
          </View>
          <View style={styles.challengeGoal}>
            <Text style={{fontSize: height*0.035, textAlign:'center'}}>{'נגן את הקטע הבא שלוש פעמים ברצץ'}</Text>
          </View>
          <View style={styles.space}></View>
          <View style={styles.content}>
           <View style={styles.notes}>
            <TouchableOpacity ><Image style={{flex:1, width: width*0.83}} source= {require('./img/somewhere.jpg')}/></TouchableOpacity> 
          </View>
          </View>
       </ScrollView>

       <ScrollView contentContainerStyle={{height:height}}>
       <View style={styles.navigationBar}></View>
       <View style={styles.challengeName}>
         <Text style={styles.challengeNameText}>{'לנגן יפה אך החלק הראשון'}</Text>
       </View>
       <View style={[styles.challengeGoal, {backgroundColor:'rgb(251, 242, 226)' }]}>
         <Text style={styles.challengeGoalText}>{'נגן את הקטע הבא שלוש פעמים ברצץ'}</Text>
       </View>
       <View style={styles.space}></View>
       <View style={[styles.content, {backgroundColor:'rgb(251, 242, 226)' }]}>
        <View style={[styles.notes, {borderColor:'rgb(243, 192, 83)' }]}>
           <TouchableOpacity ><Image style={{flex:1, width: width*0.83}} source= {require('./img/somewhere.jpg')}/></TouchableOpacity> 
           <View style={[styles.iconContainer, {borderColor:'rgb(243, 192, 83)', backgroundColor:'rgb(255, 212, 122)'}]}>
             <Image style={{alignSelf:'center', height:31, width:28}} source= {require('./img/gold_note.png')}/>
           </View>
       </View>
       </View>
    </ScrollView>
      
       <ScrollView contentContainerStyle={{height:height}}>
          <View style={styles.navigationBar}></View>
          <View style={styles.challengeName}>
            <Text style={styles.challengeNameText}>{'לנגן יפה אך החלק הראשון'}</Text>
          </View>
          <View style={styles.challengeGoal}>
            <Text style={styles.challengeGoalText}>{'נגן את הקטע הבא שלוש פעמים ברצץ'}</Text>
          </View>
          <View style={styles.space}></View>
          <View style={styles.content}>
           <View style={styles.notes}>
              <TouchableOpacity ><Image style={{flex:1, width: width*0.83}} source= {require('./img/somewhere.jpg')}/></TouchableOpacity> 
              <View style={styles.iconContainer}>
                <Image style={{alignSelf:'center', height:31, width:28}} source= {require('./img/purple_note.png')}/>
              </View>
          </View>
          </View>
       </ScrollView>
      </Swiper>
    ); 
  }

}

const styles = StyleSheet.create({
  navigationBar : {
      height: 60,
      width: '100%',
      backgroundColor:'rgb(255, 196, 73)'
  },
  challengeName:{
      height: height*0.12,
      width: '100%',
      justifyContent: 'center',
      alignItems:'center',
  },
  challengeNameText:{
    paddingHorizontal :width*0.05,
    fontFamily: 'Rubik',
    fontSize: height*0.045,
    textAlign:'center'
  },
  challengeGoal : {
      height: height*0.2,
      width: '100%',
      paddingHorizontal: width*0.08,
      backgroundColor:'rgb(237, 234, 252)',
      justifyContent: 'center',
      alignItems:'center',
  },
  challengeGoalText:{
    fontFamily: 'Rubik',
    fontSize: height*0.032,
    textAlign:'center'
  },
  iconContainer:{
    justifyContent:'center',
    borderColor:'rgb(156,140,184)',
    borderWidth:4,
    position:'absolute',
    borderRadius:30,
    top:-27,
    left:(width*0.425)-26,
    height:50,
    width:50,
    backgroundColor:'rgb(196,177,234)'
  },
  space: {
    height:height*0.05,
    width: '100%'
  },
  content:{
      flex:1,
      width: '100%',
      backgroundColor:'rgb(237, 234, 252)',
      alignItems:'center'
  },
  notes: {
    height: height*0.3,
    width: width*0.85,
    marginTop: height*0.06,
    borderWidth:4,
    borderRadius: 4,
    borderColor:'rgb(156,140,184)',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center'
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  progressBar: {
    position: 'absolute',
    width:width, 
    height:height*0.1,
    bottom:0,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
    grayPlay: {
        height: width*0.12,
        width: width*0.168,
        marginHorizontal:8
    }
  
});


