package com.ecommerce.backend.repostories;

import com.ecommerce.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select coalesce( sum(o.totalAmount),0) FROM Order o")
    Double getTotalRevenue();
}
