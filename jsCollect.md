[TOC]
****
##### Array concatenation 数组拼接 
- 描述：使用Array.concat()，并通过…args来合并数组 和/或值，完成拼接
        const ArrayConcat = (arr, ...args) => [].concat(arr, ...args);
        // ArrayConcat([1], [1, 2, 3, [4]]) -> [1, 2, 3, [4]]

##### Array didderence 数组比较 
- 描述： 
    > 根据数组b创建一个set对象，然后再数组a上使用Array.filter()方法，过滤出数组b里不包含的数组a中的值，返回一个数组，顺序为这些数在数组a里的顺序
        const difference = (a, b) => { const s = new Set(b); return a.filter( x => !s.has(x) ); } };

// difference([1,2,3], [1,2]) -> [3]