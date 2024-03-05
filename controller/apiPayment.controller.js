
const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/verify-token");
const stripe = require('stripe')('sk_test_51NY6GVFCnlnePsBKsPN9yjSkQcNsnHJMcMyN5ozhEtrd4eknuoQahglsK6vnMArtYYlvSkBYhlcGGcyG62zVP7Gs00JZAuSWIU');

router.post('/apiPay', verifyAccessToken, async (req, res) => {
  try {
    const { name_cour, level, hours, currency, type, price } = req.body;
    let description = `Level: ${level} - Option: ${type}`;

    if (hours) {
      description += ` - ${hours} hours`;
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: name_cour,
              description: description,
            },
            unit_amount: price, // Montant en centimes (USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.taamarbouta.com/', // Redirection après un paiement réussi
      cancel_url: 'https://www.taamarbouta.com/', // Redirection si le paiement est annulé
    });
  
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue lors de la création de la session de paiement.');
  }
});

module.exports = router;
