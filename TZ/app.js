var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var testData = [
  1,
  2,
  1990,
  85,
  24,
  "Vasya",
  "colya@example.com",
  "Rafshan",
  "ashan@example.com",
  true,
  false,
];
var testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
var testData3 = [
  {
    name: "Vasya",
    email: "vasya@example.com",
    age: 20,
    skills: {
      php: 0,
      js: -1,
      madness: 10,
      rage: 10,
    },
  },
  {
    name: "Dima",
    email: "dima@example.com",
    age: 34,
    skills: {
      php: 5,
      js: 7,
      madness: 3,
      rage: 2,
    },
  },
  {
    name: "Colya",
    email: "colya@example.com",
    age: 46,
    skills: {
      php: 8,
      js: -2,
      madness: 1,
      rage: 4,
    },
  },
  {
    name: "Misha",
    email: "misha@example.com",
    age: 16,
    skills: {
      php: 6,
      js: 6,
      madness: 5,
      rage: 2,
    },
  },
  {
    name: "Ashan",
    email: "ashan@example.com",
    age: 99,
    skills: {
      php: 0,
      js: 10,
      madness: 10,
      rage: 1,
    },
  },
  {
    name: "Rafshan",
    email: "rafshan@example.com",
    age: 11,
    skills: {
      php: 0,
      js: 0,
      madness: 0,
      rage: 10,
    },
  },
];
var testData4 = [
  {
    name: "Vasya",
    email: "vasya@example.com",
    age: 20,
  },
  {
    name: "Dima",
    email: "dima@example.com",
    age: 34,
  },
  {
    name: "Colya",
    email: "colya@example.com",
    age: 46,
  },
  {
    name: "Misha",
    email: "misha@example.com",
    age: 16,
  },
  {
    name: "Ashan",
    email: "ashan@example.com",
    age: 99,
  },
  {
    name: "Rafshan",
    email: "rafshan@example.com",
    age: 11,
  },
  1,
  2,
  1990,
  85,
  24,
  "Vasya",
  "colya@example.com",
  "Rafshan",
  "ashan@example.com",
  true,
  false,
  [
    [
      [
        [
          1,
          2,
          1990,
          85,
          24,
          "Vasya",
          "colya@example.com",
          "Rafshan",
          "ashan@example.com",
          true,
          false,
          [
            {
              name: "Rafshan",
              email: "rafshan@example.com",
              age: 11,
            },
          ],
        ],
      ],
    ],
  ],
];
var results = [];
// TASK 1
function array_find(arr, search) {
  return arr.filter(function (item) {
    if (typeof item !== "string") {
      return false;
    }
    return search instanceof RegExp ? search.test(item) : item === search;
  });
}
results["TASK_1"] = [
  array_find(testData, /^raf.*/i),
  array_find(testData, "Rafshan"),
];
// TASK 2
function array_avg(arr, skipNaN) {
  if (skipNaN === void 0) {
    skipNaN = false;
  }
  var valuesToFindAvg = arr
    .filter(function (item) {
      if (Number.isNaN(+item) || (skipNaN && typeof item !== "number")) {
        return false;
      }
      return true;
    })
    .map(function (item) {
      return +item;
    });
  return (
    valuesToFindAvg.reduce(function (a, b) {
      return a + b;
    }) / valuesToFindAvg.length
  );
}
results["TASK_2"] = [array_avg(testData), array_avg(testData2, true)];
//TASK 3
function array_chunk(arr, count) {
  var any = [];
  for (var s = 0, e = count; s < arr.length; s += count, e += count) {
    any.push(arr.slice(s, e));
  }
  return any;
}
results["TASK_3"] = [array_chunk(testData2, 2)];
//TASK 4
function array_skip_until(arr, value) {
  var indexOfValue = arr.findIndex(function (item) {
    return item === value;
  });
  return indexOfValue >= 0 ? arr.slice(indexOfValue) : [];
}
results["TASK_4"] = [
  array_skip_until(testData, 2),
  array_skip_until(testData, "Rafshan"),
  array_skip_until(testData, "asd"),
];
//TASK 5
function array_contains(arr, search) {
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var value = arr_1[_i];
    var result = false;
    if (Array.isArray(value) && typeof value === "object") {
      result = array_contains(value, search);
    } else if (typeof value == "string") {
      var stringValue = "" + value;
      result =
        search instanceof RegExp
          ? search.test(stringValue)
          : stringValue === search;
    }
    if (result) {
      return true;
    }
  }
  return false;
}
results["TASK_5"] = [
  array_contains(testData4, /^raf.*/i),
  array_contains(testData4, /^azaza.*/i),
];
//TASK 6
function array_get(arr, path) {
  if (!path.length) {
    return arr;
  }
  var pathToValue = path.split(/(\[|\]|\.)/).filter(function (x) {
    return x.match(/[0-9a-zA-Z]/);
  });
  var result = arr;
  for (
    var _i = 0, pathToValue_1 = pathToValue;
    _i < pathToValue_1.length;
    _i++
  ) {
    var partOfPath = pathToValue_1[_i];
    if (typeof result[partOfPath] === "undefined") {
      return undefined;
    }
    result = result[partOfPath];
  }
  return result;
}
results["TASK_6"] = [
  array_get(testData4, "[5].name"),
  array_get(testData4, "[17][0][0][0][11][0]"),
  array_get(testData4, "[17][0][0][0][11][0][name]"),
];
//TASK 7
function array_search(arr, search, path) {
  if (path === void 0) {
    path = "";
  }
  var baseArrayForFind = path.length ? array_get(arr, path) : arr;
  if (!baseArrayForFind) {
    return null;
  }
  var result = [];
  for (
    var _i = 0, _a = Object.entries(baseArrayForFind);
    _i < _a.length;
    _i++
  ) {
    var _b = _a[_i],
      key = _b[0],
      value = _b[1];
    var pathResult = null;
    var nextPartOfPath = Number.isNaN(+key)
      ? ".".concat(key)
      : "[".concat(key, "]");
    var fullPathToSearch = path + nextPartOfPath;
    if (Array.isArray(value) || typeof value === "object") {
      pathResult = array_search(arr, search, fullPathToSearch);
    }
    if (Array.isArray(pathResult) && pathResult.length) {
      result = result.concat(pathResult);
      continue;
    }
    if (typeof value !== "string") {
      continue;
    }
    var stringValue = "" + value;
    var searchedValue =
      search instanceof RegExp
        ? search.test(stringValue)
        : stringValue === search;
    if (searchedValue) {
      result.push([fullPathToSearch, value]);
    }
  }
  return result;
}
results["TASK_7"] = [
  array_search(testData4, /^raf.*/i),
  array_search(testData4, /^raf.*/i, "[17][0][0][0]"),
];
//TASK 8
function array_combine(keys, values) {
  var result = {};
  for (var _i = 0, _a = Object.entries(keys); _i < _a.length; _i++) {
    var _b = _a[_i],
      index = _b[0],
      key = _b[1];
    if (Number.isInteger(key) || typeof key === "string") {
      result[key] = values[index];
    }
  }
  return result;
}
results["TASK_8"] = [array_combine(testData, testData2)];
//TASK 9
function array_normalize(arr, shema, transform) {
  if (transform === void 0) {
    transform = false;
  }
  var typesToNormalizeData = {
    object: {
      check: function (value) {
        if (typeof value !== "object") {
          return false;
        }
        for (var _i = 0, _a = Object.entries(shema); _i < _a.length; _i++) {
          var _b = _a[_i],
            key = _b[0],
            innerSchema = _b[1];
          var checkForType =
            typeof innerSchema === "object" ? "object" : innerSchema;
          var innerChecked = typesToNormalizeData[checkForType]["check"](
            value[key]
          );
          if (!innerChecked) {
            return false;
          }
        }
        return true;
      },
      normalize: function (value) {
        if (typeof value !== "object") {
          return undefined;
        }
        var normalized = {};
        Object.entries(shema).forEach(function (_a) {
          var key = _a[0],
            innerSchema = _a[1];
          var normalizeToType =
            typeof innerSchema === "object" ? "object" : innerSchema;
          var innerNormalized = typesToNormalizeData[normalizeToType][
            "normalize"
          ](value[key]);
          if (innerNormalized !== undefined) {
            normalized[key] = innerNormalized;
          }
        });
        return Object.keys(normalized).length ? normalized : undefined;
      },
    },
    string: {
      check: function (value) {
        return typeof value === "string";
      },
      normalize: function (value) {
        if (typeof value === "number") {
          return value.toString();
        }
        return undefined;
      },
    },
    number: {
      check: function (value) {
        return typeof value === "number";
      },
      normalize: function (value) {
        if (!Number.isNaN(+value)) {
          return +value;
        }
        return undefined;
      },
    },
    int: {
      check: function (value) {
        return Number.isInteger(value);
      },
      normalize: function (value) {
        if (!Number.isNaN(+value)) {
          return Number.parseInt(value);
        }
        return undefined;
      },
    },
    float: {
      check: function (value) {
        return !!(value % 1);
      },
      normalize: function (value) {
        if (!Number.isNaN(+value)) {
          return Number.parseFloat(value);
        }
        return undefined;
      },
    },
    bool: {
      check: function (value) {
        return typeof value === "boolean";
      },
      normalize: function (value) {
        return !!value;
      },
    },
    function: {
      check: function (value) {
        return typeof value === "function";
      },
      normalize: function (value) {
        return undefined;
      },
    },
    array: {
      check: function (value) {
        return Array.isArray(value);
      },
      normalize: function (value) {
        if (typeof value === "object") {
          return Object.keys(value);
        }
        return undefined;
      },
    },
  };
  if (
    typeof shema !== "object" &&
    !Object.keys(typesToNormalizeData).includes(shema)
  ) {
    return [];
  }
  var result = [];
  for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
    var value = arr_2[_i];
    var isValid = false;
    if (typeof shema === "object") {
      isValid = typesToNormalizeData["object"]["check"](value);
    }
    isValid =
      typesToNormalizeData[
        typeof shema === "object" ? "object" : shema.toString()
      ]["check"](value);
    if (isValid) {
      result.push(value);
      continue;
    }
    if (!transform) {
      continue;
    }
    var normalizedValue =
      typesToNormalizeData[
        typeof shema === "object" ? "object" : shema.toString()
      ]["normalize"](value);
    if (normalizedValue !== undefined) {
      result.push(normalizedValue);
    }
  }
  return result;
}
results["TASK_9"] = [
  array_normalize(testData4, "string"),
  array_normalize(testData4, "string", true),
  array_normalize(testData4, { age: "float" }),
  array_normalize(testData4, { age: "float" }, true),
];
//TASK 10
function array_pluck(arr, path) {
  var result = [];
  for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
    var value = arr_3[_i];
    var pluckedValue = array_get(value, path);
    if (pluckedValue !== undefined) {
      result.push(pluckedValue);
    }
  }
  return result;
}
results["TASK_10"] = [
  array_pluck(testData3, "name"),
  array_pluck(testData3, "skills.php"),
];
//TASK 11
function array_unique(arr) {
  console.log("TEST DATA - ", arr);
  return arr.filter(function (item) {
    return (
      arr.filter(function (innerItem) {
        return innerItem === item;
      }).length === 1
    );
  });
}
results["TASK_11"] = [array_unique(testData.concat(testData2))];
//TASK 12
function array_fill(length, value) {
  var result = [];
  for (var i = 0; i < length; i++) {
    result.push(value);
  }
  return result;
}
results["TASK_12"] = [array_fill(5, "string")];
for (var taskKey in results) {
  console.log.apply(
    console,
    __spreadArray(["".concat(taskKey, " - ")], results[taskKey], false)
  );
}
