#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Files that need to be migrated from useTranslation to useTranslationHook
const filesToMigrate = [
  "src/views/Kniting/Statistics/Machines/Pages/List/index.tsx",
  "src/views/Kniting/RollsKK/Table/index.tsx",
  "src/views/Kniting/Machines/MyCard/index.tsx",
  "src/views/Kniting/Machines/Logic/index.tsx",
  "src/views/Kniting/Machines/Components/List/index.tsx",
  "src/views/Stores/Mixtures/index.tsx",
  "src/views/Stores/CreateMixture/Logic.tsx",
  "src/views/Stores/CreateMixture/index.tsx",
  "src/views/Kniting/CellsAfterKK/Components/Table.tsx",
  "src/views/Recipe/List/Modal/DetailForm.tsx",
  "src/views/Recipe/List/Modal/MaterialForm.tsx",
  "src/views/Recipe/List/Modal/StepComponents/CardHeader.tsx",
  "src/views/Recipe/List/Modal/StepComponents/DragDrop.tsx",
  "src/views/Recipe/List/Modal/StepComponents/Components/DragHeader.tsx",
  "src/views/Recipe/List/Modal/StepComponents/StepModal.tsx",
  "src/views/Recipe/List/Modal/StepComponents/CardModal.tsx",
  "src/views/Recipe/List/Modal/TrailForm.tsx",
  "src/views/Settings/Profile/index.tsx",
  "src/views/Settings/Languages/index.tsx",
  "src/views/Paint/Components/Table.tsx",
  "src/views/Drying/Drying/Table.tsx",
  "src/views/Labaratory/Chemicals/Modal/TrailForm/index.tsx",
  "src/views/Labaratory/Chemicals/Modal/TableUI/Logic.tsx",
  "src/views/Labaratory/Chemicals/Modal/DetailForm/index.tsx",
  "src/views/Labaratory/Chemicals/Modal/TableUI/TwoRowTable.tsx",
  "src/views/Labaratory/Chemicals/Modal/TableUI/TableUI.tsx",
  "src/views/Chni/Components/Table.tsx",
  "src/views/Admins/RoutePage/List/ListItem/index.tsx",
  "src/views/Admins/RoutePage/List/Logic/index.tsx",
  "src/views/Admins/Users/Logic/index.tsx",
  "src/views/Admins/Rolls/AddRolls/index.tsx",
  "src/components/UI/Options/LiteTable.tsx",
  "src/components/UI/Header/UserInfo/index.tsx",
  "src/components/UI/Options/LiteTable/TableUI.tsx",
  "src/components/UI/Header/MobileHeader/Drawer.tsx",
  "src/components/UI/Sidebar/Section/Btns/index.tsx",
  "src/components/UI/Sidebar/Section/DropDown/index.tsx",
  "src/components/UI/Filter/Header/Item.tsx",
  "src/components/UI/GlobalSearch/index.tsx",
  "src/components/HFElements/HFTextField/index.tsx",
  "src/components/HFElements/HFSelect/index.tsx",
  "src/components/UI/EmptyDataComponent/index.tsx",
  "src/components/HFElements/HFMultipleSelect/index.tsx",
  "src/components/HFElements/HFInput/index.tsx",
  "src/components/HFElements/HFInputMask/index.tsx",
  "src/components/UI/Buttons/AddButton.tsx",
  "src/components/UI/Buttons/Cancel.tsx",
  "src/components/UI/Buttons/DeleteButton.tsx",
  "src/components/CElements/CList/index.tsx",
  "src/components/CElements/CSearchInput/index.tsx",
  "src/components/CElements/CTab/Details.tsx",
  "src/components/CElements/CTab/LineTab/LineDetails.tsx",
  "src/components/CElements/CNewTable/Details/Actions/Element/index.tsx",
  "src/components/CElements/CDriverImageUpload/DImageUpload.tsx",
  "src/components/CElements/CLabel/index.tsx",
  "src/components/CElements/CNewMiniModal/index.tsx",
  "src/components/CElements/CTable/Details/Actions/Element/index.tsx",
  "src/components/CElements/CFilterTab/Detail.tsx",
  "src/components/CElements/CConfirmationModal/index.tsx",
  "src/components/CElements/CAlert/index.tsx",
  "src/components/CElements/CBreadcrumbs/index.tsx",
];

function migrateFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Check if file uses old useTranslation
    if (content.includes('import { useTranslation } from "react-i18next"')) {
      // Replace import
      content = content.replace(
        'import { useTranslation } from "react-i18next"',
        'import { useTranslationHook } from "../../../hooks/useTranslation"'
      );

      // Replace usage
      content = content.replace(
        /const \{ t \} = useTranslation\(\);/g,
        "const { t } = useTranslationHook();"
      );

      modified = true;
      console.log(`✅ Migrated: ${filePath}`);
    } else {
      console.log(`⏭️  Skipped (no old useTranslation): ${filePath}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, content, "utf8");
    }

    return modified;
  } catch (error) {
    console.error(`❌ Error migrating ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("🚀 Starting translation migration...\n");

  let migratedCount = 0;
  let totalFiles = filesToMigrate.length;

  filesToMigrate.forEach((filePath) => {
    if (migrateFile(filePath)) {
      migratedCount++;
    }
  });

  console.log(`\n📊 Migration Summary:`);
  console.log(`   Total files processed: ${totalFiles}`);
  console.log(`   Files migrated: ${migratedCount}`);
  console.log(`   Files skipped: ${totalFiles - migratedCount}`);

  if (migratedCount > 0) {
    console.log(`\n🎉 Migration completed! Please test your application.`);
  } else {
    console.log(`\nℹ️  No files needed migration.`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { migrateFile, filesToMigrate };
