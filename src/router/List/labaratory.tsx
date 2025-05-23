import { LabChemicals } from "../../views/Labaratory/Chemicals";

export const labaratorySection = [
  {
    parent: "labaratory",
    link: "list",
    sidebar: true,
    title: "labaratory",
    parent_icon: (
      <img
        width={19}
        src="/images/chemical.webp"
        alt="chemicals"
        loading="lazy"
      />
    ),
    icon: (
      <img
        width={18}
        src="/images/addchemical.webp"
        alt="addchemical"
        loading="lazy"
      />
    ),
    element: <LabChemicals />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
