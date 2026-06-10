package com.backend.domain.menu.controller;

import com.backend.domain.menu.dto.MenuActiveRequest;
import com.backend.domain.menu.dto.MenuRequest;
import com.backend.domain.menu.dto.MenuResponse;
import com.backend.domain.menu.entity.Menu;
import com.backend.domain.menu.service.MenuService;
import com.backend.global.resData.RsData;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/products")
public class MenuController {

    private final MenuService menuService;

    @GetMapping
    public List<MenuResponse> getMenus() {
        List<Menu> items = menuService.findAll();
        return items
                .stream()
                .map(MenuResponse::new)
                .toList();
    }

    @GetMapping("/{id}")
    public MenuResponse getMenu(
            @PathVariable int id
    ) {
        Menu menu = menuService.findById(id).get();
        return new MenuResponse(menu);
    }

    @PostMapping
    public RsData<MenuResponse> create(@ModelAttribute MenuRequest request) throws IOException {
        Menu menu = menuService.writeMenu(request);
        return new RsData<>(
                "201",
                "%d번 상품이 생성되었습니다.".formatted(menu.getId())
        );
    }

    @PutMapping("/{id}")
    public RsData<MenuResponse> modify(@PathVariable int id, @ModelAttribute MenuRequest request) throws IOException {
        Menu menu = menuService.modifyMenu(id, request);
        return new RsData<>(
                "200",
                "%d번 상품이 수정되었습니다.".formatted(menu.getId())
        );
    }

    @PutMapping("/{id}/state")
    public RsData<MenuResponse> activeModify(@PathVariable int id,@RequestBody MenuActiveRequest request) {
        Menu menu = menuService.activeModify(id, request);
        return new RsData<>(
                "200",
                "%d번 상품이 수정되었습니다.".formatted(menu.getId())
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Void> delete(
            @PathVariable int id
    ) {
        Menu menu = menuService.findById(id).get();
        menuService.delete(menu);
        return new RsData<>(
                "200",
                "%d번 상품이 삭제되었습니다.".formatted(id)
        );
    }
}
