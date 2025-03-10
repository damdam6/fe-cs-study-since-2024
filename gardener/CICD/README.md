# CI/CD 

## 0. 들어가며
요즘 개발자 공고를 확인하면, CI/CD에 대한 경험이 있는 사람이 우대사항으로 많이 들어가 있는 것을 확인해 볼 수 있다. 이에 대해 알아보고 실습까지 해보는 시간도 가져보자.

## 1. CI/CD의 개념
1) CI (Continuous Integration, 지속적 통합)
    CI는 개발자가 자주 코드를 레포지토리에 푸시할 때, 이 변경사항을 자동으로 빌드 및 테스트하여 문제를 빠르게 감지하는 과정이다.
    
이에 사용되는 주요 도구로는 : GitHub Actions, Jenkins, Travis cl 등등이 있다.
2) CD (Continuous Deployment, 지속적 배포)
    CI 이후의 단계에서 CD는 코드 변경 사항을 자동으로 배포하는 과정이다. 배포 플랫폼을 이용해 자동으로 배포를 진행할 수 있다.

## 2. CI/CD의 과정 (GitHub Actions의 예시)
### 1. **CI의 과정** 
1) 개발자가 코드 수정 후 git에 커밋/푸시함
2) PR이 생성되거나, main 브랜치에 코드가 푸시되면 **자동으로 CI가 실행됨**
3) CI가 자동으로 실행되는 과정에서 ESLint, Prettier, Jest와 같은 도구를 이용해 코드의 스타일과 기능을 확인함
    - 코드 체크아웃 : GitHub Actions 에서 코드를 불러오기
    - 패키지 설치 : npm 또는 yarn을 활용하여 설치
    - Lint 체크 : npm, yarn 기반의 패키지를 설치하여 코드 스타일 검사
    - 테스트 실행 : npm run test 또는  npm run test:ci 를 통한 자동화된 테스트 수행
    - 빌드 수행 : npm run build 를 실행하여 프로덕션 빌드 확인
4) 만약 npm or yarn의 패키지가 설치되지 않는 환경인지도 체크해야한다.
5) 위 과정을 거쳤을 때 테스트가 실패한다면 코드는 배포되지 않고 PR을 다시 수정해야한다.
6) CI가 성공한다면 CD 과정에서 자동으로 배포가 이루어진다.

### 2.CD의 과정
1) 프로덕션 빌드 업로드 - npm run build 실행 후 빌드된 파일을 배포 플랫폼으로 업로드
2) 도메인 연결 - 자신이 사용한 배포 플랫폼의 URL과 해당 서버의 시크릿 토큰을 기반으로 배포
3) 캐싱 및 성능 최적화 - 정적 파일을 최적화하는 단계

## 3. CI/CD의 실제 적용 예시
사실 나도 위 과정까지의 글로만 봤을 때 이해가 하나도 되지 않았지만, 실습을 한 번만 진행해봐도 바로 이해를 할 수 있었다.

GitHub Actions 상에서 CI/CD는 yaml 파일을 통해 이루어진다. 그렇기에 먼저 CI/CD 설정 파일을 생성해주어야 한다.
나는 우리의 이 스터디 레포지터리에 대한 테스트 CI/CD 파일을 만들어보기를 원했다. 해당 파일을 만들기 위해서 yaml 파일을 만들어줘야한다.
```html
.github/workflows/(여기에 파일 이름을 입력하세요).yaml
```
위 파일을 루트 디렉토리에 만들거나, GitHub의 해당 Repository의 Actinos 탭에서 직접 만들 수 있다!

<img alt="img_1.png" src="https://velog.velcdn.com/images/gardener/post/e9d60cf5-d10f-416e-b0fb-249b5f8ae037/image.png"/>

아래 파일은 우리 레포지토리로 테스트한 파일이 아니라, 설명을 위한 기본 구조 예시이다.

```yaml
name: CI/CD for Front-End // 이 CI/CD 파일의 이름

on:
  push:
    branches:
      - main // main 이라는 브랜치에 push 했을 때 이 파일의 테스트와 배포 자동화 과정이 이루어짐
  pull_request:
    branches:
      - main // main 브랜치에 pull request 의 과정에도 한 번 더 이루어짐

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3 // 깃헙 액션의 체크

      - name: Install dependencies
        run: npm install // 의존성 npm 설치

      - name: Run lint
        run: npm run lint // 린트파일 실행

      // 이 아래에 테스트에 필요한 다른 패키지를 명시할 수 있음.

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
// 만약 vercel을 활용해 배포한다면 토큰을 통해 위 CI과정이 성공적으로 수행되었을 때, Vercel로 배포 가능
```

이번 예시에서는 나는 내 레포지토리에서 따로 cicd  브랜치를 파서, 우리의 레포지터리를 테스트 해보았다.
(우리의 스터디 레포지토리는 readme 파일로만 구성되어있어서 별다른 배포도 필요하지 않고, jest와 같은 코드 테스트 기능도 필요하지 않기에, readme 양식만 테스트 해봄)
```yaml
name: Markdown Lint Check

on:
  // 여기에서도 main 브랜치가 아니라 내가 설정한 gardener-cicd에 pull request를 보냈을 때 검사해야했기에 이름을 변경
  push:
    branches: [gardener-cicd]
  pull_request:
    branches: [gardener-cicd]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
        // markdownlint 만 설치해서 테스트를 진행해보았다.
      - name: Install markdownlint-cli
        run: npm install -g markdownlint-cli
        
      - name: Run markdown lint check
        run: markdownlint '**/*.md'

```

<img alt="img_2.png" src="https://velog.velcdn.com/images/gardener/post/880c6c97-ccf8-4142-b8f5-b7fbc476f24c/image.png"/>

실패한 모습이 보였다. 사실 실패는 당연함, 우린 신경써서 readme 양식을 지키고 있지 않기 때문..
해당 X 표시를 눌러서 들어가보면 어느 파일에서 실패했는지도 알 수 있다.

<img alt="img_3.png" src="https://velog.velcdn.com/images/gardener/post/cd0efefb-de33-436c-8466-e20c9eddd3eb/image.png"/>

해당 파일을 확인하면 약 3700개 분량의 markdownlint 오류를 확인해볼 수 있다 ㅎ....

일일이 다 수정할 수는 없으니 여기서 CI/CD 에 대한 체험을 마무리한다! 이제 각자의 프로젝트에서 필요한 테스트나, 검사들, 배포 자동화가 필요할 경우 이를 적용해보자!