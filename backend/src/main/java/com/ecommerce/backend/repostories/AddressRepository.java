package com.ecommerce.backend.repostories;

import com.ecommerce.backend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findAddressByAddressId(Long addressId);

    List<Address> findByUserEmail(String userEmail);
}
