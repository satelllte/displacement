module.exports = {
  "extends": "next/core-web-vitals",
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn", {
        "additionalHooks": "(useRecoilCallback|useRecoilTransaction_UNSTABLE)" // https://recoiljs.org/docs/introduction/installation/#eslint
      }
    ]
  }
}
