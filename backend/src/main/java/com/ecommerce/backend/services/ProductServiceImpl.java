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
import org.springframework.data.jpa.domain.Specification;
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
    public ProductResponse getAllProducts(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        // Validate sortBy parameter - only allow valid Product fields
        List<String> validSortFields = List.of("productId", "productName", "price", "discount", "specialPrice", "quantity");

        String validSortBy = sortBy != null && validSortFields.contains(sortBy) ? sortBy : "productId";

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(validSortBy).ascending()
                : Sort.by(validSortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Specification<Product> spec = null;

        if (keyword != null && !keyword.isEmpty()){
            spec = (root, query, criteriaBuilder) -> (
                criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%"+keyword.toLowerCase()+"%")
            );
        }

        if (category != null && !category.isEmpty()){
            Specification<Product> categorySpec = (root, query, criteriaBuilder) -> (
                    criteriaBuilder.like(root.get("category").get("categoryName"), category)
            );
            spec = spec == null ? categorySpec : spec.and(categorySpec);
        }

        Page<Product> productPage = spec == null ? 
            productRepository.findAll(pageDetails) : 
            productRepository.findAll(spec, pageDetails);

        List<Product>  products = productPage.getContent();
        if (products.isEmpty()) throw new APIExceptions("No products created till now.");
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(product, ProductDTO.class))
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

    @Override
    public ProductResponse searchByCategory(Long categoryID) {
        Category category =  categoryRepository.findById(categoryID)
                .orElseThrow(()->
                        new ResourceNotFoundException("Category", "category", categoryID));

        List<Product> products = productRepository.findByCategoryOrderByPriceAsc(category);
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        return productResponse;
    }

    @Override
    public ProductResponse searchByKeyword(String keyword) {

        List<Product> products = productRepository.findByProductNameLikeIgnoreCase("%"+keyword+"%" );
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(product, ProductDTO.class))
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Product updatedProduct, Long productId) {
        Product existingProduct =  productRepository.findById(productId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Product", "product", productId));

        existingProduct.setSpecialPrice(updatedProduct.getSpecialPrice());
        existingProduct.setImage(updatedProduct.getImage());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setDiscount(updatedProduct.getDiscount());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setProductId(updatedProduct.getProductId());
        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        productRepository.save(existingProduct);
        return modelMapper.map(existingProduct, ProductDTO.class);
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product product =  productRepository.findById(productId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Product", "product", productId));

        productRepository.delete(product);
        return modelMapper.map(product, ProductDTO.class);

    }
}
