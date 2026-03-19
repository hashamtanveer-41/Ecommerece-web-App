
package com.ecommerce.backend.controller;

import com.ecommerce.backend.config.AppConstants;
import com.ecommerce.backend.payload.ProductResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProductController {

//    @GetMapping("/public/products")
//    public ResponseEntity<ProductResponse> getAllProducts(
//            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_),
//            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_),
//            @RequestParam(name = "sortBy", defaultValue = AppConstants.PAGE_),
//            @RequestParam(name = "sortOrder", defaultValue = AppConstants.PAGE_)
//    ){
//        ProductResponse productResponse = productService.getAllProducts(pageNumber);
//        return new ResponseEntity<>(productResponse, HttpStatus.OK);
//    }
}
