---
layout: post
title: '리액트 리얼타임 상태관리 SWR'
date: 2020-09-04 00:10
tags: [react, swr]
description: 리액트를 이용한 개발시 가장 힘들고 귀찮은 부분이 바로 컴포넌트간의 상태관리라고 해도 과언이 아닐 것이다. 리액트는 기본적으로 컴포넌트간 공유해야할 상태가 있다면 프롭을 통해 위에서 아래로 전달한다. 부모 컴포넌트에서 자식 컴포넌트로 상태 전달의 불편함을 해소하기 위해 리액트는 Context API 를 제공한다. Context API 의 기본컨셉은 부모의 상태를 프롭을 통한 전달없이도 자식 컴포넌트들이 해당 상태를 접근할 수 있게 하는 것이다.
draft: false
---

리액트를 이용한 개발시 가장 힘들고 귀찮은 부분이 바로 컴포넌트간의 상태관리라고 해도 과언이 아닐 것이다. 리액트는 기본적으로 컴포넌트간 공유해야할 상태가 있다면 프롭을 통해 위에서 아래로 전달한다. 부모 컴포넌트에서 자식 컴포넌트로 상태 전달의 불편함을 해소하기 위해 리액트는 Context API 를 제공한다. Context API 의 기본컨셉은 부모의 상태를 프롭을 통한 전달없이도 자식 컴포넌트들이 해당 상태를 접근할 수 있게 하는 것이다.

하지만 Context API 자체는 너무나 네이티브해서 실제 개발시 사용하기에는 여러가지 불편한 점들이 있기 때문에 Context API 를 기반으로 상태관리를 편하게 할 수 있 라이브러리들이 생겨났다. Redux, Mobx, 그리고 최근 Recoil 까지 이들의 관심사는 클라이언트의 상태를 보다 효과적으로 관리하는데 있다.

그런데 클라이언트에서의 상태관리 자체를 파괴하는 녀석이 생겨났으니 바로 [SWR](https://www.npmjs.com/package/swr) 이다.

SWR 은 stale-while-revalidate 을 의미한다(이름의 의미를 뭐라 설명하기가 애매하다). SWR은 데이터베이스의 특정 상태(정확히는 API의 응답)를 직접 컴포넌트로 연결한다. 개발자는 `useSWR` 을 통해 원격 서버의 특정 상태에 연결된 스트림을 얻을 수 있으며 그 스트림을 통해 원격 상태에 접근할 수 있고 이를 통해 데이터를 직접 화면에 뿌려줄 수 있다.

직접 코드를 보면서 어떻게 이런 일이 가능한가를 살펴보자.

```js
import useSWR from 'swr'
function Profile() {
  const { data, error, isValidating } = useSWR('/api/user', url => fetch(url).then(res => res.json()))
  if (error) return <div>failed to load</div>
  if (isValidating) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

위 예시에서 `useSWR` 을 통해 얻은 `data` 를 원격상태에 연결된 스트림으로 바라볼 수 있다. `Profile` 컴포넌트는 지금 직접 원격 서버의 상태를 화면에 뿌려주고 있는 것이다. 원격의 상태는 비동기적일 수 밖에 없기 때문에 `useSWR`은 데이터(`data`) 뿐만 아니라 에러(`error`)와 로딩상태(`isValidating`)를 함께 리턴한다. 리액트 컴포넌트는 3가지 리턴값을 이용해 서버의 상태를 실시간(**에 가깝게**)으로 화면에 표현할 수가 있다. 그리고 **서버에서 user 의 이름이 바뀌면 자동으로 화면에 표시되었던 이름이 갱신**된다. `useState` 와 `useEffect` 없이 이런 일이 가능하다는 것은 놀라운 점이다.

내부 동작은 이렇다
1. `useSWR`은 컴포넌트 mounted 시 `/api/user` 로 요청을 보내고 그에 다른 과정 및 결과를 리턴한다.
1. `useSWR`은 결과를 캐시하며 적절한 때에 자동으로 데이터를 다시 fetch 하고 캐시를 업데이트 한다.
    - SWR이 내부적으로 데이터를 다시 fetch 하는 시점은 아래와 같다.
        - 네트워크 연결이 Offline 에서 Online 으로 바뀔 때
        - 해당 화면이 포커스를 받을 때
        - 혹은 일정시간 간격으로(커스터마이징 가능)
        - 기타 일반적으로 적절한 때라고 여겨지는 경우🤣
1. 캐시가 업데이트 될 때 `Profile` 컴포넌트는 re-render 된다.

<br>

### SWR의 특징
- Websocket 만큼 정확한 Realtime 은 아니지만 polling 방식을 이용해 그에 준하게 적절한 타이밍에 데이터를 갱신한다.
- SWR 은 데이터를 fetch 하는 방식에 관여하지 않는다. 이 방법은 개발자가 정의한다. 따라서 REST API, GrappQL 어느 방식이든 사용이 가능하다.
- SWR은 서버의 데이터를 캐시하고 갱신하고 이를 컴포넌트에게 시기적절하게 제공해 주는데에만 관심을 가진다.

<br>

### Note
- `useSWR` 은 컴포넌트 `mounted` 시 최초 한번 자동으로 데이터 fetch 를 발생시킨다
    - 그런데 `initialData` 를 사용할 경우에는 `mounted` 시 데이터 fetch 가 발생되지 않는다.
    - `initialData` 를 사용하면서 최초 mounted 시에도 데이터 fetch 를 원한다면, `revalidateOnMount` 옵션을 추가로 설정해 주어야 한다.
- `useSWR` 의 첫번째 인자는 캐시된 데이터의 키값으로 사용된다.
    - 첫번째 인자로 문자열, 함수, 배열등을 사용할 수 있다
    - `null` 이 전달될 경우 데이터 fetch 가 발생되지 않는다.(조건부 fetch 시 이용 가능)
- fetcher 에게 여러 개의 인자를 전달해야 할 경우에는 배열을 사용할 수 있다.. 그런데 배열을 사용할 때 주의할 점은 배열의 요소로서 스트링만을 사용해야 한다. `useSWR` 은 shallow 비교만 하기 때문에 객체리터럴을 사용할 경우 매번 다른 키값으로 인식되어 별도의 캐시데이터가 정의되는 것으로 동작될 수 있다. https://www.npmjs.com/package/swr#multiple-arguments
- `mutate` 를 이용해 데이터 갱신시점을 직접 제어할 수 있다.
- `useSWR` 의 리턴값인 `isValidating` 을 이용해 데이터 fetch 중 여부를 확인할 수 있다.
- `refreshInterval` 옵션을 통해 데이터 갱신주기를 설정할 수 있다.
- `SWRConfig` 을 통해 공통설정도 가능하다.
- revalidation 시(데이터 fetch)에 데이터를 성공적으로 가져왔을 때는 `onSuccess` 옵션이 호출되고, 오류 발생시에는 `onError` 가 호출된다.
- swr 내부 오류(네트워크 or 콜백처리 오류 등) 발생시 해당 오류는 error 로 잘 리턴되지만 **내부적으로 오류 로그를 렌더링하지는 않으므로 외부에서 반드시 `error` 에 대한 (`console.error` 로 출력하는 등의) 최소한의 별도 예외 처리가 필요**하다. 그렇지 않으면 오류로그를 확인할 수 없기 때문에 실제 오류 발생시 어려움을 겪을 수 있다.
<br>

### Ref
- https://www.npmjs.com/package/swr
- https://swr.vercel.app/
