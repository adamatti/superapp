const defaultTTLInMilliseconds = 24 * 60 * 60 * 1000;

interface StorageEntry {
  value: string;
  expiry: number;
}

/**
 * Expiration logic from https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
 */
class AuthLocalStorage {
  static load() {
    return {
      token: AuthLocalStorage.getWithExpiry('token'),
      authenticated: AuthLocalStorage.getWithExpiry('authenticated') === 'true',
    };
  }

  static store(token: string | null, isAuthenticated: boolean) {
    localStorage.removeItem('token');
    if (token) {
      AuthLocalStorage.setWithExpiry('token', token);
    }
    AuthLocalStorage.setWithExpiry('authenticated', `${isAuthenticated ? 'true' : 'false'}`);
  }

  static clean() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
  }

  /**
   *
   * @param key
   * @param value
   * @param ttl Time to live in milliseconds
   */
  private static setWithExpiry(key: string, value: string, ttl: number = defaultTTLInMilliseconds) {
    const now = new Date();

    const item: StorageEntry = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  private static getWithExpiry(key: string): string | null {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    let item: StorageEntry | null = null;
    try {
      item = JSON.parse(itemStr);
    } catch (error) {
      // invalid format
    }
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (!item || now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}

export default AuthLocalStorage;
