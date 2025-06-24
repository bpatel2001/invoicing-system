package com.bpatel2001.invoicing_system.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="quote_products")
public class QuotesProducts {
    @EmbeddedId
    private QuotesProductsId id;

    @ManyToOne
    @MapsId("quoteId")
    @JoinColumn(name="quote_id")
    private Quotes quote;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Products product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price_at_quote", nullable = false)
    private double priceAtQuote;

    public QuotesProducts() {

    }

    public QuotesProducts(QuotesProductsId id, Quotes quote, Products product, int quantity, double priceAtQuote) {
        this.id = id;
        this.quote = quote;
        this.product = product;
        this.quantity = quantity;
        this.priceAtQuote = priceAtQuote;
    }

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

    public String getProductName() {
        return product != null ? product.getName() : null;
    }

    @Override
    public String toString() {
        return "QuotesProducts{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", priceAtQuote=" + priceAtQuote +
                '}';
    }

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
