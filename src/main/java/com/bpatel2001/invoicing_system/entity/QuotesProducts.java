package com.bpatel2001.invoicing_system.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="quote_products")
public class QuotesProducts {
    
    // The Fix: Initialize the embedded ID to prevent NullPointerException.
    @EmbeddedId
    private QuotesProductsId id = new QuotesProductsId();

    @ManyToOne(fetch = FetchType.LAZY) // Using LAZY fetch is a good practice for performance
    @MapsId("quoteId")
    @JoinColumn(name="quote_id")
    private Quotes quote;

    @ManyToOne(fetch = FetchType.LAZY) // Using LAZY fetch is a good practice for performance
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Products product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price_at_quote", nullable = false)
    private double priceAtQuote;

    // A no-argument constructor is required by JPA
    public QuotesProducts() {
    }

    public QuotesProducts(Quotes quote, Products product, int quantity, double priceAtQuote) {
        this.quote = quote;
        this.product = product;
        this.quantity = quantity;
        this.priceAtQuote = priceAtQuote;
    }

    // --- Getters and Setters ---

    public QuotesProductsId getId() {
        return id;
    }

    public void setId(QuotesProductsId id) {
        this.id = id;
    }

    public Quotes getQuote() {
        return quote;
    }

    public void setQuote(Quotes quote) {
        this.quote = quote;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPriceAtQuote() {
        return priceAtQuote;
    }

    public void setPriceAtQuote(double priceAtQuote) {
        this.priceAtQuote = priceAtQuote;
    }

    @Transient
    public String getProductName() {
        return product != null ? product.getName() : null;
    }

    // --- equals() and hashCode() ---

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuotesProducts that = (QuotesProducts) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
