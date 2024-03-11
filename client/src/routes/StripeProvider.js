// StripeProvider.js
import { Elements } from 'react-stripe-elements';
import { useStripe } from './StripeContext';

const StripeProvider = ({ children }) => {
  const { stripeKey } = useStripe();

  return (
    <Elements stripe={stripeKey}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
