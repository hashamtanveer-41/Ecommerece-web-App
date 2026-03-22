package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.APIExceptions;
import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.payload.ProductDTO;
import com.ecommerce.backend.payload.ProductResponse;
import com.ecommerce.backend.repostories.CategoryRepository;
import com.ecommerce.backend.repostories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductDTO addProduct(Long categoryID, Product product) {
         Category category =  categoryRepository.findById(categoryID)
                 .orElseThrow(()->
                         new ResourceNotFoundException("Category", "category", categoryID));


         product.setCategory(category);
         double specialPrice = product.getPrice() -
                 (product.getDiscount()*0.01)*product.getPrice();
         product.setSpecialPrice(specialPrice);
         product.setImage("default.png");
         Product savedProduct = productRepository.save(product);

         return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> productPage = categoryRepository.findAll(pageDetails);

        List<Product>  products =productRepository.findAll();
        if (products.isEmpty()) throw new APIExceptions("No products created till now.");
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(products, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setLastPage(productPage.isLast());
        productResponse.setPageNumber(productPage.getNumber());
        productResponse.setTotalElements(productPage.getTotalElements());
        productResponse.setTotalPages(productPage.getTotalPages());
        productResponse.setPageSize(productPage.getSize());

        return productResponse;
    }
}
