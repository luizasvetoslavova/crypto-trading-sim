package com.cryptosim.backend.controller;

import com.cryptosim.backend.model.Balance;
import com.cryptosim.backend.model.Holding;
import com.cryptosim.backend.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AccountControllerTest {

    @Mock
    private BalanceRepository balanceRepo;

    @Mock
    private HoldingsRepository holdingsRepo;

    @Mock
    private TransactionsRepository transactionRepo;

    @InjectMocks
    private AccountController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getBalance_shouldReturnCorrectBalance() {
        Balance expected = new Balance(1234.56);
        when(balanceRepo.getBalance()).thenReturn(expected);

        Balance result = controller.getBalance();

        assertEquals(expected, result);
        verify(balanceRepo).getBalance();
    }

    @Test
    void updateBalance_shouldCallRepo() {
        Balance b = new Balance(9999.99);

        controller.updateBalance(b);

        verify(balanceRepo).updateBalance(b);
    }

    @Test
    void getHoldings_shouldReturnHoldingsList() {
        List<Holding> holdings = Arrays.asList(
                new Holding("BTC", 1.2),
                new Holding("ETH", 3.4)
        );
        when(holdingsRepo.getAllHoldings()).thenReturn(holdings);

        List<Holding> result = controller.getHoldings();

        assertEquals(holdings, result);
        verify(holdingsRepo).getAllHoldings();
    }

    @Test
    void upsertHolding_shouldCallRepo() {
        Holding h = new Holding("ADA", 5.0);

        controller.upsertHolding(h);

        verify(holdingsRepo).upsertHolding(h);
    }

    @Test
    void getTransactions_shouldReturnTransactionList() {
        List<Transaction> txs = List.of(
                new Transaction(true, "DOGE", 100, 0.05, 5.0, LocalDateTime.now())
        );
        when(transactionRepo.getAllTransactions()).thenReturn(txs);

        List<Transaction> result = controller.getTransactions();

        assertEquals(txs, result);
        verify(transactionRepo).getAllTransactions();
    }

    @Test
    void insertTransaction_shouldCallRepo() {
        Transaction tx = new Transaction(false, "SOL", 10, 20, 200, LocalDateTime.now());

        controller.insertTransaction(tx);

        verify(transactionRepo).insertTransaction(tx);
    }

    @Test
    void resetAll_shouldCallResetOnBalanceAndHoldings() {
        controller.resetAll();

        verify(balanceRepo).resetBalance();
        verify(holdingsRepo).resetHoldings();
        verifyNoMoreInteractions(transactionRepo);
    }
}