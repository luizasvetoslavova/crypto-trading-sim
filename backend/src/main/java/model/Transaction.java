package com.cryptosim.backend;

import java.time.LocalDateTime;

public class Transaction {
    private boolean isBuy;
    private String cryptocurrency;
    private int units;
    private double pricePerUnit;
    private double total;
    private LocalDateTime timestamp;

    public Transaction(boolean isBuy, String cryptocurrency, int units, double pricePerUnit,
                       double total, LocalDateTime timestamp) {
        this.isBuy = isBuy;
        this.cryptocurrency = cryptocurrency;
        this.units = units;
        this.pricePerUnit = pricePerUnit;
        this.total = total;
        this.timestamp = timestamp;
    }

    public boolean isBuy() {
        return isBuy;
    }

    public void setBuy(boolean buy) {
        isBuy = buy;
    }

    public String getCryptocurrency() {
        return cryptocurrency;
    }

    public void setCryptocurrency(String cryptocurrency) {
        this.cryptocurrency = cryptocurrency;
    }

    public int getUnits() {
        return units;
    }

    public void setUnits(int units) {
        this.units = units;
    }

    public double getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
