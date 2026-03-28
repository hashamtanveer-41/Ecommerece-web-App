package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.CartItemDTO;

import java.util.List;

public interface CartService {
    String addOrUpdateCartWithItems(List<CartItemDTO> cartDTOS);
}
