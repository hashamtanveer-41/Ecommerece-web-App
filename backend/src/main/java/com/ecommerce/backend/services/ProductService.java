package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.ProductDTO;
import com.ecommerce.backend.payload.ProductResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface ProductService {

    ProductDTO addProduct(Long categoryID, ProductDTO productDTO);

    ProductResponse getAllProducts(String keyword, String category,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse searchByCategory(Long categoryID,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    ProductResponse searchByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO updateProduct(ProductDTO productDTO, Long productId);

    ProductDTO deleteProduct(Long productId);

    ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException;
}
