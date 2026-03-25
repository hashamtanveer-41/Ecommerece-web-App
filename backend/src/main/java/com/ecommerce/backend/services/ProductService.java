package com.ecommerce.backend.services;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.payload.ProductDTO;
import com.ecommerce.backend.payload.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {

    ProductDTO addProduct(Long categoryID, Product product);

    ProductResponse getAllProducts(String keyword, String category,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse searchByCategory(Long categoryID);

    ProductResponse searchByKeyword(String keyword);

    ProductDTO updateProduct(Product product, Long productId);

    ProductDTO deleteProduct(Long productId);
}
