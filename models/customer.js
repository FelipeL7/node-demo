const joi = require("joi");
const mongoose = require("mongoose");

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

function validateCustomer(customer) {
  const schema = joi.object({
    isGold: joi.boolean().required(),
    name: joi.string().required().min(5),
    phone: joi.number().required().min(5),
  });

  return schema.validate(customer);
}

module.exports = {
  Customer,
  validate: validateCustomer,
};
// module.exports.Customer = Customer;
// exports.Customer = Customer;
