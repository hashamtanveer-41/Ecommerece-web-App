package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.APIExceptions;
import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.*;
import com.ecommerce.backend.payload.OrderDTO;
import com.ecommerce.backend.payload.OrderItemDTO;
import com.ecommerce.backend.payload.OrderResponse;
import com.ecommerce.backend.repostories.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private ModelMapper modelMapper;

    public OrderServiceImpl(CartRepository cartRepository, AddressRepository addressRepository) {
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    @Transactional
    public OrderDTO placeOrder(String emailId,
                               Long addressId,
                               String paymentMethod,
                               String pgName,
                               String pgPaymentId, String pgStatus, String pgResponseMessage) {
        // Getting User Cart
        Cart cart = cartRepository.findCartByEmail(emailId);
        if (cart == null ){
            throw new ResourceNotFoundException("Cart", "email", emailId);
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(()-> new ResourceNotFoundException("Address", "address",addressId));

        // Create a new order with info
        Order order= new Order();
        order.setEmail(emailId);
        order.setAddress(address);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus("Accepted");
        Payment payment = new Payment(paymentMethod, pgPaymentId,
                pgStatus, pgResponseMessage, pgName);
        payment.setOrder(order);
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        Order savedOrder = orderRepository.save(order);
        // Get Items form the cart into the order items
        List<CartItem> cartItems = cart.getCartItems();
        if (cartItems == null){
            throw new APIExceptions("Cart is empty!");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem: cartItems){
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }
        orderItems = orderItemRepository.saveAll(orderItems);
        // Update the stock of product
        cart.getCartItems().forEach(items -> {
            int quantity = items.getQuantity();
            Product product = items.getProduct();
            product.setQuantity(product.getQuantity()-quantity);

            productRepository.save(product);
            // Clear cart
            cartService.deleteProductFromCart(cart.getCartId(), items.getProduct().getProductId());
        });
        // Send back the order Summary
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item ->
                orderDTO.getOrderItems()
                        .add(modelMapper.map(item, OrderItemDTO.class)));
        orderDTO.setAddressId(addressId);
        return orderDTO;
    }

    @Override
    public OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Order> pageOrders = orderRepository.findAll(pageDetails);
        List<Order> orders = pageOrders.getContent();
        List<OrderDTO> orderDTOS = orders.stream().map(order
                        -> modelMapper.map(order, OrderDTO.class)).toList();

        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDTOS);
        orderResponse.setLastPage(pageOrders.isLast());
        orderResponse.setPageNumber(pageOrders.getNumber());
        orderResponse.setPageSize(pageOrders.getSize());
        orderResponse.setTotalPages(pageOrders.getTotalPages());
        orderResponse.setTotalElements(pageOrders.getTotalElements());
        return orderResponse;
    }

    @Override
    public OrderDTO updateOrder(Long orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Order", "orderId", orderId));
        order.setOrderStatus(status);
        orderRepository.save(order);
        return modelMapper.map(order, OrderDTO.class);
    }
}
