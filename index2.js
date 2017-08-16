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


const {height, width} = Dimensions.get('window')
export default class ChallengesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesPoints: [
        {done:true},
        {done:true},
        {done:true},
        {done:true},
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
                                <Image style={{ marginHorizontal:this.state.challengeDimentions*0.3, width:this.state.challengeDimentions, height:this.state.challengeDimentions}}
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
      </Swiper>
    ); 
  }

}

const styles = StyleSheet.create({
  navigationBar : {
      height: 50,
      width: '100%',
      backgroundColor: 'rgb(156,140,184)'
  },
  challengeName:{
      height: height*0.15,
      width: '100%',
      justifyContent: 'center',
      alignItems:'center',
  },
  challengeGoal : {
      height: height*0.2,
      width: '100%',
      backgroundColor:'rgb(228,223,251)',
      justifyContent: 'center',
      alignItems:'center',
  },
  space: {
    height:height*0.05,
    width: '100%'
  },
  content:{
      flex:1,
      width: '100%',
      backgroundColor:'rgb(228,223,251)',
      alignItems:'center'
  },
  notes: {
    height: height*0.3,
    width: width*0.85,
    marginTop: height*0.03,
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


