# JEOM Compatibility

이 확장은 `official/cli.js`를 사용합니다.

공식 엔진과의 호환성을 유지하려면 `npm run update-jeom`으로 `official/` 폴더를 최신 공식 파일로 갱신하면 됩니다.

## Bundled Official Files

```text
official/
  cli.js
  engine.js
  std.jeom
  .version
```

`official/cli.js`는 같은 폴더의 `engine.js`를 로드합니다.
파일 이름은 공식 사이트 다운로드 URL(`cli.js`, `engine.js`)과 동일합니다.

## External CLI Mode

다른 위치의 공식 CLI를 직접 쓰고 싶다면 VS Code 설정에 명령 템플릿을 지정할 수 있습니다.
공식 CLI의 실행 형식이 아래와 같다면:

```powershell
jeom run hello.jeom
jeom check hello.jeom
```

VS Code 설정에 다음처럼 지정할 수 있습니다.

```json
{
  "jeom.runCommand": "jeom run ${file}",
  "jeom.checkCommand": "jeom check ${file}"
}
```

공식 CLI가 `node`로 실행되는 JS 파일이라면:

```json
{
  "jeom.runCommand": "node C:\\path\\to\\official\\cli.js run ${file}",
  "jeom.checkCommand": "node C:\\path\\to\\official\\cli.js check ${file}"
}
```

## Placeholders

명령 템플릿에서는 다음 값을 사용할 수 있습니다.

- `${file}` 또는 `${filePath}`: 현재 `.jeom` 파일 경로
- `${workspaceFolder}`: 현재 VS Code 워크스페이스 경로
- `${cliPath}`: `jeom.cliPath`로 지정했거나 기본으로 잡힌 CLI 경로
- `${mode}`: `run` 또는 `check`

경로 placeholder는 PowerShell에서 안전하게 따옴표 처리됩니다.

## Default Mode

`jeom.runCommand`와 `jeom.checkCommand`를 비워두면 다음 경로를 사용합니다.

```text
VS Code extension -> node official/cli.js run/check file.jeom -> official/engine.js
```

## Compatibility Check

공식 엔진과 내장 엔진의 호환성을 확인하려면 같은 `.jeom` 예제를 실행해서
출력, 에러 메시지, 종료 코드를 비교해야 합니다.

권장 기준:

- 공식 예제 파일
- README에 있는 최소 예제
- 변수, 함수, 조건문, 반복문, 파일 입출력처럼 동작 차이가 나기 쉬운 예제
