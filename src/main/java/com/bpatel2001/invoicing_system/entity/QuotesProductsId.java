package com.bpatel2001.invoicing_system.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class QuotesProductsId implements Serializable {
    @Column(name="quote_id")
    private int quoteId;

    @Column(name="product_id")
    private int productId;

    public QuotesProductsId() {

    }

    public QuotesProductsId(int productId, int quoteId) {
        this.productId = productId;
        this.quoteId = quoteId;
    }

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

    @Override
    public String toString() {
        return "QuotesProductsId{" +
                "quoteId=" + quoteId +
                ", productId=" + productId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuotesProductsId that = (QuotesProductsId) o;
        return Objects.equals(quoteId, that.quoteId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quoteId, productId);
    }
}
