package com.bpatel2001.invoicing_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bpatel2001.invoicing_system.dto.QuotesProductsDTO;
import com.bpatel2001.invoicing_system.entity.QuotesProducts;
import com.bpatel2001.invoicing_system.service.QuotesProductsService;

@CrossOrigin(origins = {"http://localhost:5173",
                        "https://invoicing-system-1.onrender.com"})
@RequestMapping("/api/quotesproducts")
public class QuotesProductsController {

    @Autowired
    private QuotesProductsService quotesProductsService;

    @PostMapping
    public ResponseEntity<QuotesProducts> addProductToQuote(@RequestBody QuotesProductsDTO dto) {
        QuotesProducts qp = quotesProductsService.addProductToQuote(dto);
        return ResponseEntity.ok(qp);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllProducts() {
        quotesProductsService.deleteAllQuoteProducts();
        return ResponseEntity.noContent().build();
    }
}