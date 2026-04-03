package com.ecommerce.backend.controller;

import com.ecommerce.backend.aop.PerformanceMonitorAspect;
import com.ecommerce.backend.aop.PerformanceMonitorAspect;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.payload.AddressDTO;
import com.ecommerce.backend.services.AddressService;
import com.ecommerce.backend.util.AuthUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {

    private final AddressService addressService;
    private final AuthUtil authUtil;

    public AddressController(AddressService addressService, AuthUtil authUtil) {
        this.addressService = addressService;
        this.authUtil = authUtil;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(PerformanceMonitorAspect.class);

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO){
        try {
            User user = authUtil.loggedInUser();
            if (user == null) {
                LOGGER.error("[ADDRESS CREATION] User is not authenticated - loggedInUser returned null");
                return new ResponseEntity<>((HttpHeaders) null, HttpStatus.UNAUTHORIZED);
            }
            LOGGER.info("[ADDRESS CREATION] Creating address for user: {} (ID: {})", user.getUserName(), user.getUserId());
            AddressDTO savedAddressDTO = addressService.createAddress(addressDTO, user);
            LOGGER.info("[ADDRESS CREATION] Address created successfully for user: {}", user.getUserName());
            return new ResponseEntity<>(savedAddressDTO, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("[ADDRESS CREATION] Error creating address: {}", e.getMessage(), e);
            return new ResponseEntity<>((HttpHeaders) null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> getAllAddresses(){
        List<AddressDTO> savedAddressDTO = addressService.getAllAddresses();
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.OK);
    }

    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId){
        AddressDTO savedAddressDTO = addressService.getAddressById(addressId);
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.OK);
    }

    @GetMapping("/users/addresses")
    public ResponseEntity<List<AddressDTO>> getAddressByUser(){
        User user = authUtil.loggedInUser();
        List<AddressDTO> savedAddressDTO = addressService.getAddressessByUser(user);
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.OK);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId,
                                                          @RequestBody AddressDTO addressDTO
    ){
        AddressDTO savedAddressDTO = addressService.updateAddress(addressId, addressDTO);
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.OK);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId){
        String status = addressService.deleteAddress(addressId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
