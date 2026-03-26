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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    @Override
    public ProductDTO addProduct(Long categoryID, ProductDTO productDTO) {
         Category category =  categoryRepository.findById(categoryID)
                 .orElseThrow(()->
                         new ResourceNotFoundException("Category", "category", categoryID));

         boolean ifProductExist = false;
         List<Product> products = category.getProducts();
         for (Product existingProduct : products){
             if (existingProduct.getProductName().equals(productDTO.getProductName())) {
                 ifProductExist = true;
                 break;
             }
         }
         if (ifProductExist) {
             Product product = modelMapper.map(productDTO, Product.class);
             product.setCategory(category);
             double specialPrice = product.getPrice() -
                     (product.getDiscount() * 0.01) * product.getPrice();
             product.setSpecialPrice(specialPrice);
             product.setImage("default.png");
             Product savedProduct = productRepository.save(product);
             return modelMapper.map(savedProduct, ProductDTO.class);
         }else {
             throw new APIExceptions("Product already exists.");
         }
    }

    @Override
    public ProductResponse getAllProducts(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> productPage = productRepository.findAll(pageDetails);

        List<Product>  products = productPage.getContent();
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
    public ProductResponse searchByCategory(Long categoryID,Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Category category =  categoryRepository.findById(categoryID)
                .orElseThrow(()->
                        new ResourceNotFoundException("Category", "category", categoryID));
        Page<Product> productPage = productRepository.findByCategoryOrderByPriceAsc(category, pageDetails);

        List<Product> products = productPage.getContent();
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(product, ProductDTO.class))
                .toList();
        if (products.isEmpty()){
            throw new APIExceptions("No Category product exists with categorySpring");
        }
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
    public ProductResponse searchByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {


        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> productPage = productRepository.findByProductNameLikeIgnoreCase("%"+keyword+"%", pageDetails );
        List<Product> products = productPage.getContent();
        List<ProductDTO> productDTOS= products.stream()
                .map(product ->  modelMapper.map(product, ProductDTO.class))
                .toList();
        if (products.size() == 0){
            throw new APIExceptions("No product exists with keyword: "+keyword);
        }

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
    public ProductDTO updateProduct(ProductDTO updatedProductDTO, Long productId) {

        Product existingProduct =  productRepository.findById(productId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Product", "product", productId));

        Product updatedProduct = modelMapper.map(updatedProductDTO, Product.class);
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

    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        // Get the product from the DB
        Product productFromDB = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "product", productId));

        // Upload the image to the server
        // Get the file name of the uploaded image
        String fileName = fileService.uploadImage(path, image);
        // Updating the new file name to the product
        productFromDB.setImage(fileName);
        //Save product
        Product updatedProduct =productRepository.save(productFromDB);
        // return DTO after mapping product to DTO
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }


}
