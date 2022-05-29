import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../helper'


export function setLanguage(lang){
    return {
      type: 'SET_LANG',
      payload:lang
    }
}

export function saveCurrentUser(data){
    
    return (dispatch)=>{

        AsyncStorage.setItem('logged_user',JSON.stringify(data))
        .then((response) => {
            dispatch({ type: 'LOGGED_USER',user:data});
            // dispatch(loading(false));
            // dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            // dispatch(loading(false));
            // dispatch(error(err.message || 'ERROR'));
        })



        // _storeData('logged_user',data).then(()=>{
        //     dispatch({ type: 'LOGGED_USER',user:data});
        // });
    }

}
export function saveToken(token){
    return (dispatch)=>{

        AsyncStorage.setItem('user_token',token)
        .then((response) => {
            dispatch({ type: 'SAVE_TOKEN',token:token});
            // dispatch(loading(false));
            // dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            // dispatch(loading(false));
            // dispatch(error(err.message || 'ERROR'));
        })


        // _storeData('barber_token',token).then(()=>{
        //     dispatch({ type: 'SAVE_TOKEN',token:token});
        // });
    }
   

}
export function barberLoggedIn(){
    return (dispatch)=>{
        // _storeData('logged_in','ok').then(()=>{
        //     dispatch({ type: 'LOGGED_IN',loggedIn:true});
        // });
    }
   
}

_storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem('@'+key, value);
    } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
    }
}



// export function barberLogin(email, password) {
//     return dispatch => {
//     //   dispatch({ type: "LOADING", isLoading: true });
  
//       let formdata = new FormData();
//       formdata.append("email", email);
//       formdata.append("password", password);
//       fetch(BASE_URL+'/api/barber/login', {
//         method: 'post',
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//         body: formdata
//     })
//     .then((response) => response.json())
//     .then((responseJson) => {
    
    
//      console.log(responseJson)
//         if(responseJson.success){
//             dispatch(saveCurrentUser(responseJson.data));
//             dispatch(saveToken(responseJson.data.token));
//             dispatch(barberLoggedIn());
//         }else{
        
//             // this.setState({error:responseJson.error});
//         }
   


//     })
//     .catch((error) => {
//     //  this.setState({isloading:false});
//         console.error(error);
//         //dispatch(itemsHaveError(true))
//     });

   
//     };
//   }

//   export function getBarberDetails(user_id){
//     return dispatch =>{
//       dispatch({ type: 'LOADING',isLoading:true});
//       let formdata = new FormData();
//       formdata.append("user_id",user_id);
//       fetch(BASE_URL+'/api/getBarberProfileDetails', {
//           method: 'post',
//           headers: {
//               'Content-Type': 'multipart/form-data',
//           },
//           body: formdata
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
          
//           dispatch({ type: 'LOADING',isLoading:false});
//           if(responseJson.success){
//               dispatch({ type: "USER_DETAILS", data: responseJson.data.basic_details });
//           }
//       })
//       .catch((error) => {
//           dispatch({ type: 'LOADING',isLoading:false});
//           // console.error(error);
//           //dispatch(itemsHaveError(true))
//       });

//     }
// }
//   export function getBarberCards(user_id){
//       return dispatch =>{
//         dispatch({ type: 'LOADING',isLoading:true});
//         let formdata = new FormData();
//         formdata.append("user_id",user_id);
//         fetch(BASE_URL+'/api/getBarberCardDetails', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             body: formdata
//         })
//         .then((response) => response.json())
//         .then((responseJson) => {
            
//             dispatch({ type: 'LOADING',isLoading:false});
//             if(responseJson.success){
//                 dispatch({ type: "CARDS", card: responseJson.data });
//             }
//         })
//         .catch((error) => {
//             dispatch({ type: 'LOADING',isLoading:false});
//             // console.error(error);
//             //dispatch(itemsHaveError(true))
//         });

//       }
//   }
//   export function getBarberDocuments(user_id){
//     return dispatch =>{
//       dispatch({ type: 'LOADING',isLoading:true});
//       let formdata = new FormData();
//       formdata.append("user_id",user_id);
//       fetch(BASE_URL+'/api/getBarberDocs', {
//           method: 'post',
//           headers: {
//               'Content-Type': 'multipart/form-data',
//           },
//           body: formdata
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
          
//           dispatch({ type: 'LOADING',isLoading:false});
//           if(responseJson.success){
//               dispatch({ type: "DOCUMENTS", document: responseJson.data });
//           }
//       })
//       .catch((error) => {
//           dispatch({ type: 'LOADING',isLoading:false});
//           // console.error(error);
//           //dispatch(itemsHaveError(true))
//       });

