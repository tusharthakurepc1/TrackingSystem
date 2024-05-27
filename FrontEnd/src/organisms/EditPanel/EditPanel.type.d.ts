type EditPanelProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  organizationList: [string];
  editFlag: boolean;
  setEditFlag: Function;
}

export type {EditPanelProps};