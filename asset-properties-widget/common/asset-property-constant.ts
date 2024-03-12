import { gettext } from '@c8y/ngx-components';

export const defaultProperty = [
  {
    c8y_JsonSchema: { properties: { name: { type: 'string', label: 'Name' } } },
    name: 'name',
    label: 'Name',
    type: 'string',
    active: true,
    isEditable: true,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: { properties: { id: { type: 'string', label: 'ID' } } },
    name: 'id',
    label: 'ID',
    type: 'string',
    active: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: { type: { type: 'string', label: 'Asset model' } }
    },
    name: 'type',
    label: 'Asset model',
    type: 'string',
    active: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: { owner: { type: 'string', label: 'Owner' } }
    },
    name: 'owner',
    label: 'Owner',
    type: 'string',
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: { lastUpdated: { type: 'string', label: 'Last updated' } }
    },
    name: 'lastUpdated',
    label: 'Last updated',
    type: 'string',
    isEditable: false,
    isExistingProperty: true
  }
];

export const computedPropertiesBaseObject = [
  {
    c8y_JsonSchema: {
      properties: {
        alarmCountToday: {
          label: 'Alarm count today',
          type: 'number'
        }
      }
    },
    name: 'alarmCountToday',
    label: 'Alarm count today',
    title: 'Alarm type',
    type: 'string',
    config: { type: '' },
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        alarmCount3Months: {
          label: 'Alarm count 3 months',
          type: 'number'
        }
      }
    },
    name: 'alarmCount3Months',
    label: 'Alarm count 3 months',
    title: 'Alarm type',
    type: 'string',
    config: { type: '' },
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        eventCountToday: {
          label: 'Event count today',
          type: 'number'
        }
      }
    },
    name: 'eventCountToday',
    label: 'Event count today',
    title: 'Event type',
    type: 'string',
    config: { type: '' },
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        eventCount3Months: {
          label: 'Event count 3 months',
          type: 'number'
        }
      }
    },
    name: 'eventCount3Months',
    label: 'Event count 3 months',
    title: 'Event type',
    type: 'string',
    config: { type: '' },
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        lastMeasurement: {
          label: 'Last measurement',
          type: 'string'
        }
      }
    },
    name: 'lastMeasurement',
    label: 'Last measurement',
    type: 'string',
    config: { dp: [], isValid: null, resultTypes: 1 },
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        childDevicesCount: {
          label: 'Number of child devices',
          type: 'number'
        }
      }
    },
    name: 'childDevicesCount',
    label: 'Number of child devices',
    type: 'number',
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        childAssetsCount: {
          label: 'Number of child assets',
          type: 'number'
        }
      }
    },
    name: 'childAssetsCount',
    label: 'Number of child assets',
    type: 'number',
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        lastDeviceMessage: {
          label: 'Last device message',
          type: 'string'
        }
      }
    },
    name: 'lastDeviceMessage',
    label: 'Last device message',
    printFormat: 'datetime',
    type: 'string',
    computed: true,
    isEditable: false,
    isExistingProperty: true
  },
  {
    c8y_JsonSchema: {
      properties: {
        configurationSnapshot: {
          label: 'Configuration snapshot',
          type: 'string'
        }
      }
    },
    name: 'configurationSnapshot',
    label: 'Configuration snapshot',
    type: 'string',
    computed: true,
    isEditable: false,
    isExistingProperty: true
  }
];

