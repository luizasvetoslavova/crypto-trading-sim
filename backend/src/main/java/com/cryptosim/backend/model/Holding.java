package com.cryptosim.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Holding {
    private String cryptocurrency;
    private double amount;
}