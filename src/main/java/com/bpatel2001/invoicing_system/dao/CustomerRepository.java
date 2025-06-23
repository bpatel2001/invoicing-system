package com.bpatel2001.invoicing_system.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.bpatel2001.invoicing_system.entity.Customers;

@CrossOrigin(origins = "http://localhost:5173")
@RepositoryRestResource(path="customers")
public interface CustomerRepository extends JpaRepository<Customers, Integer> {
}
