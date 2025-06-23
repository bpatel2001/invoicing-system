package com.bpatel2001.invoicing_system.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.bpatel2001.invoicing_system.entity.Products;

@RepositoryRestResource(path="products")
public interface ProductRepository extends JpaRepository<Products, Integer> {
}
