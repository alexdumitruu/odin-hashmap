function HashMap(loadFactor = 0.75, capacity = 16) {
  let size = 0;
  const buckets = new Array(capacity).fill(null).map(() => []);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (buckets[index][0] === key) {
      buckets[index][1] = value;
      return;
    }
    buckets[index] = [key, value];
    size++;

    if (size / capacity > loadFactor) {
      resize();
    }
  }

  function get(key) {
    const index = hash(key);
    let value = null;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (buckets[index][0] === key) {
      value = buckets[index][1];
    }

    return value;
  }

  function has(key) {
    const index = hash(key);
    let flag = false;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (buckets[index][0] === key) {
      flag = true;
    }

    return flag;
  }

  function remove(key) {
    const index = hash(key);
    let flag = false;
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (buckets[index][0] === key && buckets[index][1] !== null) {
      buckets[index].splice(0, 1);
      size--;
      flag = true;
    }
    return flag;
  }
  function length() {
    return size;
  }

  function clear() {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = null;
    }
    size = 0;
  }

  function keys() {
    let keys = [];
    for (let i = 0; i < buckets.length; i++) {
      keys.push(buckets[i][0]);
    }
    return keys;
  }

  function values() {
    let values = [];
    for (let i = 0; i < buckets.length; i++) {
      values.push(buckets[i][1]);
    }
    return values;
  }

  function entries() {
    let entries = [];
    for (let i = 0; i < buckets.length; i++) {
      entries.push(buckets[i]);
    }
    return entries;
  }

  function resize() {
    const oldBuckets = buckets;
    capacity = capacity * 2;
    const newBuckets = new Array(capacity).fill(null).map(() => []);
    size = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        const index = hash(key);
        if (index < 0 || index >= buckets.length) {
          throw new Error("Trying to access index out of bounds");
        }
        newBuckets[index].push([key, value]);
        size++;
      }
    }
    for (let i = 0; i < newBuckets.length; i++) {
      buckets[i] = newBuckets[i];
    }
  }

  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());
test.set("lion", "very brown");
console.log(test.length());