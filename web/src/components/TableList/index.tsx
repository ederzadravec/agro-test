import React from "react";
import * as R from "ramda";

import Header from "./components/Header";
import Item from "./components/Item";
import Paginate from "./components/Paginate";
import Loader from "../../components/Loader";
import * as S from "./styled";
import type * as Types from "./types";

interface TableListProps {
  config: Array<Types.ColumnProps>;
  data?: Array<any>;
  dataPath?: string;
  paginate?: boolean;
  paginatePath?: string;
  loading?: boolean;
  onRowClick?: (row: any) => void;
  onChangePage?: (page: number) => void;
}

const List: React.FC<TableListProps> = ({
  config,
  data,
  dataPath,
  paginate,
  paginatePath,
  loading,
  onRowClick,
  onChangePage,
  ...props
}) => {
  const newData = React.useMemo(() => (dataPath ? R.pathOr([], dataPath.split("."), data) : data), [data, dataPath]);
  const paginateData = React.useMemo(
    () => (paginatePath ? R.pathOr([], paginatePath.split("."), data) : {}),
    [data, paginatePath]
  ) as Types.Paginate;

  return (
    <S.Container {...props}>
      <Header config={config} />

      {loading ? null : newData?.map((item, key) => <Item key={key} config={config} data={item} index={key} onRowClick={onRowClick} />)}

      {newData?.length || loading ? null : <S.EmptyList>Nenhum registro encontrado</S.EmptyList>}

      {!loading ? null : (
        <S.EmptyList>
          <Loader size={24} show={loading} />
        </S.EmptyList>
      )}

      {paginate ? <Paginate {...paginateData} onChange={onChangePage} /> : null}
    </S.Container>
  );
};

export default List;
