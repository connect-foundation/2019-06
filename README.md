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

# Daitnu Season2 
다잇누 시즌2는 [다른 레포](https://github.com/Daitnu/Daitnu-S2)에서 진행됩니다.

server : Spring 기반  
client : Type Script로 전환

# Daitnu Season1

### 🏠 [Homepage](https://www.daitnu.com)

### :postbox: [Daitnu Blog](https://velog.io/@daitnu)

### [View](https://github.com/connect-foundation/2019-06/wiki)

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
