import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import RctThemeProvider from './RctThemeProvider';
import HorizontalLayout from './HorizontalLayout';
import AgencyLayout from './AgencyLayout';
import RctDefaultLayout from './DefaultLayout';
import RctBoxedLayout from './RctBoxedLayout';
import CRMLayout from './CRMLayout';
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';
import AppMaintenance from './Maintenance';
import Partner from './Partner';
import Booking from './Booking';
import Tst from './Tst';
import {
    AsyncSessionLoginComponent,
    AsyncSessionRegisterComponent,
    AsyncSessionLockScreenComponent,
    AsyncSessionForgotPasswordComponent,
    AsyncSessionPage404Component,
    AsyncSessionPage500Component,
    
} from 'Components/AsyncComponent/AsyncComponent';
import Auth from '../Auth/Auth';
import Callback from "Components/Callback/Callback";

const auth = new Auth();
 
const handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
       auth.handleAuthentication();
    }
}
 
const mapStateToProps = ({ authUser }) => {
   const { user } = authUser;
   return { user };
};

 const InitialPath = ({ component: Component, authUser, ...rest }) =>
            <Route
            {...rest}
            render={props => <Component {...props} />}
            />;

   
 
 class App extends Component {


   componentDidMount(){

     
   }

   

    render() {

      //alert('ahhahah')
       const { location, match, user } = this.props;      


       if (location.pathname === '/') {
          //alert('aaya1')
          if (user === null) {
            //  alert('aaya2')
             return (<Redirect to={'/signin'} />);
          } else {
            //alert('aaya3')
             return (<InitialPath
               path={`${match.url}app`}
               authUser={user}
               component={'/app/dashboard'}
            />);
          }
       }else{

        // alert('idhar')

         
         
           return (
            <RctThemeProvider>
               <NotificationContainer />
               <InitialPath
                  path={`${match.url}app`}
                  authUser={user}
                  component={RctDefaultLayout}
               />
               <Route path="/horizontal" component={HorizontalLayout} />
               <Route path="/agency" component={AgencyLayout} />
               <Route path="/boxed" component={RctBoxedLayout} />
               <Route path="/dashboard" component={CRMLayout} />
               <Route path="/signin" component={AppSignIn} />
               <Route path="/signup" component={AppSignUp} />
               <Route path="/maintenance" component={AppMaintenance} />
               <Route path="/session/login" component={AsyncSessionLoginComponent} />
               <Route path="/register" component={AsyncSessionRegisterComponent} />
               <Route path="/partner" component={Partner} />
               <Route path="/booking" component={Booking} />
               <Route path="/tst" component={Tst} />
               <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
              

               <Route
                  path="/session/forgot-password"
                  component={AsyncSessionForgotPasswordComponent}
               />
               <Route path="/session/404" component={AsyncSessionPage404Component} />
               <Route path="/session/500" component={AsyncSessionPage500Component} />
               
               <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />
               }} />
            </RctThemeProvider>
         );
         
    }
   }  
 }
 
 // map state to props
 
 
 export default connect(mapStateToProps)(App);
 