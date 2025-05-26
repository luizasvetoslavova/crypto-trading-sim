package com.cryptosim.backend.controller;

import lombok.AllArgsConstructor;
import com.cryptosim.backend.model.Holding;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@AllArgsConstructor
public class HoldingsRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<Holding> getAllHoldings() {
        return jdbcTemplate.query("SELECT cryptocurrency, amount FROM holdings", new HoldingMapper());
    }

    public void upsertHolding(Holding holding) {
        jdbcTemplate.update(
                "INSERT INTO holdings (cryptocurrency, amount) VALUES (?, ?) " +
                        "ON CONFLICT (cryptocurrency) DO UPDATE SET amount = EXCLUDED.amount",
                holding.getCryptocurrency(), holding.getAmount()
        );
    }

    public void resetHoldings() {
        jdbcTemplate.update("DELETE FROM holdings");
    }

    static class HoldingMapper implements RowMapper<Holding> {
        @Override
        public Holding mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Holding(rs.getString("cryptocurrency"), rs.getDouble("amount"));
        }
    }
}