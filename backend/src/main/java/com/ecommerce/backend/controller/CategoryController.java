
package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PostMapping("/public/categories")
    public ResponseEntity<String> addCategory(@Valid @RequestBody Category category){
       categoryService.createCategory(category);
        return new ResponseEntity<>("Category added successfully", HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory (@PathVariable Long categoryId){
            return new ResponseEntity<>(categoryService.deleteCategory(categoryId), HttpStatus.OK);
    }

    @PutMapping("/public/categories/{categoryId}")
    public ResponseEntity<String> updateCategory(@Valid @RequestBody Category category,
                                                 @PathVariable Long categoryId){
            Category savedCategory = categoryService.updateCategory(category, categoryId);
            return new ResponseEntity<>("Category with category id: "+ categoryId+" has been updated", HttpStatus.OK);

    }
}













