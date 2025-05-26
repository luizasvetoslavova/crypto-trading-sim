package com.cryptosim.backend.controller;

import com.cryptosim.backend.model.Holding;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.mockito.Mockito.*;

class HoldingsRepositoryTest {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private HoldingsRepository holdingsRepository;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllHoldings_shouldQueryHoldings() {
        holdingsRepository.getAllHoldings();

        verify(jdbcTemplate).query(eq("SELECT cryptocurrency, amount FROM holdings"),
                any(HoldingsRepository.HoldingMapper.class));
    }

    @Test
    void upsertHolding_shouldInsertOrUpdate() {
        Holding h = new Holding("BTC", 1.23);

        holdingsRepository.upsertHolding(h);

        verify(jdbcTemplate).update(
                contains("INSERT INTO holdings"),
                eq("BTC"), eq(1.23)
        );
    }

    @Test
    void resetHoldings_shouldDeleteAll() {
        holdingsRepository.resetHoldings();

        verify(jdbcTemplate).update("DELETE FROM holdings");
    }
}