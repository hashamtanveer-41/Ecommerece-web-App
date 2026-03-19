package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.APIExceptions;
import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.payload.CategoryDTO;
import com.ecommerce.backend.payload.CategoryResponse;
import com.ecommerce.backend.repostories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public CategoryResponse getAllCategories() {
        List<Category> getAllCategories = categoryRepository.findAll();
        if (getAllCategories.isEmpty()) throw new APIExceptions("No category created till now.");
        List<CategoryDTO> categoryDTO = new ArrayList<>();

        return categoryResponse.getContent();

    }

    @Override
    public void createCategory(Category category) {
        Category savedCategory = categoryRepository.findByCategoryName(category.getCategoryName());
        if (savedCategory!=null) throw new APIExceptions("Category with name "+ savedCategory.getCategoryName() + " already exists. !!");
        categoryRepository.save(category);
    }

    @Override
    public String deleteCategory(Long categoryId) {
       Category category =categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException("Category", "categoryId", categoryId));
       categoryRepository.delete(category);
       return "Category with Category Id: "+categoryId+" deleted successfully. ";
    }

    @Override
    public Category updateCategory(Category category, Long categoryId) {
        Category savedCategory = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category", "categoryId", categoryId));

        category.setCategoryName(category.getCategoryName());
        savedCategory = categoryRepository.save(category);
        return savedCategory;
    }
}
