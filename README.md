# Project : 하이퍼클라우드 - 커뮤니티 어플리케이션 만들기

## 1. 프로젝트 소개

유저들이 서로 친구를 맺고 글을 올릴 수 있는 커뮤니티 앱을 만들기 위한 API를 구현했습니다.

    - 회원가입, 로그인(전준영)
    - 팔로우, 언팔로우(전은형)
    - 게시글 CRUD(오서준)
    - 좋아요, 댓글(오서준)


- **개발 언어** : Typescript

- **개발 프레임워크** : NestJS <사용이유..?>

- **DB** : MySQL <사용이유..?>


## 2. 개발 기간 및 인원

- **개발 기간** : 2022.10.11 - 2022.10.13(3일)

- **인원** : 오서준, 전은형, 전준영

## 3. 프로젝트 실행 방법
```
# 깃허브에서 레포지토리 클론받기
$ git clone https://github.com/pirenOrg/community-application-app-server.git

# 해당 디렉토리로 이동
$ cd community-application-app-server

# 패키지 설치
$ npm install

# .env파일 만들기
DATABASE_URL = mysql://USERNAME:PASSWORD@127.0.0.1:3306/DATABASE
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = 127.0.0.1
TYPEORM_PORT = 3306
TYPEORM_USERNAME = 계정
TYPEORM_PASSWORD = 비밀번호
TYPEORM_DATABASE = 데이터베이스 이름
JWT_SECRET_KEY = 시크릿키


# 데이터베이스 테이블 생성
?????????

# 프로젝트 실행
$ npm start

# server start : http://localhost:3000
```

## 4. 데이터 모델링
▶️ [dbdiagram Link](https://dbdiagram.io/d/634523e7f0018a1c5fd91ccb)

<img width="1083" alt="스크린샷 2022-10-13 오후 9 31 06" src="https://user-images.githubusercontent.com/78359232/195599471-a402e5d1-ddbf-4015-b171-4d87d3a2e601.png">

## 5. 프로젝트 구조
```
.
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── config
│   │   └── configuration.ts
│   ├── follows
│   │   ├── dto
│   │   │   ├── create-follow.dto.ts
│   │   │   └── update-follow.dto.ts
│   │   ├── entities
│   │   │   └── follow.entity.ts
│   │   ├── follows.controller.spec.ts
│   │   ├── follows.controller.ts
│   │   ├── follows.module.ts
│   │   ├── follows.service.spec.ts
│   │   └── follows.service.ts
│   ├── main.ts
│   ├── posts
│   │   ├── dto
│   │   │   ├── create-post.dto.ts
│   │   │   └── update-post.dto.ts
│   │   ├── entities
│   │   │   └── post.entity.ts
│   │   ├── post.controller.spec.ts
│   │   ├── post.controller.ts
│   │   ├── post.module.ts
│   │   ├── post.service.spec.ts
│   │   └── post.service.ts
│   └── users
│       ├── dto
│       │   └── create-user.dto.ts
│       ├── entities
│       │   └── user.entity.ts
│       ├── security
│       │   ├── jwt.guard.ts
│       │   ├── jwt.strategy.ts
│       │   └── payload.interface.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json


```

## 6. 구현 기능 설명

### 1) 회원가입 (전준영)
  - 구현 기능 설명

### 2) 로그인 (전준영)
  - 구현 기능 설명
    
### 3) 팔로우, 언팔로우 (전은형)
  - 구현 기능 설명
      
### 4) 포스트 CRUD (오서준)
  - 구현 기능 설명

### 5) 좋아요 (오서준)
  - 구현 기능 설명
 
### 6) 댓글 (오서준)
  - 구현 기능 설명

## 7. API Docs

▶️ [POSTMAN]()
여기 링크 
ㅇ첨부해야함!
ㅇ!!!!!!!!!

## 8. DB 테이블 생성 스크립트
```
CREATE TABLE `users` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(30) UNIQUE NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `is_active` TINYINT,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `emoticons` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `name` VARCHAR(10)
);

CREATE TABLE `statuses` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `name` VARCHAR(100)
);

CREATE TABLE `posts` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `title` VARCHAR(30),
   `content` VARCHAR(300),
   `user_id` INT,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE `post_status` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `post_id` INT,
   `status_id` INT, 
   FOREIGN KEY (post_id) REFERENCES posts (id),
   FOREIGN KEY (status_id) REFERENCES statuses (id)
);

CREATE TABLE `post_emoticon` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `post_id` INT,
   `user_id` INT,
   `emoticon_id` INT,
   `created_at` DATETIME DEFAULT NOW(),
   FOREIGN KEY (post_id) REFERENCES posts (id),
   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (emoticon_id) REFERENCES emoticons (id)
);

CREATE TABLE `comments` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `content` VARCHAR(100),
   `user_id` INT,
   `post_id` INT,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE `follows` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `follower_id` int,
   `followee_id` int,
   `is_block` tinyint,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (follower_id) REFERENCES users (id),
   FOREIGN KEY (followee_id) REFERENCES users (id)
);

CREATE TABLE `signout_infos` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `reason` VARCHAR(200),
   `user_id` INT,
   `created_at` DATETIME DEFAULT NOW(),
   FOREIGN KEY (user_id) REFERENCES users (id)
);
```


