package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.APIExceptions;
import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.Address;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.payload.AddressDTO;
import com.ecommerce.backend.repostories.AddressRepository;
import com.ecommerce.backend.repostories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    private final ModelMapper modelMapper;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;

    public AddressServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO, Address.class);
        List<Address> addresses = user.getAddresses();
        addresses.add(address);
        user.setAddresses(addresses);
        address.setUser(user);
        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAllAddresses() {
        List<Address> addresses = addressRepository.findAll();

        return addresses.stream().map(address ->
                modelMapper.map(address, AddressDTO.class)).toList();
    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address", "addressId", addressId));
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddressessByUser(User user) {
        List<Address> addresses = addressRepository.findByUserEmail(user.getEmail());
        return addresses.stream().map(address ->
                modelMapper.map(address, AddressDTO.class)).toList();
    }

    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO updatedAddressDTO) {
        Address existingAddress = modelMapper.map(getAddressById(addressId), Address.class);

        existingAddress.setBuildingName(updatedAddressDTO.getBuildingName());
        existingAddress.setCity(updatedAddressDTO.getBuildingName());
        existingAddress.setCountry(updatedAddressDTO.getCountry());
        existingAddress.setPincode(updatedAddressDTO.getPincode());
        existingAddress.setState(updatedAddressDTO.getState());
        existingAddress.setStreet(updatedAddressDTO.getStreet());

        Address updatedAddress = addressRepository.save(existingAddress);
        User user = existingAddress.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        user.getAddresses().add(updatedAddress);
        userRepository.save(user);
        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Override
    public String deleteAddress(Long addressId) {
        Address addressFromDatabase = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
        User user = addressFromDatabase.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        userRepository.save(user);
        addressRepository.deleteById(addressId);
        return "Address deleted successfully with addressId: " + addressId;
    }
}
