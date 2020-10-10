import ReactWordcloud from "react-wordcloud"
import { navigate } from "@reach/router"
import React from "react"

export default React.memo(function WordCloud({ words }) {
  const options = {
    enableOptimizations: true,
    deterministic: true,
    enableTooltip: false,
    padding: 4, // 패딩 설정 시 버그가 좀 있음.. ;;
    fontSizes: [18, 60],
    // fontWeight: 'bold',
    fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif`,
    rotations: 0,
  }

  /*
   * react-wordcloud 사용 안내
   * react-wordcloud는 내부적으로 fontSizes 의 2번째 인자로 전달되는 값을 기준으로
   * 해당 글씨 폰트글씨크기로 전달된 단어들을 모두 표시할 수 있는 지 여부를 체크하고
   * 모두 표시 할 수 없을 경우 최대 사이즈 * 0.95 를 한 후 다시 모든 단어를 표시할 수 있는 지 여부를 재귀적으로 체크한다(최대 10번 시도)
   * 그러므로 폰트 최대 사이즈 설정은 해당 화면 크기와 단어 개수를 적절히 계산하여 가장 적절한 값을 미리 계산하여 전달하는 것이
   * 렌더링 성능향상에 도움이 된다.
   *
   * 엉뚱하게? 너무 큰값을 전달하면 최적화된 최대 사이즈를 계산해 내느라 많은 비용이 발생한다(느려질 수 있다)
   * */
  return (
    <div style={{height: '1300px'}}>
      <ReactWordcloud
        callbacks={{
          onWordClick: ({ text }) => navigate("/tags/archives?tag=" + text),
        }}
        maxWords={1000}
        words={words}
        options={options}
      />
    </div>

  )
})
