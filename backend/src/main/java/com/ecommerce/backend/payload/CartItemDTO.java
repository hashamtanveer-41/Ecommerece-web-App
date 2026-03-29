package com.ecommerce.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private Long cartItem;
    private Long productId;
    private CartDTO cart;
    private Integer quantity;
    private ProductDTO productDTO;
    private double discount;
    private double productPrice;
}
