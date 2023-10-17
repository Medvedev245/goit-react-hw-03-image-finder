import { PaginationBtn } from './loadMore.styled';

export const Pagination = ({ onClick, children }) => {
  return (
    <>
      <PaginationBtn onClick={onClick}>{children}</PaginationBtn>
    </>
  );
};
