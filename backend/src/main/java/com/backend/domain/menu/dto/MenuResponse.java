package com.backend.domain.menu.dto;

import com.backend.domain.menu.entity.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MenuResponse {
	private Integer id;
	private String name;
	private String origin;
	private Integer weight;
	private Integer price;
	private String description;
	private String img;
	private boolean active;
	private String imgName;
	private Integer stock;

	public MenuResponse(Menu menu) {
		this.id = menu.getId();
		this.name = menu.getName();
		this.origin = menu.getOrigin();
		this.weight = menu.getWeight();
		this.price = menu.getPrice();
		this.description = menu.getDescription();
		this.img = menu.getImageUrl();
		this.active = menu.isActive();
		this.imgName = menu.getImgName();
		this.stock = menu.getStock();
	}
}
