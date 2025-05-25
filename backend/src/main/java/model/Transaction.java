package model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Transaction {
    private boolean isBuy;
    private String cryptocurrency;
    private double units;
    private double pricePerUnit;
    private double total;
    private LocalDateTime timestamp;
}