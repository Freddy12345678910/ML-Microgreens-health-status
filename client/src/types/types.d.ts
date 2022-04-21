declare namespace Dashboard {
  type titleProps = {
    iconSrc: string;
    text: string;
  };

  type GraphItemProps = {
    collectionName: Database.CollectionName;
    title: string;
  };
}

declare namespace Nav {
  type NavItemProps = {
    to: string;
    iconSrc: string;
  };
}

declare namespace DOMElement {
  type BreakPoints = Record<string, { active: boolean; value: string }> & {
    default: { active: true; value: string };
  };
}

declare namespace Database {
  type VegetationIndexDoc = {
    created_date: string;
    value: number;
  };

  type CollectionName = "NDWI" | "NDVI" | "ARVI";
}
