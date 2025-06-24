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
            // The UPDATE logic is fine, no changes needed here.
            QuotesProducts quotesProductToUpdate = existingEntry.get();
            quotesProductToUpdate.setQuantity(dto.getQuantity());
            quotesProductToUpdate.setPriceAtQuote(dto.getPriceAtQuote());
            
            return quotesProductsRepository.save(quotesProductToUpdate);

        } else {
            // --- REVISED INSERT LOGIC ---
            
            // First, fetch the parent entities. This is correct.
            Quotes quote = quotesRepository.findById(dto.getQuoteId())
                    .orElseThrow(() -> new EntityNotFoundException("Quote not found with id: " + dto.getQuoteId()));

            Products product = productsRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + dto.getProductId()));

            // Create a new instance
            QuotesProducts newQuotesProduct = new QuotesProducts();

            // Set the relationships. DO NOT set the ID manually.
            // @MapsId will instruct JPA to populate the ID from these objects at save time.
            newQuotesProduct.setQuote(quote);
            newQuotesProduct.setProduct(product);
            
            // Set the extra columns on the join entity
            newQuotesProduct.setQuantity(dto.getQuantity());
            newQuotesProduct.setPriceAtQuote(dto.getPriceAtQuote());

            // Save the new entry
            return quotesProductsRepository.save(newQuotesProduct);
        }
    }

    @Transactional
    public void deleteAllQuoteProducts() {
        // JpaRepository provides a highly efficient deleteAll() method
        quotesProductsRepository.deleteAll();
    }
}