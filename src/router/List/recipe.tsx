import { RecipeList } from "../../views/Recipe/List";
import { MenuItem } from "../../interfaces/menu";

export const recipeSection: MenuItem[] = [
  {
    id: "recipe/list",
    parent: "recipe",
    path: "list",
    sidebar: true,
    title: "recipe",
    parent_icon: (
      <img width={20} src="/images/recipe.png" alt="recipe" loading="lazy" />
    ),
    icon: (
      <img width={18} src="/images/recipe.png" alt="recipe" loading="lazy" />
    ),
    element: <RecipeList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
