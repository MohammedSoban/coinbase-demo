const express = require("express");
const app = express();
const { Client, Webhook, resources } = require("coinbase-commerce-node");
const bodyParser = require("body-parser");
const cors = require("cors");
Client.init("89ba80f7-d15c-48a7-ab78-b9293636f6f0");

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

var jsonParser = bodyParser.json();
const { Charge } = resources;
const { Checkout } = resources;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/createCheckout", jsonParser, (req, res) => {
  const checkoutData = {
    name: "card",
    description: "card is good",
    local_price: {
      amount: 1,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    requested_info: ["email"],
  };

  Checkout.create(checkoutData)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/createCharge", jsonParser, (req, res) => {
  console.log("hello");

  const chargeData = {
    name: "widget",
    description: "unkown widegt",
    local_price: {
      amount: 1,
      currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
      user: "rajat21",
    },
    redirect_url: "https://www.google.com/",
    cancel_url: "https://www.google.com/",
  };

  Charge.create(chargeData)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/webhookHandler", jsonParser, (req, res) => {
  const rawBody = req.body;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = "f454be6d-188a-44e7-8c89-fa34be66f439";

  try {
    const event = Webhook.verifyEventBody(
      JSON.stringify(rawBody),
      signature,
      webhookSecret
    );

    if (event.type === "charge:created") {
      console.log("created event id: ", event.id);
      res.status(200).send({ status: "created", id: `${event.id}` });
    }
    if (event.type === "charge:pending") {
      console.log("pending event id: ", event.id);
      res.status(200).send({ status: "pending", id: `${event.id}` });
    }
    if (event.type === "charge:confirmed") {
      console.log("confirmed event id: ", event.id);
      res.status(200).send({ status: "created", id: `${event.id}` });
    }
    if (event.type === "charge:failed") {
      console.log("failed event id: ", event.id);
      res.status(200).send({ status: "created", id: `${event.id}` });
    }

    //res.send(`success ${event.id}`);
  } catch (error) {
    console.error(error);
    res.status(400).send("failure!");
  }
});

app.listen(9000, () => console.log("Listening on port 9000"));

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
