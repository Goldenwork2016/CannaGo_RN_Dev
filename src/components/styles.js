import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor:'#fff'
    },
    logoImage:{ 
        width: 162, 
        height: 170,
        marginTop:60
    },
    InputImage:{ 
        width: 18, 
        height: 13.5,
        marginLeft:30,
        marginRight:15,
    },
    InputImage1:{ 
        width: 12.17, 
        height: 17.72,
        marginLeft:33,
        marginRight:18
    },
    logoTxt:{
        fontSize:13,
        color:'#7E7E7E'
    }, 
    inputArea:{
        width:'90%',
        marginTop:35,
    },
    inputTxt:{
        fontSize:13,
        color:'#000',
        width:'70%'
    },
    inputItem:{
        flexDirection:'row',
        alignItems:'center',
        height:55,
        borderRadius:27.5,
        borderWidth:1,
        borderColor:'#e9e9e9',
        marginBottom:22,
        width:'100%'
    },
    forgotBtn:{
        alignItems:'flex-end',
        marginTop:-10
    },
    forgotTxt1:{
        fontSize:13,
        color:"#7E7E7E"
    },
    signinBtn:{
        flexDirection:'row',
        alignItems:'center',
        height:52,
        borderRadius:26,
        backgroundColor:'#61D273',
        marginTop:35,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    signinTxt1:{
        fontSize:18,
        color:'white'
    }, 
    dontaccountTxt:{
        color:'#bdbdc6',
        fontSize:14,
        fontWeight:'bold',
        marginTop:18,
        textAlign:'center'
    },
    signinTxt:{
        fontSize:14,
        fontWeight:'bold',
        color:'#61D273'
    },
    wantBtn:{
        justifyContent:'center',
        height:55,
        borderRadius:27.5,
        borderWidth:1,
        borderColor:'#e9e9e9',
        marginBottom:22,
        width:'100%',
        alignItems:'center'
    },
    wantTxt:{
        textAlign:'center',
        color:'#515151',
        fontSize:15
    }
})

