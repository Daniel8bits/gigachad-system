import axios, { AxiosError } from '@utils/axios'


class Endpoint<T> {

  private _endpoint: string
  private _data!: T[]

  constructor(endpoint: string, preloaded: boolean) {
    this._endpoint = endpoint
    if (preloaded) {
      this.get()
    }
  }
  public async get(params?: Record<string, string>): Promise<T[]>;
  public async get(params?: Record<string, string>, pk?: number): Promise<T | false>;
  public async get(params?: Record<string, string>, pk?: number): Promise<T | false | T[]> {
    /*
    if(this._data) {
      this._data = values as T[]
    }
    return this._data
    */
    try {
      //if(!pk && this._data && this._data.length > 0) return this._data;
      const pkPath = pk ? `/${pk}` : "";
      const { data } = await axios.get(`${this._endpoint}${pkPath}`, { params }).then(({ data }) => data)
      this._data = data;
      return data;
    } catch (e: any) {
      console.log(e);
    }
    return false;
  }

  public async post(body: T): Promise<T | false> {
    try {
      const { data } = await axios.post(this._endpoint, body).then(({ data }) => data)
      return data;
    } catch (e: any) {
      console.log(e);
    }
    return false;
  }

  public async put(pk: string, body: T): Promise<T | false> {
    try {
      const { data } = await axios.put(`${this._endpoint}/${pk}`, body).then(({ data }) => data)
      return data;
    } catch (e: any) {
      console.log(e);
    }
    return false;
  }

  public async delete(pk: string): Promise<boolean> {
    try {
      await axios.post(`${this._endpoint}/${pk}`);
      return true;
    } catch (e: any) {
      console.log(e);
    }
    return false;
  }

}

export default Endpoint