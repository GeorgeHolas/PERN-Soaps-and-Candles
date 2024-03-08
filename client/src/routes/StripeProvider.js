// StripeProvider.js

import { Elements } from 'react-stripe-elements';

const StripeProvider = ({ children, stripeKey}) => {
  return (
    <Elements stripe={stripeKey}>
      {children}
    </Elements>
  );
}

export default StripeProvider;
