declare namespace Nav {
  type NavItemProps = {
    to: string;
    iconSrc: string;
  };
}

declare namespace Dashboard {
  type titleProps = {
    iconSrc: string;
    text: string;
  };

  type GraphItemProps = {
    collectionName: string;
  };

  type VegetationIndexDoc = {
    created_date: string;
    value: number;
  }
}
