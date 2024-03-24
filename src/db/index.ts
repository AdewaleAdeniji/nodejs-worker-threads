import NodeCache from "node-cache";

const myCache = new NodeCache();

export const saveToDB = (key: string, value: any) => {
  console.log(`Saving ${key} to database`);
  myCache.set(key, value, 360000); // expiry/ time to live ttl
};
export const getFromDB = (key: string) => {
  console.log(`Getting ${key} from database`);
  //myCache.get(key);
  let value = myCache.get(key);
  if (value == undefined) {
    // handle miss!
    return {
      error: "key not found",
      found: false,
      value,
    };
  }
  return {
    value: value,
    found: true,
  };
};
//write a function that writes to a json file
