# Trello 프로젝트 소개

바로가기 https://dowan-portfolio-1.du.r.appspot.com

### 테스트 계정
### ID : test
### PW : test123@

![trello2](https://user-images.githubusercontent.com/97826223/193997346-e1a00bd3-4545-4f5c-9f6a-a501e4ab04e8.png)

![trello1](https://user-images.githubusercontent.com/97826223/193997125-ce2f1208-15b2-4cff-afd7-5e5378498104.png)

칸반보드 기능을 구현하였으며 리스트 및 테스크 생성 , 읽기 , 수정 , 삭제 , 이동이 가능합니다. 

# 개발인원
- 1인개발

# 목적
- crud기능과 socket.io 등을 구현한 포트폴리오 제작

# 구현기능
- 회원가입및 로그인기능
- 회원프로필 이미지 변경
- crud 기능 ( 리스트 생성 및 삭제 , 테스크 생성 삭제 수정 이동 )
- 테스크간 drag and drop 으로 이동
- pagination 페이징
- socket.io 를 이용한 실시간 채팅기능

# 적용기술
## React
 - React hooks ( useState , useRef , useEffect ) 사용 
 - (React library) socket.io 을 이용해 회원간 실시간채팅 이용
 - (React library) react-beautiful-dnd 를 이용해 테스크간 drag and drop 구현
 - (React library) react-paginate 를 이용해 페이징처리
## Typescript
 - object data에 타입을 체크하기 위해 interface 사용
## NodeJS
 - 회원가입및 로그인
 - Session 을 이용한 로그인
 - CRUD 기능
 - 이미지 업로드
## MongoDB
 - NoSQL
