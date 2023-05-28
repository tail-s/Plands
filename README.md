<img src="./images/temp2.PNG" width="100%" height="auto" />

---

## Team : 백구의 Blo9

### System Architecture & Tech Stack

<span align="center">

![SystemArchitecure](./images/SystemArchitecture.PNG)

</span>

<br />
<div>
<h4>Frontend</h4>
<img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
</div>

<div>
<h4>Backend</h4>
<img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring-003300?style=flat-square&logo=Spring&logoColor=lightgreen"/>
  <img src="https://img.shields.io/badge/Mysql-007396?style=flat-square&logo=MySql&logoColor=white"/>
</div>

<div>
<h4>Cloud</h4>
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/>
<img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=Linux&logoColor=white"/>
<img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=Ubuntu&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
</div>

---

## 프로젝트 구현

### `OpenVidu`

- Kurento 미디어 서버를 지원하며 이러한 미디어 서버 연결 및 WebRTC 전반에 걸친 API를 제공하는 오픈소스
- 해당 프로젝트의 경우 다수의 사용자가 접근하여 계획을 세우는 애플리케이션이기 때문에 미디어서버가 필요
- 미디어 서버가 없는 경우 브라우저 스펙에서의 WebRTC 성능으로는 최대 4 명 까지 원할하게 사용할 수 있었기에 미디어 서버가 필요했고 이러한 니즈에 맞추어 Openvidu 를 사용
- `Openvidu`는 `MCU` 형태의 WebRTC 구조를 지원하기에 다수의 사용자(테스트 결과 최대 11명)가 화상채팅에 접속하더라도 원활하게 사용가능

#### 서버 배포시 Openvidu(25버전)

- 다운로드

```shell script
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```

- Openvidu 프로젝트 다운 후 서버 배포

```shell script
./openvidu start
```

<br />

---

### `Y.js 동시편집`

- 다수의 사용자가 여행 계획 템플릿을 작성하는 서비스 특성상 동시편집 기능 필요
- 동시편집 데이터 타입인 CRDT(Conflict-Free-Replicated Data Types)를 구현한 구현체인 `Y.js` 오픈소스를 사용

#### Y-websocket 서버 배포

```sh
HOST=localhost PORT=1234 YPERSISTENCE=./dbDir node ./node_modules/y-websocket/bin/server.js
```

- Y-websocket 서버 배포 후 frontend 영역에서의 indexedDB와 서버측에서의 영구적인 데이터 관리를 위해 LevelDB를 사용

<br />

---

### Frontend

- 메인 페이지
- 유저 관리(로그인, 마이페이지, 회원정보 수정, 회원가입)
- 사용자별 여행계획 리스트 페이지
- 여행계획 작성 세션 페이지 (WebRTC + CRDT)
- 여행계획 템플릿 PDF 변환

#### 실행 방법

```sh
# npm dependency 추가
npm install

# front file build
npm run build

# 3000포트로 시작
npm run start
```

---

### Backend

- 유저와 팀(계획 참여자)별 CRUD
- Redis를 이용한 JWT 토큰 운용
- SMTP, BCryptPasswordEncoder를 이용한 비밀번호 암호화/재발급
- Spring Security를 이용한 권한 처리

#### 실행 방법

```
# build.gradle 이동 => gradle build 클릭

# gradle bootRun or BaekguApplication.java 이동 후 Run
```

트리 구조

```
└─main
    ├─java
    │  └─com
    │      └─ssafy
    │          ├─api
    │          │  ├─controller
    │          │  └─service
    │          └─common
    │              ├─aop
    │              ├─config
    │              │  ├─etc
    │              │  └─filter
    │              ├─db
    │              │  ├─dto
    │              │  │  ├─request
    │              │  │  └─response
    │              │  ├─entity
    │              │  └─repository
    │              │      └─support
    │              ├─exception
    │              └─util
    │                  ├─common
    │                  ├─encoder
    │                  └─etc
    └─resources
```

---

### 메인페이지 및 로그인 페이지

- 해당 서비스 소개 및 회원 등록 기능
- JWT토큰을 사용해 사용자는 로그인을 하고 다른 서비스를 이용할 수 있습니다.

<span align="center">

![](./images/gi1.gif)

</span>

---

### 회원관리 페이지 및 정보 수정

- 각각의 회원은 마이페이지에서 자신의 정보를 수정할 수 있습니다.

<span align="center">

![](./images/gi3.gif)

</span>

---

### 여행계획 작성 페이지 (동시편집 및 WebRTC)

- 생성한 여행계획 내에서 사용자들은 화상채팅을 할 수 있습니다.(WebRTC - OpenVidu)
- 서로가 동시에 텍스트를 작성하여도 텍스트가 깨지지 않고 템플릿에 반영됩니다.(CRDT - Y.js)

<span align="center">

![](./images/mainfeat.png)
![](./images/gi4.gif)

</span>

---

### 여행계획 템플릿 PDF 다운로드 기능

- 각각의 여행계획에 대해 PDF로 다운로드 받는 기능을 제공합니다.

<span align="center">

![](./images/gi2.gif)

</span>

---

### 팀원 소개

<span align="center">

![](./images/member.PNG)

</span>

|  이름  |   역할   |                                       시스템                                       | Github                                          |
| :----: | :------: | :--------------------------------------------------------------------------------: | ----------------------------------------------- |
| 김성한 | Frontend | Frontend, WebRTC 서버 구축, 동시편집 서버 구축, 시스템 아키텍처 설계 및 구축, 배포 | [성한's Github](https://github.com/s-ggul)      |
| 배성찬 | Frontend |                      Frontend, WebRTC, 컴포넌트 설계, 디자인                       | [성찬's Github](https://github.com/baefrica)    |
| 이상학 | Backend  |                           Backend, 동시편집, 백엔드 설정                           | [상학's Github](https://github.com/dltkdgkr123) |
| 김경민 | Backend  |                               Backend, CI/CD, Docker                               | [경민's Github](https://github.com/gmkim716)    |
| 김소진 | Backend  |                         Backend, WebRTC, 동시편집, Docker                          | [소진's Github](https://github.com/Oliverslife) |

---
