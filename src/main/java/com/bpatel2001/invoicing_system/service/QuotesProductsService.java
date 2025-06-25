package com.bpatel2001.invoicing_system.service;

import com.bpatel2001.invoicing_system.dao.ProductRepository;
import com.bpatel2001.invoicing_system.dao.QuoteProductRepository;
import com.bpatel2001.invoicing_system.dao.QuoteRepository;
import com.bpatel2001.invoicing_system.dto.QuotesProductsDTO;
import com.bpatel2001.invoicing_system.entity.*;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.util.Optional;

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

    @Transactional
    public QuotesProducts addProductToQuote(QuotesProductsDTO dto) {

        QuotesProductsId id = new QuotesProductsId(dto.getQuoteId(), dto.getProductId());
        Optional<QuotesProducts> existingEntry = quotesProductsRepository.findById(id);

        if (existingEntry.isPresent()) {
            QuotesProducts quotesProductToUpdate = existingEntry.get();
            quotesProductToUpdate.setQuantity(dto.getQuantity());
            quotesProductToUpdate.setPriceAtQuote(dto.getPriceAtQuote());
            
            return quotesProductsRepository.save(quotesProductToUpdate);

        } else {
            Quotes quote = quotesRepository.findById(dto.getQuoteId())
                    .orElseThrow(() -> new EntityNotFoundException("Quote not found with id: " + dto.getQuoteId()));

            Products product = productsRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + dto.getProductId()));

            QuotesProducts newQuotesProduct = new QuotesProducts();
            newQuotesProduct.setId(new QuotesProductsId(dto.getQuoteId(), dto.getProductId()));
            newQuotesProduct.setQuote(quote);
            newQuotesProduct.setProduct(product);
            newQuotesProduct.setQuantity(dto.getQuantity());
            newQuotesProduct.setPriceAtQuote(dto.getPriceAtQuote());

            return quotesProductsRepository.save(newQuotesProduct);
        }
    }

    @Transactional
    public void deleteAllQuoteProducts() {
        quotesProductsRepository.deleteAll();
    }
}