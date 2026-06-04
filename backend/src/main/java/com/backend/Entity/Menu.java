packagecom.gridscircles.cafe.menu.entity;

        importcom.gridscircles.cafe.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access=AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name="menus")
public class Menu extends BaseEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @Column(nullable=false)
    private String name;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(nullable=false)
    private Integer price;

    @Column(nullable=false)
    private Integer stock;

    @Column(nullable=false)
    private boolean active;
}