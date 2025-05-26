package com.cryptosim.backend.controller;

import com.cryptosim.backend.model.Balance;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BalanceRepositoryTest {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private BalanceRepository balanceRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getBalance_shouldReturnCorrectBalance() {
        when(jdbcTemplate.queryForObject(anyString(), eq(Double.class)))
                .thenReturn(10000.0);

        Balance result = balanceRepository.getBalance();

        assertNotNull(result);
        assertEquals(10000.0, result.getAmount());
    }

    @Test
    void updateBalance_shouldExecuteUpdate() {
        Balance balance = new Balance(5000.0);

        balanceRepository.updateBalance(balance);

        verify(jdbcTemplate).update("UPDATE balance SET amount = ?", 5000.0);
    }

    @Test
    void resetBalance_shouldSetAmountToDefault() {
        balanceRepository.resetBalance();

        verify(jdbcTemplate).update("UPDATE balance SET amount = 10000");
    }
}