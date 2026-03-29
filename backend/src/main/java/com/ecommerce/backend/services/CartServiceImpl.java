package com.ecommerce.backend.services;

import com.ecommerce.backend.exceptions.APIExceptions;
import com.ecommerce.backend.exceptions.ResourceNotFoundException;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.CartItem;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.payload.CartDTO;
import com.ecommerce.backend.payload.CartItemDTO;
import com.ecommerce.backend.payload.ProductDTO;
import com.ecommerce.backend.repostories.CartItemRepository;
import com.ecommerce.backend.repostories.CartRepository;
import com.ecommerce.backend.repostories.ProductRepository;
import com.ecommerce.backend.util.AuthUtil;
import com.stripe.exception.ApiException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private AuthUtil authUtil;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Transactional
    @Override
    public String addOrUpdateCartWithItems(List<CartItemDTO> cartDTOS) {
        // Get User's Email
        String emailId = authUtil.loggedInEmail();

        // Check If existing cart is available or create a new one
        Cart existingCart  = cartRepository.findCartByEmail(emailId);
        if (existingCart == null){
            existingCart = new Cart();
            existingCart.setTotalPrice(0.0);
            existingCart.setUser(authUtil.loggedInUser());
             existingCart =cartRepository.save(existingCart);
        }else {
            cartRepository.deleteAllByCartId(existingCart.getCartId());
        }
        double totalPrice = 0.00;
         // Process each item in the request to add to the cart
        for (CartItemDTO cartItemDTO: cartDTOS){
                 Long productId = cartItemDTO.getProductId();
            Integer quantity = cartItemDTO.getQuantity();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "product", productId));

   //         product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getSpecialPrice()* quantity;

            CartItem cartItem = new CartItem();
            cartItem.setDiscount(product.getDiscount());
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setCart(existingCart);
            cartItemRepository.save(cartItem);
        }

        existingCart.setTotalPrice(totalPrice);
         cartRepository.save(existingCart);
        return "Cart created/updated successfully with updated items.";
    }

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        //Find existing Cart
       Cart cart = createCart();
       Product product = productRepository.findById(productId)
               .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

       CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(
               cart.getCartId(),
               productId
       );
       if (cartItem !=null){
           throw new APIExceptions("Product "+product.getProductName()+" already exists in the cart." );
       }

       if (product.getQuantity() == 0){
           throw new APIExceptions(product.getProductName()+" is not available");
       }

        if (product.getQuantity() < quantity){
            throw new APIExceptions("Please order quantity of "+product.getProductName()+" equal or less than the quantity "+product.getQuantity());
        }


        CartItem newCartItem= new CartItem();

        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProduct(product);
        newCartItem.setQuantity(quantity);
        newCartItem.setProductPrice(product.getSpecialPrice());
        newCartItem.setCart(cart);
        cartItemRepository.save(newCartItem);

        product.setQuantity(product.getQuantity());
        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice()*quantity));
        cartRepository.save(cart);
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productDTOStream = cartItems.stream().map(item -> {
            ProductDTO map = modelMapper.map(item.getProduct(), ProductDTO.class);
            map.setQuantity(item.getQuantity());
            return map;
        });
        cartDTO.setProducts(productDTOStream.toList());
        return cartDTO;
    }

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();

        if (carts.size() == 0){
            throw new APIExceptions("No cart Exist");
        }

        List<CartDTO> cartDTOS = carts.stream().map(item -> {
            CartDTO cartDTO = modelMapper.map(item, CartDTO.class);
            List<ProductDTO> products = item
                    .getCartItems()
                    .stream()
                    .map(p-> modelMapper.map(p.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());
            cartDTO.setProducts(products);
            return cartDTO;
        }).collect(Collectors.toList());

        return cartDTOS;
    }

    @Override
    public CartDTO getCartById(String emailId, Long cartId) {
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId ,cartId);
        if (cart== null){
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(q -> q.getProduct().setQuantity(q.getQuantity()));
        List<ProductDTO> products = cart.getCartItems().stream()
                .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class))
                .toList();
        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Override
    @Transactional
    public CartDTO updateProductQuantityInCart(Long productId, int quantity) {
        String emailId = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(emailId);
        Cart cart = cartRepository.findById(userCart.getCartId())
                .orElseThrow(()-> new ResourceNotFoundException("Cart", "cartId", userCart.getCartId()));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantity() == 0){
            throw new APIExceptions(product.getProductName()+" is not available");
        }

        if (product.getQuantity() < quantity){
            throw new APIExceptions("Please order quantity of "+product.getProductName()+" equal or less than the quantity "+product.getQuantity());
        }

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cart.getCartId(), productId);
        if (cartItem == null){
            throw new APIExceptions("Product "+ product.getProductName()+" not available in the cart!");
        }
        cartItem.setProductPrice(product.getSpecialPrice());
        cartItem.setQuantity(product.getQuantity());
        cartItem.setDiscount(product.getDiscount());
        cart.setTotalPrice(cart.getTotalPrice()+(cartItem.getProductPrice()*quantity));
        CartItem updatedItem = cartItemRepository.save(cartItem);
        if (updatedItem.getQuantity()==0){
            cartItemRepository.deleteById(updatedItem.getCartItemId());
        }
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productDTOStream = cartItems.stream().map(p ->{
            ProductDTO productDTO = modelMapper.map(p.getProduct(), ProductDTO.class);
            productDTO.setQuantity(p.getQuantity());
            return productDTO;
        });
        cartDTO.setProducts(productDTOStream.toList());
        return cartDTO;
    }

    @Override
    @Transactional
    public String deleteProductFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null){
            throw new ResourceNotFoundException("Product", "productId", productId);
        }

        cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProductPrice()*cartItem.getQuantity()));
        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId, productId);

        return "Product "+cartItem.getProduct().getProductName()+" removed from the cart!";
    }


    private Cart createCart(){
        Cart userCart =  cartRepository.findCartByEmail(authUtil.loggedInEmail());
        if (userCart !=null){
            return userCart;
        }
        Cart cart = new Cart();
        cart.setTotalPrice(0.00);
        cart.setUser(authUtil.loggedInUser());
        Cart newCart = cartRepository.save(cart);
        return newCart;
    }
}
