# iCatch ODM (ONVIF)

  This is an Onvif Config page via **ES6/es2015** with **ReactJS**. :movie_camera:

## Onvif library

  We build an onvif library through C#(**onvifJS**).
 
  You can checkout the library in **`onvif/lib/`**, there includes :
 
 * (through onvifJS) **onvif_bindings.js**
 * (through onvifJS) **onvif_schemas.js**
 * **http_object.js**
 * **onvif_ura.js**
 * **xsd_types.js**
 * **libonvif.js**

## API

 Checkout the api in **`onvif/binding`**.
 
## Development Dependencies

### React
 * [React](https://facebook.github.io/react/)
 * [React Router](https://reacttraining.com/react-router/)

### Modules & Components
 * [React Cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie)
 * [React Color](https://github.com/casesandberg/react-color)

### UI Framework
 * [Ant Design](https://github.com/ant-design)

### Tools
 * [create-react-app](https://github.com/facebookincubator/create-react-app): The startkit of this app.
 * [webpack](https://webpack.github.io/): A bundler for javascript and others(css, scss, image, json... etc.)

 > Note: How to [Migrate to Wepack2(↑)](https://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)

## Reference

### Onvif 

* WSDL
  * [Devise Binding](https://www.onvif.org/onvif/ver10/device/wsdl/devicemgmt.wsdl)
  * [Imaging Binding](https://www.onvif.org/ver20/imaging/wsdl/imaging.wsdl)
  * [Media Binding](https://www.onvif.org/onvif/ver10/media/wsdl/media.wsdl)
  * [Media2 Binding](https://www.onvif.org/onvif/ver20/media/wsdl/media.wsdl)
  * [Rule Engine Binding](https://www.onvif.org/ver20/analytics/wsdl/analytics.wsdl)

* Specification
  * [Device IO](https://www.onvif.org/specs/srv/io/ONVIF-DeviceIo-Service-Spec-v1706.pdf)
  * [Imaging](https://www.onvif.org/specs/srv/img/ONVIF-Imaging-Service-Spec-v1706.pdf)
  * [Media](https://www.onvif.org/specs/srv/media/ONVIF-Media-Service-Spec-v1706.pdf)
  * [Media2](https://www.onvif.org/specs/srv/media/ONVIF-Media2-Service-Spec-v1706.pdf)
  * [Analytics](https://www.onvif.org/specs/srv/analytics/ONVIF-Analytics-Service-Spec-v1706.pdf)

> Find out all documents on [onvif.org](https://www.onvif.org/profiles/specifications/).

### Javascript

* React 入門: [ReactJS 101](https://www.gitbook.com/book/kdchang/react101/details)
* React Component Lifecycle: [官方](https://facebook.github.io/react/docs/state-and-lifecycle.html)、[AndyYou's Blog](http://andyyou.logdown.com/posts/178998-reactjs-assembly-operation-and-life-cycle)
* ES6 (ES2015): [阮一峰 ES6 入門]((http://es6.ruanyifeng.com/))
* ES5 vs ES6+: [一看就懂的語法對照表](http://blog.techbridge.cc/2016/04/04/react-react-native-es5-es6-cheat-sheet/)
* Async/Await: [ES7 Async Await 聖經](https://medium.com/@peterchang_82818/javascript-es7-async-await-%E6%95%99%E5%AD%B8-703473854f29-tutorial-example-703473854f29)
* Promise, Generator, Async: [Callback 到 Promise 到 Async](http://huli.logdown.com/posts/292655-javascript-promise-generator-async-es6)
* Hex to Base64: [Hex_Base64.js](https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec)

### CSS

* Position: [關於 Position 屬性](http://huli.logdown.com/posts/292655-javascript-promise-generator-async-es6)
* 置中技巧: [垂直置中的七個方法](http://www.oxxostudio.tw/articles/201502/css-vertical-align-7methods.html)
* SASS/SCSS: [使用 SCSS 來加速寫 CSS 吧!](http://blog.visioncan.com/2011/sass-scss-your-css/)
 
> p.s. 專案中有使用 [Autoprefixer](https://github.com/postcss/autoprefixer) 在編譯時添加各瀏覽器的 prefixes

## License

 Copyright © 2017 iCatchinc - [MIT License](https://github.com/icatchinc/icatch-odm/blob/master/License)
