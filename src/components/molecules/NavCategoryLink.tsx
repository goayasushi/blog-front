import { FC, memo } from "react";
import { MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useCategories } from "../../hooks/useCategories";

export const NavCategoryLink: FC = memo(() => {
  const { data: categories } = useCategories();

  return (
    <>
      {categories.map((category) => (
        <MenuItem
          as={Link}
          to={`/category/${category.id}`}
          key={category.id}
          _hover={{ backgroundColor: "transparent" }}
        >
          {category.name}
        </MenuItem>
      ))}
    </>
  );
});
