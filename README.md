# Project : 하이퍼클라우드 - 커뮤니티 어플리케이션 만들기

## 1. 프로젝트 소개

유저들이 서로 친구를 맺고 글을 올릴 수 있는 커뮤니티 앱을 만들기 위한 API를 구현했습니다. 사내 기술 스택이 NestJS인 점을 고려하여, 해당 프레임워크와 Typescript를 공부하여 프로젝트에 적용해봤습니다. Typescript와 NestJS 둘다 사용 경험이 전무하여 다소 미흡합니다.😭 Express와 달리 NesJS는 백엔드 서버가 갖춰야하는 많은 필수 기능들이 이미 프레임워크에 내장되어 있어서 편리했습니다. 

## _구현한 기능_

    - 회원가입, 로그인(전준영)
    - 팔로우, 언팔로우(전은형)
    - 게시글 CRUD(오서준)
    - 좋아요, 댓글(오서준)

- **개발 언어** : Typescript

- **개발 프레임워크** : NestJS 

- **DB** : MySQL


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

### 1) 회원가입, 로그인 (전준영)
 - 회원가입
    - request시 body에 email과 password를 담아 요청을 보내면 데이터베이스에 유저정보를 저장하는 기능입니다.
    - 모든 값이 필수값으로 지정해두었으며 정규표현식과 class-validator를 활용하여 이메일과 패스워드에 조건을 걸어두었습니다.  
    - 회원가입시 요청으로 들어온 password 는 bcrypt를 활용하여 암호화된 상태로 데이터베이스에 저장됩니다.  
 - 로그인
    - 회원가입했던 email,password를 body에 담아 요청을 보내 성공하면 성공메세지와 서비스 이용에 필요한 토큰을 발급하는 기능입니다.
    - 회원가입과 마찬가지로 유효성검증을 정규표현식과 class-validator를 활용하였습니다.  
    - 로그인에 성공하면 성공 메세지와 header.Authorization 에 토큰을 저장합니다.  
    - 유효하지 않은 토큰이거나, 토큰이 만료되었을 경우 에러메세지를 반환합니다.


### 2) 팔로우, 언팔로우 (전은형)
  - 팔로우
      - POST /follows
      - header : 토큰 복호화로 우리 사이트의 회원 유무 확인
      - body : 팔로우할 유저의 email 첨부
      - 팔로우할 유저의 email로 우리 사이트의 회원 유무 확인
      - 우리 사이트의 회원이 아니라면 404 에러 반환
      - 우리 사이트의 회원이라면 이미 팔로우한 내역이 있나 확인
      - 이미 팔로우한 유저라면 409 에러 반환
      - 팔로우한 내역이 없다면 팔로우 성공 201 반환
  - 언팔로우
      - DELETE /follows
      - header : 토큰 복호화로 우리 사이트의 회원 유무 확인
      - body : 언팔로우할 유저의 target_id 첨부
      - 사용자와 타겟 유저의 팔로우 내역 유무 확인
      - 팔로우 내역 없다면 404 에러 반환
      - 팔로우 내역이 있다면 삭제 성공 200 반환

      
### 3) 포스트 CRUD (오서준)
  - 전체 포스트 가져오기
  - 특정 포스트 가져오기
  - 포스트 작성
  - 포스트 수정
  - 포스트 삭제
  
### 4) 좋아요 (오서준)
  - 좋아요 작성
  
### 5) 댓글 (오서준)
  - 댓글 작성

## 7. API Docs

▶️ [POSTMAN](https://documenter.getpostman.com/view/23856394/2s83zpJg7Z#131101c4-f459-4e66-b974-4b7a19d6dc66)

## 8. DB 테이블 생성 스크립트
```
CREATE TABLE `users` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(30) UNIQUE NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `is_active` TINYINT,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME ON UPDATE NOW()
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
   `updated_at` DATETIME ON UPDATE NOW()
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
   `updated_at` DATETIME ON UPDATE NOW()
   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE `follows` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `follower_id` int,
   `followee_id` int,
   `is_block` tinyint,
   `created_at` DATETIME DEFAULT NOW(),
   `updated_at` DATETIME ON UPDATE NOW()
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


