# web端api接口请求签名

## 使用方法

 - 步骤1：package.json里dependencies添加`nodeProxy-signature`
```json
{
  "dependencies": {
      "nodeProxy-signature": "git+https://gitlab.meiguipai.com/rayleigh/nodeProxy-signature.git"
  }
}
```
- 步骤2：执行`npm i`
- 步骤3：net.js里调用`getAuthorize`方法获取对应环境的签名算法，authorize的用法还是与之前保持一致

```javascript
//...
import {packageInfo} from '../constants/AppEnv'//改动1：获取当前调用哪个环境的接口
import getAuthorize from 'nodeProxy-signature' //改动2：authorize 替换为 getAuthorize
//...

const authorize=getAuthorize(packageInfo.env) //改动3： 获取对应环境的签名算法
// packageInfo.env 的可以是以下这些值中的一个：beta|rel|release|pre_production|production


//============= 以下部分没变化，这里只是展示用法 =============


//...

function _FETCH(url, param = {}, method = 'GET', noPre = false) {
    //...

    return new Promise(function(resolve, reject) {
        //...

        _fetch()

        //...

        function _fetch() {
            //...
            authorize(function(credential) {
                let signatureHeader = 'X-Baie-Authorization'
                let fetch_param = {
                    method: method,
                    headers: {
                        //...
                        [signatureHeader]: credential
                    },
                    body: JSON.stringify(params)
                }

                if (method === 'GET') {
                    //...

                    fetch_param = {
                        method: 'GET',
                        headers: {
                            //...
                            [signatureHeader]: credential
                        }
                    }
                }

                //...
                
                fetch(fetch_url, fetch_param)
                    //...
            }, params, {arrayFormat: 'repeat'})
        }
    })
}

```
