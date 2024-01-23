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
  {
    c8y_JsonSchema: {
      properties: { alarmCountToday: {
        title: 'Alarm count today',
        type: 'number',
      },},
    },
    name: 'alarmCountToday',
    label: 'Alarm count today',
    title: 'Alarm type',
    type: 'string',
    config:{type:''},
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { alarmCount3Months: {
        title: 'Alarm count 3 months',
        type: 'number',
      },},
    },
    name: 'alarmCount3Months',
    label: 'Alarm count 3 months',
    title: 'Alarm type',
    type: 'string',
    config:{type:''},
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { eventCountToday: {
        title: 'Event count today',
        type: 'number',
      },},
    },
    name: 'eventCountToday',
    label: 'Event count today',
    title: 'Event type',
    type: 'string',
    config:{type:''},
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { eventCount3Months: {
        title: 'Event count 3 months',
        type: 'number',
      },},
    },
    name: 'eventCount3Months',
    label: 'Event count 3 months',
    title: 'Event type',
    type: 'string',
    config:{type:''},
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { lastDeviceMessage: {
        title: 'Last device message',
        type: 'string',
      },},
    },
    name: 'lastDeviceMessage',
    label: 'Last device message',
    printFormat: 'datetime',
    type: 'string',
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {properties: { lastMeasurement: {
        title: 'Last measurement',
        type: 'string',
      },},},
    name: 'lastMeasurement',
    label: 'Last measurement',
    type: 'string',
    config:{dp:[],isValid:null},
    computed: true,
    isEditable: false,
    isExistingProperty: true,
    description: 'sdjfvsdjfvsdfvksdfvsdhfvskdh'
  },
  {
    c8y_JsonSchema: {
      properties: { childDevicesCount: {
        title: 'Number of child devices',
        type: 'number',
      },},
    },
    name: 'childDevicesCount',
    label: 'Number of child devices',
    type: 'number',
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { childAssetsCount: {
        title: 'Number of child assets',
        type: 'number',
      },},
    },
    name: 'childAssetsCount',
    label: 'Number of child assets',
    type: 'number',
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  },
  {
    c8y_JsonSchema: {
      properties: { configurationSnapshot: {
        title: 'Configuration snapshot',
        type: 'number',
      },},
    },
    name: 'configurationSnapshot',
    label: 'Configuration snapshot',
    type: 'number',
    computed: true,
    isEditable: false,
    isExistingProperty: true,
  }
];