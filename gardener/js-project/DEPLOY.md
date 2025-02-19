#  Vercel, Netlify, Cloudflare Pages, AWS 배포 전략

## 0. 들어가며
사실 PWA에 대해 관심이 생기기 시작했는데, 이미 bloblog양이 열심히 실습하며 내용을 공유하고 계셨기 때문에, 무엇을 선정할지에 대해서 고민하고 있었다.
그러던 중, FE 배포 전략에 대한 고민이 생기게 되어서 알아보게 되었다.
대표적으로 Vercel, Netlify, CloudFlare Pages가 있다고 하는데, 여기에 AWS까지 알아볼 수 있도록 하자!

## 1. 각 플랫폼별 특징
1) Vercel
   + Next.js와 가장 잘 맞는 배포 환경 제공
   + SSR, ISR (Incremental Static Regeneration) 지원
   + Vercel Edge Functions로 빠른 응답 속도 제공
2) Netlify
    + 정적 사이트 배포에 특화
    + 간단한 API 구축 가능
    + 폼 처리, 인증 기능 제공 - 별도 백엔드 필요 없이 기본 기능 활용
3) CloudFlare Pages
    + 가장 빠른 응답 속도를 제공
    + Edge Computing 가능
    + 대규모 글로벌 트래픽 처리에 강력
4) AWS
    + 가장 확장성이 뛰어난 배포 환경 제공
    + Amplify -> 자동 배포, 인증, GraphQL API 지원
    + S3 + CloudFront -> 비용 절감 + 고성능 배포 가능

## 2. 배포 플랫폼 개요
| 비용 항목   | **특징**                       | **대표적인 사용 사례**       |
|---------|------------------------------|----------------------|
| **Vercel** | Next.js 친화적, 빠른 SSR/ISR 지원   | Next.js 프로젝트         |
| **Netlify** | 정적 사이트 최적화, Serverless 기능 제공 | Gatsby, Hugo, Jekyll | 
| **Cloudflare Pages** | 초고속 CDN + Edge Computing 활용  | 글로벌 웹사이트, 정적 페이지     |
| **AWS** | 확장성과 보안이 강력, 엔터프라이즈급 지원      | 대형 프로젝트, 커스텀 설정 필요   |

+ CDN : Content Delivery Network
    + 전 세계 여러 지역에 분산된 서버 네트워크를 활용하여 웹사이트의 속도를 높이고, 안정성을 증가시키는 기술
+ Gatsby, Hugo, Jekyll : 대표적인 정적 사이트 생성기들 
  + 미리 HTML 파일을 생성해두고, 요청이 오면 즉시 제공하는 방식.
  + DB없이 빠르고 가벼운 웹사이트 제작 가능
  + SEO (검색 최적화) & 속도가 중요한 사이트에 적합
+ Edge Computing : 기존의 중앙 서버 (Client-Server Model) 대신, 사용자의 물리적 위치와 가까운 노드에서 연산을 수행하는 방식.

## 3. 배포 플랫폼별 비교
1) 기본 기능 비교

| 기능                 | **Vercel** | **Netlify** | **Cloudflare Pages** | **AWS** |
   |----------------------|------------|------------|----------------------|--------------------------------|
   | **CDN 제공**         | ✅ 기본 포함 | ✅ 기본 포함 | ✅ Cloudflare CDN | ✅ CloudFront CDN |
   | **자동 배포 (CI/CD)**| ✅ GitHub, GitLab 지원 | ✅ GitHub, GitLab 지원 | ✅ GitHub 지원 | ✅ GitHub, CodeCommit |
   | **서버리스 기능**    | ✅ Edge Functions 지원 | ✅ Netlify Functions | ✅ Cloudflare Workers | ✅ Lambda (AWS FaaS) |
   | **SSR 지원**        | ✅ Next.js에서 SSR 지원 | ❌ 정적 사이트 위주 | ✅ 일부 SSR 가능 | ✅ Lambda@Edge로 가능 |
   | **커스텀 도메인**    | ✅ 무료 제공 | ✅ 무료 제공 | ✅ 무료 제공 | ✅ Route 53 사용 가능 |
   | **보안 및 인증**    | 기본 제공 | 기본 제공 | 기본 제공 | IAM, WAF 활용 가능 |

+ IAM (Identity and Access Management)
  + 사용자 그룹, 권한을 관리하는 시스템 / 보안 인증 및 권한을 부여하는 역할
+ WAF (Web Application FireWall)
  + 웹 애플리케이션을 공격으로부터 보호하는 보안 시스템

2) 배포 방식 비교

| 배포 방식           | **Vercel** | **Netlify** | **Cloudflare Pages** | **AWS** |
|---------------------|-----------|------------|----------------------|---------------------|
| **Git 기반 배포**   | ✅ 지원 | ✅ 지원 | ✅ 지원 | ✅ 지원 |
| **CLI 배포**       | ✅ `vercel` | ✅ `netlify deploy` | ✅ `wrangler publish` | ✅ `AWS CLI` |
| **수동 업로드**    | ❌ | ✅ 가능 | ❌ | ✅ 가능 (S3 업로드) |

## 4. 플랫폼별 비용 비교
| 비용 항목        | **Vercel** | **Netlify** | **Cloudflare Pages** | **AWS** |
|------------------|-----------|------------|----------------------|------------------|
| **무료 요금제**  | ✅ 있음 (제한 O) | ✅ 있음 (제한 O) | ✅ 있음 (제한 O) | ✅ (S3 스토리지 요금 발생) |
| **유료 요금제**  | 월 $20~ | 월 $19~ | 월 $5~ | 종량제 (사용량에 따라 다름) |

Vercel, Netlify, Cloudfare Pages는 무료 요금제를 통해 작은 프로젝트를 운영 가능

AWS는 종량제 기반으로 사용량이 많을수록 비용 증가

## 5. 결론
✅ 빠른 배포 & 자동화가 중요하면 → Vercel / Netlify

✅ Edge Computing & 글로벌 속도가 중요하면 → Cloudflare Pages

✅ 대규모 서비스 & 커스텀이 필요하면 → AWS