import { RecipeList } from "../../views/Recipe/List";

export const recipeSection = [
  {
    parent: "recipe",
    link: "list",
    sidebar: true,
    title: "recipe",
    parent_icon: <img width={20} src="/images/recipe.png" alt="recipe" />,
    icon: <img width={18} src="/images/recipe.png" alt="recipe" />,
    element: <RecipeList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
