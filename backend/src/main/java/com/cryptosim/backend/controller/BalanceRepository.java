package com.cryptosim.backend.controller;

import lombok.AllArgsConstructor;
import com.cryptosim.backend.model.Balance;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class BalanceRepository {
    private final JdbcTemplate jdbcTemplate;

    public Balance getBalance() {
        Double amount = jdbcTemplate.queryForObject("SELECT amount FROM balance LIMIT 1", Double.class);
        return new Balance(amount);
    }

    public void updateBalance(Balance balance) {
        jdbcTemplate.update("UPDATE balance SET amount = ?", balance.getAmount());
    }

    public void resetBalance() {
        jdbcTemplate.update("UPDATE balance SET amount = 10000");
    }
}