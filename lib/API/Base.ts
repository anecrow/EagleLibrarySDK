import { Data } from "./typs";

/** 默认值 */
export const Default = {
  /** Eagle服务地址 */
  get Server() {
    return "http://localhost:41595";
  },
  /** 更换Eagle服务地址 */
  change: (url: string | URL) => {
    if (typeof url == "string") url = new URL(url);
    const href = url.href;
    Object.defineProperty(Default, "Server", { get: () => href });
  },
};
/**
 * `Eagle API` 地址
 * @example
 * "api/item/list" // 相对pathname
 * "/api/item/list?limit=1" // 带search的pathname
 * "http://localhost:41595/api/item/list?limit=1" // 完整url字符串
 */
export type APIPath = string | URL;
const mergePath = (url: APIPath) => new URL(url, Default.Server);

/** 请求并解析返回的JSON数据 */
export async function fetchAwaitData(request: Request): Promise<Data> {
  const response = await fetch(request);
  if (!response.ok) throw response;
  const json = await response.json();
  return json.data; // BUG: 短时间内POST修改有可能会返回相同数据, 有可能是Eagle服务端优化合并队列的原因
}
/**
 * 通用 `GET` 函数
 * @param url 目标api
 * @param data 参数
 */
export function fetchGET(url: APIPath, data?: Record<string, any>) {
  if (typeof url == "string") url = mergePath(url);
  url = new URL("?" + new URLSearchParams(data).toString(), url);
  return fetchAwaitData(new Request(url));
}
/**
 * 通用 `POST` 函数
 * @param url 目标api
 * @param data 参数
 */
export function fetchPOST(url: APIPath, data: Record<string, any>) {
  if (typeof url == "string") url = mergePath(url);
  return fetchAwaitData(
    new Request(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
  );
}
