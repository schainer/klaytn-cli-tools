## 클레이튼 네트워크 CLI 연결 도구

### 개요
Caver.js 를 이용하여 클레이튼 네트워크에 연결하여 필요한 작업을 할 수 있는 Node 기반의 CLI 도구입니다.

### 설치방법

1. .env 파일을 작성합니다. 사용할 클레이튼 노드의 종류에 따라 Caver 연결 설정이 바뀔 수도 있습니다.
본 프로젝트에 사용되는 노드는 Klaytn API Service (KAS)를 통해 연결됩니다.

    KAS 를 사용하는 경우, KAS 에서 제공하는 해당 정보를 env 에 포함시켜 주세요.
    ```dotenv
    KAS_NODE_ACCESS
    KAS_NODE_SECRET
    BC_NETWORK_ID
    ```
    
    사설 노드를 사용하는 경우 소스의 일부를 수정해야 할 수도 있습니다.
    ```javascript
    const buildCaver = () => {
      ...
      return new Caver(new Caver.providers.HttpProvider(nodeAP, options))
    }
    ```

2. 필요한 패키지들을 yarn 을 이용해 설치해 주세요.
3. `yarn start` 를 실행하면 송금요청할 수 있는 CLI 가 기본적으로 실행됩니다. (실행 화면 예시)
   ```text
      ❯ yarn start                  
      yarn run v1.22.10
      $ node app.js
      Target Wallet (.env 상의 지갑주소 노출)
      Current Balance 0.0979 KLAY (env 상의 지갑주소 잔액)
      ? Enter recipient's address ::: (수신자 입력창)
   ```
   

### 참고 자료

Caver SDK: https://docs.klaytn.com/bapp/sdk/caver-js/v1.4.1/api-references

