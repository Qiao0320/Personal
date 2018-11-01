[TOC]
****
#### Fundamental Knowledge Points

#### 常用js function
##### Array concatenation 数组拼接 
- 描述：使用Array.concat()，并通过…args来合并数组 和/或值，完成拼接
        const ArrayConcat = (arr, ...args) => [].concat(arr, ...args);
        // ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]

##### Array didderence 数组比较 
- 描述： 
    > 根据数组b创建一个set对象，然后再数组a上使用Array.filter()方法，过滤出数组b里不包含的数组a中的值，返回一个数组，顺序为这些数在数组a里的顺序
    ```js
    const difference = (a, b) => { 
        const s = new Set(b); 
        return a.filter( x => !s.has(x) );
    };
    console.log(difference([1,2,3], [1,2]))
    // -> [3]
    ```
##### Array includes 数组包含
- 描述： 
    > 使用 slice() 来取得需要查找的范围的数组 /或字符串，并使用 indexOf() 来检查是否包含待检测值。如果省略最后一个参数 fromIndex ，则会检查整个数组/字符串，返回true或false。
    ```js
    const includes = (collection, val, fromIndex = 0) => collection.slice(fromIndex).indexOf(val) != -1;
    console.log(includes('30-seconds-of-code', 'code'));
    console.log(includes([1, 2, 3, 4], [1, 2], 1));
    // -> true false
    ```
##### Array intersection  数组交集
- 描述： 
    > 据数组 b 创建一个 Set 对象，然后在数组 a 上使用 Array.filter() 方法，返回一个新数组，数组 b 和a中都有的值，顺序为a中出现的顺序。
    ```js
    const intersection = (a, b) => {
        const s = new Set(b); 
        return a.filter( x => s.has(x));
    }
    console.log(intersection([1,2,3], [4,3,2]));
    // -> [ 2, 3 ]
    ```
##### Array remove  数组移除
- 描述： 
    > 使用 Array.filter() 和 Array.reduce() 来查找返回真值的数组元素，使用 Array.splice() 来移除元素。 func 有三个参数(value, index, array)，返回被移除的数组成的数组，而非被移除之后的数组，顺序为arr中被筛选出来的数的顺序
    ```js
    const remove = (arr, func) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1); 
        return acc.concat(val); 
    }, []) : [];
    console.log(remove([1, 2, 3, 4], n => n % 2 == 0));
    // -> [ 2, 4 ]
    ```
##### Array sample  数组／字符串 中随机取样一个数（一个字符）
- 描述： 
    > 使用 Array.filter() 和 Array.reduce() 来查找返回真值的数组元素，使用 Array.splice() 来移除元素。 func 有三个参数(value, index, array)，返回被移除的数组成的数组，而非被移除之后的数组，顺序为arr中被筛选出来的数的顺序
    ```js
    const sample = arr => arr[Math.floor(Math.random() * arr.length)];
    console.log(sample([3, 7, 9, 11]))
    // -> 9
    ```
##### Array union  数组合集(去重合并)
- 描述： 
    > 用数组 a 和 b 的所有值创建一个 Set 对象，并转换成一个数组，IE暂不支持from()。
    ```js
    const union = (a, b) => Array.from(new Set([...a, ...b]));
    console.log(union([1,2,3], [4,3,2]))
    // -> [ 1, 2, 3, 4 ]
    ```
- 官方给的方法二： 
    ```js
    function combine(){ 
        let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
        return Array.from(new Set(arr));
    } 
    var m = [1, 2, 2], n = [2,3,3]; 
    console.log(combine(m,n));  
    console.log(combine([...m, ...n])); 
    // -> [ 1, 2, 3 ]  [ 1, 2, 3 ]
    ```
##### Array without  排除数组中给定值 
- 描述： 
    >使用 Array.filter() 创建一个排除所有给定值的数组。
    ```js
    const without = (arr, ...args) => arr.filter( v => args.indexOf(v) === -1 );
    console.log(without([2, 1, 2, 3, 4, 5, 5, 5, 3, 2, 7, 7], 3, 1, 5, 2))
    // -> [ 4, 7, 7 ]
    ```
