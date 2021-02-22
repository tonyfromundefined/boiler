# 🚀 보일러

프로덕션 용 GraphQL 보일러플레이트

## 미리 설정됨

- Yarn 2
- TypeScript
- Webpack
- Babel
  - `@babel/preset-typescript`
  - `@babel/preset-env` (Node.js 14)
- GraphQL JIT Executor
- Sentry Apollo Plugin
- Winston Logger
- Node Hot Loader

## 미리 설치됨

### GraphQL

- Apollo Server
- GraphQL Tools
- GraphQL Code Generator

### Back-end

- MongoDB
- Mongoose
- Agenda.js

### Front-end

- Next.js
- React.js
- Relay

## 미리 잓ㅇ됨

- GraphQL Operation Executor
- GraphQL Connection Helper (`@internal/graphql-connection-resolver`)

## 시작하기

```bash
# MongoDB 인스턴스를 백그라운드에 띄웁니다
$ docker-compose up -d

# 의존성을 설치합니다
$ yarn

# .env.example를 .env로 복사합니다
$ cp .env.example .env

# 개발 서버를 시작합니다
$ yarn dev
```

## 개발하기

```bash
# GraphQL 스키마 선언으로부터 TypeScript 타입을 생성합니다
$ yarn codegen

# 클라이언트의 Relay Compiler를 작동시킵니다.
$ yarn relay
```

## 빌드하기

```bash
# 서버를 빌드합니다
$ yarn build
```

## 배포하기

도커를 사용합니다. `Dockerfile`이 이미 작성되어 있습니다.

## 폴더구조와 설계 원칙

### 1. `/graphql`

GraphQL API와 관련된 내용을 담습니다

- 스키마 선언과 리졸버 구현
- Apollo Server 옵션

### 1-a. `/graphql/schema/[model]`

각 모델과 관련된 스키마 선언을 적고, 리졸버를 구현합니다.

#### ⭐️ 원칙 1. 코드 위치를 도메인(관심사)에 따라 분리합니다 (관심사의 분리)

스키마 선언과 리졸버 구현은 도메인(오브젝트 모델)에 따라 분리되어 각 도메인 이름으로 된 폴더에 담습니다.

#### ⭐️ 원칙 2. API 레이어와 Persistent 레이어(DB)를 분리합니다

유연한 스키마 디자인과 더 창의적인 스키마 디자인 논의를 위해 GraphQL 레이어와 Persistent 레이어 (보통은 DB의 테이블/컬렉션을 의미합니다)는 분리되어야합니다.

> 데이터베이스 테이블/컬렉션은 `/src/models` 아래에 작성합니다. 그리고 `/codegen.yml`의 `mappers` 옵션을 통해 GraphQL Object Type과 연결합니다.

#### ⭐️ 원칙 3. 모든 GraphQL Schema 선언에는 설명(Description)을 포함합니다.

코드의 동작방식은 해당 코드의 맥락을 통해 완벽히 이해할 수 있습니다. 하지만 코드의 끝단인 API 레이어와 Persistent 레이어는 맥락이 없기 때문에 완벽한 이해를 위해서 반드시 주석이 필요합니다.

### 1-b. `/graphql/schema/resolvers.ts`

각 도메인 이름으로 된 폴더의 리졸버 구현체를 모읍니다.

#### ⭐️ 원칙 4. 자동화를 최소화합니다.

동작 원리와 관련된 모든 내용은 자동화하지 않습니다. 새로운 동료와 잘 협업하기 위해, 모든 코드는 웬만하면 손으로 작성합니다.

### 1-c. `/graphql/context.ts`

Context 타입을 선언하고 Context 생성기를 구현합니다.

### 1-d. `/graphql/server.ts`

Apollo Server를 생성합니다. Apollo Server의 옵션을 수정할 수 있습니다. GraphQL JIT Executer가 여기에 통합되어있습니다.

### 2. `/lib`

어플리케이션 내부에서 사용되는 내부 라이브러리를 작성합니다.

#### ⭐️ 원칙 5. 기술적인 부분을 로직에서 분리합니다.

단순한 분리는 리팩토링이 아닙니다. 로직에서 기술적인 부분을 분리해 내부 라이브러리로 만드세요. 이를 통해 실제 어플리케이션 코드에는 비즈니스 로직만 남기도록 합니다.

