package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.payload.CartItemDTO;
import com.ecommerce.backend.repostories.CartItemRepository;
import com.ecommerce.backend.repostories.CartRepository;
import com.ecommerce.backend.repostories.ProductRepository;
import com.ecommerce.backend.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    @Override
    public String addOrUpdateCartWithItems(List<CartItemDTO> cartDTOS) {
        // Get User's Email
        String emailId = authUtil.loggedInEmail();

        // Check If existing cart is available or create a new one
        Cart existingCart  = cartRepository.findCartByEmail(emailId);
        if (existingCart == null){
            existingCart = new Cart();
            existingCart.setTotalPrice(0.0);
            existingCart.setUser(authUtil.loggedInUser());
             existingCart =cartRepository.save(existingCart);
        }else {
            cartRepository.deleteAllByCartId(existingCart.getCartId());
        }
        double totalPrice = 0.00;
         // Process each item in the request to add to the cart
        for (CartItemDTO cartItemDTO: cartDTOS){
            Long productId = cartItemDTO.getProductId();
            Integer quantity = cartItemDTO.getQuantity();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "product", productId));

   //         product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getSpecialPrice()* quantity;

            CartItem cartItem = new CartItem();
            cartItem.setDiscount(product.getDiscount());
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setCart(existingCart);
            cartItemRepository.save(cartItem);
        }

        existingCart.setTotalPrice(totalPrice);
         cartRepository.save(existingCart);
        return "Cart created/updated successfully with updated items.";
    }
}
