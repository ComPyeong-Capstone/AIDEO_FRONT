## 2025 한성대학교 컴퓨터공학부 캡스톤 디자인 8조 - AIDEO
![splash](https://github.com/user-attachments/assets/bc6556cc-a2d6-47ef-839a-f309c808e4ad)


## 프로젝트 개요

생성형 AI를 활용한 숏폼 자동 생성 서비스

<br><br>

## 프로젝트 설명

숏폼이 유행하는 요즘, 누구나 쉽게 숏폼을 제작할 수 있도록 하기 위해서 이 서비스를 제작했습니다.  
영상을 제작하는데 필요한 소스인 자막과 이미지를 직접 첨부할 수도 있고,  
제작하고 싶은 영상의 주제를 입력하는 것만으로도 자동으로 자막과 이미지를 생성할 수도 있습니다.  
앱 내에서 자체적으로 자막에 알맞은 TTS를 생성해주고, 사용자가 선택한 배경 음악까지 합쳐 결과 영상을 제공해줍니다.  
해당 결과 영상은 앱 자체의 게시물에 업로드 해 다른 앱 사용자와 공유할 수도 있고, 타 플랫폼에 공유하여 외부인과도 공유할 수 있습니다.  

<br><br>

## 팀원 소개

| 이름 | 프로필 | 역할 |
|------|--------|------|
| [신동현](https://github.com/whikih34) | <img src="https://github.com/whikih34.png" width="80"/> | - 앱 UI 디자인 및 구현<br>- API 연동 |
| [석종수](https://github.com/Seok-Soo) | <img src="https://github.com/Seok-Soo.png" width="80"/> | - AWS 인프라 구축<br>- DB 설계 및 구현<br>- 자막 생성 기능 구현 |
| [전지훈](https://github.com/xinun) | <img src="https://github.com/xinun.png" width="80"/> | - 앱 UI 디자인 및 구현<br>- 영상 공유 기능 구현<br>- 유튜브 업로드 기능 구현 |
| [조석원](https://github.com/swcho25) | <img src="https://github.com/swcho25.png" width="80"/> | - REST API 개발<br>- DB 설계 및 구현<br>- 영상 생성 기능 구현 |

<br><br>

## 주요 기능

<table>
  <tr>
    <td align="center" valign="top">
      <b>1. 로그인</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/43d06230-61b0-4d85-a7f6-3e8a004b14c2" width="200"/><br>
      ─────────────<br>
      앱 자체 로그인 또는 소셜 로그인
    </td>
    <td align="center" valign="top">
      <b>2. 게시판</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/59f66a2e-55cb-46d4-8040-577e080389ef" width="200"/><br>
      ─────────────<br>
      다른 사용자와 앱을 통해 생성한 숏폼 공유
    </td>
    <td align="center" valign="top">
      <b>3. 해시태그 검색</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/6c439cc6-d165-4584-8ffd-bdcaab9a5b0f" width="200"/><br>
      ─────────────<br>
      게시물에 저장된 해시태그 값에 따라 검색
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <b>4. 숏폼 소스 입력 (1)</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/10fff1f6-eafa-4fad-9f1f-2eb2f39511b0" width="200"/><br>
      ─────────────<br>
      사용자가 직접 이미지 + 자막 입력
    </td>
    <td align="center" valign="top">
      <b>5. 숏폼 소스 입력 (2)</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/96d68b8d-0d04-4f63-871b-90a21681dbb4" width="200"/><br>
      ─────────────<br>
      주제만 입력하면 이미지 + 자막 자동 생성
    </td>
    <td align="center" valign="top">
      <b>6. 부분 영상 생성</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/49fa749c-54b7-4f75-aa5d-1bdca2fbc10f" width="200"/><br>
      ─────────────<br>
      이미지 하나 당 5초의 영상 생성
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <b>7. 최종 영상 생성</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/1e340716-a165-410e-a66e-9386ef441af8" width="200"/><br>
      ─────────────<br>
      자막 + TTS + 배경음악 합친 최종 영상 생성
    </td>
    <td align="center" valign="top">
      <b>8. 앱 게시판 / 유튜브 업로드</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/86e969ab-6dd7-4391-bc91-1f8ae0b82be5" width="200"/><br>
      ─────────────<br>
      앱 자체 게시판 혹은 유튜브로 업로드
    </td>
    <td align="center" valign="top">
      <b>9. 유튜브 업로드 결과</b><br>
      ─────────────<br>
      <img src="https://github.com/user-attachments/assets/4e7d5bc7-4b23-4e28-bd40-e00414c6f42c" width="200"/><br>
      ─────────────<br>
      숏폼을 유튜브로 업로드한 결과 화면
    </td>
  </tr>
</table>  

<br><br>

## 주요 적용 기술

| 분류           | 내용 |
|----------------|------|
| **개발 언어**   | <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/> <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> |
| **개발 환경**   | <img src="https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white"/> <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/> |
| **프레임워크** | <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/> <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/> <img src="https://img.shields.io/badge/React%20Native-61DAFB?style=for-the-badge&logo=react&logoColor=white"/> |
| **개발 도구**   | <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge"/> <img src="https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=white"/> <img src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge"/> |
| **Open API**   | <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white"/> <img src="https://img.shields.io/badge/Stable%20Diffusion-FF1493?style=for-the-badge&logoColor=white"/> <img src="https://img.shields.io/badge/Runway-00D9FF?style=for-the-badge&logoColor=black"/> <img src="https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white"/> |  

<br><br>

## 프로젝트 구조

<img width="926" alt="스크린샷 2025-05-21 오후 3 54 18" src="https://github.com/user-attachments/assets/d1546daf-34d6-4cb1-9a8c-1ae546444eeb" />

<br><br>

## 프로젝트 결과물

| 항목 | 링크 |
|------|------|
| 시연 영상 | https://www.youtube.com/watch?v=NmFMFC-CuDM |
| 숏폼 예시 | https://www.youtube.com/shorts/JvhqPDNRnqw  |
