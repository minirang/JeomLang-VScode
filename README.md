# JEOM VS Code Runner

JEOM(`.jeom`) 파일을 VS Code에서 바로 인식하고 실행할 수 있게 해 주는 로컬 확장 프로젝트입니다.

이 저장소는 JeomLang 자체의 공식 구현이 아니라, VS Code에서 `.jeom` 파일을 더 편하게 작성하고 실행하기 위한 도구입니다. 실행에는 워크스페이스의 `core/cli.js` 또는 이 저장소에 포함된 `official/cli.js`를 사용합니다.

- Website: https://jeomlang.vercel.app/
- GitHub: https://github.com/minirang/jeomlang

## 기능

- `.jeom` 파일 언어 인식
- `.jeom` 파일 아이콘 표시
- JeomLang TextMate 구문 강조
- 주석, 숫자 리터럴, 문자열 리터럴, 제어문, 함수/변수, 연산자, IO, 타입, 스택, 컬렉션, 파일 시스템, 시스템 명령 강조
- 기본 스니펫
- 편집기 상단 `Run JEOM` / `Check JEOM` CodeLens
- 편집기 메뉴, 탐색기 메뉴, 명령 팔레트 실행
- `Ctrl + F5`로 현재 `.jeom` 파일 실행
- Windows PowerShell, macOS/Linux shell 실행 지원

## 구문 강조

구문 강조 정의는 [syntaxes/jeom.tmLanguage.json](syntaxes/jeom.tmLanguage.json)에 있습니다.

VS Code는 `package.json`의 `contributes.grammars` 설정을 통해 `.jeom` 파일에 `source.jeom` grammar를 적용합니다.

```json
{
  "language": "jeom",
  "scopeName": "source.jeom",
  "path": "./syntaxes/jeom.tmLanguage.json"
}
```

이 grammar는 JeomLang 엔진의 명령 토큰과 맞춰져 있으며, 토큰 경계를 확인해서 사용자 정의 이름이 기존 명령의 접두사로 잘못 쪼개져 보이는 일을 줄입니다.

## 설치

PowerShell에서 다음 명령을 실행하면 현재 확장을 로컬 VS Code 확장 폴더에 설치합니다.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-local-extension.ps1
```

설치 후 VS Code에서 `Developer: Reload Window`를 실행하거나 VS Code를 다시 열면 적용됩니다.

적용되면 `.jeom` 파일에서 다음을 확인할 수 있습니다.

- 언어 모드: `JEOM`
- 구문 강조
- 파일 아이콘
- `Run JEOM` / `Check JEOM` CodeLens
- 편집기 오른쪽 위 실행 버튼

## 개발 모드

1. 이 저장소를 VS Code로 엽니다.
2. `F5`를 눌러 `Run JEOM VS Code Extension`을 실행합니다.
3. 새로 열린 Extension Development Host 창에서 `.jeom` 파일을 엽니다.
4. 구문 강조, CodeLens, 실행 명령을 확인합니다.

## 실행 명령

현재 열린 `.jeom` 파일은 기본적으로 다음 명령으로 실행됩니다.

```powershell
node official\cli.js run <현재 .jeom 파일>
```

문법 검사는 다음 명령을 사용합니다.

```powershell
node official\cli.js check <현재 .jeom 파일>
```

워크스페이스에 공식 저장소의 `core/cli.js`가 있으면 그것을 우선 사용하고, 없으면 이 확장에 포함된 `official/cli.js`를 사용합니다.

## 설정

다른 위치의 JeomLang CLI를 사용하려면 VS Code 설정에서 `jeom.cliPath`를 지정할 수 있습니다.

```json
{
  "jeom.cliPath": "${workspaceFolder}\\official\\cli.js"
}
```

직접 실행 명령을 지정하려면 `jeom.runCommand`와 `jeom.checkCommand`를 사용할 수 있습니다.

```json
{
  "jeom.runCommand": "jeom run ${file}",
  "jeom.checkCommand": "jeom check ${file}"
}
```

지원되는 치환값은 `${file}`, `${filePath}`, `${workspaceFolder}`, `${cliPath}`, `${mode}`입니다.

## 공식 파일 업데이트

공식 JeomLang 파일을 다시 받아오려면 다음 명령을 실행합니다.

```bash
npm run update-jeom
```

이 명령은 공식 사이트/CDN에서 다음 파일을 `official/` 폴더로 동기화합니다.

- `official/cli.js`
- `official/engine.js`
- `official/std.jeom`

업데이트 완료 시간은 `official/.version`에 저장됩니다.

## 주요 파일

- [package.json](package.json): VS Code 확장 메타데이터와 contribution 설정
- [extension.js](extension.js): 실행 버튼, CodeLens, 메뉴, 명령 실행 기능
- [syntaxes/jeom.tmLanguage.json](syntaxes/jeom.tmLanguage.json): JeomLang TextMate 구문 강조
- [language-configuration.json](language-configuration.json): 주석, 괄호, 자동 닫기 설정
- [snippets/jeom.code-snippets](snippets/jeom.code-snippets): 기본 스니펫
- [scripts/install-local-extension.ps1](scripts/install-local-extension.ps1): 로컬 확장 설치 스크립트
- [official/](official): 번들된 JeomLang CLI/엔진/표준 라이브러리
