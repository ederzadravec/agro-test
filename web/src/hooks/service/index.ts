import type { Method } from "axios";

import api from "#/services/api";
import { AuthContext } from "#/contexts";

import useRequest from "../request";

const useService = <ResponseType = any, Params = any, RouteParams = any>(
  type: Method,
  route: string | ((params: RouteParams) => string),
  data?: Params | any,
  autoFetch: boolean = true,
  update?: any[]
) => {
  const { state } = AuthContext.useAuth();

  const getData = (params?: Params, routeParams?: RouteParams, headers: any = {}): Promise<ResponseType> => {
    const resolvedRoute = typeof route === "function" ? route(routeParams as RouteParams) : route;

    const methodParams = ["get", "options", "head", "delete"].includes(type.toLocaleLowerCase())
      ? { params: !autoFetch ? params : data }
      : { data: !autoFetch ? params : data };

    return api.request({
      method: type,
      url: resolvedRoute,
      headers: {
        authorization: state?.token || "",
        userToken: state?.token || "",
        ...headers,
      },
      ...methodParams,
    });
  };

  return useRequest<ResponseType, Params, RouteParams>(getData, autoFetch, update);
};

export default useService;