##### compact  过滤数组里所有假值 
- 描述： 
    >使用 Array.filter() 过滤掉数组中所有 假值元素(false, null, 0, “”, undefined, and NaN)。
    ```js
    const compact = (arr) => arr.filter( v => v );
    console.log(compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]))
    // -> [ 1, 2, 3, 'a', 's', 34 ]
    ```
##### Count occurrences of a value in array  计数某数在数组中出现的次数 
- 描述： 
    > 每次遇到数组中的指定值时，使用 Array.reduce() 来递增计数器。
    ```js
    const countOccurrences2 = (arr, val) => arr.reduce((a, v) => v === val ? a + 1 : a + 0, 0 );
    console.log(countOccurrences2([1,1,2,1,2,3], 1)) 34]))
    // -> 3
    ```
##### Drop flatten array  深度平铺数组 
- 描述： 
    > 通过空数组([]) 使用 Array.concat() ，结合 展开运算符( … ) 来平铺数组。 递归平铺每个数组元素。
    ```js
    const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v));
    console.log(deepFlatten([1,[2],[[3],4],5]))
    // -> [ 1, 2, 3, 4, 5 ]
    ```
##### Array fill  数组替代填充 
- 描述： 
    > 使用 Array.map() 将指定值映射到 start(包含)和 end (排除)之间。省略 start 将从第一个元素开始，省略 end 将在最后一个元素完成。
    ```js
    const fillArray = (arr, val, start = 0, end = arr.length) => arr.map((v, i) => i >= start && i < end ? val : v);
    console.log(fillArray([2,12,3,32,45],'Qiao',2,5))
    // -> [ 2, 12, 'Qiao', 'Qiao', 'Qiao' ]
    ```
##### Filter out non-unique values in an array  过滤掉数组中的非唯一值 
- 描述： 
    > 使用 Array.filter() 滤除掉非唯一值，使数组仅包含唯一值。
    ```js
    const filterNonUnique = arr => arr.filter(v => arr.indexOf(v) === arr.lastIndexOf(v));
    console.log(filterNonUnique([1,2,2,3,4,4,5]));
    // -> [ 1, 3, 5 ]
    ```
##### Flatten array up to depth  根据depth平铺数组 
- 描述： 
    > 每次递归，使 depth 减 1 。使用 Array.reduce() 和 Array.concat() 来合并元素或数组。默认情况下， depth 等于 1 时停递归。省略第二个参数 depth ，只能平铺1层的深度 (单层平铺)。
    ```js
    const flattenDepth1 = (arr, depth = 1) =>
        depth != 1 ? arr.reduce((a, v) => 
            a.concat(Array.isArray(v) ? flattenDepth1(v, depth - 1) : v), [])
            : arr.reduce((a, v) => a.concat(v), []);
    console.log(flattenDepth1([1,[2],[[[3],4],5]], 2));
    // -> [ 1, 2, [ 3 ], 4, 5 ]
    ```
##### Initialize array with values  初始化特定范围和值的数组 
- 描述： 
    > 使用 Array(n) 创建所需长度的数组，使用 fill(v) 以填充所需的值。您可以忽略 value ，使用默认值 0 。
    ```js
    const initializeArray = (n,value=0) => Array(n).fill(value);
    console.log(initializeArray(3,5))
    // -> [ 5, 5, 5 ]
    ```
##### Median of Array  找到数组的中间值
- 描述： 
    > 找到数字数组的中间值，使用 Array.sort() 对值进行排序。如果 length 是奇数，则返回中间值数字，否则返回两个中间值数值的平均值。
    ```js
    const median = arr => {
        const mid = Math.floor(arr.length/2);
        const nums = arr.sort((a,b) => a-b);
        return arr.length%2!==0 ? nums[mid] : (nums[mid-1]+nums[mid+1]/2);
    };
    console.log(median([5,6,50,1,-5]))
    // -> [ 5, 5, 5 ]
    ```
##### Similarity between arrays  获取数组交集
- 描述： 
    > 使用 filter() 移除不在 values 中的值，使用 includes() 确定。
    ```js
    const similarity = (arr,values) => arr.filter((v) => values.includes(v));
    console.log(similarity([1,2,3],[1,2,4])) 
    // -> [ 1, 2 ]
    ```