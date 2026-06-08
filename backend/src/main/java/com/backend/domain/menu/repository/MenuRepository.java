package com.backend.domain.menu.repository;

import com.backend.domain.menu.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, String> {

    List<Menu> findByActiveTrue();

    List<Menu> findByNameContaining(String keyword);
}