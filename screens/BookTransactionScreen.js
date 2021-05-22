import * as React from 'react';
import { Text, View,StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal',
        scannedBookID:'',
        scannedStudentID:''
      }
    }

    getCameraPermissions= async(id)=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermissions:status==="granted",buttonState:'id',scanned:false});
    }

    handleBarCodeScanned=async({type,data})=>{
      const {buttonState}=this.state
        if(buttonState === 'BookId'){
          this.setState({scanned:true,scannedBookID:data,buttonState:'normal'})
        }
        else if(buttonState === 'StudentId'){
          this.setState({scanned:true,scannedStudentID:data,buttonState:'normal'})
        }
    }

    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState === 'clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?
            undefined:
            this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
           />
        )
      }
      else if(buttonState === 'normal'){

      return (
        <View style={styles.container}>
          <View>
            <Image source={
              require('./assets/booklogo.jpg') }
              style={{width:200,height:200}}
            />
            <Text style={{textAlign:'center',fontSize:30}}>WILY</Text>
          </View>

          <View style={styles.inputView}>

            <TextInput style={styles.inputBox}
            placeholder='BOOK ID'
            value={this.state.scannedBookID}
            />
            <TouchableOpacity style={styles.scanButton}
             onPress={()=>{
               this.getCameraPermissions('BookId')
             }}>
              <Text style={styles.buttonText}>SCAN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputBox}
            placeholder='STUDENT ID'
            value={this.state.scannedStudentID}
            />
            <TouchableOpacity style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions('StudentId')
            }}>
              <Text style={styles.buttonText}>SCAN</Text>
            </TouchableOpacity>
          </View>

        </View>

      );
     }
    }
  }

  const styles = StyleSheet.create({
    scanButton:{
      backgroundColor:'blue',
      width:50,
      borderWidth:1.5,
      borderLeftWidth:0
    },
    buttonText:{
      fontSize:18,
      textAlign:'center',
      marginTop:10
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    displayText:{
      fontSize:15,
      textDecorationLine:'underline'
    },
    inputView:{
      flexDirection:'row',
      margin:20
    },
    inputBox:{
      width:200,
      height:40,
      borderWidth:1.5,
      borderRightWidth:0,
      fontSize:20
    }
  });