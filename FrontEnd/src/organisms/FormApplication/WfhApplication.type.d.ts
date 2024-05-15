interface Props {
  updatedFlag: boolean
  setUpdatedFlag: function,
  availedDate: string;
  formFlag: boolean;
  setFormFlag: React.Dispatch<React.SetStateAction<boolean>>;
  orgData: Array<string>;
}

export type { Props };
