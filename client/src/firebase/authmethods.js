import fierbaseConfig from './firebaseIndex';
import firebase from 'firebase';

export const authMethods = {
    signup:(email, password, setErrors, setToken)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          // ...
        })

        .catch(error=>{
            setErrors(prev=>([...prev, error.message]))
        })
    },
    signin: (email, password, setErrors, setToken) => {
 
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
            .catch(err => {
            setErrors(prev => ([...prev, err.message]))
            })
          },
         
          signout: (setErrors, setToken) => {
        
        firebase.auth().signOut().then( res => {
  
          localStorage.removeItem('token')
          console.log('handle submit')
          setToken(null)
        })
        .catch(err => {
         
          setErrors(prev => ([...prev, err.message]))
       
            localStorage.removeItem('token')
            setToken(null)
            console.error(err.message)
        })
    },
}