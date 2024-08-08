# FE 파트 CS 학습  및 공유 스터디

<br>

### 스터디 소개

---

**스터디 구성원**

| [damdam6](https://github.com/damdam6) | [dolmeengii](https://github.com/dolmeengii) | [Gardener-soul](https://github.com/Gardener-soul) | [olrlozl](https://github.com/olrlozl) | [bloblog](https://github.com/bloblog) |
|:---:|:---:|:---:|:---:|:---:|
| <img alt="damdam6" src="https://github.com/damdam6.png" width="230" height="100%"/> | <img alt="dolmeengii" src="https://github.com/dolmeengii.png" width="230" height="100%"/> | <img alt="Gardener-soul" src="https://github.com/Gardener-soul.png" width="230" height="100%"/> | <img alt="olrlozl" src="https://github.com/olrlozl.png" width="230" height="100%"/> | <img alt="bloblog" src="https://github.com/bloblog.png" width="230" height="100%"/> |


<br>

**날짜** : 매주 수요일 업로드 -> 목요일 피드백&코멘트 -> 주말까지 완료!

**목표**

- 궁금한 내용 학습하기!
- FE 파트 흥미로운 지식 공유하기!

<br>

### 스터디 진행 방식

---

**스터디**

* 레포지토리를 fork하고, PR을 여는 방식으로 스터디 진행합니다.
  
1. 매주 자신이 공부하고 싶은 주제를 선정합니다.
2. 각자 주제에 대해 공부하고 **fork**한 레포지토리에 `{github-id}-{week00}` 브랜치를 생성하여 업로드합니다.
   - 매주 다른 브랜치를 사용합니다.
   - 브랜치 생성 시에는 `main` branch를 베이스로 해주세요.
   - 커밋 히스토리가 꼬이는 걸 방지하기 위함이니 꼭 지켜주세요.
4. **수요일 자정**까지 초안 PR을 오픈합니다. `(fork repo's branch -> main repo's branch)`
5. **목요일 자정**까지 PR에 review를 다는 형식으로 피드백을 주고 받습니다.
   - 더 궁금한 점
   - 오류사항
   - 추가적으로 보충하면 좋을 주제 <br>
   위의 사항 중 하나를 각 자료별 1개 이상 작성해주세요.
6. 피드백을 바탕으로 초안을 수정하고 자료를 보완한 뒤 merge합니다.

<br>

### Commit & PR Convention

---

**폴더 및 파일 구조**

1. 자신의 github-id로 폴더를 생성합니다.
2. 매주 제출할 파일들을 `{github-id}/{topic}`에 업로드 합니다. 
3. {topic} 폴더 하위 구조는 자유롭게 구성해도 무방합니다. (이미지 추가 등 가능)
   - 전체적인 자료를 정리한 md 파일이 꼭 하나는 필요합니다. (초안 피드백용/자료체크용)

<br>



<pre>
.   
│  
├─damdam6
│  ├─{topic-2}
│  │  │  {topic-2}.md
│  │  │  
│  │  └─image
│  │          {image-2}.png
│  │          {image}.png
│  │          
│  └─{topic-1}
│      │  {topic-1}.md
│      │  
│      └─image
│              {image-2}.png
│              {image}.png
│              
└─{github-id}
    └─{topic}
        │  {topic}.md
        │  
        └─image
                {image-2}.png
                {image}.png
</pre>
                

            

<br>

**Commit Message Convention**

*임의의 커밋tag를 활용합니다.*

|             | 설명            |
| ----------- |---------------|
| feat     | 자료 제출 / 내용 추가 |
| fix      | 틀린 부분 수청      |
| chore    | 폴더 구조 수정      |
| merge    | merge         |

<br>

*커밋 구조*

```
feat(week00):{자신이 고른 주제}
- {구체적인 설명(옵션)}
```

<br>

*커밋 예시*

```
feat(week01):브라우저 동작 원리
- 브라우저 엔진 작동 원리
- js 실행 과정 정리
```

<br>

**PR Convention**

1. PR 제목은 `{github-id} - week{00}`로 통일합니다.
2. PR 내용에는 자료에 대한 간략한 설명을 적어주세요.
3. 초안 PR 후 피드백을 받아 수정할 때는 PR 내용에 수정사항을 명시해주세요.
