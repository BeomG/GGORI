<p align="center">
  <img src="/uploads/d5d9f7ea6fa2909f463bed4150364f1d/꼬리.png" width="500"/>
</p>

# 💡 개발 Flow
1. **지라 태스크 → 브랜치 생성**  
2. **IDE에서 해당 브랜치 checkout**  
3. **1 Action, 1 Commit**  
4. **MR 요청 보내기 (Template 내역 작성)**  
5. **최소 2명 이상 Approve 시에 Merge (고민 중)**  
6. **Merge는 Merge 요청자 혹은 Maintainer (자기 자신이 Merge 하지 않기!!!!)**  
7. **작업을 완료한 브랜치는 Merge 후 삭제하기**

---

# ✅ Branch Naming Convention

> 💡 꼭 지라를 통해 만들어 태스크 하나하나 세세하게 작성하였습니다.

- **지라이슈번호/브랜치종류(be/fe)/구현(feat/build등)/내용**
  - 브랜치 종류는 소문자
  - 이슈 내용은 명사 단위 + 케밥 케이스로 구성
    - **예) 로그인, 로그인-컴포넌트, 우진-얼굴**
    - **예) SOP0110-36/fe/feat/로그인-컴포넌트**
  
> 🚨 **체크아웃 했나요??** 🚨

- **생성 시 디폴트값은 Merge 완료 시 Branch 삭제**
  - 필요 시 체크 박스 해제 (작업이 완료되지 않아 이어서 Branch를 사용해야 하는 경우 등)

> 🚨 **push 전 브랜치 확인 했나요??** 🚨

## Jira를 통해 브랜치 생성하는 방법

#### 1. **Jira에서 태스크 클릭 후 “브랜치 만들기” 클릭 후 GitLab에서 브랜치 만들기 클릭**  
   ![Jira 브랜치 생성](/uploads/250c8ddd34e9d21f153ab1351e8ee864/Untitled.png){: width="500"}  
   
#### 2. **브랜치 생성**
   - 프로젝트 선택
   - 소스 브랜치 선택 (대부분 develop를 소스 브랜치로 선택)
   - branch name: **지라이슈번호/브랜치종류(be/fe)/구현(feat/build등)/내용** <br>
   ![브랜치 생성](/uploads/ca77ea19e1ef0e5e6ab2106ea3411d28/Untitled__1_.png){: width="500"}

---

# ✅ Commit Convention

> 🚨 **push 전 브랜치 확인 했나요??** 🚨

- 커밋은 **“절대 스토리 번호로 하지 않습니다”**
- 이슈번호/커밋종류: 커밋내용 (단답형)
- 자기 자신의 브랜치 복붙 후 **이슈번호 뒤에서 메짤라/커밋종류/커밋내용 작성**
  - 예) 자신의 브랜치명 S09P31C110-52 까지 복붙 / 커밋종류 / 내용 <br>
![커밋 메시지 예시](/uploads/05c1a49fcb90dc4032212fce9cdaa409/Untitled__2_.png){: width="500"}  

    ```sh
    git add .
    git commit -m “S09P31C110-52/build/어쩌고 저쩌고 커밋메시지”
    ```

- 커밋 종류
  ```markdown
  - init: 초기화
  - feat: 기능 구현
  - refactor: 리팩토링
  - fix: 코드 버그 수정
  - build: 빌드 파일 수정
  - chore: 잡일
  - style: CSS 수정
  - docs: 문서 작성
  
# ✅Pull Request Template

- **Description 을 누르면 템플릿이 나온다**

![Untitled__3_](/uploads/f516f628bb080f9a868f414a7f2cb30d/Untitled__3_.png){: width="500"}



# 🍕자주사용하는 명령어
```
# 모든 브랜치 보기, 탭을 통해 체크아웃하면서 볼 수 있다.
git branch -a

# 브랜치 이동
git checkout 브랜치명

# develop 브랜치 최신화(develop 땡겨오기 전에 한번 꼭하기)
git remote update develop

# 머지된 develop 내 브랜치에 병합
git pull origin develop
```

# 👑 시작하기
```
1. npm i
2. npm run android
```
