package com.cryptosim.backend.controller;

import com.cryptosim.backend.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;

import static org.mockito.Mockito.*;

class TransactionsRepositoryTest {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private TransactionsRepository transactionsRepository;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllTransactions_shouldQueryCorrectly() {
        transactionsRepository.getAllTransactions();

        verify(jdbcTemplate).query(eq("SELECT * FROM transactions ORDER BY timestamp DESC"),
                any(TransactionsRepository.TransactionMapper.class));
    }

    @Test
    void insertTransaction_shouldInsertTransaction() {
        Transaction tx = new Transaction(true, "ETH", 2, 1000, 2000, LocalDateTime.now());

        transactionsRepository.insertTransaction(tx);

        verify(jdbcTemplate).update(
                startsWith("INSERT INTO transactions"),
                eq(true),
                eq("ETH"),
                eq(2.0),
                eq(1000.0),
                eq(2000.0),
                any()
        );
    }
}