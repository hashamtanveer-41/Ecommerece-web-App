package com.ecommerce.backend.services;

import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.payload.CategoryDTO;
import com.ecommerce.backend.payload.CategoryResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CategoryService {
    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    CategoryDTO createCategory(CategoryDTO category);

    CategoryDTO deleteCategory(Long categoryId);

    CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId);
}
