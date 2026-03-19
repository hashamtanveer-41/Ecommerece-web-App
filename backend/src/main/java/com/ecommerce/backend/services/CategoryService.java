package com.ecommerce.backend.services;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.payload.CategoryResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CategoryService {
    CategoryResponse getAllCategories();
    void createCategory(Category category);

    String deleteCategory(Long categoryId);

    Category updateCategory(Category category, Long categoryId);
}
