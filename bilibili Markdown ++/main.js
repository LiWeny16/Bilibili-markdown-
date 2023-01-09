// ==UserScript==
// @name         Bilibili Markdown ++
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为B站专栏增加markdown解析功能；一次编写，到处发表！
// @author       You
// @match        https://member.bilibili.com/platform/upload/text/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require    https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.css
// @require    https://cdn.jsdelivr.net/npm/showdown/dist/showdown.min.js
// ==/UserScript==

(function () {
    'use strict'
    const document = unsafeWindow.document
    const window = unsafeWindow
    window.onload = () => {
        if (window.location.href.indexOf("member.bilibili.com/platform/upload/text/edit") > -1) {
            createBox().then((divE) => {
                appendBox(divE)
                addBothStyle()
            })
        }
    }
    function md2Html(md) {
        let converter = new showdown.Converter()
        converter.setOption('tables', true)
        let md_html = converter.makeHtml(md)
        console.log(md);
        console.log(md_html);
        return md_html
    }
    function getMdValue(){
        return document.getElementById('ueditor_0').contentWindow.document.body.innerHTML
    }
    function appendBox(divE) {
        document.body.prepend(divE)
    }
    function createBox() {
        return new Promise((resolve) => {
            var divE = document.createElement('div')
            var divId = document.createAttribute("id") //创建属性
            divId.value = 'gptDiv' //设置属性值
            divE.setAttributeNode(divId) //给div添加属性
            divE.innerHTML = `
            <div>
            <div>
              <input type="button" value="上传markdown文案预览">
              <input type="button" value="预览">
              <textarea name="1" id="preViewMd" cols="1" rows="1"></textarea>
            </div>
          </div>
            `
            resolve(divE)
        })
    }
    function addBothStyle() {
        GM_addStyle(`
 #gptDiv{
     border-radius: 8px;
     padding: 10px;
     margin-bottom: 9px;
     width:452px;
     translate:-20px;
     background:#ffffffcc;
     display: flex;
     flex-direction: row;
     position: fixed;
     top: 80px;
     border: solid;
     right: 51px;
     z-index: 9999;
     background: white;
     color: black;
     transition: all 0.5s ease 0s;
}`)
    }
    // Your code here...
})()