declare namespace Dashboard {
  type titleProps = {
    iconSrc: string;
    text: string;
  };

  type Graphs = GraphItemProps[];

  type GraphItemProps = {
    name: Database.CollectionName;
    title: string;
  };

  type GraphData = { name?: string; fill?: string; value: number };
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
