package com.bpatel2001.invoicing_system.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="quotes")
public class Quotes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="quote_id")
    private int id;

    @ManyToOne
    @JoinColumn(name="customer_id", nullable = false)
    private Customers customer;

    @Column(name="quote_date", nullable = false)
    private LocalDateTime quoteDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private QuotesStatus status = QuotesStatus.NOT_SIGNED;

    @Column(name = "total_cost")
    private double totalCost;

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<QuotesProducts> quotesProducts = new HashSet<>();

    public Quotes () {

    }

    public Quotes(Customers customer, LocalDateTime quoteDate, QuotesStatus status, double totalCost, Set<QuotesProducts> quotesProducts) {
        this.customer = customer;
        this.quoteDate = quoteDate;
        this.status = status;
        this.totalCost = totalCost;
        this.quotesProducts = quotesProducts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public LocalDateTime getQuoteDate() {
        return quoteDate;
    }

    public void setQuoteDate(LocalDateTime quoteDate) {
        this.quoteDate = quoteDate;
    }

    public QuotesStatus getStatus() {
        return status;
    }

    public void setStatus(QuotesStatus status) {
        this.status = status;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public Set<QuotesProducts> getQuotesProducts() {
        return quotesProducts;
    }

    public void setQuotesProducts(Set<QuotesProducts> quotesProducts) {
        this.quotesProducts = quotesProducts;
    }

    @Override
    public String toString() {
        return "Quotes{" +
                "id=" + id +
                ", customer=" + customer +
                ", quoteDate=" + quoteDate +
                ", status=" + status +
                ", totalCost=" + totalCost +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quotes quote = (Quotes) o;
        return Objects.equals(id, quote.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
