package com.gridscircles.cafe.order.entity;

import com.gridscircles.cafe.menu.entity.Menu;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "order_items",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_order_menu",
                        columnNames = {
                                "order_id",
                                "menu_id"
                        }
                )
        }
)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;

    @Column(nullable = false)
    private String menuNameSnapshot;

    @Column(nullable = false)
    private Integer unitPriceSnapshot;

    @Column(nullable = false)
    private Integer quantity;

    public void increaseQuantity(int amount) {
        this.quantity += amount;
    }

}