import react, { useState } from "react";

const Buy = () => {
  const [Url, setUrl] = useState(null);

  return (
    <>
      <button
        onClick={() => {
          fetch("http://localhost:9000/createCharge", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setUrl(data.hosted_url);
            })

            
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        BUY
      </button>
      <button
        onClick={() => {
          fetch("http://localhost:9000/createCheckout", {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              //setUrl(data.hosted_url);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        BUY check
      </button>
      <h3>PAYLOAD</h3>
      <div>
        {` 

        name: "widget",
    description: "unkown widegt",
    local_price: {
      amount: 1,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      user: "rajat21",
    },`}
      </div>
      <br />
      {Url ? <a href={Url}>buy here</a> : null}
    </>
  );
};
export default Buy;
