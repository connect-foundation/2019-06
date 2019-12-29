# <img width="30" src="https://user-images.githubusercontent.com/33617083/68571001-457a9d80-04a5-11ea-9a47-98c0fd36a1d9.png" style="margin:-5px 0px"> Daitnu

<p>
  <img src = 'https://img.shields.io/github/v/release/connect-foundation/2019-06?color=green' />
  <img src="https://img.shields.io/badge/node-10.16.0-blue.svg" />
  <img src="https://img.shields.io/badge/npm-6.9.0-blue.svg" />
  <a href="https://github.com/connect-foundation/2019-06#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/connect-foundation/2019-06/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>

</p>

> 우리들의 이메일 서비스, 다잇누!  
> Linux 환경에서 SMTP, POP3, IMAP 프로토콜을 이용하여 이메일 서버 구축

### 🏠 [Homepage](https://www.daitnu.com)

### :postbox: [Daitnu Blog](https://velog.io/@daitnu)

## Concept

![워크플로우](https://user-images.githubusercontent.com/31912670/70213083-df1f2d00-177b-11ea-8144-3c4e3a362ddf.png)

### Mail Agents
- **MUA** (**M**ail **U**ser **A**gent): 메일을 읽고 보낼 때 클라이언트가 이용하는 프로그램<br>
- **MTA** (**M**ail **T**ransfer **A**gent): 메일을 SMTP를 통해 다른 메일 서버로 전달하는 프로그램<br>
- **MDA** (**M**ail **D**elivery **A**gent): POP3, IMAP을 통해 서버에 저장된 이메일을 사용자에게 전달하는 프로그램<br>

### Mail Protocols
- **SMTP** (**S**imple **M**ail **T**ransfer **P**rotocol): 인터넷에서 이메일을 보내기 위해 이용되는 프로토콜<br>
- **SMTPS**: **SMTP** 프로토콜 이용시 **SSL** (**S**ecure **S**ocket **L**ayer)를 이용하여 암호화<br>
- **IMAP**/**POP3** (**I**nternet **M**essage **A**ccess **P**rotocol): 응용 계층 인터넷 프로토콜 중 하나로, 원격 서버로부터 **TCP**/**IP** 연결을 통해 이메일을 가져오는데 사용<br>
- **IMAPS**/**POP3S**: **IMAP**/**POP3** 프로토콜 사용시 **SSL** (**S**ecure **S**ocket **L**ayer)을 이용하여 암호화<br>

### **IMAP** vs **POP3**<br>
- **IMAP**: 서버에 이메일을 저장. 모바일 장치나 컴퓨터 등 여러 기기에서 이메일을 처리하는 경우 **IMAP**을 사용한다면 모든 기기에서 동기화된 메일 정보를 받아볼 수 있음<br>
- **POP3**: 모바일 장치나 컴퓨터의 폴더에 이메일을 저장. 이론적으로 **IMAP**보다 Private하지만, 이메일이 시스템 오류, 하드 드라이브 고장 등으로부터 더 큰 위험에 노출됨. 이메일을 사용하는 모든 기기는 자신의 폴더를 가지고 있고 다른 기기에서 폴더를 보거나 접근할 수 없음<br>

## Tech Stack

![기술스택](https://user-images.githubusercontent.com/33617083/71553794-c2afa100-2a58-11ea-9576-a216552105e3.PNG)

## View

### 로그인

![로그인](https://i.imgur.com/YFNnn8D.png)

### 아이디 찾기

![아이디찾기](https://user-images.githubusercontent.com/26241585/71305009-36c2c700-2411-11ea-8bd6-94429ff4169d.PNG)

### 비빈번호 찾기

![비밀번호찾기](https://user-images.githubusercontent.com/26241585/71305010-39bdb780-2411-11ea-9618-e1e42d511ae3.PNG)

### 회원가입

![회원가입](https://user-images.githubusercontent.com/31912670/69363195-60ce7f80-0cd3-11ea-9c5b-7dacffcad66c.png)

### 메일 리스트

![메일리스트](https://user-images.githubusercontent.com/26241585/71305032-886b5180-2411-11ea-9987-50a378af4998.PNG)

### 일반검색

![일반검색결과](https://user-images.githubusercontent.com/26241585/71305075-ded89000-2411-11ea-8b36-e109226d8f25.PNG)

### 상세검색

![상세검색](https://user-images.githubusercontent.com/26241585/71305072-de3ff980-2411-11ea-8bec-39f298820e8d.PNG)

### 메일읽기

![메일읽기](https://user-images.githubusercontent.com/26241585/71304810-d2066d00-240e-11ea-9ff9-ad9105105bf5.PNG)

### 메일쓰기

![메일쓰기](https://user-images.githubusercontent.com/26241585/71305040-a33dc600-2411-11ea-92cd-f798adeeda8b.PNG)

### 내게쓰기

![내게쓰기](https://user-images.githubusercontent.com/26241585/71305042-a3d65c80-2411-11ea-8575-353fb9fdb2fc.PNG)

### 메일함 추가

![메일함추가](https://user-images.githubusercontent.com/26241585/71305069-dd0ecc80-2411-11ea-9414-a072b126e658.PNG)

### 프로필

![프로필](https://user-images.githubusercontent.com/26241585/71305078-ded89000-2411-11ea-9ce9-7ef750cdc13a.PNG)

## Prerequisites

- node 10.16.0
- npm 6.9.0

## Install & Usage

- Front-End

```sh
cd web
npm install
npm run build
npm start
```

- Back-End

```sh
cd server
npm install
npm start
```

## Run tests

```sh
npm run test
```

## Team

👤 [@BuildTheTruth](https://github.com/BuildTheTruth)

👤 [@ljh1324](https://github.com/ljh1324)

👤 [@jonghwajoa](https://github.com/jonghwajoa)

👤 [@sjh2428](https://github.com/sjh2428)
