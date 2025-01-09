#### 커밋 메시지의 형식

```
<type>(<scope>): <short summary>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

커밋 메시지의 각 줄은 100자를 넘기지 말아야 합니다. 그래야 읽기 쉽습니다.

#### 커밋 메시지 헤더 (Commit Message Header)

`type`에 들어갈 수 있는 항목들</br>

**feat** : 새로운 기능 추가</br>
**fix** : 버그 수정</br>
**docs** : 문서 관련</br>
**style** : 스타일 변경 (포매팅 수정, 들여쓰기 추가, …)</br>
**refactor** : 코드 리팩토링</br>
**test** : 테스트 관련 코드</br>
**build** : 빌드 관련 파일 수정</br>
**ci** : CI 설정 파일 수정</br>
**perf** : 성능 개선</br>
**chore** : 그 외 자잘한 수정

#### `scope`에 들어갈 수 있는 항목들

어디가 변경되었는지, 변경된 부분은 모두 들어갈 수 있습니다.
예를 들어, $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, 등등...
scope는 생략 가능합니다.
