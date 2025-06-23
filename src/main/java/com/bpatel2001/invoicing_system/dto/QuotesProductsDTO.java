package com.bpatel2001.invoicing_system.dto;

public class QuotesProductsDTO {
    private int quoteId;
    private int productId;
    private int quantity;
    private double priceAtQuote;

    // getters and setters

    public int getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(int quoteId) {
        this.quoteId = quoteId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
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
}