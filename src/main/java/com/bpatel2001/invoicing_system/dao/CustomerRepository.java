package com.bpatel2001.invoicing_system.dao;

import com.bpatel2001.invoicing_system.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="customers")
public interface CustomerRepository extends JpaRepository<Customers, Integer> {
}
