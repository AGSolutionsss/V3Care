import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { Fab } from '@material-ui/core';
import { SessionSlider } from 'Components/Widgets';
import AppConfig from 'Constants/AppConfig';
import {
   signupUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
} from 'Actions';

class SignupFirebase extends Component {

   state = {
      name: '',
      email: '',
      password: ''
   }

   onUserSignUp() {
      const { email, password } = this.state;
      if (email !== '' && password !== '') {
         this.props.signupUserInFirebase({ email, password }, this.props.history);
      }
   }

   render() {
      const { name, email, password } = this.state;
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={AppConfig.appLogo} alt="session-logo" width="110" height="35" />
                              </Link>
                           </div>
                           
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                                 <h2>Get started with {AppConfig.brandName}</h2>
                              </div>
                              <Form>
                                 <div className='row'>
                                    <div className='col-md-6'>
                                    <FormGroup className="has-wrapper">
                                    <Input type="text" value={name} name="user-name" id="user-name" className="has-input input-lg" placeholder="Enter Your Name" onChange={(e) => this.setState({ name: e.target.value })} />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                    </div>
                                    <div className='col-md-6'>
                                    <FormGroup className="has-wrapper">
                                    <Input type="mail" value={email} name="user-mail" id="user-mail" className="has-input input-lg" placeholder="Enter Email Address" onChange={(e) => this.setState({ email: e.target.value })} />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>
                                    </div>
                                 </div>
                                 
                                 
                                 <FormGroup className="has-wrapper">
                                    <Input value={password} type="Password" name="user-pwd" id="pwd" className="has-input input-lg" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                                    <span className="has-icon"><i className="ti-lock"></i></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       className="btn-info text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={() => this.onUserSignUp()}>
                                       Sign Up
                            </Button>
                                 </FormGroup>
                              </Form>
                              
                           </div>
                        </div>
                        
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

const mapStateToProps = ({ authUser }) => {
   const { loading } = authUser;
   return { loading };
};

export default connect(mapStateToProps, {
   signupUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter
})(SignupFirebase);
