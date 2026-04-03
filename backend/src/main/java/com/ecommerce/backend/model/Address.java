package com.ecommerce.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @NotBlank
    @Size(min = 5, message = "Street size should be of minimum 5 characters")
    private String street;


    @NotBlank
    @Size(min = 5, message = "Building name size should be of minimum 5 characters")
    private String buildingName;


    @NotBlank
    @Size(min = 4, message = "City name size should be of minimum 4 characters")
    private String city;

    @NotBlank
    @Size(min = 3, message = "State name size should be of minimum 3 characters")
    private String state;

    @NotBlank
    @Size(min = 7, message = "Pincode size should be of minimum 7 characters")
    private String pincode;

    @NotBlank
    @Size(min = 7, message = "Country name size should be of minimum 7 characters")
    private String country;

    public Address(String pincode, String state, String city, String buildingName, String street) {
        this.pincode = pincode;
        this.state = state;
        this.city = city;
        this.buildingName = buildingName;
        this.street = street;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;



}
