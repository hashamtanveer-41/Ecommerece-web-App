package com.ecommerce.backend.services;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.payload.AddressDTO;

import java.util.List;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAllAddresses();

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getAddressessByUser(User user);
}
