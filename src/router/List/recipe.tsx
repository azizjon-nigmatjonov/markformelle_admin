import { RecipeList } from "../../views/Recipe/List";
import { MenuItem } from "../../interfaces/menu";

export const recipeSection: MenuItem[] = [
  {
    id: "recipe/list",
    parent: "recipe",
    path: "list",
    parent_link: "recipe",
    title: "recipe",
    parent_icon: "/images/recipe.png",
    icon: "/images/recipe.png",
    sidebar: true,
    element: <RecipeList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
