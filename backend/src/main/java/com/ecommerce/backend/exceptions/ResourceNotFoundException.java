package com.ecommerce.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    String resourceName;
    String field;
    String fieldName;
    Long fieldId;
    String another;

    public ResourceNotFoundException(String message, String resourceName, String fieldName, String field) {
        super(String.format("%s not found with %s: %s", resourceName ,field, fieldName));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.field = field;
    }

    public ResourceNotFoundException() {
    }

    public ResourceNotFoundException( String resourceName,String field, Long fieldId) {
        super(String.format("%s not found with %s: %s", resourceName ,field, fieldId));
        this.resourceName = resourceName;
        this.fieldId = fieldId;
        this.field = field;
    }


    public ResourceNotFoundException(String cart, String email, String emailId) {
        super(String.format("%s not found with %s: %s", cart ,email, emailId));
        this.resourceName = cart;
        this.field = email;
        this.another = emailId;
    }
}
