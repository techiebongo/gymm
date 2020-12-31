/* eslint-disable no-undef */
import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Erorr from './Erorr';
import all_locations from "./Container/Location"
import Home from './Container/Home';
import Contact from './Container/Contact';
import Blog from './Container/Blog';
import GymOwner from './Container/GymOwner';
import Find_a_Gym from './Container/Find_a_Gym';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pricing from './Container/Pricing';
import PaymentSuccess from './Container/PaymentSuccess';
import BlogDescription from './Container/Blog_Description';
import UserProfile from './Container/userProfile';
import TermsConditions from './Container/Terms&Condition';
import PrivacyPolicy from './Container/PrivacyPolicy';
import GymDetails from './Container/GymDetails';
import CheckPaymentOption from './Container/Checkout_PaymentOptin';
import CheckPaymentConform from './Container/Checkout_Order';
import PayAsCheckPaymentConform from './Container/payAs_CheckOut_Order';
import Unsubscription from './Container/UnSubscribe';

function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route path='/' exact component={Home} />
          <Route path='/all-locations' component={all_locations} />
          <Route path='/contact' component={Contact} />
          <Route path='/blog' component={Blog} />
          <Route path='/blog-description' component={BlogDescription} />
          <Route path='/blog-description-:id' component={BlogDescription} />
          <Route path='/gym-owner' component={GymOwner} />
          <Route path='/find-a-gym' component={Find_a_Gym} />
          <Route path='/find-a-gym:name' component={Find_a_Gym} />
          <Route path='/pricing' component={Pricing} />
          <Route path='/payment-success' component={PaymentSuccess} />
          <Route path='/user-profile' component={UserProfile} />
          <Route path='/terms-conditions' component={TermsConditions} />
          <Route path='/privacy-policy' component={PrivacyPolicy} />
          <Route path='/gym-details' component={GymDetails} />
          <Route path='/gym-details-:id' component={GymDetails} />
          <Route path='/check-payment-option' component={CheckPaymentOption} />
          <Route path='/check-payment-conform' component={CheckPaymentConform} />
          <Route path='/pay-as-check-payment-conform' component={PayAsCheckPaymentConform} />
          <Route path='/email-unsubscribe-:id' component={Unsubscription} />
          
          <Route component={Erorr} />
        </Switch>
      </div>
    </Router>
  );
}



export default App;
