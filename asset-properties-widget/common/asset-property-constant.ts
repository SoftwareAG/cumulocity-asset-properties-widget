export const defaultProperty = [
  {
    c8y_JsonSchema: { properties: { name: { type: 'string', label: 'Name' } } },
    name: 'name',
    label: 'Name',
    type: 'string',
    active: true,
    isEditable: true,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: { properties: { id: { type: 'string', label: 'ID' } } },
    name: 'id',
    label: 'ID',
    type: 'string',
    active: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { type: { type: 'string', label: 'Asset model' } },
    },
    name: 'type',
    label: 'Asset model',
    type: 'string',
    active: true,
    isEditable: false,
    isExistingProperty: true,
  },
];

export const property = [
  {
    c8y_JsonSchema: {
      properties: { owner: { type: 'string', label: 'Owner' } },
    },
    name: 'owner',
    label: 'Owner',
    type: 'string',
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { lastUpdated: { type: 'string', label: 'Last updated' } },
    },
    name: 'lastUpdated',
    label: 'Last updated',
    type: 'string',
    isEditable: false,
    isExistingProperty: true,
  },
];
