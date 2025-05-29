import React from "react";
import * as R from "ramda";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import type * as Types from "../../types";
import * as S from "./styled";

interface PaginateProps extends Types.Paginate {
  onChange?: (page: number) => void;
}

const PAGE_BUTTONS_LIMIT = 5;

const Paginate: React.FC<PaginateProps> = ({ currentPage = 1, lastPage = 1, total = 0, onChange }) => {
  const handleOnChange = (item: number) => {
    if (currentPage !== item) {
      onChange?.(item);
    }
  };

  const pageButtons = React.useMemo(() => {
    if (lastPage <= PAGE_BUTTONS_LIMIT) return R.range(1, lastPage + 1);

    const padPage = Math.trunc(PAGE_BUTTONS_LIMIT / 2);
    let middlePage = currentPage;

    if (currentPage <= padPage) middlePage = padPage + 1;
    if (currentPage + padPage >= lastPage) middlePage = lastPage - padPage;

    const startPage = middlePage - padPage;
    const endPage = middlePage + padPage;

    const startRange = startPage >= 1 ? startPage : 1;
    const endRange = endPage <= lastPage ? endPage : lastPage;

    return R.range(startRange, endRange + 1);
  }, [total, lastPage, currentPage]);

  const canBack = currentPage > 1;
  const canNext = currentPage < lastPage;

  return (
    <S.Container>
      <S.Pages>
        <S.Page disabled={!canBack} onClick={() => canBack && handleOnChange(currentPage - 1)} noAnimate>
          <S.Icon disabled={!canBack} as={MdChevronLeft} />
        </S.Page>

        {pageButtons.map((item) => (
          <S.Page key={item} active={currentPage === item} onClick={() => handleOnChange(item)}>
            {item}
          </S.Page>
        ))}

        <S.Page disabled={!canNext} onClick={() => canNext && handleOnChange(currentPage + 1)} noAnimate>
          <S.Icon disabled={!canNext} as={MdChevronRight} />
        </S.Page>
      </S.Pages>
    </S.Container>
  );
};

export default Paginate;
