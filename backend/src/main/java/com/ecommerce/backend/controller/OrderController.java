
package com.ecommerce.backend.controller;

import com.ecommerce.backend.payload.OrderDTO;
import com.ecommerce.backend.payload.StripePaymentDTO;
import com.ecommerce.backend.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {


    @Autowired
    private StripeService stripeService;

    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientKey(@RequestBody StripePaymentDTO stripePaymentDTO) throws StripeException {
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(), HttpStatus.OK);
    }
}
