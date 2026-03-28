
package com.ecommerce.backend.controller;

import com.ecommerce.backend.payload.CartDTO;
import com.ecommerce.backend.payload.CartItemDTO;
import com.ecommerce.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/cart/create")
    public ResponseEntity<String> createOrUpdateCart(@RequestBody List<CartItemDTO> cartDTOS){
        String response = cartService.addOrUpdateCartWithItems(cartDTOS);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
