import React from "react"

export default function License() {
  return (
    <div className="license">
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        <img
          alt="크리에이티브 커먼즈 라이선스"
          style={{ borderWidth: 0, marginBottom: 0 }}
          src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png"
        />
      </a>
      이 저작물은{" "}
      <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">
        크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스
      </a>
      에 따라 이용할 수 있습니다.
    </div>
  )
}