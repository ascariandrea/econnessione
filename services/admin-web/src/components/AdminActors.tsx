import * as React from "react";
import {
  Create,
  CreateProps,
  Datagrid,
  DateField,
  Edit,
  EditProps,
  FormTab,
  ImageField,
  ImageInput,
  List,
  ListProps,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  ReferenceArrayField,
} from "react-admin";
import { ColorField, ColorInput } from "react-admin-color-input";
import { GroupList } from "./AdminGroups";
import MarkdownInput from "./MarkdownInput";

export const ActorList: React.FC<ListProps> = (props) => (
  <List {...props} resource="actors">
    <Datagrid rowClick="edit">
      <TextField label="Full Name" source="fullName" />
      <TextField source="username" />
      <ColorField source="color" />
      <ImageField source="avatar" fullWidth={false} />
      <DateField label="Updated At" source="updatedAt" showTime={true} />
      <DateField label="Created At" source="createdAt" showTime={true} />
    </Datagrid>
  </List>
);

const EditTitle: React.FC = ({ record }: any) => {
  return <span>Actor {record.fullName}</span>;
};

export const ActorEdit: React.FC<EditProps> = (props) => (
  <Edit title={<EditTitle {...props} />} {...props}>
    <TabbedForm>
      <FormTab label="generals">
        <ImageField source="avatar" />
        <ColorInput source="color" />
        <TextInput source="username" />
        <TextInput source="fullName" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </FormTab>
      <FormTab label="Avatar">
        <ImageInput source="avatar">
          <ImageField />
        </ImageInput>
      </FormTab>

      <FormTab label="Content">
        <MarkdownInput source="body" />
      </FormTab>
      <FormTab label="Groups">
        <ReferenceArrayField source="groups" reference="groups">
          <Datagrid rowClick="edit">
            <TextField source="id" />
            <ImageField source="avatar" />
            <TextField source="name" />
          </Datagrid>
        </ReferenceArrayField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const ActorCreate: React.FC<CreateProps> = (props) => (
  <Create {...props} title="Create an Actor" >
    <SimpleForm>
      <ColorInput source="color" />
      <TextInput source="username" />
      <TextInput source="fullName" />
      <ImageInput source="avatar">
        <ImageField />
      </ImageInput>
      <MarkdownInput source="body" />
    </SimpleForm>
  </Create>
);
