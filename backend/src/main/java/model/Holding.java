package com.cryptosim.backend;

public class Holding {
    private String cryptocurrency;
    private double amount;

    public Holding(String cryptocurrency, double amount) {
        this.cryptocurrency = cryptocurrency;
        this.amount = amount;
    }

    public String getCryptocurrency() {
        return cryptocurrency;
    }

    public void setCryptocurrency(String cryptocurrency) {
        this.cryptocurrency = cryptocurrency;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}