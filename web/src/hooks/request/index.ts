import React from 'react';
import type { AxiosResponse } from 'axios';

export interface IRequest<ResponseType = any, Params = any, RouteParams = any> {
  data?: ResponseType;
  loading: boolean;
  fetch: (params?: Params, routeParams?: RouteParams, headers?: any) => Promise<ResponseType>;
  response?: AxiosResponse<ResponseType>;
}

const request = <ResponseType, Params = [], RouteParams = any>(
  getData: (params?: Params, routeParams?: RouteParams) => Promise<ResponseType>,
  autoFetch = true,
  update: unknown[] = []
): IRequest<ResponseType, Params, RouteParams> => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<AxiosResponse<ResponseType>>();

  const fetchData = async (params?: Params, routeParams?: RouteParams, headers: any = {}): Promise<ResponseType> => {
    setLoading(true);

    // @ts-ignore
    const response: AxiosResponse = await getData(params, routeParams, headers).catch((err) => {
      return err.response;
    });

    setLoading(false);

    setData(response);

    return response?.data;
  };

  React.useEffect(() => {
    if (autoFetch) fetchData();
  }, update);

  return { data: data?.data, loading, response: data, fetch: fetchData };
};

export default request;
