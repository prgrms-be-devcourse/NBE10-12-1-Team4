package com.backend.domain.order.repository;

import com.backend.domain.order.entity.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailLogRepository extends JpaRepository<EmailLog, String> {

    List<EmailLog> findByEmail(String email);

    List<EmailLog> findByOrder_Id(String orderId);
}