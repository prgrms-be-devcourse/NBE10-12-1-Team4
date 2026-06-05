package com.gridscircles.cafe.admin.entity;

import com.gridscircles.cafe.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name="admins")
public class Admin extendsBaseEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @Column(nullable=false,unique=true)
    private String email;

    @Column(nullable=false)
    private String passwordHash;
}