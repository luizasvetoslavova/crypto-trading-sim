package com.cryptosim.backend.controller;

import lombok.AllArgsConstructor;
import com.cryptosim.backend.model.Balance;
import com.cryptosim.backend.model.Holding;
import com.cryptosim.backend.model.Transaction;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@AllArgsConstructor
public class AccountController {
    private final BalanceRepository balanceRepo;
    private final HoldingsRepository holdingsRepo;
    private final TransactionsRepository transactionRepo;

    @GetMapping("/balance")
    public Balance getBalance() {
        return balanceRepo.getBalance();
    }

    @PostMapping("/balance")
    public void updateBalance(@RequestBody Balance balance) {
        balanceRepo.updateBalance(balance);
    }

    @GetMapping("/holdings")
    public List<Holding> getHoldings() {
        return holdingsRepo.getAllHoldings();
    }

    @PostMapping("/holdings")
    public void upsertHolding(@RequestBody Holding holding) {
        holdingsRepo.upsertHolding(holding);
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return transactionRepo.getAllTransactions();
    }

    @PostMapping("/transactions")
    public void insertTransaction(@RequestBody Transaction transaction) {
        transactionRepo.insertTransaction(transaction);
    }

    @PostMapping("/reset")
    public void resetAll() {
        balanceRepo.resetBalance();
        holdingsRepo.resetHoldings();
        transactionRepo.resetTransactions();
    }
}