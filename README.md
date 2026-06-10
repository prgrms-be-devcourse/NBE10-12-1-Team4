# ☕ 카페 메뉴 관리 서비스 프로젝트 기획 및 결과 보고서

## 1. 프로젝트 개요
저희 카페 **Grids & Circles**는 당일 로스팅된 신선한 원두를 매일 오후 2시에 일괄 배송하는 스페셜티 커피 전문점의 비회원 전용 주문 플랫폼입니다. 
관리자는 매일 쏟아지는 주문을 효율적으로 관리하고 통계를 확인할 수 있으며, 고객은 회원가입 없이 간편하게 주문하고 자동 합배송의 혜택을 누릴 수 있습니다.

* **프로젝트명**: Grids & Circles 카페 메뉴 Order Platform
* **개발 기간**: 7일 
* **팀명**: Team 404

---

## 2. 기술 스택
### Frontend
* **Core**: React, TypeScript, Vite
* **UI/Styling**: Radix UI Themes
* **State Management**: React Context API, 로컬스토리지 연동
* **Routing**: React Router DOM

### Backend
* **Core**: Java, Spring Boot
* **Database & ORM**: H2 Database, Spring Data JPA
* **Architecture**: Domain-Driven Design (DDD) 기반 계층형 아키텍처

---

## 3. 핵심 비즈니스 로직 및 기능

### 🧑‍💻 고객 (비회원)
1. **장바구니 및 원스톱 결제**: 상품 구경부터 결제 정보(이메일, 배송지 등) 입력까지 Drawer 모달에서 한 번에 처리.
2. **자동 합배송 (Auto-Merge) ⭐**:
   * 당일 **오후 2시(14:00) 이전** 주문 건에 한해, **동일 이메일**로 추가 주문 시 별도의 배송비나 새 주문 생성 없이 기존 주문 내역(PENDING)에 아이템이 자동으로 병합됩니다.
3. **주문 내역 조회**:
   * 이메일을 입력하여 본인의 주문 내역과 배송 상태를 간편하게 확인하는 비회원 주문 조회.

### 🛠️ 관리자 (Admin)
1. **대시보드 통계**: 당일 주문 건수, 매출액, 상품별 판매 통계 등을 한눈에 확인.
2. **메뉴 관리**: 판매할 커피 원두의 CRUD (Soft Delete 적용).
3. **주문 관리**: 전체 고객의 주문 내역을 확인하고 상태(PENDING ➡️ READY_FOR_DELIVERY)를 변경하여 배송 처리.

---

## 4. API 명세 (주요 엔드포인트)

### [고객 도메인]
* `POST /api/guest/orders`: 주문 생성 (내부적으로 합배송 로직 수행)
* `GET /api/guest/orders?email={email}`: 고객 이메일 기반 주문 내역 조회
* `GET /api/guest/orders/{orderNumber}`: 주문 번호로 단일 주문 조회

### [관리자 도메인 - 주문]
* `GET /api/guest/orders?email=admin`: 전체 주문 목록 조회
* `PATCH /api/guest/orders/active/{orderNumber}` : 주문 배송 상태 변경 (PENDING → READY_FOR_DELIVERY)

### [관리자 도메인 - 상품]
* `GET /api/admin/products`: 전체 상품 목록 조회
* `GET /api/admin/products/{id}`: 상품 단일 조회
* `POST /api/admin/products`: 신규 메뉴 등록
* `PUT /api/admin/products/{id}`: 메뉴 수정
* `PUT /api/admin/products/{id}/state`: 메뉴 판매 활성/비활성 상태 변경
* `DELETE /api/admin/products/{id}`: 메뉴 삭제

### [관리자 도메인 - 통계]
* `GET /api/admin/statistics/day?days={days}`: 일별 매출 조회 (기본값: 최근 30일)
* `GET /api/admin/statistics/bean`: 상품별 판매 통계 조회
* `GET /api/admin/statistics/range?startDate={yyyy-MM-dd}&endDate={yyyy-MM-dd}`: 기간별 매출 조회

---

## 5. 데이터베이스 설계 (ERD 요약)
* `Admin`: 관리자 계정 정보 (이메일, 암호화된 비밀번호)
* `Menu`: 상품 정보 (이름, 가격, 설명, 이미지명, 판매가능여부)
* `Order`: 고객 주문 메타 정보 (이메일, 주소, 우편번호, 연락처, 총금액, 배송일, 주문상태)
* `OrderItem`: 주문에 매핑된 개별 상품 내역 (메뉴ID, 수량, 구매당시단가)


---

## 6. 요구사항 명세서 (Requirements)

### [사용자 (고객) 요구사항]
1. **상품 조회**: 고객은 현재 판매 중인 커피 원두 목록과 상세 정보를 확인할 수 있다.
2. **장바구니**: 고객은 원하는 상품을 장바구니에 담고 수량을 조절하거나 삭제할 수 있다.
3. **비회원 결제**: 고객은 회원가입 없이 이메일, 주소, 연락처만 입력하여 주문을 접수할 수 있다.
4. **자동 합배송 (당일 마감 전)**: 오후 2시 이전에 동일한 이메일로 추가 주문을 할 경우, 기존 주문서에 새로운 상품이 자동으로 추가(병합)되어야 한다.
5. **주문 내역 조회**: 고객은 자신의 이메일을 입력하여 주문한 내역과 현재 배송 상태를 확인할 수 있다.

### [관리자 요구사항]
1. **관리자 인증**: 관리자는 정해진 이메일과 비밀번호로 로그인하여 시스템에 접근할 수 있다.
2. **대시보드 통계**: 관리자는 오늘의 총 매출, 주문 건수, 상품별 판매 비율 등 핵심 통계를 한눈에 볼 수 있다.
3. **주문 관리**: 관리자는 전체 고객의 주문 목록을 최신순으로 조회(페이지네이션)하고, 발송 처리를 위해 주문 상태를 변경할 수 있다.
4. **상품 관리**: 관리자는 새로운 원두를 등록, 수정, 삭제할 수 있으며, 삭제 시 실제 데이터베이스에서 지우지 않고 숨김 처리(Soft Delete)를 해야 한다.
