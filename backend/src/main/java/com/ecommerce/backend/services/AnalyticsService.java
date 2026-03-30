package com.ecommerce.backend.services;

import com.ecommerce.backend.payload.AnalyticsResponse;
import org.springframework.stereotype.Service;


public interface AnalyticsService {

    AnalyticsResponse getAnalyticsData();
}
