import queryString from "query-string";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Params {
  cacheTime?: number; //缓存时间，单位为s。默认不缓存，0为不缓存
  params?: Record<string, any>;
}

interface Props extends Params {
  url: string;
  method: Method;
}

type Config =
  | { next: { revalidate: number } }
  | { cache: "no-store" }
  | { cache: "no-cache" }; //  浏览器在其 HTTP 缓存中寻找匹配的请求 如果有匹配，无论是新的还是陈旧的，浏览器都会向远程服务器发出条件请求。如果服务器指示资源没有更改，则将从缓存中返回该资源。否则，将从服务器下载资源并更新缓存。 如果没有匹配，浏览器将发出正常请求，并使用下载的资源更新缓存。

class Request {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, cacheTime }: Props) {
    let queryParams = ""; //url参数
    let requestPayload = ""; //请求体数据
    //请求头
    const headers = {
      // "Cache-Control": "no-store",
    };

    // const config: Config =
    //   cacheTime || cacheTime === 0
    //     ? cacheTime > 0
    //       ? { next: { revalidate: cacheTime } }
    //       : { cache: "no-store" }
    //     : { cache: "no-store" };

    const config = {
      cache: "no-store",
      next: { revalidate: 0 },
    };

    if (method === "GET" || method === "DELETE") {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        queryParams = queryString.stringify(params);
        url = `${url}?${queryParams}`;
      }
    } else {
      //非form-data传输JSON数据格式
      if (
        !["[object FormData]", "[object URLSearchParams]"].includes(
          Object.prototype.toString.call(params)
        )
      ) {
        Object.assign(headers, { "Content-Type": "application/json" });
        requestPayload = JSON.stringify(params);
      }
    }
    return {
      url,
      options: {
        method,
        headers,
        body:
          method !== "GET" && method !== "DELETE" ? requestPayload : undefined,
        ...config,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;
      if (res.ok) {
        return resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              return reject({
                message: errorData || "接口错误",
                url: requestUrl,
              });
            } catch {
              return reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({ url = "", params = {}, method }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: process.env.NEXT_PUBLIC_BASEURL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
    });

    const res = await fetch(req.url, req.options);
    return this.interceptorsResponse<T>(res);
  }

  async request<T>(method: Method, url: string, params?: Params): Promise<T> {
    return this.httpFactory<T>({ url, params, method });
  }

  get<T>(url: string, params?: Params): Promise<T> {
    return this.request("GET", url, params);
  }

  post<T>(url: string, params?: Params): Promise<T> {
    return this.request("POST", url, params);
  }

  put<T>(url: string, params?: Params): Promise<T> {
    return this.request("PUT", url, params);
  }

  delete<T>(url: string, params?: Params): Promise<T> {
    return this.request("DELETE", url, params);
  }

  patch<T>(url: string, params?: Params): Promise<T> {
    return this.request("PATCH", url, params);
  }
}

const request = new Request();

export default request;
