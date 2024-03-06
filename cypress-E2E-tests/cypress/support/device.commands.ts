import cockpit_page_elements from './page_objects/cockpit_page_elements';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
             * This command is being used to create the measurment.
             * @param requestBody Specify the request body.
             * Ex: {
                    deviceName: 'Device2',
                    fragment: 's7aFlow',
                    series: 'F',
                    unit: 'L',
                    value: 45
                }
             * Usage: cy.createMeasurement(requestBody);
             */
      createMeasurement(requestBody: any): void;

      /**
       * This command is being used to create a new alarm
       * @param alarmObject Pass an alarm object.
       * Note: Specify the "pastDate" in the object only if you want to create an alarm for a previous date.
       * ex: {
              deviceName: 'Device1',
              text: 'Device Running for more than standard time',
              severity: 'MAJOR',
              status: 'ACTIVE',
              pastDate: {
                month: 2,
                day: 15
              }
            }
       * Usage: createNewAlarm(alarmObject);
       */
      createNewAlarm(alarmObject: any): void;

      /**
       * This command is being used to create the device.
       * @param deviceName Name of the device
       * @param pastDate Specify the "pastDate" only if you want to create a device for a previous date.
       * Usage: createDevice('Device1');
       */
      createDevice(deviceName: string, pastDate?: any): void;

      /**
       * This command is being used to delete all the devices.
       * Usage: deleteAllDevices();
       */
      deleteAllDevices(): void;

      /**
       * This command is being used to add the child device.
       * @param parentDevice Name of the parent device.
       * @param childDevice Name of the child device.
       * addChildDevice("Device1", "DEvice2");
       */
      addChildDevice(parentDevice: string, childDevice: string): void;

      /**
       * This command is being used to create a new event
       * @param request Provide the request body.
       * Note: Specify the "pastDate" in the object only if you want to create an alarm for a previous date.
       * ex: {
       *      deviceName: 'Device1'
              type: "TestEvent",
              text: "sensor was triggered",
              pastDate: {
                month: 2,
                day: 15
              }
            }
       * Usage: createEvent(requestBody);
       */
      createEvent(request: any): void;

      /**
       * This command is being used to add or remove the data point in configuration section of asset properties widget.
       * @param label label of the data point.
       * @param action The action pertains to adding or removing a data point.
       * Usage: cy.addOrRmoveDataPoint('s7aFlow → F', 'add'/'remove');
       */
      addOrRmoveDataPoint(label:string, action:string): void;

      /**
       * This command is being used to expand or collapse the data point in configuration section of asset properties widget.
       * @param label label of the data point.
       * Usage: cy.addOrRmoveDataPoint('s7aFlow → F');
       */
      expandOrCollapseDataPoint(label:string): void;

      /**
       * This command is being used to switch datadpoint toggle button the in configuration section of asset properties widget.
       * @param label label of the data point.
       * Usage: cy.switchDataPointToggleButton('s7aFlow → F');
       */
      switchDataPointToggleButton(label:string): void;

      /**
       * This command is being used to add or remove the data point in configuration section of asset properties widget.
       * @param label label of the asset property.
       * @param value value of the asset property.
       * Usage: cy.checkPropertyItemValueVisibility('Last measurement', '45 k');
       */
      checkPropertyItemValueVisibility(label:string, value:any): void;
    }
  }
}

function getDeviceId(deviceName: string) {
  return cy.apiRequest({
    method: 'GET',
    url: `/inventory/managedObjects?pageSize=1&query=$filter=(has(c8y_IsDevice) and ('name' eq '${deviceName}'))`,
    failOnStatusCode: false,
  });
}

function setPastDate(requestBody) {
  const currentDate = new Date();
  if ('pastDate' in requestBody) {
    currentDate.setMonth(currentDate.getMonth() - requestBody.pastDate.month);
    currentDate.setDate(currentDate.getDate() - requestBody.pastDate.day);
  }
  return currentDate.toISOString();
}

