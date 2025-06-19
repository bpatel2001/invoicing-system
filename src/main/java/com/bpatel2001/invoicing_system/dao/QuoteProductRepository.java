package com.bpatel2001.invoicing_system.dao;

import com.bpatel2001.invoicing_system.entity.Quotes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="quotesproducts")
public interface QuoteProductRepository extends JpaRepository<Quotes, Long> {
}
