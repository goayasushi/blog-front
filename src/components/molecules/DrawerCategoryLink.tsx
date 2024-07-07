import { FC, memo } from "react";
import { Box } from "@chakra-ui/react";

import { useCategories } from "../../hooks/useCategories";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink } from "../atoms/NavLink";

type Props = {
  onDrawerClose: () => void;
};

export const DrawerCategoryLink: FC<Props> = memo((props) => {
  const { onDrawerClose } = props;
  const { data: categories } = useCategories();

  return (
    <>
      {categories.map((category) => (
        <Box key={category.name} pl={4}>
          <ChevronRightIcon />
          <NavLink path={`category/${category.id}`} onClick={onDrawerClose}>
            {category.name}
          </NavLink>
        </Box>
      ))}
    </>
  );
});
