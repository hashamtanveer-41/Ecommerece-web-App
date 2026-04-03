package com.ecommerce.backend.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    private String getArgumentString(Object[] args) {
        if (args == null || args.length == 0) {
            return "None";
        }
        StringBuilder sb = new StringBuilder();
        for (Object arg : args) {
            if (arg == null) {
                sb.append("null");
            } else if (isComplexEntity(arg)) {
                // For complex entities with circular references, log only type
                String className = arg.getClass().getSimpleName();
                sb.append(className);
            } else {
                // For simple types, use toString() safely
                try {
                    sb.append(arg.toString());
                } catch (StackOverflowError e) {
                    sb.append(arg.getClass().getSimpleName());
                }
            }
            sb.append(", ");
        }
        if (sb.length() > 2) {
            sb.setLength(sb.length() - 2);
        }
        return sb.toString();
    }

    private boolean isComplexEntity(Object obj) {
        String className = obj.getClass().getName();
        return className.contains("com.ecommerce.backend.model") || 
               className.contains("com.ecommerce.backend.payload") ||
               className.contains("$Proxy");
    }

    @Before("execution(* com.ecommerce.*.*.*.*(..))")
    public void logInfo(JoinPoint point) {
        String className = point.getTarget().getClass().getSimpleName();
        String methodName = point.getSignature().getName();
        String arguments = getArgumentString(point.getArgs());
        LOGGER.info("[METHOD CALL] Class: {}, Method: {}, Arguments: {}", className, methodName, arguments);
    }

    @After("execution(* com.ecommerce.*.*.*.*(..))")
    public void logInfoAfterMethodExecuted(JoinPoint point) {
        String className = point.getTarget().getClass().getSimpleName();
        String methodName = point.getSignature().getName();
        LOGGER.info("[METHOD COMPLETED] Class: {}, Method: {}", className, methodName);
    }

    @AfterThrowing(pointcut = "execution(* com.ecommerce.*.*.*.*(..))", throwing = "exception")
    public void logInfoAfterMethodWithError(JoinPoint point, Throwable exception) {
        String className = point.getTarget().getClass().getSimpleName();
        String methodName = point.getSignature().getName();
        LOGGER.error("[METHOD ERROR] Class: {}, Method: {}, Exception: {}", className, methodName, exception.getMessage(), exception);
    }

    @AfterReturning("execution(* com.ecommerce.*.*.*.*(..))")
    public void logInfoAfterMethodSuccess(JoinPoint point) {
        String className = point.getTarget().getClass().getSimpleName();
        String methodName = point.getSignature().getName();
        LOGGER.info("[METHOD SUCCESS] Class: {}, Method: {} - executed successfully", className, methodName);
    }
}

