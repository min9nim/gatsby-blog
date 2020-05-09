---
layout: post
title: "[알고리즘] Quick sort"
date: 2018-08-29 01:00
categories: algorithm
tags: [algorithm, quick-sort]
---
퀵소트는 아래와 같은 방법으로 정렬을 진행한다
1. 배열의 요소 중 임의의 값을 pivot 으로 지정
1. pivot 값을 기준으로 pivot보다 작거나 같은 값들은 왼쪽에 큰값들은 오른쪽에 위치시킨다
1. 각 왼쪽과 오른쪽 배열에 대해서 요소의 개수가 0 또는 1이 될 때까지 위 1~2 과정을 반복한다

한줄요약
> 임의 값을 기준을 왼쪽/오른쪽 나누고 나뉘어진 상태에 대해서 동일한 작업을 재귀적으로 진행한다.

<br>
### 특징
- 분할&정복
- 불안정정렬
- 시간복잡도: 최악 O(n^2), 평균 O(nLogn), 최선 O(nLogn)

<br>
### 간단한 js구현
아래 코드는 이해하기 쉽지만 O(nLogn) 공간복잡도 비용이 지불되는 단점이 있다
```javascript
function quickSort(a){
    if(a.length < 2){
        return a;
    }
    var pivot = a[0];   // 첫번째 요소를 pivot으로 세팅
    var left = [];
    var center = [pivot];
    var right = [];
    for(var i=1; i<a.length; i++){
        if(a[i] > pivot){
            right.push(a[i])
        }else if(a[i] === pivot){
            center.push(a[i]);
        }else{
            left.push(a[i]);
        }
    }
    return [...quickSort(left), ...center, ...quickSort(right)];
}

quickSort([7,4,9,8,5,3,2,1,9,3]);
/*
[1, 2, 3, 3, 4, 5, 7, 8, 9, 9]
*/
```

<br>
아래와 같이 공간복잡도 O(1) 를 사용하는 구현도 가능하다. 하지만 코드의 디테일을 정확히 이해하기가 만만치 않다.
<script src="https://gist.github.com/min9nim/162c09236a83b52bcc3e631469ad1437.js"></script>

위 코드에서 가장 중요하게 다뤄져야할 부분은 **partition 함수는 pivot값을 기준으로 양분된 배열에서 pivot 값의 위치를 리턴해야 한다** 는 것이다

9라인에서 `pivot`에 `a[left]` 값을 할당하고 루프(13~17라인) 안에서 최초로 `pivot`과 비교대상이 되는 `a[i]`값은 (`i` === `left` 이므로) `pivot`과 동일한 값이기 때문에 무조건 `i`값이 +1 증가 할테니 아예 처음부터 `i`에 `left+1` 의 값을 할당하고 싶은 마음이 생길 수 있지만 그렇게 해서는 안된다.

`i`에 `left+1`을 할당하면 길이 2인 배열이 입력으로 들어올 경우에 문제가 발생할 수 있다. (이 경우의 구체적인 동작에 대한 설명은 생략하겠다. 이 부분은 직접 코드를 돌려보며 각 실행단계를 확인해 보는 것이 내용을 정확히 이해하는데 더 큰 도움이 될 것이다)

그리고 루프(13~17라인) 안에 루프에서 `j`의 값을 감소시키는 루프(14라인)가 `i`를 증가시키는 루프(15라인)보다 앞서 위치해야 하는 것도 중요함을 주의해야 한다.


<br>
### Ref
<https://ko.wikipedia.org/wiki/퀵_정렬>
