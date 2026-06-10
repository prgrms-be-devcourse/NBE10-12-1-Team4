package com.backend.global.initData;

import com.backend.domain.menu.entity.Menu;
import com.backend.domain.menu.repository.MenuRepository;
import com.backend.domain.menu.service.MenuService;
import com.backend.domain.order.entity.Order;
import com.backend.domain.order.entity.OrderItem;
import com.backend.domain.order.entity.OrderStatus;
import com.backend.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
	@Autowired
	@Lazy
	private BaseInitData self;
	private final MenuService menuService;
	private final MenuRepository menuRepository;
	private final OrderRepository orderRepository;

	@Bean
	ApplicationRunner baseInitDataApplicationRunner() {
		return args -> {
			self.work1();
			self.work2();
		};
	}

	@Transactional
	public void work1() {
		if (menuService.count() > 0) return;

		menuRepository.saveAll(List.of(
				Menu.builder()
						.name("에티오피아 예가체프")
						.origin("에티오피아")
						.description("꽃향기와 과일향이 특징인 스페셜티 원두")
						.price(18000)
						.stock(50)
						.weight(200)
						.active(true)
						.imageUrl("/uploads/p1.png")
						.imgName("p1.png")
						.build(),
				Menu.builder()
						.name("콜롬비아 라니뇨")
						.origin("콜롬비아")
						.description("부드러운 산미와 캐러멜 향이 조화로운 원두")
						.price(15000)
						.stock(30)
						.weight(200)
						.active(true)
						.imageUrl("/uploads/p2.png")
						.imgName("p2.png")
						.build(),
				Menu.builder()
						.name("브라질 세하도")
						.origin("브라질")
						.description("고소하고 달콤한 초콜릿 향의 원두")
						.price(12000)
						.stock(100)
						.weight(200)
						.active(true)
						.imageUrl("/uploads/p5.png")
						.imgName("p5.png")
						.build(),
				Menu.builder()
						.name("과테말라 안티구아")
						.origin("과테말라")
						.description("진한 다크초콜릿과 스모키 향의 원두")
						.price(16000)
						.stock(20)
						.weight(200)
						.active(true)
						.imageUrl("/uploads/p4.png")
						.imgName("p4.png")
						.build()
		));
	}

	@Transactional
	public void work2() {
		if (orderRepository.count() > 0) return;

		List<Menu> menus = menuRepository.findAll();
		if (menus.isEmpty()) return;

		for (int day = 1; day <= 9; day++) {
			LocalDateTime dateTime = LocalDateTime.of(2026, 6, day, 10, 0);
			Menu menu = menus.get(ThreadLocalRandom.current().nextInt(menus.size()));

			Order order = Order.builder()
					.orderNumber((long) day)
					.email("test" + day + "@test.com")
					.address("서울시 강남구 테스트로 " + day)
					.zipcode("06000")
					.phone("010-1234-000" + day)
					.batchDeadline(LocalDate.of(2026, 6, day).atTime(14, 0))
					.deliveryDate(LocalDate.of(2026, 6, day).plusDays(1))
					.status(OrderStatus.READY_FOR_DELIVERY)
					.build();

			OrderItem item = OrderItem.builder()
					.order(order)
					.menu(menu)
					.menuNameSnapshot(menu.getName())
					.unitPriceSnapshot(menu.getPrice())
					.quantity(2 + (day % 3))
					.build();

			order.addOrderItem(item);
			order.calculateTotalAmount();

			Order saved = orderRepository.save(order);
			orderRepository.updateCreatedAt(saved.getId(), dateTime);
		}
	}
}
