package com.bpatel2001.invoicing_system.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.bpatel2001.invoicing_system.entity.QuotesProducts;
import com.bpatel2001.invoicing_system.entity.QuotesProductsId;

@CrossOrigin(origins = {"http://localhost:5173",
                        "https://invoicing-system-1.onrender.com/"})
@RepositoryRestResource(path = "quotesproducts")
public interface QuoteProductRepository extends JpaRepository<QuotesProducts, QuotesProductsId> {
}
