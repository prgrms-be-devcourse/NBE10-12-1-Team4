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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

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
}