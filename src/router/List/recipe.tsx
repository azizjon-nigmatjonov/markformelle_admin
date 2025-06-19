import { RecipeList } from "../../views/Recipe/List";

export const recipeSection = [
  {
    parent: "recipe",
    link: "list",
    title: "recipe",
    parent_icon: "/images/recipe.png",
    icon: "/images/recipe.png",
    sidebar: true,
    element: <RecipeList />,
    auth: false,
    permissions: ["view_page", "edit"],
  },
];
