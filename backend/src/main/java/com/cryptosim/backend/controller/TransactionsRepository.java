package com.cryptosim.backend.controller;

import lombok.AllArgsConstructor;
import com.cryptosim.backend.model.Transaction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

@Repository
@AllArgsConstructor
public class TransactionsRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<Transaction> getAllTransactions() {
        return jdbcTemplate.query("SELECT * FROM transactions ORDER BY timestamp DESC", new TransactionMapper());
    }

    public void insertTransaction(Transaction tx) {
        jdbcTemplate.update("INSERT INTO transactions (is_buy, cryptocurrency, units, price_per_unit, total, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
                tx.isBuy(), tx.getCryptocurrency(), tx.getUnits(), tx.getPricePerUnit(), tx.getTotal(), Timestamp.valueOf(tx.getTimestamp()));
    }

    public void resetTransactions() {
        jdbcTemplate.update("DELETE FROM transactions");
    }

    private static class TransactionMapper implements RowMapper<Transaction> {
        @Override
        public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Transaction(
                    rs.getBoolean("is_buy"),
                    rs.getString("cryptocurrency"),
                    rs.getDouble("units"),
                    rs.getDouble("price_per_unit"),
                    rs.getDouble("total"),
                    rs.getTimestamp("timestamp").toLocalDateTime()
            );
        }
    }
}