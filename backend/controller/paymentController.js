import Payment from "../models/payment.js";

// ✅ CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const { userId, orderId, amount, paymentMethod } = req.body;

    const payment = await Payment.create({
      userId,
      orderId,
      amount,
      paymentMethod
    });

    res.status(201).json({
      message: "Payment created",
      payment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET USER PAYMENTS
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(payments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE PAYMENT STATUS
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, transactionId } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        paymentStatus: status,
        transactionId
      },
      { new: true }
    );

    res.json({
      message: "Payment updated",
      payment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};