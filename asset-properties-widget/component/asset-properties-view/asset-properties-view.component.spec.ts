import { IManagedObject } from '@c8y/client';
import { AssetPropertiesViewComponent } from './asset-properties-view.component';
import { of } from 'rxjs';

describe('AssetPropertiesViewComponent', () => {
  const date = new Date();
  let component: AssetPropertiesViewComponent;
  let inventoryMock: any;
  let moRealtimeServiceMock: any;
  let assetPropertiesServiceMock: any;
  let asset: any;
  let customPropertyObjects: any;
  let configCustomPropertyObjects: any;
  let measurementRealtimeMock:any;
  let assetPropertiesViewServiceMock: any;
  let datePipeMock: any;
  let alarmRealtimeServiceMock: any;
  let eventRealtimeServiceMock: any;
  let complexProperty: any;
  let constructedComplexProperty: any;
  let nestedComplexProperty: any;
  let deviceMO: any;
  let operationRealtimeServiceMock: any;

  beforeEach(() => {
    inventoryMock = { detail: jest.fn() };
    moRealtimeServiceMock = { onUpdate$: jest.fn() };
    assetPropertiesServiceMock = { getCustomProperties:jest.fn() };
    datePipeMock = { transform:jest.fn() };
    assetPropertiesViewServiceMock = { getAlarms:jest.fn(), getEvents:jest.fn(), getMeasurements:jest.fn(), getOperation:jest.fn() };
    alarmRealtimeServiceMock = { onCreate$:jest.fn() };
    eventRealtimeServiceMock = { onCreate$:jest.fn() };
    operationRealtimeServiceMock = { onCreate$:jest.fn() };
    measurementRealtimeMock = { latestValueOfSpecificMeasurement$:jest.fn(),onCreate$:jest.fn() };
    jest.useFakeTimers();

    component = new AssetPropertiesViewComponent(
      inventoryMock,
      moRealtimeServiceMock,
      assetPropertiesServiceMock,
      measurementRealtimeMock,
      assetPropertiesViewServiceMock,
      datePipeMock,
      alarmRealtimeServiceMock,
      eventRealtimeServiceMock,
      operationRealtimeServiceMock
    );

    asset = {
      id: 12,
      name: 'Test',
      c8y_IsAsset:[],
      address: {
        country: 'Germany',
        city: 'Düsseldorf',
        street: 'Toulouser Allee',
        postalCode: 40211,
        apartmentNumber: '25',
      },
      fileTest: [
        {
          file: new File([new Blob(['some content'])], 'values.json', {
            type: 'application/JSON',
          }),
        },
      ],
      nameTest: 'test123',
      dateTest1: date.toISOString(),
      dateTest2: '',
    } as any as IManagedObject;
    deviceMO = {
      id: '674366',
      type: 'c8y_MQTTDevice',
      name: 'Ar-alarm-test #1',
      lastUpdated: '2024-02-21T16:00:48.171Z',
      creationTime: '2024-01-31T22:04:55.157Z',
      owner: 'service_device-simulator',
      childDevices: { references: [] },
      childAssets: { references: [] },
      childAdditions: { references: [{ managedObject: { id: '703401' } }] },
      deviceParents: { references: [] },
      assetParents: { references: [] },
      additionParents: { references: [] },
      c8y_ActiveAlarmsStatus: { critical: 3, major: 2, minor: 0, warning: 0 },
      c8y_IsDevice: {},
      c8y_SupportedOperations: [],
      c8y_Position: { lng: 5, alt: 5, lat: null },
      c8y_ConfigurationDump:{id:9123856}
    };
    configCustomPropertyObjects = [
      {
        name: 'color',
        description: '',
        label: 'Color',
        type: 'c8y_JsonSchema',
        id: '123',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              minLength: 2,
              maxLength: 3,
              minLengthValidate: true,
              maxLengthValidate: true
            }
          },
          required: [],
          key: 'color',
          title: 'Color'
        }
      },
      {
        name: 'length',
        description: '',
        label: 'Length',
        type: 'c8y_JsonSchema',
        id: '1234',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            length: {
              type: 'number',
              minimum: 2,
              maximum: 5,
              requiredMaximum: true,
              requiredMinimum: true
            }
          },
          required: [],
          key: 'length',
          title: 'Length'
        }
      }
    ];
    customPropertyObjects = [
      {
        name: 'color',
        description: '',
        label: 'Color',
        type: 'c8y_JsonSchema',
        id: '123',
        c8y_IsAssetProperty: {},
        c8y_Global: {},
        c8y_JsonSchema: {
          type: 'object',
          properties: {
            color: {
              type: 'string',
              minLength: 2,
              maxLength: 3,
              minLengthValidate: true,
              maxLengthValidate: true
            }
          },
          required: [],
          key: 'color',
          title: 'Color'
        }
      }
    ];
    complexProperty =[
      {
        active: true,
        label: 'Active alarms status',
        type: 'object',
        isEditable: false,
        name: 'c8y_ActiveAlarmsStatus',
        c8y_JsonSchema: {
          properties: { c8y_ActiveAlarmsStatus: {key:'c8y_ActiveAlarmsStatus', type: 'object', label: 'Active alarms status',properties: {
            critical: {
              title: 'Critical',
              type: 'number',
            },
            major: {
              title: 'Major',
              type: 'number',
            },
            minor: {
              title: 'Minor',
              type: 'number',
            },
            warning: {
              title: 'Warning',
              type: 'number',
            }
          } } },
        },
      },
      {
        active: true,
        keyPath: ['c8y_ActiveAlarmsStatus', 'critical'],
        title: 'Critical',
        type: 'number'
      },
      {
        active: true,
        keyPath: ['c8y_ActiveAlarmsStatus', 'major'],
        title: 'Major',
        type: 'number',
      },
      {
        ctive: false,
        keyPath: ['c8y_ActiveAlarmsStatus', 'minor'],
        title: 'Minor',
        type: 'number',
      }
    ];
    nestedComplexProperty = [
      {
        label: 'Network',
        type: 'object',
        isEditable: true,
        name: 'c8y_Network',
        c8y_JsonSchema: {
          properties: { c8y_Network: {key:'c8y_Network', type: 'object', label: 'Network',properties : {
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
              properties: {}
            }
          }}}
        },
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'addressRange'],
        name: 'addressRange',
        printFormat: 'hidden',
        active: true,
        title: 'Address range',
        type: 'object',
        properties: {
          start: {
            keyPath: ['c8y_Network', 'c8y_DHCP', 'addressRange', 'start'],
            title: 'Start',
            type: 'string'
          },
          end: {
            keyPath: ['c8y_Network', 'c8y_DHCP', 'addressRange', 'end'],
            title: 'End',
            type: 'string'
          }
        }
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'addressRange', 'start'],
        active: true,
        title: 'Start',
        type: 'string'
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'addressRange', 'end'],
        active: true,
        title: 'End',
        type: 'string'
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'dns1'],
        active: true,
        title: 'DNS 1',
        type: 'string'
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'dns2'],
        active: true,
        title: 'DNS 2',
        type: 'string'
      },
      {
        keyPath: ['c8y_Network', 'c8y_DHCP', 'enabled'],
        active: true,
        title: 'Enabled',
        type: 'integer'
      }
    ];
    constructedComplexProperty = [
      {
        active: true,
        label: 'Active alarms status',
        type: 'object',
        isEditable: false,
        name: 'c8y_ActiveAlarmsStatus',
        c8y_JsonSchema: { properties: {
          c8y_ActiveAlarmsStatus: {
            key: 'c8y_ActiveAlarmsStatus',
            type: 'object',
            label: 'Active alarms status',
            properties: { critical: {
              active: true,
              keyPath: [ 'c8y_ActiveAlarmsStatus', 'critical' ],
              title: 'Critical',
              type: 'number'
            }, major: {
              active: true,
              keyPath: [ 'c8y_ActiveAlarmsStatus', 'major' ],
              title: 'Major',
              type: 'number'
            } }
          }
        } },
        isParentKeySelected: true
      }
    ];
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  describe('when asset is selected', () => {
    beforeEach(() => {
      component.config = { device: asset };
      jest.spyOn(inventoryMock, 'detail').mockResolvedValue({ data: asset });
      jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(asset));
    });
    it('should get selected asset details and validate selected asset properties', async () => {
      // given
      component.config.properties = configCustomPropertyObjects;
      jest.spyOn(assetPropertiesServiceMock, 'getCustomProperties').mockReturnValue(customPropertyObjects);

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      expect(component.config.properties).toEqual(customPropertyObjects);
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should get selected asset details and construct selected complex properties', async () => {
      // given
      component.config.properties = complexProperty;
      jest.spyOn(assetPropertiesServiceMock, 'getCustomProperties').mockReturnValue([...customPropertyObjects, complexProperty[0]]);

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      expect(component.properties).toEqual(constructedComplexProperty);
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should shown blank widget if asset is deleted', async () => {
      // given
      jest.spyOn(inventoryMock, 'detail').mockRejectedValue('');

      // when
      await component.ngOnInit();

      // then
      expect(component.selectedAsset).toEqual(undefined);
      expect(component.isEmptyWidget).toBe(true);
    });
  }),

  it('should get selected device details and construct selected nestedcomplex properties', async () => {
    // given
    component.config = { device: deviceMO,properties: nestedComplexProperty};
    jest
      .spyOn(inventoryMock, 'detail')
      .mockReturnValue(Promise.resolve({ data: deviceMO }));
    jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(deviceMO));
    jest.spyOn(assetPropertiesServiceMock, 'getCustomProperties').mockReturnValue(nestedComplexProperty);

    // when
    await component.ngOnInit();

    // then
    jest.runAllTimers();
    await Promise.resolve();
    expect(component.selectedAsset).toEqual(deviceMO);
    expect(component.properties[0].isNestedComplexProperty).toBe(true);
    expect(component.isEmptyWidget).toBe(false);
  });

  describe('Computed Properties test', () => {
    const computedProperties = [
      {
        c8y_JsonSchema: {
          properties: { alarmCountToday: {
            label: 'Alarm count today',
            type: 'number',
          },},
        },
        name: 'alarmCountToday',
        label: 'Alarm count today',
        title: 'Alarm type',
        type: 'string',
        config:{id: '8005633676046595', type: 'test' },
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      },
      {
        c8y_JsonSchema: {
          properties: { alarmCount3Months: {
            label: 'Alarm count 3 months',
            type: 'number',
          },},
        },
        name: 'alarmCount3Months',
        label: 'Alarm count 3 months',
        title: 'Alarm type',
        type: 'string',
        config:{id: '8005633676046596', type: 'test'},
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      },
      {
        c8y_JsonSchema: {
          properties: { eventCountToday: {
            label: 'Event count today',
            type: 'number',
          },},
        },
        name: 'eventCountToday',
        label: 'Event count today',
        title: 'Event type',
        type: 'string',
        config:{id: '8005633676046597', type: 'test'},
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      },
      {
        c8y_JsonSchema: {
          properties: { eventCount3Months: {
            label: 'Event count 3 months',
            type: 'number',
          },},
        },
        name: 'eventCount3Months',
        label: 'Event count 3 months',
        title: 'Event type',
        type: 'string',
        config:{id: '8005633676046598', type: 'test'},
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      },
      {
        c8y_JsonSchema: {properties: { lastMeasurement: {
          label: 'Last measurement',
            type: 'string',
          },},},
        name: 'lastMeasurement',
        label: 'Last measurement',
        type: 'string',
        config:{dp:[{
          color: '#b3460c',
          fragment: 'c8y_Demo1',
          label: 'c8y_Demo1 → ZZZZ1',
          series: 'ZZZZ1',
          unit: 'mole',
          __active: true,
          __target: {
            id: 674366,
            name: 'Ar-alarm-test #1'
          }
        }],
        id: '16137034983190457',
        isValid: true,
        resultTypes: 1},
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      },
      {
        c8y_JsonSchema: {
          properties: { lastDeviceMessage: {
            label: 'Last device message',
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
        active: true
      },
      {
        c8y_JsonSchema: {
          properties: { configurationSnapshot: {
            label: 'Configuration snapshot',
            type: 'string',
          },},
        },
        name: 'configurationSnapshot',
        label: 'Configuration snapshot',
        type: 'string',
        computed: true,
        isEditable: false,
        isExistingProperty: true,
        active: true
      }
    ];
    const alarmObject =[
      {
        count: '2349',
        creationTime: '2024-02-01T05:39:26.300Z',
        firstOccurrenceTime: '2024-02-01T05:39:26.298Z',
        history: {
          self: 'https://t7683.latest.stage.c8y.io/audit/auditRecords',
          auditRecords: []
        },
        id: '7094',
        lastUpdated: '2024-02-07T08:34:18.687Z',
        self: 'https://t7683.latest.stage.c8y.io/alarm/alarms/7094',
        severity: 'CRITICAL',
        source: {
          self: 'https://t7683.latest.stage.c8y.io/inventory/managedObjects/674366',
          id: '674366',
          name: 'Ar-alarm-test #1'
        },
        status: 'ACTIVE',
        text: 'test',
        time: '2024-02-07T08:34:18.681Z',
        type: 'test'
      }
    ];

    beforeEach(() => {
      jest.spyOn(inventoryMock, 'detail').mockReturnValue(Promise.resolve({ data: asset }));
      jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(asset));
      jest.spyOn(assetPropertiesServiceMock, 'getCustomProperties');
      jest.spyOn(datePipeMock, 'transform').mockReturnValue(date);
    });

    it('should retrieve the values for the computed properties alarmCountToday and alarmCount3Months, then update them in the computedPropertyObject.',async ()=>{
      // given
      const alarmComputedProperties = [...computedProperties.slice(0, 2)];
      component.config = { device: asset, properties: alarmComputedProperties};
      jest.spyOn(assetPropertiesViewServiceMock, 'getAlarms').mockReturnValue(alarmObject);
      jest.spyOn(alarmRealtimeServiceMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      await Promise.resolve();
      expect(component.computedPropertyObject).toEqual({ alarmCountToday_8005633676046595: 1 ,alarmCount3Months_8005633676046596: 1});
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should retrieve the values for the computed properties eventCountToday and eventCount3Months, then update them in the computedPropertyObject.',async ()=>{
      // given
      const eventComputedProperties = [...computedProperties.slice(2, 4)];
      component.config = { device: asset, properties: eventComputedProperties};
      jest.spyOn(assetPropertiesViewServiceMock, 'getEvents').mockReturnValue(alarmObject);
      jest.spyOn(eventRealtimeServiceMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      await Promise.resolve();
      expect(component.computedPropertyObject).toEqual({ eventCount3Months_8005633676046598: 1 ,eventCountToday_8005633676046597: 1});
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should retrieve the values for the computed properties lastMeasurement and update it to the computedPropertyObject.',async ()=>{
      // given
      const measurementValue = {
        date: '2024-02-17T17:03:14.000+02:00',
        id: '16137034983190457',
        unit: 'mole',
        value: 30
      };
      const eventComputedProperties = [...computedProperties.slice(4, 5)];
      component.config = { device: asset, properties: eventComputedProperties};
      jest.spyOn(component, 'getLatestMeasurement$').mockReturnValue(of(measurementValue));

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      await Promise.resolve();
      expect(component.computedPropertyObject).toEqual({lastMeasurement_16137034983190457:measurementValue});
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should retrieve the values for the computed properties Last device message and update it to the computedPropertyObject.',async ()=>{
      // given
      const eventComputedProperties = [...computedProperties.slice(5, 6)];
      component.config = { device: asset, properties: eventComputedProperties};
     const spyOnAlarms = jest.spyOn(assetPropertiesViewServiceMock, 'getAlarms').mockReturnValue(alarmObject);
      jest.spyOn(alarmRealtimeServiceMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));
      const spyOnEvents = jest.spyOn(assetPropertiesViewServiceMock, 'getEvents').mockReturnValue(alarmObject);
      jest.spyOn(eventRealtimeServiceMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));
      const spyOnMeasurements = jest.spyOn(assetPropertiesViewServiceMock, 'getMeasurements').mockReturnValue(alarmObject);
      jest.spyOn(measurementRealtimeMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));
      const spyOnOperation = jest.spyOn(assetPropertiesViewServiceMock, 'getOperation').mockReturnValue(alarmObject);
      jest.spyOn(operationRealtimeServiceMock, 'onCreate$').mockReturnValue(of(alarmObject[0]));


      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(asset);
      await Promise.all([spyOnAlarms, spyOnEvents, spyOnMeasurements, spyOnOperation]);
      expect(spyOnAlarms).toBeCalledTimes(1);
      expect(spyOnEvents).toBeCalledTimes(1);
      expect(spyOnMeasurements).toBeCalledTimes(1);
      expect(spyOnOperation).toBeCalledTimes(1);
      expect(component.isEmptyWidget).toBe(false);
    });

    it('should retrieve the values for the computed properties Configuration snapshot and update it to the computedPropertyObject.',async ()=>{
      // given
      const measurementValue = {
        date: '2024-02-17T17:03:14.000+02:00',
        id: '16137034983190457',
        unit: 'mole',
        value: 30
      };
      const eventComputedProperties = [...computedProperties.slice(6, 7)];
      component.config = { device: deviceMO, properties: eventComputedProperties};
      jest.spyOn(inventoryMock, 'detail').mockReturnValue(Promise.resolve({ data: deviceMO }));
      jest.spyOn(moRealtimeServiceMock, 'onUpdate$').mockReturnValue(of(deviceMO));
      jest.spyOn(component, 'getLatestMeasurement$').mockReturnValue(of(measurementValue));

      // when
      await component.ngOnInit();

      // then
      jest.runAllTimers();
      await Promise.resolve();
      expect(component.selectedAsset).toEqual(deviceMO);
      await Promise.resolve();
      expect(component.computedPropertyObject).toEqual({configurationSnapshot: 'Ar-alarm-test #1'});
      expect(component.isEmptyWidget).toBe(false);
    });
  });
});
