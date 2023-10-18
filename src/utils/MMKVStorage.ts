import Config from 'react-native-config';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: Config.MMKV_INSTANCE_ID || '',
  encryptionKey: Config.MMKV_KEY,
});

/**
 * a function to manage sets, deletes, and get values ​​from MMKV Storage,
 * and make its usage similar to AsyncStorage
 */
const MMKVStorage = {
  /**
   * a function to save single item into MMKV Storage
   * @param key is string params that to be the variable key when set item to MMKV
   * @param value is string params that to be the value when set item to MMKV
   */
  setItem: (key: string, value: any) => {
    storage?.set(key, value);
  },

  /**
   * a function to remove single item in MMKV Storage
   * @param key is string params that to be compare with a variable in MMKV to remove it
   */
  removeItem: (key: string) => {
    storage?.delete(key);
  },

  /**
   * a function to get single item in MMKV Storage
   * @param key is string params that to be compare with a variable in MMKV to return it value
   * @return string
   */
  getItem: (key: string) => {
    return storage?.getString(key);
  },

  /**
   * a function to set multi (>1) item into MMKV Storage
   * @param datas is array params that containing keys and values to set into MMKV
   */
  multiSet: (datas: string[][]) => {
    datas.forEach(d => {
      storage?.set(d[0], d[1]);
    });
  },

  /**
   * a function to remove multi (>1) item in MMKV Storage
   * @param datas is array of keys params that to be compare with a variable in MMKV to remove it
   */
  multiRemove: (keys: string[]) => {
    keys.forEach(key => {
      storage?.delete(key);
    });
  },

  /**
   * a function to get multi (>1) item in MMKV Storage
   * @param datas is array of keys params that to be compare with a variable in MMKV to remove it
   * @return Arrays of Array just like AsyncStorage.multiGet
   * @example return value: [[key1,val1], [key2,val2]]
   */
  multiGet: (keys: string[]) => {
    const multiVal = keys.map(key => {
      const keyVal = storage?.getString(key);
      return [key, keyVal];
    });

    return multiVal;
  },

  /**
   * a function to clear all item in MMKV Storage
   */
  clear: () => {
    storage?.clearAll();
  },

  /**
   * a function to delete all item in persist
   */
  deletePersist: (key: string) => {
    storage.delete(key);
  },
};

export default MMKVStorage;
