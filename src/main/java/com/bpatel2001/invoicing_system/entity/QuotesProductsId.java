package com.bpatel2001.invoicing_system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class QuotesProductsId implements Serializable {
    @Column(name="quote_id")
    private long quoteId;

    @Column(name="product_id")
    private long productId;

    public QuotesProductsId() {

    }

    public QuotesProductsId(long productId, long quoteId) {
        this.productId = productId;
        this.quoteId = quoteId;
    }

    public long getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(long quoteId) {
        this.quoteId = quoteId;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
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
