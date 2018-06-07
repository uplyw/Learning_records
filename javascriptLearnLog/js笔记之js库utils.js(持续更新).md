

```javascript
var utils = {
    // -> listTOArray: 实现将类数组转换为数组
    listToArray: function(likeArray){
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e){
            for(var i = 0; i < likeArray.length; i++){
                ary[ary.length] = likeArray[i]
            }
        }
        return ary;
    },
    
    // -> 把JSON格式的字符串转换为JSON格式的对象
    jsonParse: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + "+");
    }
}
```
