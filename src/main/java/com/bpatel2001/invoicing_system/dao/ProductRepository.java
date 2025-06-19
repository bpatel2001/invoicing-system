package com.bpatel2001.invoicing_system.dao;

import com.bpatel2001.invoicing_system.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="products")
public interface ProductRepository extends JpaRepository<Products, Integer> {
}