export const devicePropertiesBaseObject = [
  {
    label: 'Active alarms status',
    type: 'object',
    isEditable: false,
    name: 'c8y_ActiveAlarmsStatus',
    c8y_JsonSchema: {
      properties: {
        c8y_ActiveAlarmsStatus: {
          key: 'c8y_ActiveAlarmsStatus',
          type: 'object',
          label: 'Active alarms status',
          properties: {
            critical: {
              title: 'Critical',
              type: 'number'
            },
            major: {
              title: 'Major',
              type: 'number'
            },
            minor: {
              title: 'Minor',
              type: 'number'
            },
            warning: {
              title: 'Warning',
              type: 'number'
            }
          }
        }
      }
    }
  },
  {
    label: 'Address',
    type: 'object',
    isEditable: true,
    name: 'c8y_Address',
    c8y_JsonSchema: {
      properties: {
        c8y_Address: {
          key: 'c8y_Address',
          type: 'object',
          label: 'Address',
          properties: {
            street: {
              title: 'Street',
              type: 'string'
            },
            city: {
              title: 'City',
              type: 'string'
            },
            cityCode: {
              title: 'City code',
              type: 'string'
            },
            territory: {
              title: 'Territory',
              type: 'string'
            },
            region: {
              title: 'Region',
              type: 'string'
            },
            country: {
              title: 'Country',
              type: 'string'
            }
          }
        }
      }
    }
  },
  {
    label: 'Agent',
    type: 'object',
    isEditable: true,
    name: 'c8y_Agent',
    c8y_JsonSchema: {
      properties: {
        c8y_Agent: {
          key: 'c8y_Agent',
          type: 'object',
          label: 'Agent',
          properties: {
            name: {
              title: 'Name',
              type: 'string'
            },
            version: {
              title: 'Version',
              type: 'string'
            },
            url: {
              title: 'URL',
              type: 'string'
            },
            maintainer: {
              title: 'Maintainer',
              type: 'string'
            }
          }
        }
      }
    }
  },
  {
    label: 'Availability',
    type: 'object',
    isEditable: false,
    name: 'c8y_Availability',
    c8y_JsonSchema: {
      properties: {
        c8y_Availability: {
          key: 'c8y_Availability',
          type: 'object',
          label: 'Availability',
          properties: {
            status: {
              title: 'Status',
              type: 'string'
            },
            lastMessage: {
              title: 'Last message',
              type: 'string',
              printFormat: 'datetime'
            }
          }
        }
      }
    }
  },
  {
    label: 'Connection',
    type: 'object',
    isEditable: false,
    name: 'c8y_Connection',
    c8y_JsonSchema: {
      properties: {
        c8y_Connection: {
          key: 'c8y_Connection',
          type: 'object',
          label: 'Connection',
          properties: {
            status: {
              title: 'Status',
              type: 'string'
            }
          }
        }
      }
    }
  },
  {
    label: 'Communication mode',
    type: 'object',
    isEditable: true,
    name: 'c8y_CommunicationMode',
    c8y_JsonSchema: {
      properties: {
        c8y_CommunicationMode: {
          key: 'c8y_CommunicationMode',
          type: 'object',
          label: 'Communication mode',
          properties: {
            mode: {
              title: 'Mode',
              type: 'string'
            }
          }
        }
      }
    }
  },
  {
    label: 'Firmware',
    type: 'object',
    isEditable: false,
    name: 'c8y_Firmware',
    c8y_JsonSchema: {
      properties: {
        c8y_Firmware: {
          key: 'c8y_Firmware',
          type: 'object',
          label: 'Firmware',
          properties: {
            moduleVersion: {
              title: 'Module version',
              type: 'string'
            },
            name: {
              title: 'Name',
              type: 'string'
            },
            version: {
              title: 'Version',
              type: 'string'
            },
            url: {
              title: 'URL',
              type: ['string', 'null']
            }
          }
        }
      }
    }
  },
  {
    label: 'Hardware',
    type: 'object',
    isEditable: true,
    name: 'c8y_Hardware',
    c8y_JsonSchema: {
      properties: {
        c8y_Hardware: {
          key: 'c8y_Hardware',
          type: 'object',
          label: 'Hardware',
          properties: {
            model: {
              title: 'Model',
              type: 'string'
            },
            serialNumber: {
              title: 'Serial number',
              type: 'string'
            },
            revision: {
              title: 'Revision',
              type: 'string'
            }
          }
        }
      }
    }
  },
  {
    label: 'LPWAN device',
    type: 'object',
    isEditable: false,
    name: 'c8y_LpwanDevice',
    c8y_JsonSchema: {
      properties: {
        c8y_LpwanDevice: {
          key: 'c8y_LpwanDevice',
          type: 'object',
          label: 'LPWAN device',
          properties: {
            provisioned: {
              title: 'Provisioned',
              type: 'boolean'
            }
          }
        }
      }
    }
  },
  {
    label: 'Mobile',
    type: 'object',
    isEditable: true,
    name: 'c8y_Mobile',
    c8y_JsonSchema: {
      properties: {
        c8y_Mobile: {
          key: 'c8y_Mobile',
          type: 'object',
          label: 'Mobile',
          properties: {
            cellId: {
              title: 'Cell ID',
              type: ['string', 'null']
            },
            connType: {
              title: 'Connection type',
              type: 'string',
              readOnly: true
            },
            currentOperator: {
              title: 'Current operator',
              type: 'string',
              readOnly: true
            },
            currentBand: {
              title: 'Current band',
              type: 'string',
              readOnly: true
            },
            ecn0: {
              title: 'ECN0',
              type: 'string',
              readOnly: true
            },
            iccid: {
              title: 'ICCID',
              type: ['string', 'null']
            },
            imei: {
              title: 'IMEI',
              type: ['string', 'null']
            },
            imsi: {
              title: 'IMSI',
              type: ['string', 'null']
            },
            lac: {
              title: 'LAC',
              type: ['string', 'null']
            },
            mcc: {
              title: 'MCC',
              type: ['string', 'null']
            },
            mnc: {
              title: 'MNC',
              type: ['string', 'null']
            },
            msisdn: {
              title: 'MSISDN',
              type: 'string'
            },
            rcsp: {
              title: 'RCSP',
              type: 'string',
              readOnly: true
            },
            rscp: {
              title: 'RSCP',
              type: 'string',
              readOnly: true
            },
            rsrp: {
              title: 'RSRP',
              type: 'string',
              readOnly: true
            },
            rsrq: {
              title: 'RSRQ',
              type: 'string',
              readOnly: true
            },
            rssi: {
              title: 'RSSI',
              type: 'string',
              readOnly: true
            }
          }
        }
      }
    }
  },
  {
    c8y_JsonSchema: {
      properties: {
        c8y_Notes: {
          type: 'string',
          label: 'Notes',
          'x-schema-form': {
            type: 'textarea'
          }
        }
      }
    },
    name: 'c8y_Notes',
    label: 'Notes',
    type: 'string',
    isEditable: true
  },
  {
    label: 'Position',
    type: 'object',
    isEditable: true,
    name: 'c8y_Position',
    c8y_JsonSchema: {
      properties: {
        c8y_Position: {
          key: 'c8y_Position',
          type: 'object',
          label: 'Position',
          properties: {
            lat: {
              title: 'Latitude',
              type: 'number'
            },
            lng: {
              title: 'Longitude',
              type: 'number'
            },
            alt: {
              title: 'Altitude',
              type: 'number'
            }
          }
        }
      }
    }
  },
  {
    label: 'Required availability',
    type: 'object',
    isEditable: true,
    name: 'c8y_RequiredAvailability',
    c8y_JsonSchema: {
      properties: {
        c8y_RequiredAvailability: {
          key: 'c8y_RequiredAvailability',
          type: 'object',
          label: 'Required availability',
          properties: {
            responseInterval: {
              title: 'Response interval',
              description:
                'Takes a value between -32768 and 32767 minutes (a negative value indicates that the device is under maintenance).',
              type: 'integer',
              minimum: -32768,
              maximum: 32767
            }
          }
        }
      }
    }
  },
  {
    label: 'Software',
    type: 'object',
    isEditable: false,
    name: 'c8y_Software',
    c8y_JsonSchema: {
      properties: {
        c8y_Software: {
          key: 'c8y_Software',
          type: 'object',
          label: 'Software',
          properties: {
            name: {
              title: 'Name',
              type: 'string'
            },
            version: {
              title: 'Version',
              type: 'string'
            },
            url: {
              title: 'URL',
              type: ['string', 'null']
            }
          }
        }
      }
    }
  },
  {
    label: 'Network',
    type: 'object',
    isEditable: true,
    name: 'c8y_Network',
    c8y_JsonSchema: {
      properties: {
        c8y_Network: {
          key: 'c8y_Network',
          type: 'object',
          label: 'Network',
          properties: {
            c8y_DHCP: {
              title: 'DHCP',
              type: 'object',
              printFormat: 'hidden',
              name: 'c8y_DHCP',
              properties: {
                addressRange: {
                  title: 'Address range',
                  type: 'object',
                  name: 'addressRange',
                  printFormat: 'hidden',
                  properties: {
                    start: {
                      title: 'Start',
                      type: 'string'
                    },
                    end: {
                      title: 'End',
                      type: 'string'
                    }
                  }
                },
                dns1: {
                  title: 'DNS 1',
                  type: 'string'
                },
                dns2: {
                  title: 'DNS 2',
                  type: 'string'
                },
                enabled: {
                  title: 'Enabled',
                  type: 'integer'
                }
              }
            },
            c8y_LAN: {
              title: 'LAN',
              type: 'object',
              name: 'c8y_LAN',
              printFormat: 'hidden',
              properties: {
                enabled: {
                  title: 'Enabled',
                  type: 'integer'
                },
                ip: {
                  title: 'IP',
                  type: 'string'
                },
                mac: {
                  title: 'MAC',
                  type: 'string'
                },
                name: {
                  title: 'Name',
                  type: 'string'
                },
                netmask: {
                  title: 'Netmask',
                  type: 'string'
                }
              }
            },
            c8y_WAN: {
              title: 'WAN',
              type: 'object',
              name: 'c8y_WAN',
              printFormat: 'hidden',
              properties: {
                apn: {
                  title: 'APN',
                  type: 'string'
                },
                authType: {
                  title: 'Auth type',
                  type: 'string'
                },
                ip: {
                  title: 'IP',
                  type: 'string'
                },
                password: {
                  title: 'Password',
                  type: 'string'
                },
                simStatus: {
                  title: 'SIM status',
                  type: 'string'
                },
                username: {
                  title: 'Username',
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  }
];

export const RESULT_TYPES = {
  VALUE: { name: 'VALUE', value: 1, label: gettext('Only value') },
  VALUE_UNIT: { name: 'VALUE_UNIT', value: 2, label: gettext('Value and unit') },
  VALUE_UNIT_TIME: { name: 'VALUE_UNIT_TIME', value: 3, label: gettext('Value, unit and time') }
};
