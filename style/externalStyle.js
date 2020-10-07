import {StyleSheet} from 'react-native'

const externalStyle = StyleSheet.create({
      container:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      },
      containerMain: {
        flex: 1,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      },
      boxBlue:{
        backgroundColor:'#24126E',
        height:50,
        margin:10,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: .8,
      },
      dateCompleted: {
        justifyContent: "center",
      },
      headerImage:{
        resizeMode: "contain",
        width: "90%",
        alignSelf: "center",
      },  
      boxPurple:{
        backgroundColor:'#D70096',
        height:70,
        margin:10,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: .8
      },
    
      text: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
      },
    
      headertext: {
        fontSize: 24,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
        color: "#24126E"
      },
    
      subheadertext: {
        fontSize: 17,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
        color: "#24126E"
      },
    
      subheadertextNO: {
        fontSize: 17,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10,
        color: "#24126E",
        marginTop: 10,
      },
    
      inputfield:{
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        height:40,
        margin:10,
        borderColor: "#D70096",
        // backgroundColor:'#24126E',
        borderWidth: 2,
        paddingLeft: 10,
      },
    
      inputfieldnote:{
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        height:120,
        margin:10,
        borderColor: "#D70096",
        // backgroundColor:'#24126E',
        borderWidth: 2,
        paddingLeft: 10,
      },
    
      inputfieldSets:{
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        height:40,
        margin: 10,
        borderColor: "#D70096",
        paddingLeft: 10,
        // backgroundColor:'#24126E',
        borderWidth: 2,
        width: 70
      },
    
    
      videocontainer:{
        height:210,
        margin:10,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#24126E",
        borderWidth: 2,
        opacity: .8
      },
    
      descbox:{
        margin:10,
        alignItems: "center",
        },
    
      desctext:{
        marginBottom: 10,
        fontStyle: "italic",
      },
    
      dropdown:{
    
      },
    
      cleanline:{
        margin: 50,
        marginTop: 0,
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: "#24126E",
      },
    
      flexbox:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 20,
        marginTop: 0,
      },
    
      boxBlueSmall:{
        backgroundColor:'#24126E',
        height:30,
        margin:10,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: .8,
        width: 120
      },
    
      subtext: {
        fontWeight: "bold",
      }
})

export default externalStyle;