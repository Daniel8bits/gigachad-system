import axios, { AxiosError, AxiosRequestConfig, Method } from '@utils/axios'


class Endpoint<T> {

  private _endpoint: string
  private _data!: T[]
  private _loading: boolean = false;

  constructor(endpoint: string, preloaded: boolean) {
    this._endpoint = endpoint
    if (preloaded) {
      //this.get()
    }
  }

  public async request(url: string, method: Method, config?: AxiosRequestConfig<T>) {
    //if(this._loading) throw new Error("Error");
    this._loading = true;
    const { data } = await axios(url, {
      method,
      ...config
    });
    this._loading = false;
    return data;
  }

  public async get(params?: Record<string, string | number | undefined>): Promise<T[]>;
  public async get(params?: Record<string, string | number | undefined>, pk?: number): Promise<T>;
  public async get(params?: Record<string, string | number | undefined>, pk?: number): Promise<T | T[]> {

    const pkPath = pk ? `/${pk}` : "";
    const { data } = await this.request(`${this._endpoint}${pkPath}`, "GET", { params });
    this._data = data;
    return data;

  }

  public async post(body: T): Promise<T > {
    const { data } = await this.request(this._endpoint, "POST", { data: body });
    return data;
  }

  public async put(pk: string, body: T): Promise<T> {
    const { data } = await this.request(`${this._endpoint}/${pk}`, "PUT", { data: body });
    return data;
  }

  public async delete(pk: string): Promise<boolean> {
    await this.request(`${this._endpoint}/${pk}`, "DELETE");
    return true;
  }

}

export default Endpoint