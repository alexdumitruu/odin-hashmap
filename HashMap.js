function HashMap(loadFactor = 0.75) {
  let capacity = 16;
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
    for (let i = 0; i < bucket.length; i++) {
      if (buckets[i][0] === key) {
        buckets[i][1] = value;
        return;
      }
    }
    buckets.push([key, value]);
    size++;

    if (size / capacity > loadfactor) {
      resize();
    }
  }

  

  function length() {
    return size;
  }

  function resize() {
    const oldBuckets = buckets;
    capacity *= 2;
    const newBuckets = new Array(capacity).fill(null).map(() => []);
    size = 0;
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        const index = hash(key);
        newBuckets[index].push([key, value]);
        size++;
      }
    }
    for (let i = 0; i < newBuckets.length; i++) {
      buckets[i] = newBuckets[i];
    }
  }
}
