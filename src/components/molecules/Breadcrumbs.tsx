import { FC, memo } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  category?: string;
  categoryId?: string;
};

export const Breadcrumbs: FC<Props> = memo((props) => {
  const { category, categoryId } = props;
  return (
    <Box mb={4}>
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink
            _hover={{ textDecoration: "none" }}
            as={Link}
            to="/articles"
            color="blue.600"
          >
            記事一覧
          </BreadcrumbLink>
        </BreadcrumbItem>

        {category && categoryId && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={Link}
              to={`/category/${categoryId}`}
              color="blue.600"
            >
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </Box>
  );
});
