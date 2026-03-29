package com.ecommerce.backend.repostories;

import com.ecommerce.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("select c from Cart c where c.user.email = ?1")
    Cart findCartByEmail(String emailId);


    void deleteAllByCartId(Long cartID);

    @Query("select c from Cart c where c.user.email = ?1 and c.id=?2")
    Cart findCartByEmailAndCartId(String emailId, Long cartId);
}
