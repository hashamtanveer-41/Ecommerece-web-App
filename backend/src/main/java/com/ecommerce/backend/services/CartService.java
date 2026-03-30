package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.CartDTO;
import com.ecommerce.backend.payload.CartItemDTO;
import jakarta.transaction.Transactional;

import java.util.List;

public interface CartService {
    String addOrUpdateCartWithItems(List<CartItemDTO> cartDTOS);

    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> getAllCarts();

    CartDTO getCartById(String emailId, Long cartId);

    @Transactional
    CartDTO updateProductQuantityInCart(Long productId, int quantity);

    String deleteProductFromCart(Long cartId, Long productId);

    void updateProductInCarts(Long cartId, Long productId);
}
