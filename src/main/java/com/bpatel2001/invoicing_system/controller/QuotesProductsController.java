package com.bpatel2001.invoicing_system.controller;

import com.bpatel2001.invoicing_system.dto.QuotesProductsDTO;
import com.bpatel2001.invoicing_system.entity.QuotesProducts;
import com.bpatel2001.invoicing_system.service.QuotesProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotesproducts")
public class QuotesProductsController {

    @Autowired
    private QuotesProductsService quotesProductsService;

    @PostMapping
    public ResponseEntity<QuotesProducts> addProductToQuote(@RequestBody QuotesProductsDTO dto) {
        QuotesProducts qp = quotesProductsService.addProductToQuote(dto);
        return ResponseEntity.ok(qp);
    }
}