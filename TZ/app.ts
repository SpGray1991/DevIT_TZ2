let testData = [
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
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
let testData3 = [
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
let testData4 = [
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

const results = [];

// TASK 1

function array_find(
  arr: any[],
  search: string | RegExp
): string | any[] | null {
  return arr.filter((item) => {
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

function array_avg(arr: any, skipNaN: boolean = false): number {
  const valuesToFindAvg: number[] = arr
    .filter((item) => {
      if (Number.isNaN(+item) || (skipNaN && typeof item !== "number")) {
        return false;
      }

      return true;
    })
    .map((item) => +item);

  return valuesToFindAvg.reduce((a, b) => a + b) / valuesToFindAvg.length;
}

results["TASK_2"] = [array_avg(testData), array_avg(testData2, true)];

//TASK 3

function array_chunk(arr: any[], count: number): any[] {
  const any: any[] = [];
  for (
    let s: number = 0, e: number = count;
    s < arr.length;
    s += count, e += count
  ) {
    any.push(arr.slice(s, e));
  }

  return any;
}

results["TASK_3"] = [array_chunk(testData2, 2)];

//TASK 4

function array_skip_until(arr: any[], value: any): any[] {
  const indexOfValue = arr.findIndex((item) => item === value);

  return indexOfValue >= 0 ? arr.slice(indexOfValue) : [];
}

results["TASK_4"] = [
  array_skip_until(testData, 2),
  array_skip_until(testData, "Rafshan"),
  array_skip_until(testData, "asd"),
];

//TASK 5

function array_contains(arr: any[], search: string | RegExp): boolean {
  for (const value of arr) {
    let result: boolean = false;
    if (Array.isArray(value) && typeof value === "object") {
      result = array_contains(value, search);
    } else if (typeof value == "string") {
      const stringValue: string = "" + value;
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

function array_get(arr: any[], path: string): any {
  if (!path.length) {
    return arr;
  }

  const pathToValue = path
    .split(/(\[|\]|\.)/)
    .filter((x) => x.match(/[0-9a-zA-Z]/));

  let result = arr;
  for (const partOfPath of pathToValue) {
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

function array_search(
  arr: any[],
  search: string | RegExp,
  path: string = ""
): any {
  let baseArrayForFind = path.length ? array_get(arr, path) : arr;

  if (!baseArrayForFind) {
    return null;
  }

  let result: any[] = [];

  for (const [key, value] of Object.entries(baseArrayForFind)) {
    let pathResult = null;

    const nextPartOfPath: string = Number.isNaN(+key) ? `.${key}` : `[${key}]`;
    const fullPathToSearch = path + nextPartOfPath;

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

    const stringValue: string = "" + value;

    const searchedValue =
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

function array_combine(keys: any[], values: any[]): object {
  const result: object = {};

  for (const [index, key] of Object.entries(keys)) {
    if (Number.isInteger(key) || typeof key === "string") {
      result[key] = values[index];
    }
  }

  return result;
}

results["TASK_8"] = [array_combine(testData, testData2)];

//TASK 9

function array_normalize(
  arr: any[],
  shema: string | object,
  transform: boolean = false
): any[] {
  const typesToNormalizeData = {
    object: {
      check: function (value: any) {
        if (typeof value !== "object") {
          return false;
        }

        for (const [key, innerSchema] of Object.entries(shema)) {
          const checkForType =
            typeof innerSchema === "object" ? "object" : innerSchema;

          const innerChecked = typesToNormalizeData[checkForType]["check"](
            value[key]
          );

          if (!innerChecked) {
            return false;
          }
        }

        return true;
      },
      normalize: function (value: any) {
        if (typeof value !== "object") {
          return undefined;
        }

        let normalized = {};

        Object.entries(shema).forEach(([key, innerSchema]) => {
          const normalizeToType =
            typeof innerSchema === "object" ? "object" : innerSchema;

          const innerNormalized = typesToNormalizeData[normalizeToType][
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
      check: function (value: any) {
        return typeof value === "string";
      },
      normalize: function (value: any) {
        if (typeof value === "number") {
          return value.toString();
        }

        return undefined;
      },
    },
    number: {
      check: function (value: any) {
        return typeof value === "number";
      },
      normalize: function (value: any) {
        if (!Number.isNaN(+value)) {
          return +value;
        }

        return undefined;
      },
    },
    int: {
      check: function (value: any) {
        return Number.isInteger(value);
      },
      normalize: function (value: any) {
        if (!Number.isNaN(+value)) {
          return Number.parseInt(value);
        }

        return undefined;
      },
    },
    float: {
      check: function (value: any) {
        return !!(value % 1);
      },
      normalize: function (value: any) {
        if (!Number.isNaN(+value)) {
          return Number.parseFloat(value);
        }

        return undefined;
      },
    },
    bool: {
      check: function (value: any) {
        return typeof value === "boolean";
      },
      normalize: function (value: any) {
        return !!value;
      },
    },
    function: {
      check: function (value: any) {
        return typeof value === "function";
      },
      normalize: function (value: any) {
        return undefined;
      },
    },
    array: {
      check: function (value: any) {
        return Array.isArray(value);
      },
      normalize: function (value: any) {
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

  const result: any[] = [];

  for (const value of arr) {
    let isValid = false;

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

    const normalizedValue: any =
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

function array_pluck(arr: any[], path: string): any[] {
  const result: any[] = [];

  for (const value of arr) {
    const pluckedValue = array_get(value, path);

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

function array_unique(arr: any[]): any[] {
  console.log("TEST DATA - ", arr);
  return arr.filter((item) => {
    return arr.filter((innerItem) => innerItem === item).length === 1;
  });
}

results["TASK_11"] = [array_unique(testData.concat(testData2))];

//TASK 12

function array_fill(length: number, value: any): any[] {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(value);
  }

  return result;
}

results["TASK_12"] = [array_fill(5, "string")];

for (const taskKey in results) {
  console.log(`${taskKey} - `, ...results[taskKey]);
}
