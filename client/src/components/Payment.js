import StripeCheckout from "react-stripe-checkout";
import { handlePaymentToken } from "../reducers/authReducer";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Payment() {
  const dispatch = useDispatch();
  const amount = 500;
  const currency = "INR";

  async function addCredits(token) {
    const response = await axios.post("/api/stripe", {
      ...token,
      amount,
      currency,
    });
    dispatch(handlePaymentToken(response.data));
  }

  return (
    <StripeCheckout
      name="Emaily Billing"
      description="Complete transaction to add credits"
      amount={amount}
      currency={currency}
      locale="en"
      allowRememberMe={true}
      token={(token) => addCredits(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISH_KEY}
    >
      <button className="btn btn-primary">Add credits</button>
    </StripeCheckout>
  );
}
