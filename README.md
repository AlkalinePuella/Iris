zh_CN

IrisBeta1
#2026 AlkalinePuella（碱式少女）仅保留著作权。遵循MIT协议。
#Beta版本意味着可能会出现不稳定的情况，或者产生意料之外的输出。Beta版的内容未来可能会被更新。

#时间匆忙，未进行完善的Debug。

Iris是什么？
Iris是一个数据处理函数工具。

Iris有什么功能？
Iris内置的函数允许你以一种特殊的格式传递在一个字符串中传递多个数据。现在支持对“字符串组”和“键值对组”进行解析。 

字符串组是什么？
字符串组是Iris可以解析的一种数据结构，形如：
  注释1{内容a{嵌套内容alpha{嵌套内容beta}}}注释2{内容b}注释3{内容c}注释4
其中，大括号（“{” 和 “}”符号 ）内填入的数据将被读取，大括号外的数据将被丢弃。例如，上面这个字符串组就会被解析为：
-第一个字符串：{内容a{嵌套内容α{嵌套内容β}}}
-第二个字符串：{内容b}
-第三个字符串：{内容c}
字符串组允许你更高效的传输参数。

键值对组是什么？
单个键值对中，每个键（Key）都对应着一个或多个值（Value）（但Iris只能解析一个Key对应一个Value的情况。你可以使用字符串组来将多个Value组合成一个Value，例如：<{Iris}={{Beta1}{AP}}>，输出为{Beta1}{AP}）。形如：
 注释1<{KeyA}={ValueA}>注释2<{KeyB}={ValueB}>注释3
其中，大括号和尖括号内填入的数据将被读取，大括号或尖括号外的数据将被丢弃。例如，上面这个键值对组就会被解析为：
-“KeyA”对应“ValueA”
-“KeyB”对应“ValueB”
键值对组允许你更高效的传输参数。
特殊地，键值对组中Key和Value不能出现尖括号，这意味着键值对组不能嵌套键值对组，形如 <{Iris}={{<{Version}={Beta1}>}{<{Dev}={AP}>}}> 的结构是非法的，因为Iris不会检查输入，错误的输入可能不会产生任何输出。请保证输入语法正确。

注意事项：
字符串组中不能出现不成对的大括号，键值对组中Key和Value不能出现尖括号，否则将产生意料之外的输出。
Iris尚不支持转义符。
Iris使用了特殊的扩展，用于实现线程数组和线程变量的功能。在加载时如若弹出“扩展安全警告”或类似弹窗，请勾选“在非沙盒环境下允许”，然后点击“允许”。否则将导致加载失败。


en

**Iris Beta1**  
#2026 AlkalinePuella (Alkaline Girl) retains copyright only. Licensed under the MIT License.  
#Beta version means that there may be instability or unexpected outputs. The content of the Beta version may be updated in the future.  
#Due to time constraints, thorough debugging has not been completed.

**What is Iris?**  
Iris is a data processing function tool.

**What functions does Iris have?**  
The built‑in functions of Iris allow you to pass multiple pieces of data in a single string using a special format. Currently, it supports parsing of “String Groups” and “Key‑Value Groups”.

**What is a String Group?**  
A String Group is a data structure that Iris can parse, in the form like:  
`Note1{content a{nested content alpha{nested content beta}}}Note2{content b}Note3{content c}Note4`  
Among them, the data enclosed in curly braces (`{` and `}`) will be read, and the data outside the curly braces will be discarded. For example, the above string group will be parsed as:  
- First string: `{content a{nested content α{nested content β}}}`  
- Second string: `{content b}`  
- Third string: `{content c}`  
The string group allows you to transmit parameters more efficiently.

**What is a Key‑Value Group?**  
In a single key‑value pair, each key corresponds to one or more values (but Iris can only parse the case where one key corresponds to one value. You can use a String Group to combine multiple values into one value, for example: `<{Iris}={{Beta1}{AP}>`, which outputs `{Beta1}{AP}`). In the form like:  
`Note1<{KeyA}={ValueA}>Note2<{KeyB}={ValueB}>Note3`  
Among them, the data enclosed in curly braces and angle brackets will be read, and the data outside curly braces or angle brackets will be discarded. For example, the above key‑value group will be parsed as:  
- `“KeyA”` corresponds to `“ValueA”`  
- `“KeyB”` corresponds to `“ValueB”`  
The key‑value group allows you to transmit parameters more efficiently.  
Specifically, keys and values in a key‑value group cannot contain angle brackets, which means that key‑value groups cannot be nested within key‑value groups. A structure like `<{Iris}={{<{Version}={Beta1}>}{<{Dev}={AP}>}}>` is illegal, because Iris does not check input; incorrect input may produce no output. Please ensure that the input syntax is correct.

**Notes:**  
- In a String Group, unmatched curly braces are not allowed; in a Key‑Value Group, keys and values cannot contain angle brackets; otherwise, unexpected output may occur.  
- Iris does not yet support escape characters.  
- Iris uses special extensions to implement thread arrays and thread variables. If a “Extension Security Warning” or similar pop‑up appears during loading, please check “Allow in non‑sandboxed environment” and then click “Allow”. Otherwise, loading will fail.
