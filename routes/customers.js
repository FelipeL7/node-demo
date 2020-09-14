const joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 5,
    },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
      },
      { new: true, useFindAndModify: false }
    );

    res.send(customer);
  } catch (ex) {
    return res.status(404).send("The customer with the given ID was not found");
  }
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id, {
    useFindAndModify: false,
  });

  if (!customer)
    res.status(404).send("The customer with the given ID was not found.");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = joi.object({
    isGold: joi.boolean().required(),
    name: joi.string().required().min(5),
    phone: joi.number().required().min(5),
  });

  return schema.validate(customer);
}

module.exports = router;
