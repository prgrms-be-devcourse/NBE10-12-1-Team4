package com.backend.domain.menu.service;

import com.backend.domain.menu.dto.MenuActiveRequest;
import com.backend.domain.menu.dto.MenuRequest;
import com.backend.domain.menu.entity.Menu;
import com.backend.domain.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MenuService {

	private static final String UPLOAD_DIR = "uploads/";

	private final MenuRepository menuRepository;

	//원두 전체 조회
	public List<Menu> findAll() {
		return menuRepository.findAll();
	}

	//원두 단일 조회
	public Optional<Menu> findById(Integer id) {
		return menuRepository.findById(id);
	}

	//원두 생성
	public Menu writeMenu(MenuRequest request) throws IOException {
		MultipartFile imgFile = request.getImg();

		String originName = "";
		String imageUrl = "";

		if (imgFile != null && !imgFile.isEmpty()) {
			originName = imgFile.getOriginalFilename();
			String ext = originName.substring(originName.lastIndexOf("."));
			String imgName = UUID.randomUUID().toString() + ext;
			imageUrl = "/" + UPLOAD_DIR + imgName;

			Path uploadPath = Paths.get(UPLOAD_DIR);
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			imgFile.transferTo(uploadPath.resolve(imgName));
		}

		Menu newMenu = Menu.builder()
				.name(request.getName())
				.origin(request.getOrigin())
				.price(request.getPrice())
				.stock(request.getStock())
				.weight(request.getWeight())
				.description(request.getDescription())
				.active(true)
				.imageUrl(imageUrl)
				.imgName(originName)
				.build();

		return menuRepository.save(newMenu);
	}

	//원두 수정
	public Menu modifyMenu(int id, MenuRequest request) throws IOException {
		Menu menu = menuRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("메뉴를 찾을 수 없습니다."));

		MultipartFile imgFile = request.getImg();

		String imageUrl = menu.getImageUrl();
		String imgName = menu.getImgName();

		if (imgFile != null && !imgFile.isEmpty()) {
			String originName = imgFile.getOriginalFilename();
			String ext = originName.substring(originName.lastIndexOf("."));
			String newImgName = UUID.randomUUID().toString() + ext;
			imageUrl = "/" + UPLOAD_DIR + newImgName;
			imgName = originName;

			Path uploadPath = Paths.get(UPLOAD_DIR);
			if (!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			imgFile.transferTo(uploadPath.resolve(newImgName));
		}

		menu.update(
				request.getName(),
				request.getOrigin(),
				request.getPrice(),
				request.getStock(),
				request.getWeight(),
				request.getDescription(),
				imageUrl,
				imgName
		);

		return menu;
	}

	public Menu activeModify(int id, MenuActiveRequest request) {
		Menu menu = menuRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("메뉴를 찾을 수 없습니다."));
		menu.setActive(request.getActive());
		return menu;
	}

	public void delete(Menu menu) {
		menuRepository.delete(menu);
	}
}
