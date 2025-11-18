package com.example.demo.repository;

import com.example.demo.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

// repository vmesnik, ki omogoča delo z bazo za entiteto Activity
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    // nič dodatnega ni treba pisati — JpaRepository avtomatsko ustvari:
    // - findAll()
    // - findById()
    // - save()
    // - deleteById()
    // - count()
    // - itd.
}