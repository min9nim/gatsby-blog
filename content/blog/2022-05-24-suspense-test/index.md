---
layout: post
title: 'react-query suspense mode 테스트 삽집 후기'
date: 2022-05-24 00:01
tags: [react-query, suspense, test]
description: 
draft: false
---


다음과 같이 suspense 모드를 사용하는 커스텀 훅이 있다고 해보자

```js
import { useQuery } from 'react-query'
import { isNil } from '@madup-inc/utils'
import { BusinessApi } from 'api/index'

export default function useBusiness({ bizId }) {
    return useQuery(
        ['business', bizId],
        () => BusinessApi.getBusiness({ bizId }),
        {
            suspense: true,
            enabled: !isNil(bizId),
        },
    )
}
```

그리고 테스트케이스를 아래와 같이 작성했다.

```js
import useBusiness from 'queries/useBusiness'
import { BusinessApi } from 'api/index'
import { QueryClient, QueryClientProvider } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import ErrorScreen from '../ui-component/ErrorScreen'
import ErrorBoundary from '../ErrorBoundary'

jest.mock('api/index')

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: attemptIndex =>
                Math.min(1000 * 2 ** attemptIndex, 30000),
            retry: 0,
            staleTime: 1000 * 10, // cached for 10 seconds
        },
    },
})

const wrapper = ({ children }) => (
    <ErrorBoundary fallback={ErrorScreen}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </ErrorBoundary>
)

describe('useBusiness', () => {
    test('bizId 가 다를 경우에만 api 호출이 발생해야 한다.', async () => {
        BusinessApi.getBusiness.mockResolvedValue('hello world')
        const { waitFor, result, waitForNextUpdate } = renderHook(
            () => useBusiness({ bizId: 1 }),
            { wrapper },
        )
        //
        // await waitForNextUpdate({ timeout: 5000 })

        await waitFor(() => result?.current?.data !== undefined, { timeout: 5000 })
        expect(BusinessApi.getBusiness).toHaveBeenCalledTimes(1)
    })
})

```

우선 undefined 에서 current 를 읽을 수 없다는 이상한 오류가 뜬다면
react 버젼과 react-test-renderer 의 버젼이 일치하는 지 확인하자.

필자는 둘의 버젼을 일치시킴으로 해당 문제는 해결을 하였다.

https://github.com/testing-library/react-hooks-testing-library/issues/753#issuecomment-1135441708


그리고 다음 오류를 만났다.
```
Watch Usage: Press w to show more.
 FAIL  src/queries/useBusiness.test.js (10.812 s)
  useBusiness
    ✕ bizId 가 다를 경우에만 api 호출이 발생해야 한다. (5004 ms)

  ● useBusiness › bizId 가 다를 경우에만 api 호출이 발생해야 한다.

    thrown: "Exceeded timeout of 5000 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      28 |
      29 | describe('useBusiness', () => {
    > 30 |     test('bizId 가 다를 경우에만 api 호출이 발생해야 한다.', async () => {
         |     ^
      31 |         BusinessApi.getBusiness.mockResolvedValue('hello world')
      32 |         const { waitFor, result, waitForNextUpdate } = renderHook(
      33 |             () => useBusiness({ bizId: 1 }),

      at src/queries/useBusiness.test.js:30:5
      at Object.<anonymous> (src/queries/useBusiness.test.js:29:1)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        12.639 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```


waitFor 에서 타임아웃 오류가 발생한다.
리액트 테스팅라이브러리가 아직 suspense 모드를 원활하게 지원하지 못하는 것 같다.(어쩌면 내가 방법을 모르는 것일지도ㅠ)

구글링을 해도 적절한 방법을 찾을 수 없었다;

**참고로 커스텀훅에서 suspense 를 false 로 설정하면 테스트가 통과된다!**

이 것 때문에 시간을 너무 많이 소비했다;
suspense 모드를 테스트할 수 있는 방법은 숙제로 남겨두고 다음 작업을 이어서 해야겠다.