//     }
// }
// export function getBarberServices(user_id){
//     return dispatch =>{
//       dispatch({ type: 'LOADING',isLoading:true});
//       let formdata = new FormData();
//       formdata.append("user_id",user_id);
//       fetch(BASE_URL+'/api/getBarberServices', {
//           method: 'post',
//           headers: {
//               'Content-Type': 'multipart/form-data',
//           },
//           body: formdata
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
          
//           dispatch({ type: 'LOADING',isLoading:false});
//           if(responseJson.success){
//               dispatch({ type: "SERVICES", service: responseJson.data });
//           }
//       })
//       .catch((error) => {
//           dispatch({ type: 'LOADING',isLoading:false});
//           // console.error(error);
//           //dispatch(itemsHaveError(true))
//       });

//     }
// }
  export function loading(bool){
      return {
        type: 'LOADING',
        isLoading:bool
      }
  }
//   export function setLanguage(data){
//     return {
//       type: 'SETLANGUAGE',
//       data:data
//     }
// }
  export function hasError(error){
    return {
        type: 'ERROR',
        error:error
      }
  }
//   export function saveUserDetails(data){
//     return {
//         type: 'USER_DETAILS',
//         data:data
//       }
//   }

//   export function searchLocation(location){
//     return {
//         type: 'SEARCH_LOCATION',
//         location:location
//       }
//   }
//   export function searchDistance(distance){
//     return {
//         type: 'DISTANCE',
//         distance:distance
//       }
//   }
  export function registrationProcess(status){
    return {
        type: 'REGISTRATION',
        status:status
      }
  }
  export function appLoading(bool){
    return {
      type: 'APPLOADING',
      apploading:bool
    }
}
export function needHelp(bool){
    return {
      type: 'NEEDHELP',
      needhelp:bool
    }
}
export function giveHelp(bool){
    return {
      type: 'GIVEHELP',
      givehelp:bool
    }
}
export function appStateReset(){
  return {
      type: 'RESET',
       payload:{}
    }
}
//   export function updateBarberRegion(user_id,location){
//     return dispatch =>{
//     //   dispatch({ type: 'LOADING',isLoading:true});
//       let formdata = new FormData();
//       formdata.append("user_id",user_id);
//       formdata.append("latitude",location.latitude);
//       formdata.append("longitude",location.longitude);
//       formdata.append("location",location.name);
//       fetch(BASE_URL+'api/barber/updateLocation', {
//           method: 'post',
//           headers: {
//               'Content-Type': 'multipart/form-data',
//           },
//           body: formdata
//       })
//       .then((response) => response.json())
//       .then((responseJson) => {
          
//         //   dispatch({ type: 'LOADING',isLoading:false});
//         //   if(responseJson.success){
//         //       dispatch({ type: "DOCUMENTS", document: responseJson.data });
//         //   }
//       })
//       .catch((error) => {
//         //   dispatch({ type: 'LOADING',isLoading:false});
//           console.error(error);
//           //dispatch(itemsHaveError(true))
//       });

//     }
// }

// export function getNotifications(user_id){
//     return dispatch =>{
       
//         let formdata = new FormData();
//         formdata.append("user_id",user_id);
//         fetch(BASE_URL+'api/barber/getNotifications', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             body: formdata
//         })
//         .then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson.success){
//                 dispatch({ type: 'NOTIFICATION', message:responseJson.data});  
//             }
            
//           //   dispatch({ type: 'LOADING',isLoading:false});
//           //   if(responseJson.success){
//           //       dispatch({ type: "DOCUMENTS", document: responseJson.data });
//           //   }
//         })
//         .catch((error) => {
//           //   dispatch({ type: 'LOADING',isLoading:false});
//             // console.error(error);
//             //dispatch(itemsHaveError(true))
//         });
  
//       }
//     //   let message="hello ansar"+user_id;
//     // return {
//     //     type: 'NOTIFICATION',
//     //     message:message
//     //   }
//   }
//   export function readNotifications(user_id){
//     return dispatch =>{
       
//         let formdata = new FormData();
//         formdata.append("user_id",user_id);
//         fetch(BASE_URL+'api/barber/readNotifications', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             body: formdata
//         })
//         .then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson.success){
//                 dispatch({ type: 'NOTIFICATION', message:[]});  
//             }
            
//           //   dispatch({ type: 'LOADING',isLoading:false});
//           //   if(responseJson.success){
//           //       dispatch({ type: "DOCUMENTS", document: responseJson.data });
//           //   }
//         })
//         .catch((error) => {
//           //   dispatch({ type: 'LOADING',isLoading:false});
//             // console.error(error);
//             //dispatch(itemsHaveError(true))
//         });
  
//       }
//     //   let message="hello ansar"+user_id;
//     // return {
//     //     type: 'NOTIFICATION',
//     //     message:message
//     //   }
//   }