Cypress.Commands.add('createMeasurement', (requestBody) => {
  getDeviceId(requestBody.deviceName).then((response: any) => {
    const deviceId = response.body.managedObjects[0].id;
    const formattedTimestamp = setPastDate(requestBody);
    const body = {
      [requestBody.fragment]: {
        [requestBody.series]: {
          value: requestBody.value,
          unit: requestBody.unit,
        },
      },
      time: formattedTimestamp,
      source: {
        id: deviceId,
      },
      type: requestBody.fragment,
    };
    cy.apiRequest({
      method: 'POST',
      url: '/measurement/measurements',
      headers: {
        Accept: 'application/vnd.com.nsn.cumulocity.measurement+json',
      },
      body: body,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 201);
  });
});

Cypress.Commands.add('createNewAlarm', (alarmObject) => {
  getDeviceId(alarmObject.deviceName).then((response: any) => {
    const deviceId = response.body.managedObjects[0].id;
    const formattedTimestamp = setPastDate(alarmObject);
    const modifiedObj = {
      source: {
        id: deviceId,
      },
      type: 'DeviceAlarm',
      text: alarmObject.text,
      severity: alarmObject.severity,
      status: alarmObject.status,
      time: formattedTimestamp,
    };
    cy.apiRequest({
      method: 'POST',
      url: '/alarm/alarms',
      body: modifiedObj,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 201);
  });
});

Cypress.Commands.add('createDevice', (deviceName, pastDate) => {
  const request = {
    url: '/inventory/managedObjects',
    method: 'Post',
    body: {
      name: deviceName,
      c8y_IsDevice: {},
      c8y_DeviceTypes: ['deviceSubsetType'],
      c8y_SupportedOperations: ['c8y_Restart'],
    },
  };
  if (pastDate) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - pastDate.month);
    currentDate.setDate(currentDate.getDate() - pastDate.day);
    request.body['creationTime'] = currentDate.toISOString();
  }
  cy.apiRequest(request);
});

Cypress.Commands.add('deleteAllDevices', () => {
  cy.apiRequest({
    url: 'inventory/managedObjects?fragmentType=c8y_IsDevice',
    method: 'GET',
    failOnStatusCode: false,
  }).then((response: any) => {
    for (const mo of response.body.managedObjects) {
      cy.log('Deleting ', mo.id);
      cy.apiRequest({
        method: 'DELETE',
        url: `/inventory/managedObjects/${mo.id}`,
      });
    }
  });
});

Cypress.Commands.add('addChildDevice', (parentDevice, childDevice) => {
  cy.apiRequest({
    url: `/inventory/managedObjects?q=$filter=(name eq '${parentDevice}' and has('c8y_IsDevice'))`,
    method: 'GET',
  }).then((response: any) => {
    const parentDeviceId = response.body.managedObjects[0].id;
    cy.apiRequest({
      method: 'GET',
      url: `/inventory/managedObjects?q=$filter=(name eq '${childDevice}' and has('c8y_IsDevice'))`,
    }).then((response: any) => {
      const childDeviceId = response.body.managedObjects[0].id;
      cy.log(childDeviceId);
      cy.apiRequest({
        url: `/inventory/managedObjects/${parentDeviceId}/childDevices`,
        method: 'POST',
        body: {
          managedObject: { id: `${childDeviceId}` },
        },
      });
    });
  });
});

Cypress.Commands.add('createEvent', (request) => {
  getDeviceId(request.deviceName).then((response: any) => {
    const deviceId = response.body.managedObjects[0].id;
    const formattedTimestamp = setPastDate(request);
    const body = {
      source: {
        id: deviceId,
      },
      type: request.type,
      text: request.text,
      time: formattedTimestamp,
    };
    cy.apiRequest({
      method: 'POST',
      url: '/event/events',
      headers: {
        Accept: 'application/vnd.com.nsn.cumulocity.event+json',
      },
      body: body,
      failOnStatusCode: false,
    })
      .its('status')
      .should('eq', 201);
  });
});

Cypress.Commands.add('addOrRmoveDataPoint', (label, action) => {
  cy.get(`[title*='${label}']`).parent('button').siblings('div').children(`button[data-cy="datapoint-selector-list-item--${action}-datapoint-button"]`).click();
});

Cypress.Commands.add('expandOrCollapseDataPoint', (label) => {
  cy.get(`[title*='${label}']`).parent('button').parent('div').parent('div').siblings('div').children('button[data-cy="c8y-li--collapse-btn"]').click();
});

Cypress.Commands.add('switchDataPointToggleButton', (label) => {
  cy.get(`[title*='${label}']`).parent('button').parent('div').parent('div').siblings('c8y-li-checkbox').click();
});

Cypress.Commands.add('checkPropertyItemValueVisibility', (label, value) => {
  cy.get(`[title*='${label}']`).parent('div').siblings('c8y-asset-properties-item').children('p').should('contain.text', value);
});