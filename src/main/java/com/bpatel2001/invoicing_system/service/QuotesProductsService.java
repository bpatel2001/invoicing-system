package com.bpatel2001.invoicing_system.service;

import com.bpatel2001.invoicing_system.dao.ProductRepository;
import com.bpatel2001.invoicing_system.dao.QuoteProductRepository;
import com.bpatel2001.invoicing_system.dao.QuoteRepository;
import com.bpatel2001.invoicing_system.dto.QuotesProductsDTO;
import com.bpatel2001.invoicing_system.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuotesProductsService {

    @Autowired
    private QuoteRepository quotesRepository;
    @Autowired
    private ProductRepository productsRepository;
    @Autowired
    private QuoteProductRepository quotesProductsRepository;

    public QuotesProducts addProductToQuote(QuotesProductsDTO dto) {
        Quotes quote = quotesRepository.findById(dto.getQuoteId())
                .orElseThrow(() -> new RuntimeException("Quote not found"));
        Products product = productsRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        QuotesProductsId id = new QuotesProductsId(dto.getQuoteId(), dto.getProductId());
        QuotesProducts qp = new QuotesProducts();
        qp.setId(id);
        qp.setQuote(quote);
        qp.setProduct(product);
        qp.setQuantity(dto.getQuantity());
        qp.setPriceAtQuote(dto.getPriceAtQuote());

        return quotesProductsRepository.save(qp);
    }
}