#### ⭐️ 원칙 6. 내부 라이브러리를 마치 NPM 패키지처럼 설계하세요.

내부 라이브러리는 `/lib` 폴더 외부의 코드를 import하지 않아야합니다. 필요한 의존성은 바깥에서 주입하는 형태로 설계하세요. (이것을 의존성 주입이라고 표현합니다)

> 이러한 설계를 돕기 위해서, `@internal/*` alias를 웹팩과 타입스크립트 설정에 추가해두었습니다. 따라서 내부 라이브러리를 다음과 같이 import 할 수 있습니다.

```typescript
import * as F from '@internal/f'
```

### 3. `/constants`

서버에 주입되는 환경변수를 담고, 추가적으로 환경변수를 통해 계산된 상수들을 담습니다.

#### ⭐️ 원칙 7. 상수는 반드시 주석을 달아주세요.

`원칙 3`과 같은 이유로, 정확한 환경변수의 이해를 위해서는 구체적인 주석이 필요합니다.

### 4. `/models`

Persistent 레이어와 관련된 내용을 담습니다. (여기서는 MongoDB와 Mongoose 선언을 말합니다)

> 소프트딜리트와 타임스탬프 플러그인이 셋팅되어있습니다. 혹시 필요하지 않다면 삭제하세요.

#### ⭐️ 원칙 8. 모델은 반드시 주석을 달아주세요.

`원칙 3`과 같은 이유로, 모델의 정확한 이해를 위해서 구체적인 주석이 필요합니다.

### 5. `/restapi`

외부 서비스와의 통신을 위한 간단한 REST API 설정을 담습니다.

#### ⭐️ 원칙 9. 어플리케이션 로직은 반드시 GraphQL 레이어에서만 처리합니다.

REST API는 도메인에 따라 코드를 분리하기가 어렵습니다. (사실 그것이 GraphQL을 사용하는 주된 이유이기도 합니다) 따라서, `executeOperation` 함수를 활용해, (`/src/graphql/executeOperation`에 있습니다) REST API는 그저 GraphQL의 alias로서 사용되도록 합니다.

### 6. `/agenda`

정기적인 실행 또는 다른 작업을 위한 비동기 워커 로직을 작성합니다. Agenda.js를 참고하세요.

> 큰 크기의 데이터를 처리하는것 (ex: `JSON.parse`)은 Node.js 서버의 블로킹 요소가 됩니다. 따라서 만약 비동기 로직 실행 중간에 큰 용량의 데이터 처리가 존재한다면, 서버 성능에 영향을 끼칠 수 있습니다. 이 때, 환경변수를 이용해 워커 인스턴스를 분리하는 것을 추천합니다. (하지만 대부분의 스타트업은 **큰** 데이터를 처리하지 않습니다. 따라서 이 보일러플레이트를 배포할때는 한 인스턴스로 작게 시작하는 것을 권장합니다.)

### 7. `/client`

Next.js 클라이언트의 구현을 담습니다.

#### ⭐️ 원칙 10. Relay를 따릅니다

Relay가 강요하는 패턴을 따릅니다. 이것은 React 컴포넌트의 재사용성을 증가시킬 뿐아니라, 좋은 GraphQL 스키마 디자인을 가져오고 좋은 퍼포먼스를 가져다줍니다.

## 어떻게 서버를 빠르게 유지합니까?

- GraphQL 쿼리 파싱은 Node.js의 블로킹 작업입니다. 파싱된 결과를 캐시하거나 내장된 JIT Executer를 사용하세요. (이미 이 보일러플레이트에 포함되어 있습니다.)
- 릴레이 클라이언트는 쿼리의 크기를 증가시킵니다. 네트워크 비용을 감소시키기 위해서, Persisted Queries를 구현하세요. (Persisted Queries는 Persistent Layer 단의 구현이 필요하기 때문에 이 보일러플레이트에서는 포함하지 않았습니다.)
- Apollo Studio과 Datadog Trace를 사용하시는 것을 권장드립니다.

> p99 기준으로 50~100ms 레이턴시를 유지하세요.

## 할 일

WIP
