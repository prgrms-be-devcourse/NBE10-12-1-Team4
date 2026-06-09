package com.backend.domain.menu.entity;

import com.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "menus")
public class Menu extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String origin; //원산지

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Integer weight;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false, length = 500)
    private String imgName;

    public void update(String name, String origin, Integer price, Integer stock, Integer weight,
                       String description, boolean active, String imageUrl, String imgName) {
        this.name = name;
        this.origin = origin;
        this.price = price;
        this.stock = stock;
        this.weight = weight;
        this.description = description;
        this.active = active;
        this.imageUrl = imageUrl;
        this.imgName = imgName;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}