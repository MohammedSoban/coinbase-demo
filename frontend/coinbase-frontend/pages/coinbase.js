import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";

const coinbase = () => {
  return (
    <CoinbaseCommerceButton
      chargeId={"N659GQ4L"}
      onChargeFailure={() => {
        console.log("failed");
      }}
      onChargeSuccess={() => {
        console.log("success");
      }}
    />
  );
};

export default coinbase;
