package com.backend.domain.menu.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MenuRequest {
	private String name;
	private String origin;
	private Integer weight;
	private Integer price;
	private String description;
	private MultipartFile img;
	private Boolean active;
	private Integer stock;
}
